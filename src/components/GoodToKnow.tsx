import React from 'react';
import { BedDouble, BadgeCheck, Coffee, Waves } from 'lucide-react';
import { GOOD_TO_KNOW } from '../data/hotelData';

export const GoodToKnow: React.FC = () => {
  const icons = [
    <BedDouble className="w-6 h-6 text-[#f05a2d]" key="1" />,
    <BadgeCheck className="w-6 h-6 text-[#1f6f78]" key="2" />,
    <Coffee className="w-6 h-6 text-[#f29acb]" key="3" />,
    <Waves className="w-6 h-6 text-[#06306b]" key="4" />,
  ];

  return (
    <section id="a-savoir" className="py-20 bg-[#f2e8df] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-marker text-lg text-[#f05a2d] tracking-wide inline-block -rotate-1 mb-2">
            Préparer Votre Voyage
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl text-[#06306b] tracking-tight leading-none mb-3">
            À SAVOIR AVANT VOTRE SÉJOUR
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#06306b]/80">
            Tarifs et prestations repris du barème et de l’affiche transmis. Les disponibilités et le tarif surf sont confirmés par la résidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GOOD_TO_KNOW.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 shadow-md border-2 border-[#06306b]/10 flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#f2e8df] flex items-center justify-center mb-4">
                  {icons[idx]}
                </div>
                <h3 className="font-archivo font-bold text-lg text-[#06306b] mb-2">
                  {item.title}
                </h3>
                <p className="font-sans text-sm text-[#06306b]/75 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
