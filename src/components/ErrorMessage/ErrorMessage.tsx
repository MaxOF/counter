import React from 'react';

import s from './ErrorMessage.module.css'
import {counterMessageType} from "../../bll/counter-reducer";

type PropsType = {
    inc: number
    startValue: number
    maxValue: number
    counterMessage: counterMessageType
}


export const ErrorMessage = (props: PropsType) => {


    const changeClass = () => {
        if(props.inc === props.maxValue) {
            return s.incorrectMessage
        } else if (props.counterMessage === 'Incorrect value, try again' || props.startValue < 0) {
            return s.incorrectMessage
        } else return s.countStyle
    }

    return (
        <div className={s.container}>
            <div className={changeClass()}>
                {props.counterMessage ? props.counterMessage : props.inc}
            </div>
        </div>
    );
};
