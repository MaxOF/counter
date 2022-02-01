import {Dispatch} from "redux";


const initialState = {
    startValue: 0,
    maxValue: 10,
    inc: 0,
    counterMessage: null as counterMessageType,
}
// type InitialStateType = {
//     startValue: number
//     maxValue: number
//     inc: number
//     counterMessage: counterMessageType
// }
type InitialStateType = typeof initialState

export type counterMessageType = null | 'Press set to enter your value' | 'Incorrect value, try again'

type ActionsType =
    IncValueActionType |
    SetStartValueFromLocalStorageType |
    SetMaxValueFromLocalStorageType |
    setCounterMessageType

export const counterReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'INC-VALUE': {
            return {
                ...state, inc: action.payload.inc
            }
        }
        case 'SET-START-VALUE-FROM-LOCAL-STORAGE': {
            return {
                ...state, startValue: action.payload.startValue
            }
        }
        case 'SET-MAX-VALUE-FROM-LOCAL-STORAGE': {
            return {
                ...state, maxValue: action.payload.maxValue
            }
        }
        case 'SET-COUNTER-MESSAGE': {
            return {
                ...state, counterMessage: action.payload.counterMessage
            }
        }
        default:
            return state
    }
}
export type IncValueActionType = ReturnType<typeof incCounterValueAC>
export const incCounterValueAC = (inc: number) => {
    return {
        type: 'INC-VALUE',
        payload: {
            inc
        }
    } as const
}

export type SetStartValueFromLocalStorageType = ReturnType<typeof setStartValueFromLocalStorageAC>
export const setStartValueFromLocalStorageAC = (startValue: number) => {
    return {
        type: 'SET-START-VALUE-FROM-LOCAL-STORAGE',
        payload: {
            startValue
        }
    } as const
}
export type SetMaxValueFromLocalStorageType = ReturnType<typeof setMaxValueFromLocalStorageAC>
export const setMaxValueFromLocalStorageAC = (maxValue: number) => {
    return {
        type: 'SET-MAX-VALUE-FROM-LOCAL-STORAGE',
        payload: {
            maxValue
        }
    } as const
}
export type setCounterMessageType = ReturnType<typeof setCounterMessageAC>
export const setCounterMessageAC = (counterMessage: counterMessageType) => {
    return {
        type: 'SET-COUNTER-MESSAGE',
        payload: {
            counterMessage
        }
    } as const
}


// export const incValuesTC = (value: number) => (dispatch: Dispatch) => {
//     localStorage.setItem('startValue', JSON.stringify(value))
//     dispatch(incCounterValueAC(value))
// }
export const setStartValueFromLocalStorageTC = () => (dispatch: Dispatch) => {
    let startValueAsString = localStorage.getItem('startValue')
    if (startValueAsString) {
        console.log(startValueAsString)
        let newStartValueAsString = JSON.parse(startValueAsString)
        dispatch(setStartValueFromLocalStorageAC(newStartValueAsString))
        dispatch(incCounterValueAC(newStartValueAsString))
    }
}
export const setMaxValueFromLocalStorageTC = () => (dispatch: Dispatch) => {
    let maxValueAsString = localStorage.getItem('maxValue')
    if (maxValueAsString) {
        console.log(maxValueAsString)
        let newMaxValueAsString = JSON.parse(maxValueAsString)
        dispatch(setMaxValueFromLocalStorageAC(newMaxValueAsString))
    }
}