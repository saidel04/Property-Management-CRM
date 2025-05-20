import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import Sidebar from "../components/Sidebar";
import api from "../api";
import PropertyCardList from "../components/PropertyCardList";

const Home = () => {
    const navigate = useNavigate();

    // LIST VARIABLES USED TO DISPLAY ALL
    const [properties, setProperties] = useState([]);
    const [owners, setOwners] = useState([]);

    // OWNER VARIABLES
    const [name, setName] = useState("");
    const [contact_email, set_contact_email] = useState("");
    const [contact_phone, set_contact_phone] = useState("");

    // PROPERTY VARIABLES
    const [propertyName, setPropertyName] = useState("");
    const [address, setAddress] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [numUnits, setNumUnits] = useState("");

    useEffect(() => {
        getProperties();
    }, []);

    const getProperties = () => {
        api.get("/api/properties/")
            .then((res) => res.data)
            .then((data) => setProperties(data))
            .catch((err) => alert(err));
    };

    const deleteProperties = (id) => {
        api.delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Property Deleted.");
                else alert("Failed to delete note. ");
            })
            .catch((error) => alert(error));
        getProperties();
    };

    const createProperties = (e) => {
        e.preventDefault();
        api.post("/api/properties/", {
            name,
            address,
            property_type,
            num_units,
            owner,
        })
            .then((res) => {
                if (res.status === 201) alert("Property Created.");
                else alert("Failed to make Property.");
            })
            .catch((err) => alert(err));
        getProperties();
    };

    const createOwners = (e) => {
        e.preventDefault();
        api.post("/api/owners/", {
            name,
            contact_email,
            contact_phone,
        })
            .then((res) => {
                if (res.status === 201) alert("Success!");
                else alert("Failed");
                getOwners();
            })
            .catch((err) => {
                console.error("Error details:", err.response?.data || err);
                alert("Error: " + (err.response?.status || ""));
            });
    };

    const getOwners = () => {
        api.get("/api/owners/")
            .then((res) => res.data)
            .then((data) => setOwners(data))
            .catch((err) => alert(err));
    };

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/login");
    };

    return (
        <div className="home-container">
            <Sidebar />
            {/* Property list over on the side (unchanged) */}

            <PropertyCardList properties={owners} />
            {/* === New card wrapper around the form === */}
            <div className="home-card">
                <h2>Create Owner</h2>

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

                    {/* Use the existing .home-button styling */}
                    <input
                        type="submit"
                        value="Submit"
                        className="home-button"
                    />
                </form>
            </div>
        </div>
    );
};

export default Home;
