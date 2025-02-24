 import { createContext, useReducer } from "react"

 export const StatusContext = createContext()

 export const statusReducer = (state, action) => {
    switch(action.type) {
        case 'SET_STATUS':
            return {
                status: action.payload
            }
        case 'CREATE_STATUS':
            return {
                status: [action.payload, ...state.status]
            }
        case 'DELETE_STATUS':
            return {
                status: state.status.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

 export const StatusContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(statusReducer, {
        status: null
     })

    return (
        <StatusContext.Provider value={{...state, dispatch}}>
            { children }
        </StatusContext.Provider>
     )
 }