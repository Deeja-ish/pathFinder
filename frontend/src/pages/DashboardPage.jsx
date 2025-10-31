import React, {useContex} from "react";
import {useNavigate} from 'react-router-dom'
import { AuthContext } from "../context/AuthContex";

const DashboardPage = () =>{

    const {userInfo, logout} = useContex(AuthContext)
    const navigate = useNavigate();

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return(
        <div>
            <h2>Welcome, {userInfo ? userInfo.username : 'User'}</h2>
            <p>This is your private Dashboard</p>

            <button onClick={handleLogout}> 
                Logout
            </button>

            
        </div>
    )
};

export default DashboardPage