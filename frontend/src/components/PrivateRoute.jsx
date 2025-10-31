import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContex';

const PrivateRoutes = ({children}) =>{
    const { userInfo } = useContext(AuthContext);

    // If user info exists in context, they are logged in
    if(userInfo){
        return children
    }

    // If not logged in, redirect them to the /login page
    return <Navigate to='/login' replace />


}

export default PrivateRoutes
