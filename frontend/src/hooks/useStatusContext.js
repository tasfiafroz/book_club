import { StatusContext } from "../context/StatContext";
import { useContext } from "react";

export const useStatusContext = () => {
    const context = useContext(StatusContext)

    if (!context) {
        throw Error('useStatsContext must be used inside a statsContextProvider')
    }

    return context
}