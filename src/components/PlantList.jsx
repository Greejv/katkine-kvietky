import { useMemo, useState } from 'react';
import families from '../data/plants.json';
import PlantCard from './PlantCard';
import Sidebar from './Sidebar';
import CountUp from './CountUp';
import { useFavorites } from '../context/FavoritesContext';
import './PlantList.css';

const TAG_FILTERS = [
  { key: 'danger', label: 'Jedovaté', icon: '☠️', match: (f) => f.includes('JEDOVAT') },
  { key: 'heal', label: 'Liečivé', icon: '🌿', match: (f) => f.includes('LIEČIV') },
  { key: 'protect', label: 'Chránené', icon: '🔒', match: (f) => f.includes('CHRÁNEN') },
  { key: 'food', label: 'Jedlé', icon: '🍴', match: (f) => f.includes('POTRAVIN') },
];

const normalize = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

const PlantList = () => {
  const { favorites } = useFavorites();
  const [selectedFamily, setSelectedFamily] = useState('Všetko');
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState(null);
  const [favOnly, setFavOnly] = useState(false);

  const allPlants = useMemo(() => families.flatMap((f) => f.plants), []);

  // Stats for the hero strip.
  const stats = useMemo(() => {
    const has = (m) => allPlants.filter((p) => p.flags?.some(m)).length;
    return {
      species: allPlants.length,
      families: families.length,
      healing: has((f) => f.includes('LIEČIV')),
      toxic: has((f) => f.includes('JEDOVAT')),
    };
  }, [allPlants]);

  // Which tag chips actually apply to at least one plant.
  const availableTags = useMemo(
    () => TAG_FILTERS.filter((t) => allPlants.some((p) => p.flags?.some(t.match))),
    [allPlants]
  );

  const filtered = useMemo(() => {
    const base =
      selectedFamily === 'Všetko'
        ? allPlants
        : families.find((f) => f.name === selectedFamily)?.plants || [];

    const q = normalize(query.trim());
    const tag = TAG_FILTERS.find((t) => t.key === activeTag);

    return base.filter((p) => {
      if (favOnly && !favorites.includes(p.id)) return false;
      if (tag && !p.flags?.some(tag.match)) return false;
      if (q) {
        const haystack = normalize(
          `${p.name} ${p.systematics?.Čeľaď || ''} ${p.systematics?.Rod || ''}`
        );
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [allPlants, selectedFamily, query, activeTag, favOnly, favorites]);

  const resetFilters = () => {
    setSelectedFamily('Všetko');
    setQuery('');
    setActiveTag(null);
    setFavOnly(false);
  };

  return (
    <div className="plant-list-page">
      {/* ---------- HERO ---------- */}
      <section className="hero">
        <div className="hero-inner">
          <span className="hero-eyebrow">
            <span className="material-symbols-outlined">potted_plant</span>
            Botanický herbár · 2026
          </span>
          <h1 className="hero-title">
            Objavte krásu <span className="gradient-text">flóry</span>
          </h1>
          <p className="hero-subtitle">
            Interaktívny sprievodca svetom rastlín — morfológia, výskyt, využitie
            a zaujímavosti pre {stats.species} druhov z {stats.families} čeľadí.
          </p>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num"><CountUp end={stats.species} /></span>
              <span className="stat-label">Druhov</span>
            </div>
            <div className="stat">
              <span className="stat-num"><CountUp end={stats.families} /></span>
              <span className="stat-label">Čeľadí</span>
            </div>
            <div className="stat">
              <span className="stat-num"><CountUp end={stats.healing} /></span>
              <span className="stat-label">Liečivých</span>
            </div>
            <div className="stat">
              <span className="stat-num"><CountUp end={stats.toxic} /></span>
              <span className="stat-label">Jedovatých</span>
            </div>
          </div>
        </div>
      </section>

      <div className="plant-list-layout">
        <Sidebar
          families={families}
          selectedFamily={selectedFamily}
          onSelectFamily={setSelectedFamily}
          favCount={favorites.length}
          favOnly={favOnly}
          onToggleFav={() => setFavOnly((v) => !v)}
        />

        <section className="plant-list-section">
          {/* ---------- TOOLBAR ---------- */}
          <div className="list-toolbar">
            <div className="search-box liquid-glass">
              <span className="material-symbols-outlined">search</span>
              <input
                type="text"
                placeholder="Hľadať rastlinu, rod alebo čeľaď…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button className="search-clear" onClick={() => setQuery('')} aria-label="Vymazať">
                  <span className="material-symbols-outlined">close</span>
                </button>
              )}
            </div>

            <div className="tag-filters">
              {availableTags.map((t) => (
                <button
                  key={t.key}
                  className={`tag-chip ${activeTag === t.key ? 'active' : ''}`}
                  onClick={() => setActiveTag((cur) => (cur === t.key ? null : t.key))}
                >
                  <span className="tag-emoji">{t.icon}</span> {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="results-bar">
            <p className="results-count">
              <strong>{filtered.length}</strong>{' '}
              {filtered.length === 1 ? 'rastlina' : filtered.length >= 2 && filtered.length <= 4 ? 'rastliny' : 'rastlín'}
              {selectedFamily !== 'Všetko' && <> · {selectedFamily.split(' (')[0]}</>}
            </p>
            {(query || activeTag || favOnly || selectedFamily !== 'Všetko') && (
              <button className="reset-btn" onClick={resetFilters}>
                <span className="material-symbols-outlined">restart_alt</span> Zrušiť filtre
              </button>
            )}
          </div>

          {/* ---------- GRID ---------- */}
          {filtered.length > 0 ? (
            <div className="plant-grid">
              {filtered.map((plant, i) => (
                <PlantCard key={plant.id} plant={plant} index={i} />
              ))}
            </div>
          ) : (
            <div className="empty-state liquid-glass">
              <span className="material-symbols-outlined">sentiment_dissatisfied</span>
              <h3 className="headline-sm">Žiadne rastliny nezodpovedajú filtru</h3>
              <p className="body-sm">Skúste upraviť vyhľadávanie alebo zrušiť filtre.</p>
              <button className="btn btn-primary" onClick={resetFilters}>Zobraziť všetko</button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default PlantList;
