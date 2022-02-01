import React, {ChangeEvent, useEffect, useState} from 'react';

import './App.css';
import s from './components/Counter/Counter.module.css'
import {Input} from "./components/Counter/Input";
import Button from "./components/Button/Button";
import {ErrorMessage} from "./components/ErrorMessage/ErrorMessage";

import {AppStateType} from "./bll/store";
import {
    counterMessageType,
    incCounterValueAC,
    setCounterMessageAC,
    setMaxValueFromLocalStorageAC,
    setMaxValueFromLocalStorageTC, setStartValueFromLocalStorageAC,
    setStartValueFromLocalStorageTC,
} from "./bll/counter-reducer";
import {useDispatch, useSelector} from "react-redux";

// import {incValuesTC, setValueFromLocalStorageAC, setValueFromLocalStorageTC} from "./bll/counter-reducer";


function App() {

    const startValue = useSelector<AppStateType, number>(state => state.counter.startValue)
    const maxValue = useSelector<AppStateType, number>(state => state.counter.maxValue)
    const counterMessage = useSelector<AppStateType, counterMessageType>(state => state.counter.counterMessage)
    let inc = useSelector<AppStateType, number>(state => state.counter.inc)

    const dispatch = useDispatch()

    const [onDisabled, setOnDisabled] = useState(false)
    const [resetDisabled, setResetDisabled] = useState(false)
    const [incDisabled, setIncDisabled] = useState(false)

    useEffect(() => {
        dispatch(setStartValueFromLocalStorageTC())
    }, [])
    useEffect(() => {
        dispatch(setMaxValueFromLocalStorageTC())
    }, [])


    const onSet = () => {
        dispatch(setCounterMessageAC(null))
        dispatch(incCounterValueAC(startValue))
        setOnDisabled(true)
        setIncDisabled(false)
        setResetDisabled(false)
        localStorage.setItem('startValue', JSON.stringify(startValue))
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
    }
    const addInc = () => {
        if (inc < maxValue) {
            dispatch(incCounterValueAC(++inc))
        }
    }
    const onReset = () => {
        dispatch(incCounterValueAC(startValue))
    }
    const onChangeStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setOnDisabled(false)
        setIncDisabled(true)
        setResetDisabled(true)
        let currentValue = +e.currentTarget.value
        dispatch(setStartValueFromLocalStorageAC(currentValue))
        if (currentValue >= maxValue || currentValue < 0) {
            dispatch(setCounterMessageAC('Incorrect value, try again'))
        }
        if (currentValue < maxValue) {
            dispatch(setCounterMessageAC('Press set to enter your value'))
        }
    }
    const onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setOnDisabled(false)
        setIncDisabled(true)
        setResetDisabled(true)
        let currentValue = +e.currentTarget.value
        dispatch(setMaxValueFromLocalStorageAC(currentValue))
        if (currentValue <= startValue || currentValue < 0) {
            dispatch(setCounterMessageAC('Incorrect value, try again'))
        }
        if (currentValue > startValue) {
            dispatch(setCounterMessageAC('Press set to enter your value'))
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
