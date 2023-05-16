import styles from './LoginModal.module.scss'
import CloseIcon from '@mui/icons-material/Close';
import React, {FC, useContext, useEffect, useState} from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {Link} from "react-router-dom";
import {Context} from "../../index";
import Loader from "../Loader/Loader";

interface setIsLoginModalOpen {
    setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    isLoginModalOpen: boolean
    setIsRegistrationModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    isRegistrationModalOpen: boolean
}

export const LoginModal: FC<setIsLoginModalOpen> = ({setIsLoginModalOpen, isLoginModalOpen , setIsRegistrationModalOpen ,isRegistrationModalOpen}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPassVis] = useState(false)
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailError, setEmailError] = useState('Будь ласка, введіть адресу електронної пошти.')
    const [passwordError, setPasswordError] = useState('Будь ласка, введіть пароль')
    const {store} = useContext(Context);


    const emailHandler = (e: { target: HTMLInputElement }) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Пошта не підходить.')
        } else {
            setEmailError('')
        }
    }
    const Check = () => {
        setEmailDirty(true)
        setPasswordDirty(true)
        setEmailError('Будь ласка, введіть адресу електронної пошти.')
        setPasswordError('Будь ласка, введіть пароль.')
    }
    const passwordHandler = (e: { target: HTMLInputElement }) => {
        setPassword(e.target.value)
        if (e.target.value.length < 5) {
            setPasswordError('Пароль замалий')
            if (!e.target.value) {
                setPasswordError('Будь ласка, введіть пароль')
            }
        } else {
            setPasswordError('')
        }
    }
    const BlurHandle = (e: { target: HTMLInputElement }) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }
    }

    const Login = () => {
        if (email !== '' && password !== '') {
            store.login(email,password)
        } else {
            return
        }
    }
    const SwitchToRegistration = () => {
        setIsLoginModalOpen(false)
        setIsRegistrationModalOpen(true)
    }

    useEffect(()=>{
        if(store.isLoading){
            setTimeout(()=>{
                setIsLoginModalOpen(false)
            },500)
        }
    },[store.isLoading])

    return (
        <div className={styles.loginModal}>
            <div className={styles.closeModal}>
                <CloseIcon onClick={() => setIsLoginModalOpen(false)}/>
            </div>
            <h1 className={styles.loginLogo}>Monopoly</h1>
            <form autoComplete='true'>
                <div className={styles.loginEmail}>
                    <input
                        onBlur={e => BlurHandle(e)}
                        onChange={(e) => emailHandler(e)}
                        type="text" name='email'
                        className={emailDirty && emailError ? styles.inputError : ''}
                        placeholder='example@monopoly.com'
                    />
                    <label className={styles.emailLabel}>Пошта</label>
                    {
                        emailDirty && emailError && <div className={styles.emailErrors}>{emailError}</div>

                    }
                </div>
                <div className={styles.loginPass}>
                    <input
                        onBlur={e => BlurHandle(e)}
                        onChange={(e) => passwordHandler(e)}
                        className={passwordDirty && passwordError ? styles.inputError : ''}
                        type={passwordVisible ? 'text' : 'password'}
                        name='password'
                        autoComplete="on"
                        placeholder='Мінімум 5 символів'
                    />
                    <label className={styles.emailLabel}>Пароль</label>
                    {
                        passwordDirty && passwordError && <div className={styles.emailErrors}>{passwordError}</div>
                    }
                    {
                        passwordVisible ?
                            <VisibilityOffIcon className={styles.passIcon} style={{color: 'grey', cursor: 'pointer'}}
                                               onClick={() => setPassVis(false)}/>
                            :
                            <RemoveRedEyeIcon className={styles.passIcon} style={{color: 'grey', cursor: 'pointer'}}
                                              onClick={() => setPassVis(true)}/>
                    }
                </div>
            </form>
            <div className={styles.loginLinks}>
                <Link to={'/forgetpass'}>Забули пароль?</Link>
                <button onClick={()=> SwitchToRegistration()}>Реєстрація</button>
            </div>
            <button
                onClick={Login}
                className={email !== '' && password !== '' && !emailError && !passwordError ? styles.loginButtonActive : styles.loginButton}
            >
                Увійти
            </button>
            {
                store.isLoading && <Loader width={'96%'}/>
            }
        </div>
    )
}