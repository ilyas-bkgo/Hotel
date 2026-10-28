import React, { useState } from 'react';
import { Calendar, Download, FileCode, Menu, X, Waves, Sheet } from 'lucide-react';

interface HeaderProps {
  onOpenWordpressModal: () => void;
  onOpenSheetModal: () => void;
  onScrollToSection: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenWordpressModal,
  onOpenSheetModal,
  onScrollToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Pourquoi Nous', id: 'pourquoi' },
    { label: 'Chambres', id: 'chambres' },
    { label: 'Activités & Surf', id: 'activites' },
    { label: 'Petit-Déjeuner', id: 'petit-dejeuner' },
    { label: 'À Savoir', id: 'a-savoir' },
  ];

  const handleNavClick = (id: string) => {
    onScrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#f2e8df]/95 backdrop-blur-md border-b border-[#06306b]/10 transition-all duration-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* Brand Zone */}
        <div 
          onClick={() => onScrollToSection('hero')} 
          className="cursor-pointer flex items-center gap-3 shrink-0 group"
        >
          <div className="w-10 h-10 rounded-full bg-[#f05a2d] text-white flex items-center justify-center font-bebas text-xl shadow-md group-hover:scale-105 transition-transform">
            <Waves className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bebas text-2xl sm:text-3xl tracking-wide text-[#06306b] leading-none">
              RÉSIDENCE ISNI
            </span>
            <span className="font-marker text-xs text-[#f05a2d] tracking-wider leading-none mt-0.5">
              AGADIR · SURF CAMP
            </span>
          </div>
        </div>

        {/* Clean Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-[#06306b] hover:text-[#f05a2d] font-archivo font-semibold text-sm tracking-wide transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Zone */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Google Sheets Status / Config Button */}
          <button
            onClick={onOpenSheetModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-archivo font-bold text-[#06306b] bg-[#e8d9cc]/60 hover:bg-[#e8d9cc] rounded-full border border-[#06306b]/20 transition-all cursor-pointer whitespace-nowrap shrink-0"
            title="Google Sheets & Apps Script"
          >
            <Sheet className="w-3.5 h-3.5 text-[#1f6f78]" />
            <span>Google Sheet</span>
          </button>

          {/* WordPress Theme Exporter Button */}
          <button
            onClick={onOpenWordpressModal}
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-archivo font-bold text-white bg-[#06306b] hover:bg-[#042048] rounded-full shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap shrink-0"
            title="Télécharger le thème WordPress prêt pour cPanel"
          >
            <Download className="w-3.5 h-3.5 text-[#f29acb]" />
            <span>Thème WP (.ZIP)</span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => handleNavClick('reservation')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-archivo font-extrabold uppercase text-white bg-[#f05a2d] hover:bg-[#d44519] rounded-full shadow-md hover:shadow-lg transform active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <Calendar className="w-4 h-4" />
            <span>Réserver</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#06306b] hover:text-[#f05a2d] rounded-lg cursor-pointer"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#f2e8df] border-b border-[#06306b]/20 px-6 py-5 shadow-xl animate-in fade-in duration-200">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left font-archivo font-bold text-base text-[#06306b] hover:text-[#f05a2d] py-1 transition-colors"
              >
                {item.label}
              </button>
            ))}

            <div className="pt-4 border-t border-[#06306b]/15 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSheetModal();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full border border-[#06306b]/20 bg-white/60 text-[#06306b] font-archivo font-bold text-xs"
              >
                <Sheet className="w-4 h-4 text-[#1f6f78]" />
                <span>Intégration Google Sheet & Webhook</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWordpressModal();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[#06306b] text-white font-archivo font-bold text-xs"
              >
                <Download className="w-4 h-4 text-[#f29acb]" />
                <span>Télécharger le thème WordPress (.ZIP)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
