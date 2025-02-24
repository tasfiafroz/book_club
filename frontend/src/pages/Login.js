// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom' // Import useNavigate
// import { useLogin } from '../hooks/useLogin'
// import { Link } from 'react-router-dom' // Import Link for routing
// import '../styles/form.css'

// const Login = () => {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const { login, error, isLoading } = useLogin()
//     const navigate = useNavigate() // Initialize useNavigate

//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         const success = await login(email, password)
        
//         if (success) {
//             //added for handling authorization token
//             localStorage.setItem('token', success.token)

//             navigate(`/Home`);
//         }
//     }

//     return (
//         <div className='log'>
//         {/* <h1>Welcome to Rooftop Gardening Community</h1> */}
//         <div className='container'>
//         <form className='login' onSubmit={handleSubmit}>
//             <h1>Login</h1>

//             <label>Email:</label>
//             <input 
//                 type='email'
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//             />            
//             <label>Password:</label>
//             <input 
//                 type='password'
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//             />

//             <button disabled={isLoading}>Login</button>
//             {error && <div className='error'>{error}</div>}

//             {/* Signup link */}
//             <div className="signup-link">
//                 <p>Don't have an account? <Link to="/signup">Signup</Link></p>
//             </div>
//         </form>
//         </div>
//         </div>
//     )
// }

// export default Login

import { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate
import { useLogin } from '../hooks/useLogin'
import { Link } from 'react-router-dom' // Import Link for routing
import '../styles/form.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()
    const navigate = useNavigate() // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const token = await login(email, password); // ✅ Use the returned token
    
        if (token) {
            console.log("Token stored:", localStorage.getItem("token")); // ✅ Debugging
            navigate(`/Home`);
        } else {
            console.error("Login failed: No token received.");
        }
    };
    
    

    return (
        <div >
            <h1 className='top'>ROOFTOP GARDENING COMMUNITY</h1>
        <div className='log'>
        <div className='container'>
        <form className='login' onSubmit={handleSubmit}>
            <h1>Login</h1>

            <label>Email:</label>
            <input 
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />            
            <label>Password:</label>
            <input 
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading}>Login</button>
            {error && <div className='error'>{error}</div>}

            {/* Signup link */}
            <div className="signup-link">
                <p>Don't have an account? <Link to="/signup">Signup</Link></p>
            </div>
        </form>
        </div>
        </div>
        </div>
    )
}

export default Login

