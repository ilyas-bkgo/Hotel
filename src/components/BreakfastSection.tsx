import React from 'react';
import { assetUrl } from '../utils/assets';
import { Coffee, Check, Plus, Utensils, Sparkles } from 'lucide-react';
import { BREAKFAST_FORMULAS } from '../data/hotelData';
import { BreakfastFormula } from '../types';

interface BreakfastSectionProps {
  selectedBreakfast: string;
  onSelectBreakfast: (code: string) => void;
}

export const BreakfastSection: React.FC<BreakfastSectionProps> = ({
  selectedBreakfast,
  onSelectBreakfast,
}) => {
  return (
    <section id="petit-dejeuner" className="py-20 lg:py-28 bg-[#faf5f0] relative overflow-hidden border-t border-[#06306b]/10">
      
      {/* Ghost Background Title */}
      <div 
        aria-hidden="true" 
        className="ghost-title absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-25 pointer-events-none select-none z-0"
      >
        PETIT-DÉJEUNER
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Header matching the exact client visual */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1f6f78]/10 text-[#1f6f78] font-archivo text-xs font-bold uppercase tracking-wider mb-3">
            <Coffee className="w-3.5 h-3.5 text-[#f05a2d]" />
            <span>Bonjour & Bienvenue · Apparts-Hôtel ISNI</span>
          </div>

          <h2 className="font-bebas text-4xl sm:text-6xl text-[#06306b] tracking-tight leading-none mb-3">
            MENU PETIT-DÉJEUNER
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#06306b]/80 max-w-xl mx-auto italic font-medium">
            Choisissez votre formule préférée — servie chaque matin dès 07h30 pour faire le plein d’énergie avant les vagues !
          </p>
        </div>

        {/* Real Menu Visual Card Container */}
        <div className="mb-14 max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
          <div className="p-4 sm:p-6 bg-[#cfe5d8]/40 border-b border-[#06306b]/10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-marker text-xs text-[#f05a2d] uppercase tracking-wider block">
                Carte Officielle du Petit-Déjeuner
              </span>
              <h3 className="font-bebas text-2xl sm:text-3xl text-[#06306b]">
                VISUEL DU RESTAURANT & SALON
              </h3>
            </div>
            <span className="bg-[#f05a2d] text-white font-archivo text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full shadow-sm">
              Formules de 30 à 35 DH
            </span>
          </div>

          <div className="relative overflow-hidden bg-[#e8d9cc]">
            <img
              src={assetUrl("/assets/breakfast-menu.webp")}
              alt="Carte Petit-Déjeuner Apparts-Hôtel Résidence ISNI"
              className="w-full h-auto object-contain max-h-[600px] mx-auto transition-transform duration-500 group-hover:scale-[1.01]"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* 3 Interactive Cards to pick and add to booking */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {BREAKFAST_FORMULAS.map((formula: BreakfastFormula) => {
            const isSelected = selectedBreakfast === formula.code;

            return (
              <div
                key={formula.code}
                className={`bg-white rounded-3xl p-7 shadow-xl border-2 transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#f05a2d] ring-4 ring-[#f05a2d]/20 scale-102'
                    : 'border-[#06306b]/10 hover:border-[#1f6f78]'
                }`}
              >
                <div>
                  {/* Top Bar with Number and Price badge */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-9 h-9 rounded-full bg-[#f2e8df] text-[#06306b] font-bebas text-xl flex items-center justify-center font-bold">
                      {formula.num}
                    </span>
                    <span className="bg-[#f05a2d] text-white font-archivo font-extrabold text-sm px-3.5 py-1.5 rounded-full shadow-sm">
                      {formula.priceDH} DH
                    </span>
                  </div>

                  <h3 className="font-archivo font-black text-2xl text-[#06306b] mb-4">
                    {formula.name}
                  </h3>

                  {/* List of ingredients */}
                  <ul className="space-y-3 mb-8">
                    {formula.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-archivo font-medium text-[#06306b]">
                        <span className="w-5 h-5 rounded-full bg-[#cfe5d8] text-[#1f6f78] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Selection button */}
                <div>
                  <button
                    onClick={() => {
                      onSelectBreakfast(isSelected ? 'none' : formula.code);
                      const el = document.getElementById('reservation');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full py-3 px-4 rounded-full font-archivo font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      isSelected
                        ? 'bg-[#1f6f78] text-white shadow-md'
                        : 'bg-[#f05a2d] hover:bg-[#d44519] text-white shadow-md'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Formule sélectionnée (+{formula.priceDH} DH)</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 stroke-[3]" />
                        <span>Ajouter au séjour (+{formula.priceDH} DH)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notice on pricing calculation */}
        <p className="text-center font-archivo text-xs text-[#06306b]/70 mt-8">
          * Le montant du petit-déjeuner est calculé : <em>Nombre de personnes × Nombre de nuits × Prix de la formule</em> et s'ajoute automatiquement au total estimé de votre réservation.
        </p>

      </div>
    </section>
  );
};
