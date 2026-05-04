import React, { useState } from 'react';
import families from '../data/plants.json';
import PlantCard from './PlantCard';
import Sidebar from './Sidebar';
import './PlantList.css';

const PlantList = () => {
  const [selectedFamily, setSelectedFamily] = useState('Všetko');

  const allPlants = families.flatMap(family => family.plants);
  
  const filteredPlants = selectedFamily === 'Všetko' 
    ? allPlants 
    : families.find(f => f.name === selectedFamily)?.plants || [];

  return (
    <div className="plant-list-layout">
      <Sidebar 
        families={families} 
        selectedFamily={selectedFamily} 
        onSelectFamily={setSelectedFamily} 
      />
      
      <section className="plant-list-section">
        <div className="list-header">
          <div className="header-text">
            <h1 className="headline-lg text-primary">Moja Zbierka</h1>
            <p className="body-lg text-on-surface-variant">
              Dokumentácia botanických objavov a osobný denník rastlín.
            </p>
          </div>
        </div>

        <div className="plant-grid">
          {filteredPlants.map(plant => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PlantList;
