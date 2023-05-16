import styles from './Home.module.scss'
import Menu from "../../components/Menu/Menu";
import avatar from '../../images/avatar.png'
import GamesIcon from '@mui/icons-material/Games';
import GroupIcon from '@mui/icons-material/Group';
import Header from "../../components/Header/Header";
import React, {FC} from "react";
import {LoginModal} from "../../components/LoginModal/LoginModal";
import RegistrationModal from "../../components/RegistrationModal/RegistrationModal";

interface HomeInterface {
    setIsLoginModalOpen:  React.Dispatch<React.SetStateAction<boolean>>
    setIsRegistrationModalOpen:  React.Dispatch<React.SetStateAction<boolean>>
    isLoginModalOpen: boolean
    isRegistrationModalOpen: boolean
}

export const Home:FC<HomeInterface> = ({setIsLoginModalOpen, setIsRegistrationModalOpen, isLoginModalOpen, isRegistrationModalOpen}) => {


    const newUsers = 100000
    const weeklyGames = 1200
    return (
        <div className={styles.body}>
            <Menu setIsLoginModalOpen={setIsLoginModalOpen}/>
            <div className={styles.content}>
                <Header setIsLoginModalOpen={setIsLoginModalOpen}/>
                <section className={styles.sectionOne}>
                    <div className={styles.statistics}>
                        <div className={styles.statisticsGames}>
                            <div className={styles.icon}>
                                <GamesIcon sx={{width: '30px', height: '30px', color: '#061B64'}}/>
                            </div>
                            <h1>
                                {weeklyGames >= 1000 ? weeklyGames / 1000 + 'K' : weeklyGames}
                            </h1>
                            <p>Weekly Games</p>
                        </div>
                        <div className={styles.statisticsUsers}>
                            <div className={styles.icon}>
                                <GroupIcon sx={{width: '30px', height: '30px', color: '#04297A'}}/>
                            </div>
                            <h1>
                                {newUsers >= 1000 ? newUsers / 1000 + 'K' : weeklyGames}
                            </h1>
                            <p>New Users</p>

                        </div>
                    </div>
                    <div className={styles.topList}>
                        <div className={styles.topUserList}>
                            {
                                [...Array(10)].map((el,index) =>
                                    <div className={styles.topUser} key={index}>
                                        <img src={avatar} alt="" width={30}/>
                                        <p>Name</p>
                                    </div>)
                            }
                        </div>
                        <h2>Top List</h2>
                    </div>
                </section>
            </div>
            {isLoginModalOpen && (
                <LoginModal
                    setIsLoginModalOpen={setIsLoginModalOpen}
                    isLoginModalOpen={isLoginModalOpen}
                    isRegistrationModalOpen={isRegistrationModalOpen}
                    setIsRegistrationModalOpen={setIsRegistrationModalOpen}
                />
            )}
            {isRegistrationModalOpen && (
                <RegistrationModal
                    setIsLoginModalOpen={setIsLoginModalOpen}
                    isLoginModalOpen={isLoginModalOpen}
                    isRegistrationModalOpen={isRegistrationModalOpen}
                    setIsRegistrationModalOpen={setIsRegistrationModalOpen}
                />
            )}
        </div>
    )
}