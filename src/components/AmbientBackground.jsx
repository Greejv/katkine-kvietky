import './AmbientBackground.css';

// Decorative, non-interactive layer: animated botanical gradient mesh
// plus gently rising leaf particles. Purely visual — respects reduced motion.
const LEAF_PATH =
  'M12 2C7 6 3 10 3 15c0 4 3 7 7 7 1-5 3-9 8-13-3 1-6 3-8 6 1-4 3-8 2-13z';

// Randomised once at module load (not during render) so the field is stable.
const LEAVES = Array.from({ length: 14 }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: 14 + Math.random() * 26,
  delay: -Math.random() * 24,
  duration: 18 + Math.random() * 22,
  drift: (Math.random() - 0.5) * 120,
  opacity: 0.25 + Math.random() * 0.4,
}));

const AmbientBackground = () => {
  const leaves = LEAVES;

  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient-mesh">
        <span className="blob blob-1" />
        <span className="blob blob-2" />
        <span className="blob blob-3" />
        <span className="blob blob-4" />
      </div>
      <div className="ambient-grain" />
      <div className="ambient-leaves">
        {leaves.map((l) => (
          <svg
            key={l.id}
            className="leaf"
            viewBox="0 0 24 24"
            style={{
              left: `${l.left}%`,
              width: `${l.size}px`,
              height: `${l.size}px`,
              animationDelay: `${l.delay}s`,
              animationDuration: `${l.duration}s`,
              '--drift': `${l.drift}px`,
              opacity: l.opacity,
            }}
          >
            <path d={LEAF_PATH} />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default AmbientBackground;
