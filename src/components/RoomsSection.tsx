import React from 'react';
import { BedDouble, Users, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { ACCOMMODATION_DETAILS, PROPERTY_GALLERY, ROOMS } from '../data/hotelData';
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
            Les tarifs suivent le barème fourni. Découvrez aussi les configurations et équipements de nos studios et appartements.
          </p>
        </div>

        {/* Alternating room photo and details panels */}
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
                  className={`image-drift-frame lg:col-span-6 relative min-h-[320px] sm:min-h-[400px] overflow-hidden ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <img
                    src={room.image}
                    alt={room.name}
                    className="image-drift w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating badges on photo */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
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

        <div className="mt-20">
          <div className="mx-auto mb-9 max-w-3xl text-center">
            <span className="font-marker text-sm text-[#f05a2d]">Descriptifs de la résidence</span>
            <h3 className="font-bebas text-4xl text-[#06306b] sm:text-5xl">STUDIOS & APPARTEMENTS</h3>
            <p className="mt-2 text-sm leading-6 text-[#06306b]/70">Les équipements et superficies ci-dessous reprennent les informations de la résidence. Le tarif dépend du nombre de personnes, selon le barème affiché plus haut.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {ACCOMMODATION_DETAILS.map((stay) => (
              <article key={stay.title} className="group overflow-hidden rounded-3xl border border-[#06306b]/10 bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div className="image-drift-frame relative aspect-[16/10] overflow-hidden">
                  <img src={stay.image} alt={`Espace de la Résidence ISNI · ${stay.title}`} loading="lazy" className="image-drift h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 font-archivo text-xs font-bold text-[#06306b] backdrop-blur">{stay.area}</span>
                </div>
                <div className="p-6">
                  <h4 className="font-bebas text-2xl tracking-wide text-[#06306b]">{stay.title}</h4>
                  <p className="mt-3 text-sm leading-6 text-[#06306b]/75">{stay.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="font-marker text-sm text-[#f05a2d]">Un aperçu des lieux</span>
              <h3 className="font-bebas text-4xl text-[#06306b] sm:text-5xl">LA RÉSIDENCE EN IMAGES</h3>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#06306b]/70">Découvrez les espaces et équipements présentés par la Résidence ISNI.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-12">
            {PROPERTY_GALLERY.map((photo, index) => (
              <figure key={photo.src} className={`image-drift-frame group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#e8d9cc] shadow-lg ${index === 0 || index === 3 ? 'lg:col-span-5' : 'lg:col-span-3'}`}>
                <img src={photo.src} alt={photo.alt} loading="lazy" className="image-drift h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:blur-[1px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06306b]/70 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-90" />
                <figcaption className="absolute bottom-3 left-4 font-bebas text-xl tracking-wide text-white sm:bottom-4 sm:left-5 sm:text-2xl">{photo.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
