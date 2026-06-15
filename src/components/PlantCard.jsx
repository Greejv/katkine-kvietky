import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import './PlantCard.css';

// Splits "Slovak name (Scientific name)" into its two parts for nicer typography.
const splitName = (name) => {
  const match = name.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  if (match) return { common: match[1].trim(), latin: match[2].trim() };
  return { common: name, latin: '' };
};

const flagTone = (flag) => {
  if (flag.includes('JEDOVAT')) return 'danger';
  if (flag.includes('LIEČIV')) return 'heal';
  if (flag.includes('CHRÁNEN')) return 'protect';
  if (flag.includes('POTRAVIN')) return 'food';
  return 'neutral';
};

const PlantCard = ({ plant, index = 0 }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const cardRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const { common, latin } = splitName(plant.name);
  const fav = isFavorite(plant.id);

  // Subtle 3D tilt that follows the pointer.
  const handleMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--rx', `${py * -6}deg`);
    el.style.setProperty('--ry', `${px * 8}deg`);
    el.style.setProperty('--mx', `${(px + 0.5) * 100}%`);
    el.style.setProperty('--my', `${(py + 0.5) * 100}%`);
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  const onFavClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(plant.id);
  };

  return (
    <Link
      to={`/rastlina/${plant.id}`}
      className="plant-card"
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ animationDelay: `${Math.min(index, 12) * 60}ms` }}
    >
      <div className="plant-card-inner">
        <div className="plant-card-image">
          {!loaded && <div className="img-skeleton" />}
          {plant.image ? (
            <img
              src={plant.image}
              alt={common}
              loading="lazy"
              className={`plant-image ${loaded ? 'loaded' : ''}`}
              onLoad={() => setLoaded(true)}
            />
          ) : (
            <span className="material-symbols-outlined plant-placeholder-icon">eco</span>
          )}

          <div className="card-gloss" />

          {plant.flags && plant.flags.length > 0 && (
            <div className="plant-badges">
              {plant.flags.map((flag, i) => (
                <span key={i} className={`plant-badge tone-${flagTone(flag)}`}>{flag}</span>
              ))}
            </div>
          )}

          <button
            className={`fav-btn ${fav ? 'active' : ''}`}
            onClick={onFavClick}
            aria-label={fav ? 'Odobrať z obľúbených' : 'Pridať do obľúbených'}
            title={fav ? 'Odobrať z obľúbených' : 'Pridať do obľúbených'}
          >
            <span className="material-symbols-outlined">{fav ? 'favorite' : 'favorite_border'}</span>
          </button>
        </div>

        <div className="plant-card-info">
          <div className="plant-card-header">
            <h3 className="plant-name">{common}</h3>
            {latin && <span className="plant-latin">{latin}</span>}
          </div>
          <div className="plant-meta">
            <span className="plant-family">
              <span className="material-symbols-outlined icon-sm">spa</span>
              {plant.systematics.Čeľaď}
            </span>
            <span className="plant-arrow material-symbols-outlined">arrow_forward</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlantCard;
