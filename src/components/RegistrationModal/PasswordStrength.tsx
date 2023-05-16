import React, {FC} from 'react'
import styles from './RegistrationModal.module.scss'

interface PasswordStrengthInterface {
    StrengthPassLabel(): string
    result: {score : number}
}

export const PasswordStrength:FC<PasswordStrengthInterface> = ({ result , StrengthPassLabel}) => {
    const num = result.score * 100 / 4
    function ProgressColor() {
        switch (result.score) {
            case 0 :
                return '#828282';
            case 1:
                return '#EA1111';
            case 2 :
                return '#FFAD00';
            case 3:
                return '#9bc158';
            case 4:
                return '#00b500';
            default:
                return 'none'
        }
    }

    const ChangePasswordColor = () => ({
        transition: 'width 500ms',
        width: `${num}%`,
        background: ProgressColor(),
        height: '7px',
        borderRadius: '4px',
    })
    return (
        <div style={{width:'100%', display:'flex' , justifyContent:'center', flexDirection:'column' , alignItems:'center'}}>
            <p className={styles.passwordStrengthLable} style={{color: ProgressColor() , width:'96%' , fontSize:'14px'}}>{StrengthPassLabel()}</p>
            <div style={{
                marginTop: '0',
                width: '96%',
                height: '7px',
                backgroundColor: 'lightgrey',
                borderRadius: '4px'
            }}>
                <div style={ChangePasswordColor()}></div>
            </div>
        </div>
    )
}