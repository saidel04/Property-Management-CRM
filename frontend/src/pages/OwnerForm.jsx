import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/OwnerForm.css";
import Sidebar from "../components/Sidebar";

const OwnerForm = () => {
  const navigate = useNavigate();
  // OWNER VARIABLES
  const [name, setName] = useState("");
  const [contact_email, set_contact_email] = useState("");
  const [contact_phone, set_contact_phone] = useState("");

  const createOwners = (e) => {
    e.preventDefault();
    api
      .post("/api/owners/", {
        name,
        contact_email,
        contact_phone,
      })
      .then((res) => {
        if (res.status === 201) {
          alert("Success!");
          navigate("/");
        } else alert("Failed");
      })
      .catch((err) => {
        console.error("Error details:", err.response?.data || err);
        alert("Error: " + (err.response?.status || ""));
      });
  };

  return (
    <div className="owner-form">
      <Sidebar />
      <form onSubmit={createOwners} className="owner-form">
        <input
          type="text"
          placeholder="Owner name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Contact e-mail"
          value={contact_email}
          onChange={(e) => set_contact_email(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Contact phone"
          value={contact_phone}
          onChange={(e) => set_contact_phone(e.target.value)}
        />

        <input type="submit" value="Submit" className="home-button" />
      </form>
    </div>
  );
};

export default OwnerForm;
