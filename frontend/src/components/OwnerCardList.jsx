import React from "react";
import "../styles/OwnerCardList.css";

const OwnerCardList = ({ owners }) => {
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
                <strong>ID: {owner.id} </strong>
                <strong>{owner.name}</strong>
                <p>{owner.contact_email}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OwnerCardList;
