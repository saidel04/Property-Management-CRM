import React from "react";
import LoginForm from "../components/LoginForm";
import "../styles/Login.css";

const Login = () => {
    return (
        <div className="login-page">
            <div className="login-card">
                <LoginForm route="/api/token/" />
            </div>
        </div>
    );
};

export default Login;
