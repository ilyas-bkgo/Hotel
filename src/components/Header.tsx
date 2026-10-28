import React, { useState } from 'react';
import { ChevronDown, Menu, X, Waves } from 'lucide-react';
import { SurfLevel } from '../types';

interface HeaderProps {
  onScrollToSection: (id: string) => void;
  onOpenSurfLevel: (level: SurfLevel) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onScrollToSection,
  onOpenSurfLevel,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [surfMenuOpen, setSurfMenuOpen] = useState(false);

  const navItems = [
    { label: 'Pourquoi Nous', id: 'pourquoi' },
    { label: 'Chambres', id: 'chambres' },
    { label: 'Petit-Déjeuner', id: 'petit-dejeuner' },
    { label: 'À Savoir', id: 'a-savoir' },
  ];

  const handleNavClick = (id: string) => {
    onScrollToSection(id);
    setMobileMenuOpen(false);
    setSurfMenuOpen(false);
  };

  const handleSurfClick = (level: SurfLevel) => {
    onOpenSurfLevel(level);
    setMobileMenuOpen(false);
    setSurfMenuOpen(false);
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
          {navItems.slice(0, 2).map((item) => (
            <button key={item.id} onClick={() => handleNavClick(item.id)} className="shrink-0 cursor-pointer whitespace-nowrap font-archivo text-sm font-semibold tracking-wide text-[#06306b] transition-colors hover:text-[#f05a2d]">{item.label}</button>
          ))}
          <div className="relative">
            <button type="button" aria-expanded={surfMenuOpen} onClick={() => setSurfMenuOpen((open) => !open)} className="inline-flex shrink-0 cursor-pointer items-center gap-1 whitespace-nowrap font-archivo text-sm font-semibold tracking-wide text-[#06306b] transition-colors hover:text-[#f05a2d]">Surf <ChevronDown className={`h-4 w-4 transition-transform ${surfMenuOpen ? 'rotate-180' : ''}`} /></button>
            {surfMenuOpen && <div className="absolute left-0 top-full z-50 mt-3 min-w-48 rounded-xl border border-[#06306b]/10 bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200"><button onClick={() => handleSurfClick('debutant')} className="block w-full rounded-lg px-4 py-3 text-left font-archivo text-sm font-bold text-[#06306b] transition hover:bg-[#f2e8df] hover:text-[#f05a2d]">Débutant</button><button onClick={() => handleSurfClick('intermediaire')} className="block w-full rounded-lg px-4 py-3 text-left font-archivo text-sm font-bold text-[#06306b] transition hover:bg-[#f2e8df] hover:text-[#f05a2d]">Intermédiaire</button></div>}
          </div>
          {navItems.slice(2).map((item) => (
            <button key={item.id} onClick={() => handleNavClick(item.id)} className="shrink-0 cursor-pointer whitespace-nowrap font-archivo text-sm font-semibold tracking-wide text-[#06306b] transition-colors hover:text-[#f05a2d]">{item.label}</button>
          ))}
        </nav>

        {/* Navigation toggle stays available without exposing project tools or a booking CTA. */}
        <div className="flex items-center gap-3 shrink-0">
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
            {navItems.slice(0, 2).map((item) => <button key={item.id} onClick={() => handleNavClick(item.id)} className="py-1 text-left font-archivo text-base font-bold text-[#06306b] transition-colors hover:text-[#f05a2d]">{item.label}</button>)}
            <p className="pt-1 font-archivo text-xs font-black uppercase tracking-widest text-[#f05a2d]">Surf</p>
            <button onClick={() => handleSurfClick('debutant')} className="py-1 pl-3 text-left font-archivo text-base font-bold text-[#06306b] transition-colors hover:text-[#f05a2d]">Débutant</button>
            <button onClick={() => handleSurfClick('intermediaire')} className="py-1 pl-3 text-left font-archivo text-base font-bold text-[#06306b] transition-colors hover:text-[#f05a2d]">Intermédiaire</button>
            {navItems.slice(2).map((item) => <button key={item.id} onClick={() => handleNavClick(item.id)} className="py-1 text-left font-archivo text-base font-bold text-[#06306b] transition-colors hover:text-[#f05a2d]">{item.label}</button>)}

          </div>
        </div>
      )}
    </header>
  );
};
