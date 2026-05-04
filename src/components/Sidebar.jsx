import React from 'react';
import './Sidebar.css';

const Sidebar = ({ families, selectedFamily, onSelectFamily }) => {
  const familyNames = ['Všetko', ...families.map(f => f.name)];

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3 className="label-md sidebar-title">Kategórie</h3>
        <nav className="sidebar-nav">
          {familyNames.map(name => (
            <button
              key={name}
              className={`sidebar-link ${selectedFamily === name ? 'active' : ''}`}
              onClick={() => onSelectFamily(name)}
            >
              <span className="material-symbols-outlined icon-sm">
                {name === 'Všetko' ? 'grid_view' : 'eco'}
              </span>
              {name.split(' (')[0]}
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar-section botanical-info">
        <div className="info-card">
          <span className="material-symbols-outlined info-icon">menu_book</span>
          <p className="body-sm">
            Tento herbár obsahuje 8 základných čeľadí krytosemenných rastlín.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
