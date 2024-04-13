
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [adminId, setAdminId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://stock-sever-1.onrender.com/api/adminSignup', { email, password, adminId });
            console.log('Response:', response.data);
            setSuccessMessage('User signed up successfully');
            // --naviagte to login component
            setErrorMessage(''); 
            setTimeout(() => {
                setSuccessMessage('');
                setErrorMessage('');
                resetForm();
            }, 5000);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage(error.response.data.error);
            } else {
                console.error('Error signing up:', error);
            }
        }
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setAdminId('');
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <form className="my-5 bg-light shadow p-5 rounded-3 vw-75" onSubmit={handleSubmit}>
                <p className="text-center text-dark fs-3">Admin Sign Up</p>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label text-dark">Email</label>
                    <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label text-dark">Password</label>
                    <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="adminId" className="form-label text-dark">Admin ID (4 digits)</label>
                    <input type="text" id="adminId" className="form-control" value={adminId} onChange={(e) => setAdminId(e.target.value)} required />
                </div>

                <button type="submit" className="btn btn-primary">Sign Up</button>

                {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
                {successMessage && <p className="text-success bg-light fs-4 mt-3">{successMessage}</p>}

                <p className='text-dark mt-3'>Already have an account? <Link to="/login" className='text-primary'>Login</Link></p>
                <p className='text-dark mt-3'>Company Page For delivery* <Link to="/Company" className='text-primary'>Company</Link></p>
            </form>
        </div>
    );
}

export default SignUpForm;
