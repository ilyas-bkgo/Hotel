import React from 'react';
import { Compass, Waves, Coffee, MapPin, Award, CheckCircle2 } from 'lucide-react';

export const WhySection: React.FC = () => {
  const points = [
    {
      num: '01',
      title: 'Emplacement Central à Agadir',
      subtitle: 'Avenue Allal Ben Abdellah',
      desc: 'Idéalement situé au cœur de la ville, à quelques minutes de la marina, de la corniche et des principaux axes vers les célèbres spots de surf de la côte atlantique.',
      tag: 'Cœur de Ville',
      color: 'text-[#f05a2d]',
      borderColor: 'border-[#f05a2d]/30',
    },
    {
      num: '02',
      title: 'Esprit Surf Camp & Râtelier',
      subtitle: 'Pensé pour les passionnés de glisse',
      desc: 'Stockage dédié et sécurisé pour vos planches de surf, douches de rinçage à l’eau douce, conseils quotidiens sur les marées et sessions collectives.',
      tag: 'Surfers Welcome',
      color: 'text-[#f29acb]',
      borderColor: 'border-[#f29acb]/40',
    },
    {
      num: '03',
      title: 'Petit-Déjeuner Beldi Frais',
      subtitle: 'Dès 30 DH par personne',
      desc: 'Nos trois formules gourmandes (Continental, Express, Beldi) avec msemens tièdes, huile d’olive du Souss, thé à la menthe et jus d’orange pressé minute.',
      tag: 'Saveurs Maison',
      color: 'text-[#1f6f78]',
      borderColor: 'border-[#1f6f78]/30',
    },
    {
      num: '04',
      title: 'Excursions & Aventures Océan',
      subtitle: 'Sahara, Taghazout & Paradise Valley',
      desc: 'Nos guides locaux vous emmènent sur les plus belles crêtes du Petit Sahara en 4x4, dans les vasques turquoise de l’Atlas et sur les vagues mythiques.',
      tag: 'Aventure 100% Locale',
      color: 'text-[#06306b]',
      borderColor: 'border-[#06306b]/30',
    },
  ];

  return (
    <section id="pourquoi" className="py-20 lg:py-28 bg-[#f2e8df] relative overflow-hidden">
      
      {/* Background Watermark */}
      <div 
        aria-hidden="true" 
        className="ghost-title absolute -bottom-10 right-0 whitespace-nowrap opacity-30 pointer-events-none select-none z-0"
      >
        WHY ISNI
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-marker text-lg text-[#f05a2d] tracking-wide inline-block -rotate-1 mb-2">
            L'Expérience Authentique
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl text-[#06306b] tracking-tight leading-none mb-4">
            POURQUOI CHOISIR LA RÉSIDENCE ISNI ?
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#06306b]/80">
            Un équilibre parfait entre l'accueil chaleureux d'un appart-hôtel de 29 chambres et l’énergie vivifiante des meilleurs camps de surf marocains.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((pt, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-3xl p-7 shadow-lg border-2 ${pt.borderColor} flex flex-col justify-between hover:-translate-y-1 transition-all duration-200 group`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`font-bebas text-5xl ${pt.color} leading-none group-hover:scale-110 transition-transform`}>
                    {pt.num}
                  </span>
                  <span className="text-[11px] font-archivo font-extrabold uppercase px-2.5 py-1 rounded-full bg-[#f2e8df] text-[#06306b]">
                    {pt.tag}
                  </span>
                </div>

                <h3 className="font-archivo font-black text-xl text-[#06306b] mb-1 leading-snug">
                  {pt.title}
                </h3>
                <h4 className="font-marker text-xs text-[#f05a2d] mb-4">
                  {pt.subtitle}
                </h4>

                <p className="font-sans text-sm text-[#06306b]/75 leading-relaxed">
                  {pt.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#06306b]/10 flex items-center gap-2 text-xs font-archivo font-bold text-[#06306b]">
                <CheckCircle2 className="w-4 h-4 text-[#1f6f78]" />
                <span>Expérience garantie</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
