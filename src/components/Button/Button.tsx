import React from 'react';
import s from './Button.module.css'

type PropsType = {
    title: string
    callback: () => void
    disabled: boolean
}

const Button = (props: PropsType) => {
    return (
        <div className={s.buttonsStyle}>
            <button onClick={props.callback} className={s.button} disabled={props.disabled}>
                {props.title}
            </button>
        </div>
    );
};

export default Button;