import {applyMiddleware, combineReducers, createStore} from "redux";
import {counterReducer} from "./counter-reducer";
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
counter: counterReducer
})
export type AppStateType = ReturnType<typeof rootReducer>
type AppStoreType = typeof store

// let preloadedState
// const persistedTodosString = localStorage.getItem('app-state')
// if(persistedTodosString) {
//     preloadedState = JSON.parse(persistedTodosString)
// }

export const store = createStore(rootReducer, applyMiddleware(thunk))

// store.subscribe(() => {
//     localStorage.setItem('app-state', JSON.stringify(store.getState()))
//     localStorage.setItem('value', JSON.stringify(store.getState().counter.value))
// })
