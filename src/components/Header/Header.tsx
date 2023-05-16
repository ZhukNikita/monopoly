import styles from "./Header.module.scss";
import ukr from "../../images/ukr.png";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, {FC, useContext, useState} from "react";
import {Link} from "react-router-dom";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import avatar from '../../images/avatar.png';
import {API_URL} from "../../http";

interface HeaderInterface {
    setIsLoginModalOpen:  React.Dispatch<React.SetStateAction<boolean>>
}

const Header:FC<HeaderInterface> = ({setIsLoginModalOpen}) => {
    const [isOpenUserInfo, setIsOpenUserInfo] = useState<boolean>(false)
    const {store} = useContext(Context);

    return(
        <header>
            <h1>Привіт{store.isAuth?', '+store.user?.name:''}</h1>
            <div className={styles.headerButtons}>
                <div className={styles.language}>
                    <img src={ukr} alt=""/>
                </div>
                <div className={styles.notifications}>
                    <NotificationsIcon sx={{width: '30px', height: '30px'}}/>
                </div>
                {
                    store.isAuth?(
                        <>
                            <div className={styles.avatar} onClick={() => setIsOpenUserInfo(!isOpenUserInfo)}>
                                {store.user.avatar
                                    ? <img src={`${API_URL}${store.user.avatar}`} alt="" style={{width:'32px',height:'32px' , borderRadius:'16px',objectFit:'cover'}}/>
                                    : <img src={avatar} alt="" style={{width:'32px',height:'32px'}}/>
                                }
                            </div>
                            <div className={isOpenUserInfo? styles.avatarModal : styles.avatarModalDisabled}>
                                <div className={styles.avatarModalTitle}>
                                    <h6>{store.user?.name}</h6>
                                    <p>{store.user?.email}</p>
                                </div>
                                <div className={styles.avatarModalLinks}>
                                    <Link to={'/'}>Головна</Link>
                                    <Link to={'/cabinet'}>Мій кабінет</Link>
                                    <Link to={'/games'}>Гра</Link>
                                </div>
                                <button className={styles.avatarModalLogout} onClick={()=> {
                                    store.logout()
                                    setIsOpenUserInfo(false)
                                }}>Вийти</button>
                            </div>
                        </>
                    ):
                        <button className={styles.login} onClick={()=> {
                            setIsLoginModalOpen(true)
                        }}>Увійти</button>
                }
            </div>
        </header>
    )
}
export default observer(Header)