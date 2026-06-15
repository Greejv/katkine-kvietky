import { useEffect, useRef, useState } from 'react';

const supportsObserver = typeof IntersectionObserver !== 'undefined';

// Wraps children and reveals them with a fade-up once they scroll into view.
// `delay` (ms) staggers grouped items; `as` lets callers pick the element tag.
const Reveal = ({ children, delay = 0, className = '', as: Tag = 'div', style, ...rest }) => {
  const ref = useRef(null);
  // When IntersectionObserver is unavailable, render visible from the start.
  const [visible, setVisible] = useState(!supportsObserver);

  useEffect(() => {
    const node = ref.current;
    if (!node || !supportsObserver) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'in-view' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
