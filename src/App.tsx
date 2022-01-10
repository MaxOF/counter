import React, {ChangeEvent, useEffect, useState} from 'react';

import './App.css';
import s from './components/Counter/Counter.module.css'
import {Input} from "./components/Counter/Input";
import Button from "./components/Button/Button";
import {ErrorMessage} from "./components/ErrorMessage/ErrorMessage";

export type counterMessageType = null | 'Press set to enter your value' | 'Incorrect value, try again'

function App() {

    const [startValue, setStartValue] = useState(0)
    const [maxValue, setMaxValue] = useState(10)

    const [inc, setInc] = useState(startValue)
    const [counterMessage, setCounterMessage] = useState<counterMessageType>(null)

    const [onDisabled, setOnDisabled] = useState(false)
    const [resetDisabled, setResetDisabled] = useState(false)
    const [incDisabled, setIncDisabled] = useState(false)

    useEffect(() => {
        let startValueAsString = localStorage.getItem('startValue')
        if (startValueAsString) {
            let newStartValueAsString = JSON.parse(startValueAsString)
            setStartValue(newStartValueAsString)
        }
    }, [])

    useEffect(() => {
        let maxValueAsString = localStorage.getItem('startValue')
        if (maxValueAsString) {
            let newMaxValueAsString = JSON.parse(maxValueAsString)
            setStartValue(newMaxValueAsString)
        }
    }, [])

    const onSet = () => {
        setCounterMessage(null)
        setInc(startValue)
        setOnDisabled(true)
        setIncDisabled(false)
        setResetDisabled(false)
        localStorage.setItem('startValue', JSON.stringify(startValue))
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
    }
    const addInc = () => {
        if (inc < maxValue) {
            let newInc = Number(inc)
            setInc(newInc + 1)
        }
    }
    const onReset = () => {
        setInc(startValue)
    }
    const onChangeStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setOnDisabled(false)
        setIncDisabled(true)
        setResetDisabled(true)
        let currentValue = +e.currentTarget.value
        setStartValue(currentValue)
        if (currentValue >= maxValue || currentValue < 0) {
            setCounterMessage('Incorrect value, try again')
        }
        if (currentValue < maxValue) {
            setCounterMessage('Press set to enter your value')
        }
    }
    const onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setOnDisabled(false)
        setIncDisabled(true)
        setResetDisabled(true)
        let currentValue = +e.currentTarget.value
        setMaxValue(currentValue)
        if (currentValue <= startValue || currentValue < 0) {
            setCounterMessage('Incorrect value, try again')
        }
        if (currentValue > startValue) {
            setCounterMessage('Press set to enter your value')
        }
    }

    const inputErrorStyle = maxValue <= startValue || maxValue <= 0 || startValue < 0 ? s.inputError : s.input
    const conditionsOfSetDisable = onDisabled || startValue < 0 || maxValue <= 0 || startValue >= maxValue

    const disabledInc = incDisabled || inc === maxValue //условие дизейбла кнопки inc
    const disabledReset = resetDisabled //условие дизейбла кнопки reset
    const disabledSet = conditionsOfSetDisable //условие дизейбла кнопки set

    return (
        <div>
            <div className={s.settingsInfoAndButtonBlock}>
                <div className={s.counterSettings}>
                    <div className={s.inputBlock}>
                        <div className={s.valueInfo}>
                            max value
                            <span>
                        <Input
                               value={maxValue}
                               onChange={onChangeMaxValueHandler}
                               style={inputErrorStyle}
                        />
                        </span>
                        </div>
                        <div className={s.valueInfo}>
                            start value
                            <span>
                         <Input
                             value={startValue}
                             onChange={onChangeStartValueHandler}
                             style={inputErrorStyle}
                         />
                            </span>
                        </div>
                    </div>

                </div>
                <div className={s.buttonBlock}>
                    <Button
                        title={'set'}
                        callback={onSet}
                        disabled={disabledSet}
                    />
                </div>
            </div>
            <div className="counter">
                <ErrorMessage inc={inc}
                       maxValue={maxValue}
                       counterMessage={counterMessage}
                       startValue={startValue}
                />
                <div className={'buttonsStyle'}>
                    <Button title={'inc'}
                            callback={addInc}
                            disabled={disabledInc}
                    />
                    <Button title={'reset'}
                            callback={onReset}
                            disabled={disabledReset}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
