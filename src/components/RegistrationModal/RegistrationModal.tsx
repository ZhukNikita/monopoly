import styles from './RegistrationModal.module.scss'
import CloseIcon from '@mui/icons-material/Close';
import React, {FC, useContext, useEffect, useState} from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import zxcvbn from "zxcvbn";
import {PasswordStrength} from "./PasswordStrength";
import {Context} from "../../index";
import Loader from '../Loader/Loader'
import {observer} from "mobx-react-lite";


interface setIsLoginModalOpen {
    setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    isLoginModalOpen: boolean
    setIsRegistrationModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    isRegistrationModalOpen: boolean
}

const RegistrationModal:FC<setIsLoginModalOpen> = ({setIsLoginModalOpen , setIsRegistrationModalOpen , isRegistrationModalOpen, isLoginModalOpen}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPassVis] = useState(false)
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailError, setEmailError] = useState('Будь ласка, введіть адресу електронної пошти.')
    const [passwordError, setPasswordError] = useState('Будь ласка, введіть пароль')
    const [name, setName] = useState('')
    const [nameDirty, setNameDirty] = useState(false)
    const [nameError, setNameError] = useState("Будь ласка, введіть ім'я.")
    const [passwordRepeatDirty, setPasswordRepeatDirty] = useState(false)
    const [passwordRepeatError, setPasswordRepeatError] = useState('Будь ласка, введіть пароль')
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const {store} = useContext(Context)
    const result = zxcvbn(password)


    const passwordRepeatHandler = (e: { target: HTMLInputElement }) => {
        setPasswordRepeat(e.target.value)
        if (!e.target.value) {
            setPasswordRepeatError('Будь ласка, введіть пароль')
        } else {
            if (password !== e.target.value) {
                setPasswordRepeatError('Паролі не збігаються')
            } else setPasswordRepeatError('')

        }
    }


    const nameHandler = (e: { target: HTMLInputElement }) => {
        setName(e.target.value)
        if (!e.target.value) {
            setNameError("Будь ласка, введіть ім'я")
        }
        else {
            setNameError('')
        }
    }

    const emailHandler = (e: { target: HTMLInputElement }) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Пошта не підходить.')
            } else {
                setEmailError('')
            }
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
                case 'Name':
                    setNameDirty(true)
                    break
                case 'passwordRepeat':
                    setPasswordRepeatDirty(true)
                    break
            }
        }
    function StrengthPassLabel() {
        switch (result.score) {
            case 0 :
                return 'Дуже простий';
            case 1:
                return 'Простий';
            case 2 :
                return 'Середній';
            case 3:
                return 'Безпечний';
            case 4:
                return 'Блискучий';
            default:
                return 'none'
        }
    }


        const Registration = () => {
            if (email !== '' && password !== '' && name !== '' && passwordRepeat !== '' && password === passwordRepeat) {
                    store.registration(email,password,name)
            } else {
                return
            }
        }

    const SwitchToLogin = () => {
        setIsRegistrationModalOpen(false)
        setIsLoginModalOpen(true)
    }
    useEffect(()=>{
        if(store.isLoading){
            setTimeout(()=>{
                setIsRegistrationModalOpen(false)
            },1500)
        }
    },[store.isLoading])
        return (
            <div className={styles.RegistrationModal}>
                <div className={styles.closeModal}>
                    <CloseIcon onClick={() => setIsRegistrationModalOpen(false)}/>
                </div>
                <h1 className={styles.RegistrationLogo}>Monopoly</h1>
                <form autoComplete='true'>
                    <div className={styles.RegistrationEmail}>
                        <input
                            onBlur={e => BlurHandle(e)}
                            onChange={(e) => nameHandler(e)}
                            type="text"
                            name='Name'
                            className={emailDirty && emailError ? styles.inputError : ''}
                            placeholder="Им'я"
                        />
                        <label className={styles.emailLabel}>Ваше ім'я</label>
                        {
                            nameDirty && nameError && <div className={styles.emailErrors}>{nameError}</div>

                        }
                    </div>
                    <div className={styles.RegistrationEmail}>
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
                    <div className={styles.RegistrationPass}>
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
                    <div className={styles.RegistrationPass}>
                        <input
                            onBlur={e => BlurHandle(e)}
                            onChange={(e) => passwordRepeatHandler(e)}
                            type={passwordVisible?'text':'password'}
                            name='passwordRepeat'
                            autoComplete="on"
                            placeholder='Мінімум 5 символів'
                        />
                        <label className={styles.emailLabel}>Повторити пароль</label>
                        {
                            passwordRepeatDirty && passwordRepeatError && <div className={styles.emailErrors}>{passwordRepeatError}</div>
                        }
                    </div>
                    <PasswordStrength StrengthPassLabel={StrengthPassLabel} result={result}/>
                </form>
                <div className={styles.RegistrationLinks}>
                    <button onClick={()=> SwitchToLogin()}>Вже є акаунт?</button>
                </div>
                <button
                    onClick={Registration}
                    className={email !== '' && password !== '' && !emailError && !passwordError ? styles.RegistrationButtonActive : styles.RegistrationButton}
                >
                    Зареєструватися
                </button>
                {
                    store.isLoading && <Loader width={'96%'}/>
                }

            </div>
  )
}

export default observer(RegistrationModal)