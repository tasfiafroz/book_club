import {useState} from 'react'
import { useStatusContext } from '../hooks/useStatusContext'
import '../styles/style.css';

const StatForm = () => {
    const { dispatch } = useStatusContext()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const status = {name, description}

        const response = await fetch('/api/status', {
            method: 'POST',
            body: JSON.stringify(status),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setName('')
            setDescription('')
            setError(null)
            console.log('form submitted', json)
            dispatch({type: 'CREATE_STATUS', payload: json})
        }
    }

    return (
        <div className='status-form'>
        <form className='create' onSubmit={handleSubmit}>
            <h3>Share Your Thought</h3>

            <label>Name:</label>
            <input
                type='text'
                onChange={(e) => setName(e.target.value)}
                value={name}
            />


            <label>Status:</label>
            <input
                type='text'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            />


            <button>Submit</button>
            {error && <div className='error'>{error}</div>}
        </form>
        </div>
    )
}

export default StatForm