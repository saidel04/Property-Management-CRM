import React from "react";
import RegistrationForm from "../components/RegistrationForm";
import "../styles/Login.css"; // reuse the same styles

const Register = () => {
    return (
        <div className="login-page">
            <div className="login-card">
                <RegistrationForm route="/api/user/register/" />
            </div>
        </div>
    );
};

export default Register;
