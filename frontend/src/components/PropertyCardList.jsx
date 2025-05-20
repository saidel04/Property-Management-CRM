import React from "react";
import "../styles/OwnerCardList.css";
import api from "../api";

const PropertyCardList = ({ properties, setProperties }) => {
  /* delete handler */
  const deleteProperty = (id) => {
    api
      .delete(`/api/properties/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          setProperties((prev) => prev.filter((p) => p.id !== id));
        } else {
          alert("Failed to delete");
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="owner-card-container">
      <h2>Properties</h2>

      <div className="owner-card-scroll">
        {properties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          /* ✅ use singular variable name */
          properties.map((property) => (
            <div className="owner-card" key={property.id}>
              <div className="owner-info">
                <strong>ID: {property.id}</strong>
                <strong>{property.address}</strong>

                {/* nested owner object → use ?. in case owner is null */}
                <p>
                  Owner:&nbsp;
                  {property.owner ? property.owner.name : "—"}
                </p>

                <button onClick={() => deleteProperty(property.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PropertyCardList;
