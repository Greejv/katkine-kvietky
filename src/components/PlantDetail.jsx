import React from 'react';
import { useParams, Link } from 'react-router-dom';
import families from '../data/plants.json';
import './PlantDetail.css';

const PlantDetail = () => {
  const { id } = useParams();
  
  const allPlants = families.flatMap(family => family.plants);
  const plant = allPlants.find(p => p.id === id);

  if (!plant) {
    return (
      <div className="container not-found">
        <h2 className="headline-md">Rastlina sa nenašla</h2>
        <Link to="/" className="btn btn-primary mt-4">Späť na zbierku</Link>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: plant.name,
        text: `Pozri si túto rastlinu: ${plant.name}`,
        url: window.location.href,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Odkaz bol skopírovaný do schránky'))
        .catch((err) => console.error('Could not copy text: ', err));
    }
  };

  return (
    <div className="plant-detail-page">
      <div className="container">
        <Link to="/" className="back-link">
          <span className="material-symbols-outlined">arrow_back</span>
          Späť na zbierku
        </Link>

        <div className="detail-hero">
          <div className="detail-image-container">
            {plant.image ? (
              <img src={plant.image} alt={plant.name} className="detail-image" />
            ) : (
              <div className="detail-placeholder">
                <span className="material-symbols-outlined">eco</span>
              </div>
            )}
            {plant.flags && plant.flags.length > 0 && (
              <div className="detail-badges">
                {plant.flags.map((flag, idx) => (
                  <span key={idx} className="detail-badge">{flag}</span>
                ))}
              </div>
            )}
          </div>

          <div className="detail-header-info">
            <div className="family-tag">{plant.systematics.Čeľaď}</div>
            <h1 className="headline-lg text-primary">{plant.name}</h1>
            <p className="scientific-name">{plant.systematics.Druh || plant.name}</p>
            
            <div className="action-buttons">
              <a 
                href={`https://www.google.com/search?q=${encodeURIComponent(plant.name)}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary pressing-effect"
              >
                <span className="material-symbols-outlined">search</span>
                Hľadať na Google
              </a>
              <button className="btn btn-outline pressing-effect" onClick={handleShare}>
                <span className="material-symbols-outlined">share</span>
                Zdieľať
              </button>
            </div>
          </div>
        </div>

        <div className="detail-grid">
          {plant.morphology.length > 0 && (
            <div className="detail-card">
              <div className="card-icon"><span className="material-symbols-outlined">info</span></div>
              <h3 className="headline-sm text-primary">Morfológia</h3>
              <ul className="detail-list">
                {plant.morphology.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          )}

          {plant.occurrence.length > 0 && (
            <div className="detail-card">
              <div className="card-icon"><span className="material-symbols-outlined">location_on</span></div>
              <h3 className="headline-sm text-primary">Výskyt</h3>
              <ul className="detail-list">
                {plant.occurrence.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          )}

          {plant.usage.length > 0 && (
            <div className="detail-card">
              <div className="card-icon"><span className="material-symbols-outlined">medical_services</span></div>
              <h3 className="headline-sm text-primary">Využitie</h3>
              <ul className="detail-list">
                {plant.usage.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          )}
          
          {plant.interestingFacts.length > 0 && (
            <div className="detail-card full-width">
              <div className="card-icon"><span className="material-symbols-outlined">tips_and_updates</span></div>
              <h3 className="headline-sm text-primary">Zaujímavosti</h3>
              <ul className="detail-list">
                {plant.interestingFacts.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;
