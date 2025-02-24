import {useState} from 'react'
import { useToolsContext } from '../hooks/useToolsContext'

const ToolForm = () => {
    const { dispatch } = useToolsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const tool = {title, load, reps}

        const response = await fetch('/api/tools', {
            method: 'POST',
            body: JSON.stringify(tool),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            console.log('form submitted', json)
            dispatch({type: 'CREATE_TOOLS', payload: json})
        }
    }

    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>

            <label>Title:</label>
            <input
                type='text'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <h3>Add a new workout</h3>

            <label>Load:</label>
            <input
                type='number'
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />

            <h3>Add a new workout</h3>

            <label>Reps:</label>
            <input
                type='number'
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />

            <button>Submit</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default ToolForm