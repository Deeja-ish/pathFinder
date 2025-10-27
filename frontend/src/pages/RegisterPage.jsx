import React from "react";

const RegisterPage = () => {
    return(
        <div>
            <h2>Create your account</h2>
            <form>
                <div>
                    <label>Username</label>
                    <input type="name" placeholder="Your name" />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" placeholder="johndoe@example.com" />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" placeholder="........." />
                </div>
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
};

export default RegisterPage;