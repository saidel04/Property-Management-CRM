import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/PropertyForm.css";
import Sidebar from "../components/Sidebar";

const PropertyForm = () => {
  const navigate = useNavigate();

  // PROPERTY VARIABLES
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [numUnits, setNumUnits] = useState("");
  const [ownerId, setOwnerId] = useState(null);

  const [owners, setOwners] = useState([]);

  useEffect(() => {
    api
      .get("/api/owners/")
      .then((res) => setOwners(res.data))
      .catch((err) => alert(err));
  }, []);

  const createProperties = (e) => {
    e.preventDefault();
    api
      .post("/api/properties/", {
        name,
        address,
        property_type: propertyType,
        num_units: Number(numUnits),
        owner: ownerId,
      })
      .then((res) => {
        if (res.status === 201) {
          navigate("/");
        } else alert("Failed");
      })
      .catch((err) => {
        console.error("Error deailts: ", err.response?.data || err);
        alert("Error: " + err.response?.status || "");
      });
  };
  return (
    <div>
      <Sidebar />
      <form onSubmit={createProperties} className="propertiesForm">
        <input
          type="text"
          placeholder="Property name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Property address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <select
          value={propertyType || ""}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Commercial">Commercial</option>
        </select>

        <input
          type="number"
          placeholder="Number of units"
          value={numUnits}
          onChange={(e) => setNumUnits(e.target.value)}
        />

        {/* owner dropdown */}
        <select
          value={ownerId || ""}
          onChange={(e) => setOwnerId(e.target.value)}
        >
          {owners.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>

        <input type="submit" value="Submit" className="home-button" />
      </form>
    </div>
  );
};

export default PropertyForm;
