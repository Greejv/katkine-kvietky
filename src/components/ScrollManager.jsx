import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ScrollManager.css';

// Resets scroll on navigation and renders a floating "back to top" button
// plus a thin scroll-progress bar at the very top of the viewport.
const ScrollManager = () => {
  const { pathname } = useLocation();
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (scrolled / height) * 100 : 0);
      setShowTop(scrolled > 600);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }} />
      <button
        className={`to-top liquid-glass ${showTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Späť hore"
      >
        <span className="material-symbols-outlined">arrow_upward</span>
      </button>
    </>
  );
};

export default ScrollManager;
