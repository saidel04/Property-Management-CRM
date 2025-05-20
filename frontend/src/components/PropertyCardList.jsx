import React from "react";
import "../styles/PropertyCardList.css";
import { FaHome, FaBuilding, FaStore } from "react-icons/fa";

const PropertyCardList = ({ properties }) => {
    const getIcon = (type) => {
        switch (type) {
            case "House":
                return <FaHome className="property-icon" />;
            case "Apartment":
                return <FaBuilding className="property-icon" />;
            case "Commercial":
                return <FaStore className="property-icon" />;
            default:
                return <FaHome className="property-icon" />;
        }
    };

    return (
        <div className="property-card-container">
            <h2>My Properties</h2>
            <div className="property-card-scroll">
                {properties.length === 0 ? (
                    <p>No properties found.</p>
                ) : (
                    properties.map((property) => (
                        <div className="property-card" key={property.id}>
                            {getIcon(property.property_type)}
                            <div className="property-info">
                                <strong>{property.name}</strong>
                                <p>{property.address}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PropertyCardList;
