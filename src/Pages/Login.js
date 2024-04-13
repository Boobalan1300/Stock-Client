



import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginForm({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('admin');
    const [error, setError] = useState(null); 
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const checkLoggedInUser = async () => {
            const token = localStorage.getItem('token');
            const savedEmail = localStorage.getItem('email');
            const savedRole = localStorage.getItem('role');
            const isLoggedIn = localStorage.getItem('isLoggedIn');

            if (token && savedEmail && savedRole && isLoggedIn === 'true') {
                setIsLoggedIn(true);
                setEmail(savedEmail);
                setSelectedRole(savedRole);
                navigate(savedRole === 'admin' ? '/admin-dashboard' : '/supervisor-dashboard'); // Directly navigate to the respective dashboard
            }
        };

        checkLoggedInUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`https://stock-sever-1.onrender.com/api/login/${selectedRole}`, { email, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('role', selectedRole);
            localStorage.setItem('email', email);
            localStorage.setItem('isLoggedIn', 'true'); 
            setError(null); 
            setIsLoggedIn(true);
            onLogin(email); 
            navigate(selectedRole === 'admin' ? '/admin-dashboard' : '/supervisor-dashboard');
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Invalid email or password');
        }
    };

    if (isLoggedIn) {
        return null; 
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <form className="my-5 bg-light shadow p-5 rounded-3 vw-75" onSubmit={handleSubmit}>
                <h3 className="text-center text-dark mb-4">Login</h3>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label text-dark">Email</label>
                    <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label text-dark">Password</label>
                    <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="role" className="form-label text-dark">Role</label>
                    <select id="role" className="form-control" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                        <option value="admin">Admin</option>
                        <option value="supervisor">Supervisor</option>
                    </select>
                </div>

                {error && <div className="alert alert-danger">{error}</div>} 
                
                <button type="submit" className="btn btn-primary">Login</button>

                <p className="mt-3 text-dark">If you don't have an account? <Link to="/signup" className="text-primary">SignUp</Link></p>
            </form>
        </div>
    );
}

export default LoginForm;
