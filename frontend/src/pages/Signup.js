import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import { Link } from 'react-router-dom'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [age, setAge] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, name, username, age, address, password)
    }

    return (
        <div>
            <h1 className='top'>ROOFTOP GARDENING COMMUNITY</h1>
        <div className='container'>
        <form className='signup' onSubmit={handleSubmit}>
            <h1>Sign Up</h1>

            <label>Email:</label>
            <input 
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Name:</label>
            <input 
                type='name'
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <label>Username:</label>
            <input 
                type='username'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <label>Age:</label>
            <input 
                type='age'
                onChange={(e) => setAge(e.target.value)}
                value={age}
            />
            <label>Address:</label>
            <input 
                type='address'
                onChange={(e) => setAddress(e.target.value)}
                value={address}
            />
            <label>Password:</label>
            <input 
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading}>Sign Up</button>
            {error && <div className='error'>{error}</div>}

            <div className="signup-link">
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </form>
        </div>
        </div>
    )
}

export default Signup