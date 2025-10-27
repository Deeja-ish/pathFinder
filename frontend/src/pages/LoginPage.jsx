import React from "react";

const LoginPage = () => {
    return(
        <div>
            <h2>Login to your account</h2>
            <form>
                <div>
                    <label>Email</label>
                    <input type="email" placeholder="johndoe@example.com" />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" placeholder="........." />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;