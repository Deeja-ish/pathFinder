import React, { useState, useContext }from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../context/AuthContex";



const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const { login } = useContext(AuthContext)
    const navigate  = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault()
        setError(null)

        try {
            const { data } = await axios.post(
                "http://localhost:5001/api/auth/login",
                { email, password }
            )

            login(data);
            navigate('/dashboard')
        } catch (error) {
            console.error(error)

            if(error.response && error.response.data.message){
                setError(error.response.data.message)
            }else{
                setError('Login failed. Please try again.')
            }
        }
        
    }
    return(
        <div>
            <h2>Login to your account</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={submitHandler}>
                <div>
                    <label>Email</label>
                    <input type="email" 
                    placeholder="johndoe@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" 
                    placeholder="........."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account <Link to="/register">Sign Up here</Link>
            </p>
        </div>
    );
};

export default LoginPage;