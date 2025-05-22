import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaHome,
  FaUsers,
  FaDollarSign,
  FaTools,
  FaSignOutAlt,
  FaBriefcase,
  FaKey,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import api from "../api";

const Sidebar = () => {
  const navigate = useNavigate();

  // Dummy user for display – replace with auth context or props as needed
  const username = localStorage.getItem("username") || "User";

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="header" onClick={() => navigate("/")}>
        <h1>Rent Roster</h1>
      </div>

      <h2 className="sidebar-title">Quick Actions</h2>

      <div className="sidebar-header">
        <p>
          Hello, <strong>{username}</strong>
        </p>
      </div>

      <div className="sidebar-item" onClick={() => navigate("/property-form/")}>
        <FaHome className="sidebar-icon" />
        <span>Add Property</span>
      </div>

      <div className="sidebar-item" onClick={() => navigate("/tenant-form/")}>
        <FaUsers className="sidebar-icon" />
        <span>Add Tenant</span>
      </div>

      <div className="sidebar-item" onClick={() => navigate("/unit-form/")}>
        <FaKey className="sidebar-icon" />
        <span>Add Units</span>
      </div>

      <div className="sidebar-item" onClick={() => navigate("/payments/new")}>
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

      <div className="sidebar-item" onClick={() => navigate("/owner-form")}>
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
