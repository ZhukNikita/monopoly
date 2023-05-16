import {observer} from "mobx-react-lite";
import styles from './Cabinet.module.scss'
import React, {FC, useContext, useEffect, useState} from "react";
import Menu from "../../components/Menu/Menu";
import Header from "../../components/Header/Header";
import {Navigate, useParams} from "react-router-dom";
import {Context} from "../../index";
import avatar from '../../images/avatar.png';
import {API_URL} from "../../http";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ErrorIcon from '@mui/icons-material/Error';
import StatisticBlock from "../../components/StatisticBlock/StatisticBlock";
interface CabinetInterface {
    setIsLoginModalOpen:  React.Dispatch<React.SetStateAction<boolean>>
    setIsRegistrationModalOpen:  React.Dispatch<React.SetStateAction<boolean>>
    isLoginModalOpen: boolean
    isRegistrationModalOpen: boolean
}


const Cabinet:FC<CabinetInterface> = ({setIsLoginModalOpen,isLoginModalOpen,setIsRegistrationModalOpen,isRegistrationModalOpen}) => {
    const {store} = useContext(Context);
    const [selectedFile,setSelectedFile] = useState<any>()
    const [preview,setPreview] = useState<any>()
    const [error , setError] = useState<string>('')
    const {id}= useParams()

    const addImg = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const file = event.target.files
        if(file != null) {
            setSelectedFile(file[0])
        }
    }

    const uploadImg = () =>{
        if(!selectedFile){
            setError('Оберіть фото')
        }else {
            const data = new FormData()
            data.append('image' , selectedFile)
            store.uploadImg(data , id)

        }

    }

    useEffect(() => {
        const objectUrl = URL.createObjectURL(new Blob([selectedFile] , {type: 'image/png'}))
        if (selectedFile)setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])
    if (!store.isAuth && !window.localStorage.getItem('token')){
        return <Navigate to='/'/>
    }
    return(
        <div className={styles.body}>
            <Menu setIsLoginModalOpen={setIsLoginModalOpen}/>
            <div className={styles.content}>
                <Header setIsLoginModalOpen={setIsLoginModalOpen}/>
                <div className={styles.imgBlock}>
                    {
                        preview && (<img className={styles.avatar} src={preview} id='blah'/>)
                    }
                    {
                        !preview && (store.user.avatar
                            ? <img className={styles.avatar}  src={`${API_URL}${store.user.avatar}`}/>
                            : <img src={avatar} alt="a" style={{width:'200px' , height:'200px'}}/>)

                    }
                    <div className={styles.uploadButtons}>
                        <input type="file"  onChange={(event)=>addImg(event)} accept="image/png, image/gif, image/jpeg" name='file' id='file'/>
                        <label htmlFor="file"><FileUploadIcon/>Обрати фото</label>
                        <button onClick={uploadImg}>Змінити фото</button>
                    </div>
                    {error && <p className={styles.error}><ErrorIcon sx={{width:'18px', height:'18px'}}/>{error}</p>}
                </div>
                <div className={styles.statisticBlock}>
                    <h1>Ваші успіхи</h1>
                    <StatisticBlock/>
                </div>
            </div>
        </div>
  )
}

export default observer(Cabinet)