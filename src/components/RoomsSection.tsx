import React from 'react';
import { BedDouble, Users, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { ROOMS } from '../data/hotelData';
import { RoomType } from '../types';

interface RoomsSectionProps {
  onSelectRoom: (roomCode: string) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({ onSelectRoom }) => {
  return (
    <section id="chambres" className="py-20 lg:py-28 bg-[#faf5f0] relative overflow-hidden border-t border-[#06306b]/10">
      
      {/* Ghost Background Title */}
      <div 
        aria-hidden="true" 
        className="ghost-title absolute top-10 left-10 whitespace-nowrap opacity-25 pointer-events-none select-none z-0"
      >
        CHAMBRES ISNI
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-marker text-lg text-[#f05a2d] tracking-wide inline-block -rotate-1 mb-2">
            Confort & Authenticité
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl text-[#06306b] tracking-tight leading-none mb-4">
            29 CHAMBRES ET SUITES DE CHARME
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#06306b]/80">
            Trois typologies d’hébergement pensées pour les voyageurs en quête de repos, d’espace et de convivialité à Agadir.
          </p>
        </div>

        {/* 50/50 Split Room Cards (Desert Surf Camp layout) */}
        <div className="space-y-12">
          {ROOMS.map((room: RoomType, idx: number) => {
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={room.code}
                className="bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-[#06306b]/10 grid grid-cols-1 lg:grid-cols-12 transition-all duration-300 hover:shadow-2xl"
              >
                {/* Image side (6 cols) */}
                <div 
                  className={`lg:col-span-6 relative min-h-[320px] sm:min-h-[400px] overflow-hidden ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating badges on photo */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="bg-[#f05a2d] text-white font-archivo text-xs font-black uppercase px-3 py-1 rounded-full shadow-md">
                      {room.inventory} Chambres disponibles
                    </span>
                    <span className="bg-white/90 text-[#06306b] font-archivo text-xs font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#f05a2d]" />
                      Jusqu’à {room.capacity} pers.
                    </span>
                  </div>
                </div>

                {/* Content side (6 cols) */}
                <div 
                  className={`lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
                      <h3 className="font-bebas text-3xl sm:text-4xl text-[#06306b] tracking-wide">
                        {room.name}
                      </h3>
                      <div className="text-right">
                        <span className="font-bebas text-3xl sm:text-4xl text-[#f05a2d] leading-none">
                          {room.priceMAD} MAD
                        </span>
                        <span className="block text-xs font-archivo text-[#06306b]/60 -mt-1">
                          par nuitée
                        </span>
                      </div>
                    </div>

                    <p className="font-sans text-sm sm:text-base text-[#06306b]/80 mb-6 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Room Highlights List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                      {room.highlights.map((item, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs sm:text-sm font-archivo font-medium text-[#06306b]">
                          <span className="w-5 h-5 rounded-full bg-[#cfe5d8] text-[#1f6f78] flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Booking CTA for this room */}
                  <div className="pt-6 border-t border-[#06306b]/10 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs font-archivo text-[#06306b]/70 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-[#1f6f78]" />
                      Réservation sans paiement immédiat
                    </span>

                    <button
                      onClick={() => onSelectRoom(room.code)}
                      className="px-6 py-3 bg-[#06306b] hover:bg-[#f05a2d] text-white font-archivo font-black text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2 active:scale-95"
                    >
                      <span>Choisir cette chambre</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
