import { ToolContext } from "../context/ToolContext";
import { useContext } from "react";

export const useToolsContext = () => {
    const context = useContext(ToolContext)

    if (!context) {
        throw Error('useToolsContext must be used inside a toolsContextProvider')
    }

    return context
}