import { Link } from 'react-router-dom';
import logo from '../assets/lgogo.jpg';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src={logo} alt="" />
            <span>Katkine kvietky</span>
          </div>
          <p className="footer-tagline">
            Digitálny herbár — moderný botanický sprievodca svetom rastlín.
          </p>
        </div>

        <nav className="footer-nav">
          <h4>Navigácia</h4>
          <Link to="/">Zbierka</Link>
          <Link to="/o-projekte">O projekte</Link>
        </nav>

        <div className="footer-note">
          <h4>O herbári</h4>
          <p>
            Školský projekt z predmetu Biológia. Obrázky pochádzajú z Wikimedia Commons.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span className="copyright">© 2026 Katkine kvietky</span>
          <span className="footer-made">
            Vytvorené s <span className="material-symbols-outlined heart">favorite</span> pre botaniku
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
