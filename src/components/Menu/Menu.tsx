import styles from './Menu.module.scss'
import React, {FC, useContext} from "react";
import HomeIcon from '@mui/icons-material/Home';
import CasinoIcon from '@mui/icons-material/Casino';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import man from '../../images/monopoly_man.png'
import avatar from '../../images/avatar.png'
import LogoutIcon from '@mui/icons-material/Logout';
import {Link, useLocation} from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import {Context} from "../../index";
import {useNavigate} from 'react-router-dom'
import {observer} from "mobx-react-lite";
interface MenuInterface {
    setIsLoginModalOpen:  React.Dispatch<React.SetStateAction<boolean>>

}

const Menu:FC<MenuInterface> = ({ setIsLoginModalOpen}) => {
    const {store} = useContext(Context);
    const {pathname} = useLocation()
    const id = store.user?.id
    const navigate = useNavigate()


    return(
        <div className={styles.body}>
            <img src={man} alt="" style={{position:"absolute" , width : '150px' , top:'25px'}}/>
            <div className={styles.logo}>
                <h1>Monopoly</h1>
            </div>
            {/*{*/}
            {/*    isAuth && (*/}
            {/*        <div className={styles.user}>*/}
            {/*            <AccountCircleIcon sx={{width:'100%' , height:'80px' , color:'#637381'}}/>*/}
            {/*            <h2>{name}</h2>*/}
            {/*        </div>*/}

            {/*    )*/}
            {/*}*/}
            <nav className={styles.routes}>
                <ul>
                    {store.isAuth && <li className={pathname === '/cabinet'? styles.activePath : '' }><button onClick={()=> navigate('/cabinet/'+ store.user.id)}><AccountBoxIcon/><span>Мій кабінет</span></button></li>}
                    <li className={pathname === '/'? styles.activePath : '' }><Link to={'/'}><HomeIcon/><span>Головна</span></Link></li>
                    <li className={pathname === '/games'? styles.activePath : '' }><Link to={'/games'}><CasinoIcon/><span>Гра</span></Link></li>
                </ul>
                {
                    store.isAuth?
                        <button className={styles.login} onClick={()=>store.logout()}><LogoutIcon/>Вийти</button>
                        :
                        <button className={styles.login} onClick={()=>setIsLoginModalOpen(true)}><LoginIcon/>Увійти</button>
                }
            </nav>
            <div className={styles.friends}>
                <div className={styles.title}>
                    <h1>Мої друзі</h1>
                    <p>12</p>
                </div>
                <div className={styles.fiendsList}>
                    {
                        [...Array(5)].map((el , index)=> (
                            <div key={index} className={styles.friend}>
                                <img src={avatar} alt="" width={40}/>
                                <h4>Name</h4>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default observer(Menu)