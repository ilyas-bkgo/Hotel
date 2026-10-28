import React from 'react';
import { Waves, Phone, Mail, MapPin, MessageCircle, Heart, Compass, Shield } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface FooterProps {
  onOpenWordpressModal: () => void;
  onOpenSheetModal: () => void;
  onScrollToSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenWordpressModal,
  onOpenSheetModal,
  onScrollToSection,
}) => {
  const whatsappUrl = `https://wa.me/${HOTEL_INFO.whatsapp.replace(/[^0-9]/g, '')}`;

  return (
    <footer className="bg-[#06306b] text-[#f2e8df] pt-16 pb-12 border-t-4 border-[#f05a2d]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#f05a2d] text-white flex items-center justify-center font-bebas text-xl shadow">
                <Waves className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bebas text-3xl tracking-wide text-white leading-none block">
                  RÉSIDENCE ISNI
                </span>
                <span className="font-marker text-xs text-[#f29acb] tracking-wider leading-none">
                  APPART-HÔTEL & SURF CAMP AGADIR
                </span>
              </div>
            </div>

            <p className="font-sans text-sm text-[#cfe5d8] max-w-sm mb-6 leading-relaxed">
              29 chambres et suites de charme au cœur d’Agadir. L’alliance parfaite entre l’hospitalité marocaine, les sessions de surf le long de la côte atlantique et les excursions désert.
            </p>

            <div className="flex items-center gap-2 text-xs font-archivo text-[#f29acb]">
              <MapPin className="w-4 h-4 text-[#f05a2d] shrink-0" />
              <span>Avenue Allal Ben Abdellah, Agadir 80000, Maroc</span>
            </div>
          </div>

          {/* Quick Navigation (2 Cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-bebas text-xl text-[#f05a2d] tracking-wider mb-4">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs font-archivo font-medium">
              <li>
                <button onClick={() => onScrollToSection('pourquoi')} className="hover:text-[#f05a2d] transition-colors cursor-pointer">
                  Pourquoi Nous
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('chambres')} className="hover:text-[#f05a2d] transition-colors cursor-pointer">
                  29 Chambres & Suites
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('activites')} className="hover:text-[#f05a2d] transition-colors cursor-pointer">
                  Activités Surf & Désert
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('petit-dejeuner')} className="hover:text-[#f05a2d] transition-colors cursor-pointer">
                  Menu Petit-Déjeuner
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('reservation')} className="hover:text-[#f05a2d] transition-colors cursor-pointer">
                  Calendrier de Réservation
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Direct Booking (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-bebas text-xl text-[#f05a2d] tracking-wider mb-4">
              RÉCEPTION & CONTACT
            </h4>
            <ul className="space-y-3 text-xs font-archivo text-[#cfe5d8]">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#f05a2d] shrink-0" />
                <a href={`tel:${HOTEL_INFO.phone}`} className="hover:text-white transition-colors">
                  {HOTEL_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {HOTEL_INFO.whatsapp} (WhatsApp Direct)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#f29acb] shrink-0" />
                <a href={`mailto:${HOTEL_INFO.email}`} className="hover:text-white transition-colors">
                  {HOTEL_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* WordPress & Webhook Tools (2 Cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-bebas text-xl text-[#f05a2d] tracking-wider mb-4">
              OUTILS PROJET
            </h4>
            <div className="flex flex-col gap-2.5 text-xs font-archivo">
              <button
                onClick={onOpenWordpressModal}
                className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-all text-left flex items-center justify-between cursor-pointer"
              >
                <span>Thème WP (.ZIP)</span>
                <span className="text-[10px] text-[#f29acb]">cPanel</span>
              </button>

              <button
                onClick={onOpenSheetModal}
                className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-all text-left flex items-center justify-between cursor-pointer"
              >
                <span>Google Sheet API</span>
                <span className="text-[10px] text-[#cfe5d8]">Webhook</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Credits Strip */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs font-archivo text-[#cfe5d8]/70">
          <p>
            &copy; {new Date().getFullYear()} Résidence ISNI · Appart-Hôtel Agadir. Tous droits réservés.
          </p>
          <p className="flex items-center gap-1.5">
            <span>Inspiré de l’univers créatif de</span>
            <strong className="text-white">fr.desertsurfcamp.com</strong>
          </p>
        </div>

      </div>
    </footer>
  );
};
