import React from 'react';
import { Calendar, Compass, Sun, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { ROOMS } from '../data/hotelData';

interface HeroProps {
  onQuickBook: (checkIn: string, checkOut: string, roomCode: string) => void;
  onExploreRooms: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuickBook, onExploreRooms }) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const in3Days = new Date();
  in3Days.setDate(in3Days.getDate() + 4);

  const [checkIn, setCheckIn] = React.useState(tomorrow.toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = React.useState(in3Days.toISOString().split('T')[0]);
  const [roomCode, setRoomCode] = React.useState('standard');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickBook(checkIn, checkOut, roomCode);
  };

  return (
    <section id="hero" className="relative bg-[#f2e8df] pt-6 pb-16 lg:pb-24 overflow-hidden border-b border-[#06306b]/10">
      
      {/* Giant Ghost Watermark Typography (Desert Surf Camp trademark) */}
      <div 
        aria-hidden="true" 
        className="ghost-title absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-40 pointer-events-none select-none z-0"
      >
        DESERT SURF CAMP
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top 50/50 Split Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-8 lg:pt-14 pb-12">
          
          {/* Left Column: Typography & Story */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Top kicker badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#06306b] text-[#f2e8df] font-archivo text-xs font-bold uppercase tracking-wider shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-[#f05a2d]" />
                Avenue Allal Ben Abdellah · Agadir
              </span>
              <span className="text-xs font-archivo font-bold text-[#f05a2d] bg-[#f05a2d]/10 px-2.5 py-1 rounded-full">
                29 Chambres
              </span>
            </div>

            {/* Main Title with Marker Accent */}
            <h1 className="font-bebas text-5xl sm:text-7xl lg:text-8xl text-[#06306b] tracking-tight leading-[0.9] mb-4">
              L’ESPRIT SURF <br />
              <span className="font-marker text-4xl sm:text-6xl lg:text-7xl text-[#f05a2d] block -rotate-1 mt-1">
                & DÉTENTE À AGADIR
              </span>
            </h1>

            {/* Description */}
            <p className="font-sans text-base sm:text-lg text-[#06306b]/85 max-w-xl mb-8 leading-relaxed">
              Bienvenue à la <strong className="font-semibold text-[#06306b]">Résidence ISNI</strong>, votre appart-hôtel de 29 chambres au cœur d’Agadir. Entre vagues atlantiques, rooftop ensoleillé, excursions dans le Petit Sahara et formules petit-déjeuner traditionnelles.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onQuickBook(checkIn, checkOut, roomCode)}
                className="px-7 py-3.5 bg-[#f05a2d] hover:bg-[#d44519] text-white font-archivo font-black text-sm uppercase tracking-wider rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2.5 active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Réserver en Direct (Dès 450 MAD)</span>
              </button>

              <button
                onClick={onExploreRooms}
                className="px-6 py-3.5 bg-transparent hover:bg-[#06306b]/5 text-[#06306b] border-2 border-[#06306b] font-archivo font-bold text-sm uppercase tracking-wider rounded-full transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Découvrir les 29 chambres</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Micro Highlights strip */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-10 pt-8 border-t border-[#06306b]/15">
              <div>
                <span className="font-bebas text-3xl sm:text-4xl text-[#06306b] leading-none block">29</span>
                <span className="font-archivo text-xs font-semibold text-[#06306b]/70 uppercase">Chambres & Suites</span>
              </div>
              <div>
                <span className="font-bebas text-3xl sm:text-4xl text-[#f05a2d] leading-none block">30 DH</span>
                <span className="font-archivo text-xs font-semibold text-[#06306b]/70 uppercase">Petit-Déj Dès</span>
              </div>
              <div>
                <span className="font-bebas text-3xl sm:text-4xl text-[#1f6f78] leading-none block">5 MIN</span>
                <span className="font-archivo text-xs font-semibold text-[#06306b]/70 uppercase">Plage & Spots</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 relative">
            
            {/* Stamp sticker */}
            <div className="absolute -top-4 -right-2 sm:-top-6 sm:-right-4 z-20 stamp-badge bg-[#f05a2d] text-white font-bebas text-sm sm:text-base px-4 py-2.5 shadow-lg border-2 border-white flex flex-col items-center">
              <span>RÉSIDENCE ISNI</span>
              <span className="font-marker text-[10px] text-[#f29acb] -mt-1">100% VIBES</span>
            </div>

            {/* Secondary Badge */}
            <div className="absolute -bottom-4 -left-3 sm:-bottom-6 sm:-left-5 z-20 stamp-badge bg-[#06306b] text-[#f2e8df] font-archivo font-bold text-xs px-3.5 py-2 shadow-lg border-2 border-[#f2e8df]">
              🌊 Taghazout & Dunes à proximité
            </div>

            {/* Photo Card with Desert Surf Camp border */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#06306b] group">
              <img
                src="/src/assets/images/hero_agadir_surf_camp_1793212941609.jpg"
                alt="Résidence ISNI Rooftop et Surf Camp à Agadir"
                className="w-full h-[380px] sm:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06306b]/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                <span className="font-marker text-xs text-[#f29acb] uppercase tracking-wider block">
                  Rooftop & Chill Lounge
                </span>
                <p className="font-bebas text-2xl tracking-wide leading-tight">
                  Vue imprenable & départs surf quotidiens
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Quick Booking Strip (Floating at bottom of hero) */}
        <div className="mt-4 bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-[#06306b]/10 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            
            <div>
              <label className="block text-xs font-archivo font-bold text-[#06306b] uppercase tracking-wider mb-1.5">
                Date d’Arrivée
              </label>
              <input
                type="date"
                value={checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#06306b]/20 bg-[#f2e8df]/30 font-archivo text-xs sm:text-sm text-[#06306b] focus:outline-none focus:ring-2 focus:ring-[#f05a2d]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-archivo font-bold text-[#06306b] uppercase tracking-wider mb-1.5">
                Date de Départ
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn || new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#06306b]/20 bg-[#f2e8df]/30 font-archivo text-xs sm:text-sm text-[#06306b] focus:outline-none focus:ring-2 focus:ring-[#f05a2d]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-archivo font-bold text-[#06306b] uppercase tracking-wider mb-1.5">
                Catégorie Chambre
              </label>
              <select
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#06306b]/20 bg-[#f2e8df]/30 font-archivo text-xs sm:text-sm text-[#06306b] focus:outline-none focus:ring-2 focus:ring-[#f05a2d]"
              >
                {ROOMS.map((r) => (
                  <option key={r.code} value={r.code}>
                    {r.name} ({r.priceMAD} MAD)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2.5 sm:py-3 bg-[#f05a2d] hover:bg-[#d44519] text-white font-archivo font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
              >
                <Compass className="w-4 h-4" />
                <span>Vérifier & Réserver</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};
