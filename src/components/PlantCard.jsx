import React from 'react';
import { Link } from 'react-router-dom';
import './PlantCard.css';

const PlantCard = ({ plant }) => {
  return (
    <Link to={`/rastlina/${plant.id}`} className="plant-card pressing-effect">
      <div className="plant-card-image">
        <span className="material-symbols-outlined plant-placeholder-icon">eco</span>
        {plant.flags && plant.flags.length > 0 && (
          <div className="plant-badges">
            {plant.flags.map((flag, index) => (
              <span key={index} className="plant-badge">{flag}</span>
            ))}
          </div>
        )}
      </div>
      <div className="plant-card-info">
        <div className="plant-card-header">
          <h3 className="plant-name">{plant.name}</h3>
          <span className="plant-family">{plant.systematics.Čeľaď}</span>
        </div>
        <div className="plant-meta">
          <span className="material-symbols-outlined icon-sm">calendar_today</span>
          <span className="plant-date">Zdroj: Herbár krytosemenných rastlín</span>
        </div>
      </div>
    </Link>
  );
};

export default PlantCard;
