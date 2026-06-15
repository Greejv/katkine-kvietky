import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/lgogo.jpg';
import useTheme from '../hooks/useTheme';
import './Header.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-content">
        <NavLink to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-badge">
            <img src={logo} alt="" className="logo-img" />
          </span>
          <span className="logo-text">
            Katkine kvietky
            <span className="logo-sub">Digitálny herbár</span>
          </span>
        </NavLink>

        <nav className="nav">
          <NavLink to="/" end className={navClass}>Zbierka</NavLink>
          <NavLink to="/o-projekte" className={navClass}>O projekte</NavLink>
        </nav>

        <div className="header-actions">
          <button
            className="icon-btn theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Svetlý režim' : 'Tmavý režim'}
            title={theme === 'dark' ? 'Svetlý režim' : 'Tmavý režim'}
          >
            <span className="material-symbols-outlined">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <button
            className="icon-btn menu-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav" onClick={() => setMenuOpen(false)}>
          <NavLink to="/" end className={navClass}>
            <span className="material-symbols-outlined">grid_view</span> Zbierka
          </NavLink>
          <NavLink to="/o-projekte" className={navClass}>
            <span className="material-symbols-outlined">menu_book</span> O projekte
          </NavLink>
        </nav>
      </div>
      <div
        className={`mobile-scrim ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
      />
    </header>
  );
};

export default Header;
