import React from 'react';
import { Sparkles, Waves, Sun, Flame } from 'lucide-react';

export const MarqueeStrip: React.FC = () => {
  const phrases = [
    '29 CHAMBRES DE CHARME',
    'SURF GUIDING TAGHAZOUT & IMSOUANE',
    'PETIT-DÉJEUNER MAISON DÈS 30 DH',
    'EXCURSIONS PETIT SAHARA & DUNES 4X4',
    'VIBES 100% MAROCAINES',
    'AVENUE ALLAL BEN ABDELLAH · AGADIR',
    'VOTRE SÉJOUR À AGADIR, EN TOUTE SÉRÉNITÉ',
  ];

  return (
    <div className="bg-[#06306b] text-[#f2e8df] py-3.5 overflow-hidden whitespace-nowrap border-y border-[#f05a2d]/30 relative z-20">
      <div className="marquee-track inline-flex items-center gap-8 animate-[marquee_30s_linear_infinite]">
        {phrases.concat(phrases).map((text, idx) => (
          <div key={idx} className="inline-flex items-center gap-3">
            <span className="font-bebas text-lg sm:text-xl tracking-wider text-white">
              {text}
            </span>
            <span className="text-[#f05a2d] text-sm">★</span>
          </div>
        ))}
      </div>
    </div>
  );
};
