import {Dispatch} from "redux";
import {useEffect} from "react";

const initialState = {
    value: 0
}
type InitialStateType = typeof initialState


type ActionsType = IncValueActionType | SetValueFromLocalStorageType

export const counterReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'INC-VALUE': {
            return {
                ...state
            }
        }
        case 'SET-VALUE-FROM-LOCAL-STORAGE': {
            return {
                ...state, value: action.payload.value + 1
            }
        }
        default:
            return state
    }
}
export type IncValueActionType = ReturnType<typeof incCounterValueAC>
export const incCounterValueAC = () => {
    return {
        type: 'INC-VALUE',
    } as const
}

export type SetValueFromLocalStorageType = ReturnType<typeof setValueFromLocalStorageAC>
export const setValueFromLocalStorageAC = (value: number) => {
    return {
        type: 'SET-VALUE-FROM-LOCAL-STORAGE',
        payload: {
            value
        }
    } as const
}

//without using Thunk
// export const incValuesTC = (value: number) => (dispatch: Dispatch) => {
//     localStorage.setItem('startValue', JSON.stringify(value))
//     dispatch(incCounterValueAC())
// }
// export const setValueFromLocalStorageTC = () => (dispatch: Dispatch) => {
//
//         let startValueAsString = localStorage.getItem('startValue')
//         if (startValueAsString) {
//             let newStartValueAsString = JSON.parse(startValueAsString)
//             dispatch(setValueFromLocalStorageAC(newStartValueAsString))        }
// }