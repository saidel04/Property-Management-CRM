import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import Sidebar from "../components/Sidebar";
import api from "../api";
import OwnerCardList from "../components/OwnerCardList";

const Home = () => {
  const navigate = useNavigate();

  // LIST VARIABLES USED TO DISPLAY ALL
  const [properties, setProperties] = useState([]);
  const [owners, setOwners] = useState([]);

  // PROPERTY VARIABLES
  const [propertyName, setPropertyName] = useState("");
  const [address, setAddress] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [numUnits, setNumUnits] = useState("");

  useEffect(() => {
    getProperties();
    getOwners();
  }, []);

  // FUNCTION POPULATES PROPERTY LIST

  const getProperties = () => {
    api
      .get("/api/properties/")
      .then((res) => res.data)
      .then((data) => setProperties(data))
      .catch((err) => alert(err));
  };

  // DELETE PROPERTIES

  const deleteProperties = (id) => {
    api
      .delete(`/api/properties/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Property Deleted.");
        else alert("Failed to delete. ");
      })
      .catch((error) => alert(error));
    getProperties();
  };

  // FUNCTION TO CREATE PROPERTIES

  const createProperties = (e) => {
    e.preventDefault();
    api
      .post("/api/properties/", {
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

  // FUNCTION TO CREATE AN OWNER

  // FUNCTION TO POPULATE OWNERS LIST

  const getOwners = () => {
    api
      .get("/api/owners/")
      .then((res) => res.data)
      .then((data) => setOwners(data))
      .catch((err) => alert(err));
  };

  return (
    <div className="home-container">
      <Sidebar />
      <OwnerCardList owners={owners} setOwners={setOwners} />
    </div>
  );
};

export default Home;
