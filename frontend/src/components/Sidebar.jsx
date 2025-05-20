import React, { useEffect, useState } from "react";
import {
    FaPlus,
    FaHome,
    FaUsers,
    FaDollarSign,
    FaTools,
    FaSignOutAlt,
    FaBriefcase,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import api from "../api";

const Sidebar = () => {
    const navigate = useNavigate();

    // Dummy user for display – replace with auth context or props as needed
    const username = localStorage.getItem("username") || "User";

    const [properties, setProperties] = useState([]);

    useEffect(() => {
        getProperties();
    }, []);

    const getProperties = () => {
        api.get("/api/properties/")
            .then((res) => res.data)
            .then((data) => setProperties(data))
            .catch((err) => alert(err));
    };

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("username");
        navigate("/login");
    };

    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Quick Actions</h2>

            <div className="sidebar-header">
                <p>
                    Hello, <strong>{username}</strong>
                </p>
            </div>

            <div
                className="sidebar-item"
                onClick={() => navigate("/properties/")}
            >
                <FaHome className="sidebar-icon" />
                <span>Add Property</span>
            </div>

            <div
                className="sidebar-item"
                onClick={() => navigate("/tenants/new")}
            >
                <FaUsers className="sidebar-icon" />
                <span>Add Tenant</span>
            </div>

            <div
                className="sidebar-item"
                onClick={() => navigate("/payments/new")}
            >
                <FaDollarSign className="sidebar-icon" />
                <span>Add Payment</span>
            </div>

            <div
                className="sidebar-item"
                onClick={() => navigate("/maintenance/new")}
            >
                <FaTools className="sidebar-icon" />
                <span>New Request</span>
            </div>

            <div
                className="sidebar-item"
                onClick={() => navigate("/owner/new")}
            >
                <FaBriefcase className="sidebar-icon" />
                <span>Add Owner</span>
            </div>

            <div className="sidebar-spacer" />

            <div className="sidebar-item logout" onClick={handleLogout}>
                <FaSignOutAlt className="sidebar-icon" />
                <span>Logout</span>
            </div>
        </div>
    );
};

export default Sidebar;
