import React, { useEffect, useState } from 'react';
import { Waves } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!visible) return;

    const startedAt = performance.now();
    let fadeTimer = 0;
    let removeTimer = 0;
    let fadeStarted = false;

    const beginFade = () => {
      if (fadeStarted) return;
      fadeStarted = true;
      const wait = Math.max(0, 1500 - (performance.now() - startedAt));
      fadeTimer = window.setTimeout(() => {
        setLeaving(true);
        removeTimer = window.setTimeout(() => {
          setVisible(false);
        }, 360);
      }, wait);
    };

    const failsafe = window.setTimeout(beginFade, 1700);
    if (document.readyState === 'complete') beginFade();
    else window.addEventListener('load', beginFade, { once: true });

    return () => {
      window.clearTimeout(failsafe);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
      window.removeEventListener('load', beginFade);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={`isni-preloader${leaving ? ' is-leaving' : ''}`} role="status" aria-live="polite" aria-label="Chargement de la Résidence ISNI">
      <div className="isni-preloader-backdrop" />
      <div className="isni-preloader-content">
        <div className="isni-preloader-mark"><Waves aria-hidden="true" /></div>
        <p className="isni-preloader-kicker">Agadir · Maroc</p>
        <h1>RÉSIDENCE ISNI</h1>
        <p className="isni-preloader-caption">Préparez-vous à prendre le large</p>
        <div className="isni-preloader-board" aria-hidden="true"><span /></div>
        <div className="isni-preloader-progress" aria-hidden="true"><span /></div>
        <span className="sr-only">Chargement en cours…</span>
      </div>
      <svg className="isni-preloader-waves" viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden="true">
        <path className="isni-wave isni-wave-back" d="M0,160 C180,220 260,90 450,145 C640,205 750,275 960,180 C1150,95 1270,125 1440,170 L1440,320 L0,320 Z" />
        <path className="isni-wave isni-wave-front" d="M0,210 C170,140 310,235 490,195 C700,145 820,120 1010,205 C1180,280 1290,225 1440,185 L1440,320 L0,320 Z" />
      </svg>
    </div>
  );
};
