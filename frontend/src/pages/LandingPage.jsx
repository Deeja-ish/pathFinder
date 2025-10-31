import React, {useContext} from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContex";

const LandingPage = () =>{

    const { userInfo } = useContext(AuthContext);

    return(
        <div>
            <h1>PathFinder AI</h1>
            <p>Transfroming complex topics into simple, visual learning paths.</p>
            <div>
                {userInfo ? (
                    // user logged in
                    <Link to='/dashboard'>
                        Go To Dashboard
                    </Link>
                ) : (
                    // User not logged in
                    <>
                    <Link to='/login'>
                      <button>Login</button>
                    </Link>
                    <Link to='/register'>
                       <button>Sign Up</button>
                    </Link>
                    </>
                )};
            </div>
        </div>
    )
}

export default LandingPage