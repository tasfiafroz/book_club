import { useToolsContext } from "../hooks/useToolsContext"

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ToolDetails = ({tool}) => {
    const { dispatch } = useToolsContext()

    const handleClick = async () => {
        const response = await fetch('/api/tools/' + tool._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_TOOL', payload: json})
        }
    }
    return (
        <div className="tool-details"> 
            <h4>{tool.title}</h4>
            <p><strong>Load (kg): </strong>{tool.load}</p>
            <p><strong>Reps: </strong>{tool.reps}</p>
            <p>{formatDistanceToNow(new Date(tool.createdAt), { addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
        </div>
    )
}

export default ToolDetails