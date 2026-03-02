import type { CSSProperties, WheelEvent } from 'react';
import { useEffect, useState } from 'react';
import Landing from './Landing';
import ComponentPage from './ComponentPage';

const appStyles: Record<string, CSSProperties> = {
  scrollContainer: {
    position: 'relative',
    minHeight: '200vh',
    width: '100%',
  },
  landingSection: {
    position: 'sticky',
    top: 0,
    height: '100vh',
    zIndex: 1,
    touchAction: 'pan-y',
  },
  componentSpacer: {
    height: '60vh',
  },
};

export default function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY || 0);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const progress = Math.min(1, Math.max(0, scrollY / window.innerHeight));
  const scale = 1 - 0.08 * progress;
  const opacity = 1 - 0.4 * progress;
  const radius = 24 * progress;

  const handleLandingWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    window.scrollBy({ top: event.deltaY });
  };

  return (
    <div style={appStyles.scrollContainer}>
      <div style={appStyles.landingSection} onWheel={handleLandingWheel}>
        <div
          style={{
            height: '100%',
            width: '100%',
            transform: `scale(${scale})`,
            opacity,
            borderRadius: radius,
            overflow: 'hidden',
            transformOrigin: 'center',
          }}
        >
          <Landing />
        </div>
      </div>
      <div style={appStyles.componentSpacer} />
      <ComponentPage />
    </div>
  );
}
