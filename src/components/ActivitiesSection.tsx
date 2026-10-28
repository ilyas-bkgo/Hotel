import React, { useState } from 'react';
import { Waves, Compass, Sparkles, Clock, Check, PlusCircle, ArrowUpRight } from 'lucide-react';
import { ACTIVITIES } from '../data/hotelData';
import { ActivityItem } from '../types';

interface ActivitiesSectionProps {
  onSelectActivityNote?: (title: string) => void;
}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ onSelectActivityNote }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'surf' | 'excursion' | 'bien-etre'>('all');

  const filtered = activeTab === 'all' 
    ? ACTIVITIES 
    : ACTIVITIES.filter(a => a.category === activeTab);

  return (
    <section id="activites" className="py-20 lg:py-28 bg-[#f2e8df] relative overflow-hidden">
      
      {/* Ghost Background Title */}
      <div 
        aria-hidden="true" 
        className="ghost-title absolute top-5 right-5 whitespace-nowrap opacity-25 pointer-events-none select-none z-0"
      >
        SURF & EXCURSIONS
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-marker text-lg text-[#f05a2d] tracking-wide inline-block -rotate-1 mb-2">
            Inspiré de Desert Surf Camp
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl text-[#06306b] tracking-tight leading-none mb-4">
            ACTIVITÉS, SURF & AVENTURES ATLANTIQUES
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#06306b]/80">
            De la houle légendaire de Taghazout aux dunes dorées du Petit Sahara, vivez le meilleur d’Agadir et de sa région avec nos moniteurs et guides locaux.
          </p>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2.5 rounded-full font-archivo text-xs font-bold uppercase transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#06306b] text-white shadow-md'
                  : 'bg-white/80 text-[#06306b] hover:bg-white'
              }`}
            >
              Toutes les activités
            </button>
            <button
              onClick={() => setActiveTab('surf')}
              className={`px-5 py-2.5 rounded-full font-archivo text-xs font-bold uppercase transition-all cursor-pointer ${
                activeTab === 'surf'
                  ? 'bg-[#f05a2d] text-white shadow-md'
                  : 'bg-white/80 text-[#06306b] hover:bg-white'
              }`}
            >
              🏄 Surf & Coaching
            </button>
            <button
              onClick={() => setActiveTab('excursion')}
              className={`px-5 py-2.5 rounded-full font-archivo text-xs font-bold uppercase transition-all cursor-pointer ${
                activeTab === 'excursion'
                  ? 'bg-[#1f6f78] text-white shadow-md'
                  : 'bg-white/80 text-[#06306b] hover:bg-white'
              }`}
            >
              🏜️ Excursions Désert & Atlas
            </button>
            <button
              onClick={() => setActiveTab('bien-etre')}
              className={`px-5 py-2.5 rounded-full font-archivo text-xs font-bold uppercase transition-all cursor-pointer ${
                activeTab === 'bien-etre'
                  ? 'bg-[#f29acb] text-[#06306b] shadow-md'
                  : 'bg-white/80 text-[#06306b] hover:bg-white'
              }`}
            >
              🧘 Yoga Rooftop
            </button>
          </div>
        </div>

        {/* Visual Showcase Banner in Bento Style */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-xl border-2 border-white min-h-[300px] sm:min-h-[360px] group">
            <img
              src="/src/assets/images/surf_lesson_taghazout_1793212942727.jpg"
              alt="Cours de surf et coaching à Agadir et Taghazout"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06306b]/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="font-marker text-xs text-[#f29acb] uppercase tracking-wider block mb-1">
                Spot de Taghazout & Anza
              </span>
              <h3 className="font-bebas text-3xl sm:text-4xl leading-none mb-2">
                COACHING SURF TOUS NIVEAUX & SURF GUIDING
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#f2e8df]/90 max-w-lg">
                Des mousses débutants pour se mettre debout dès la première session, jusqu’aux point breaks de renommée mondiale pour perfectionner vos trajectoires.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-xl border-2 border-white min-h-[300px] sm:min-h-[360px] group">
            <img
              src="/src/assets/images/surf_excursion_sahara_1793212942120.jpg"
              alt="Excursion 4x4 Petit Sahara et dunes côtières"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06306b]/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="font-marker text-xs text-[#f8b839] uppercase tracking-wider block mb-1">
                Aventure Côtière en 4x4
              </span>
              <h3 className="font-bebas text-3xl leading-none mb-2">
                PETIT SAHARA & DUNES DE TIFNIT
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#f2e8df]/90">
                25 € par personne. Les dunes se jetant droit dans l'océan, pêcheurs troglodytes et thé à la menthe traditionnel.
              </p>
            </div>
          </div>
        </div>

        {/* Activities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((activity: ActivityItem) => (
            <div
              key={activity.id}
              className="bg-white rounded-3xl p-7 shadow-lg border-2 border-[#06306b]/10 flex flex-col justify-between hover:-translate-y-1 transition-all duration-200"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="font-marker text-xs text-[#f05a2d] uppercase tracking-wider">
                    {activity.category === 'surf' ? 'Vagues & Glisse' : activity.category === 'excursion' ? 'Désert & Montagne' : 'Bien-Être'}
                  </span>
                  <div className="inline-flex items-center gap-1 text-[11px] font-archivo font-bold text-[#06306b]/70 bg-[#f2e8df] px-2.5 py-1 rounded-full shrink-0">
                    <Clock className="w-3 h-3 text-[#f05a2d]" />
                    <span>{activity.duration}</span>
                  </div>
                </div>

                <h3 className="font-archivo font-black text-xl text-[#06306b] mb-2 leading-snug">
                  {activity.title}
                </h3>

                <div className="inline-block bg-[#06306b] text-[#f2e8df] font-bebas text-lg px-3 py-0.5 rounded-lg mb-4">
                  {activity.price}
                </div>

                <p className="font-sans text-sm text-[#06306b]/75 mb-6 leading-relaxed">
                  {activity.description}
                </p>

                <div className="space-y-1.5 mb-6">
                  {activity.included.map((inc, iIdx) => (
                    <div key={iIdx} className="flex items-center gap-2 text-xs font-archivo text-[#06306b]">
                      <span className="w-4 h-4 rounded-full bg-[#cfe5d8] text-[#1f6f78] flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#06306b]/10">
                <a
                  href="#reservation"
                  onClick={() => {
                    if (onSelectActivityNote) onSelectActivityNote(activity.title);
                  }}
                  className="w-full py-2.5 px-4 bg-[#f2e8df] hover:bg-[#f05a2d] hover:text-white text-[#06306b] font-archivo font-bold text-xs uppercase tracking-wider rounded-full transition-colors flex items-center justify-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Demander avec ma réservation</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
