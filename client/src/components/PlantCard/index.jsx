import React from "react";
import { Link } from "react-router-dom";

const PlantCard = ({ id, name, family, image, onAddPlant }) => {
    return (
      <div className="card">
        <Link to={`/plants/${id}`}>
          <div className="card-content">
          <h3 className="plant-name">{name}</h3>
          <p className="family">{family}</p>
            {image && <img src={image} alt={name} className="plant-image" />}
          </div>
        </Link>
        <button onClick={() => onAddPlant({ id, name })}>Add Plant</button>
      </div>
    );
  };
  
  export default PlantCard;
  

