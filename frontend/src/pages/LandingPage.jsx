import React from "react";
import { Link } from react-router-dom;

const LandingPage = () =>{
    return(
        <div>
            <h1>PathFinder AI</h1>
            <p>Transfroming complex topics into simple, visual learning paths.</p>
            <div>
                <Link to='/login'>
                <button>Login</button>
                </Link>
                <Link to='/register'>
                <button>Sign Up</button>
                </Link>
            </div>
        </div>
    )
}

export default LandingPage