import { useEffect, useRef, useState } from 'react';

const supportsObserver = typeof IntersectionObserver !== 'undefined';

// Counts up to `end` once it scrolls into view.
const CountUp = ({ end, duration = 1400, suffix = '' }) => {
  const ref = useRef(null);
  const [value, setValue] = useState(supportsObserver ? 0 : end);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || !supportsObserver) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(eased * end));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{value}{suffix}</span>;
};

export default CountUp;
