import React from 'react';
import { Waves, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface FooterProps {
  onScrollToSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
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
              Appart-hôtel à Agadir avec chambres de 1 à 4 personnes, formules petit-déjeuner et sortie surf à Taghazout sur demande.
            </p>

            <div className="flex items-center gap-2 text-xs font-archivo text-[#f29acb]">
              <MapPin className="w-4 h-4 text-[#f05a2d] shrink-0" />
              <span>{HOTEL_INFO.address}</span>
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
                  Sortie surf à Taghazout
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('petit-dejeuner')} className="hover:text-[#f05a2d] transition-colors cursor-pointer">
                  Menu Petit-Déjeuner
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('reservation')} className="hover:text-[#f05a2d] transition-colors cursor-pointer">
                  Envoyer une demande
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
              {HOTEL_INFO.email && <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#f29acb] shrink-0" />
                <a href={`mailto:${HOTEL_INFO.email}`} className="hover:text-white transition-colors">
                  {HOTEL_INFO.email}
                </a>
              </li>}
            </ul>
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
