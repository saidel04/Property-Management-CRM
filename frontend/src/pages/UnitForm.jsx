import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/PropertyForm.css";
import Sidebar from "../components/Sidebar";

const UnitForm = () => {
  const navigate = useNavigate();

  // UNIT VARIABLES
  const [unitNumber, setUnitNumber] = useState("");
  const [rentAmount, setRentAmount] = useState("");
  const [isOccupied, setIsOccupied] = useState(false);

  // FOREIGN KEY TO PROPERTIES
  const [propertyId, setPropertyId] = useState("");
  const [properties, setProperties] = useState([]);
  const [maxUnits, setMaxUnits] = useState("");

  useEffect(() => {
    api
      .get("/api/properties/")
      .then((res) => setProperties(res.data))
      .catch((err) => alert(err));
  });

  const createUnits = (e) => {
    e.preventDefault();
    api
      .post("/api/units/", {
        unit_number: unitNumber,
        rent_amount: rentAmount,
        is_occupied: isOccupied,
        property_id: propertyId,
      })
      .then((res) => {
        if (res.status === 201) {
          navigate("/");
        } else alert("Failed");
      })
      .catch((err) => {
        console.error("Error details: ", err.response?.data || err);
        alert("Error: " + err.response?.status || "");
      });
  };

  return (
    <div>
      <Sidebar />

      <form onSubmit={createUnits} className="unitsForm">
        <select
          value={propertyId}
          onChange={(e) => setPropertyId(e.target.value)}
        >
          <option value="" disabled>
            Select a property
          </option>
          {properties.map((p) => (
            <option key={p.id} value={p.id}>
              {p.address}
            </option>
          ))}
        </select>
        <input type="submit" value="Submit" className="home-button" />
      </form>
    </div>
  );
};

export default UnitForm;
