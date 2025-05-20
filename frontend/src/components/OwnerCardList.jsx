// OwnerCardList.jsx
import React from "react";
import "../styles/OwnerCardList.css";
import api from "../api";

const OwnerCardList = ({ owners, setOwners }) => {
  const deleteOwner = (id) => {
    api
      .delete(`/api/owners/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          setOwners((prev) => prev.filter((o) => o.id !== id));
        } else {
          alert("Failed to delete");
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="owner-card-container">
      <h2>Owners</h2>

      <div className="owner-card-scroll">
        {owners.length === 0 ? (
          <p>No Owners found.</p>
        ) : (
          owners.map((owner) => (
            <div className="owner-card" key={owner.id}>
              <div className="owner-info">
                <strong>ID: {owner.id}</strong>
                <strong>{owner.name}</strong>
                <p>{owner.contact_email}</p>

                <button
                  id="delete-button"
                  onClick={() => deleteOwner(owner.id)}
                >
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

export default OwnerCardList;
