import './Sidebar.css';

const Sidebar = ({
  families,
  selectedFamily,
  onSelectFamily,
  favCount = 0,
  favOnly = false,
  onToggleFav,
}) => {
  const totalCount = families.reduce((sum, f) => sum + f.plants.length, 0);

  return (
    <aside className="sidebar">
      <div className="sidebar-card liquid-glass">
        <h3 className="label-md sidebar-title">Čeľade</h3>
        <nav className="sidebar-nav">
          <button
            className={`sidebar-link ${selectedFamily === 'Všetko' ? 'active' : ''}`}
            onClick={() => onSelectFamily('Všetko')}
          >
            <span className="material-symbols-outlined icon-sm">grid_view</span>
            <span className="sidebar-link-label">Všetko</span>
            <span className="sidebar-count">{totalCount}</span>
          </button>

          {families.map((family) => (
            <button
              key={family.name}
              className={`sidebar-link ${selectedFamily === family.name ? 'active' : ''}`}
              onClick={() => onSelectFamily(family.name)}
            >
              <span className="material-symbols-outlined icon-sm">eco</span>
              <span className="sidebar-link-label">{family.name.split(' (')[0]}</span>
              <span className="sidebar-count">{family.plants.length}</span>
            </button>
          ))}
        </nav>
      </div>

      <button
        className={`fav-filter liquid-glass ${favOnly ? 'active' : ''}`}
        onClick={onToggleFav}
      >
        <span className="material-symbols-outlined">{favOnly ? 'favorite' : 'favorite_border'}</span>
        <span>Obľúbené</span>
        <span className="sidebar-count">{favCount}</span>
      </button>

      <div className="sidebar-card botanical-info liquid-glass">
        <span className="material-symbols-outlined info-icon">menu_book</span>
        <p className="body-sm">
          Tento herbár obsahuje {families.length} základných čeľadí krytosemenných rastlín.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
