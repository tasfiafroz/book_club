import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import '../styles/navigation.css';  

const Navigation = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
        navigate('/login');
    };

    const navigate = useNavigate()

    return (
        <div className="sidebar"> 
            <div className="sidebar-links">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/community">Community</Link></li>
                    <li><Link to="/Consultancy">Consultancy</Link></li>
                    <li><Link to="/Marketplace">Marketplace</Link></li>
                    <li><Link to="/Chat">Chat</Link></li>
                    <li><Link to="/Event">Event Calender</Link></li>
                    <li><Link to="/Profile">Profile</Link></li>
                </ul>
            </div>
            <div className="auth-links">
                {user ? (
                    <div>
                        <button onClick={handleClick}>Logout</button>
                    </div>
                ) : (
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navigation;
