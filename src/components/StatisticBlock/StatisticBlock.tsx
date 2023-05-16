import {observer} from "mobx-react-lite";
import styles from './StatisticBlock.module.scss'
import React, {useContext} from "react";
import {Context} from "../../index";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GamesIcon from '@mui/icons-material/Games';


const StatisticBlock = () => {
    const {store} = useContext(Context);
    let wins = store.user?.achievements?.wins
    let allMoney = store.user?.achievements?.allMoney
    let games = store.user?.achievements?.games


    return(
        <div className={styles.body}>
            <div className={styles.wins}>
                <div className={styles.icon}>
                    <EmojiEventsIcon sx={{width: '30px', height: '30px', color: '#061B64'}}/>
                </div>
                <h1>
                    {wins >= 1000 ? wins / 1000 + 'K' : wins}
                </h1>
                <p>Перемог</p>
            </div>
            <div className={styles.allMoney}>
                <div className={styles.icon}>
                    <AttachMoneyIcon sx={{width: '30px', height: '30px', color: '#044816'}}/>
                </div>
                <h1>
                    {allMoney >= 1000 ? wins / 1000 + 'K' : wins}
                </h1>
                <p>Отримано коштів</p>
            </div>
            <div className={styles.games}>
                <div className={styles.icon}>
                    <GamesIcon sx={{width: '30px', height: '30px', color: '#7A4F01'}}/>
                </div>
                <h1>
                    {games >= 1000 ? wins / 1000 + 'K' : wins}
                </h1>
                <p>Усього ігор</p>
            </div>
        </div>
    )
}

export default observer(StatisticBlock)