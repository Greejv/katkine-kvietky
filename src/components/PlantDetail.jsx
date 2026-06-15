import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams, Link } from 'react-router-dom';
import families from '../data/plants.json';
import Reveal from './Reveal';
import { useFavorites } from '../context/FavoritesContext';
import './PlantDetail.css';

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

const SECTIONS = [
  { key: 'morphology', title: 'Morfológia', icon: 'biotech' },
  { key: 'occurrence', title: 'Výskyt', icon: 'public' },
  { key: 'usage', title: 'Využitie', icon: 'medical_services' },
  { key: 'interestingFacts', title: 'Zaujímavosti', icon: 'auto_awesome' },
];

const PlantDetailView = ({ id }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [lightbox, setLightbox] = useState(false);

  const allPlants = families.flatMap((f) => f.plants);
  const index = allPlants.findIndex((p) => p.id === id);
  const plant = allPlants[index];
  const family = families.find((f) => f.plants.some((p) => p.id === id));

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setLightbox(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // While the lightbox is open: lock scroll and flag <body> so the sticky
  // header / ambient layers hide — avoids stacked backdrop-filter artifacts.
  useEffect(() => {
    if (!lightbox) return;
    document.body.classList.add('lightbox-open');
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.classList.remove('lightbox-open');
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox]);

  if (!plant) {
    return (
      <div className="container not-found">
        <span className="material-symbols-outlined">search_off</span>
        <h2 className="headline-md">Rastlina sa nenašla</h2>
        <Link to="/" className="btn btn-primary mt-4">Späť na zbierku</Link>
      </div>
    );
  }

  const { common, latin } = splitName(plant.name);
  const fav = isFavorite(plant.id);
  const prev = allPlants[(index - 1 + allPlants.length) % allPlants.length];
  const next = allPlants[(index + 1) % allPlants.length];
  const related = (family?.plants || []).filter((p) => p.id !== id).slice(0, 4);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: plant.name,
        text: `Pozri si túto rastlinu: ${plant.name}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Odkaz bol skopírovaný do schránky'))
        .catch(() => {});
    }
  };

  return (
    <div className="plant-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Zbierka</Link>
          <span className="material-symbols-outlined">chevron_right</span>
          <span className="crumb-current">{common}</span>
        </nav>

        {/* HERO */}
        <div className="detail-hero">
          <div className="detail-image-wrap">
            <div
              className={`detail-image-container liquid-glass ${plant.image ? 'clickable' : ''}`}
              onClick={() => plant.image && setLightbox(true)}
            >
              {plant.image ? (
                <>
                  <img src={plant.image} alt={common} className="detail-image" />
                  <span className="zoom-hint material-symbols-outlined">zoom_in</span>
                </>
              ) : (
                <div className="detail-placeholder">
                  <span className="material-symbols-outlined">eco</span>
                </div>
              )}
            </div>
            {plant.flags && plant.flags.length > 0 && (
              <div className="detail-badges">
                {plant.flags.map((flag, idx) => (
                  <span key={idx} className={`detail-badge tone-${flagTone(flag)}`}>{flag}</span>
                ))}
              </div>
            )}
          </div>

          <div className="detail-header-info">
            <div className="family-tag">
              <span className="material-symbols-outlined">spa</span>
              {plant.systematics.Čeľaď}
            </div>
            <h1 className="detail-title">{common}</h1>
            {latin && <p className="scientific-name">{latin}</p>}

            {/* Taxonomy chips (derived from existing data) */}
            <div className="taxonomy">
              {Object.entries(plant.systematics).map(([k, v]) => (
                <div className="tax-row" key={k}>
                  <span className="tax-key">{k}</span>
                  <span className="tax-val">{v}</span>
                </div>
              ))}
            </div>

            <div className="action-buttons">
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(plant.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary pressing-effect"
              >
                <span className="material-symbols-outlined">search</span>
                Viac na Google
              </a>
              <button
                className={`btn btn-outline pressing-effect ${fav ? 'is-fav' : ''}`}
                onClick={() => toggleFavorite(plant.id)}
              >
                <span className="material-symbols-outlined">{fav ? 'favorite' : 'favorite_border'}</span>
                {fav ? 'Uložené' : 'Uložiť'}
              </button>
              <button className="btn btn-outline pressing-effect" onClick={handleShare}>
                <span className="material-symbols-outlined">share</span>
                Zdieľať
              </button>
            </div>
          </div>
        </div>

        {/* INFO CARDS */}
        <div className="detail-grid">
          {SECTIONS.map((section, i) => {
            const items = plant[section.key];
            if (!items || items.length === 0) return null;
            return (
              <Reveal
                as="div"
                key={section.key}
                delay={i * 80}
                className={`detail-card liquid-glass ${section.key === 'interestingFacts' ? 'full-width' : ''}`}
              >
                <div className="card-icon"><span className="material-symbols-outlined">{section.icon}</span></div>
                <h3 className="headline-sm">{section.title}</h3>
                <ul className="detail-list">
                  {items.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              </Reveal>
            );
          })}
        </div>

        {/* RELATED */}
        {related.length > 0 && (
          <section className="related">
            <h2 className="headline-md related-title">
              Ďalšie z čeľade {family.name.split(' (')[0]}
            </h2>
            <div className="related-grid">
              {related.map((p) => {
                const { common: rc, latin: rl } = splitName(p.name);
                return (
                  <Link key={p.id} to={`/rastlina/${p.id}`} className="related-card liquid-glass">
                    {p.image ? (
                      <img src={p.image} alt={rc} loading="lazy" />
                    ) : (
                      <div className="related-placeholder"><span className="material-symbols-outlined">eco</span></div>
                    )}
                    <div className="related-info">
                      <span className="related-name">{rc}</span>
                      {rl && <span className="related-latin">{rl}</span>}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* PREV / NEXT */}
        <nav className="plant-pager">
          <Link to={`/rastlina/${prev.id}`} className="pager-link liquid-glass">
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="pager-text">
              <span className="pager-label">Predchádzajúca</span>
              <span className="pager-name">{splitName(prev.name).common}</span>
            </span>
          </Link>
          <Link to={`/rastlina/${next.id}`} className="pager-link align-end liquid-glass">
            <span className="pager-text">
              <span className="pager-label">Nasledujúca</span>
              <span className="pager-name">{splitName(next.name).common}</span>
            </span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </nav>
      </div>

      {/* LIGHTBOX — portalled to <body> so it escapes any stacking context */}
      {lightbox && plant.image && createPortal(
        <div className="lightbox" onClick={() => setLightbox(false)}>
          <button className="lightbox-close" aria-label="Zavrieť">
            <span className="material-symbols-outlined">close</span>
          </button>
          <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
            <img src={plant.image} alt={common} />
            <figcaption>{common}{latin && <em> · {latin}</em>}</figcaption>
          </figure>
        </div>,
        document.body
      )}
    </div>
  );
};

// Remount on :id change so per-plant state (e.g. lightbox) resets cleanly.
const PlantDetail = () => {
  const { id } = useParams();
  return <PlantDetailView key={id} id={id} />;
};

export default PlantDetail;
