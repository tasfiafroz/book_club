import { createContext, useReducer } from "react"

export const ToolContext = createContext()

export const toolsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_TOOLS':
            return {
                tools: action.payload
            }
        case 'CREATE_TOOLS':
            return {
                tools: [action.payload, ...state.tools]
            }
        case 'DELETE_TOOL':
            return {
                tools: state.tools.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const ToolContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(toolsReducer, {
        tools: null
    })

    return (
        <ToolContext.Provider value={{...state, dispatch}}>
            { children }
        </ToolContext.Provider>
    )
}