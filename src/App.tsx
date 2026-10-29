import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MarqueeStrip } from './components/MarqueeStrip';
import { WhySection } from './components/WhySection';
import { RoomsSection } from './components/RoomsSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { SurfLevelPage } from './components/SurfLevelPage';
import { BreakfastSection } from './components/BreakfastSection';
import { GoodToKnow } from './components/GoodToKnow';
import { BookingCalendar } from './components/BookingCalendar';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { HOTEL_INFO } from './data/hotelData';
import { SurfLevel } from './types';

export default function App() {
  useEffect(() => {
    const themeUri = (window as Window & { isniData?: { themeUri?: string } }).isniData?.themeUri;
    if (themeUri) {
      document.documentElement.style.setProperty('--isni-surf-photo', `url("${themeUri}/assets/images/surf_lesson_taghazout_1793212942727.jpg")`);
    }
  }, []);
  const [surfLevel, setSurfLevel] = useState<SurfLevel | null>(() => {
    const match = window.location.hash.match(/^#surf-(debutant|intermediaire)$/);
    const pathMatch = window.location.pathname.match(/surf-(debutant|intermediaire)/);
    return (match?.[1] ?? pathMatch?.[1] ?? null) as SurfLevel | null;
  });

  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>(
      '#hero .grid, #hero form, #pourquoi .max-w-\\[1440px\\], #chambres .space-y-12 > div, #activites .max-w-\\[1440px\\], #petit-dejeuner .max-w-\\[1440px\\], #a-savoir .max-w-\\[1440px\\], #reservation .max-w-\\[1440px\\]'
    );
    revealElements.forEach((element) => element.classList.add('scroll-reveal'));

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  // Booking shared state
  const [selectedRoomCode, setSelectedRoomCode] = useState('double');
  const [selectedBreakfastCode, setSelectedBreakfastCode] = useState('none');
  const [selectedActivityIds, setSelectedActivityIds] = useState<string[]>([]);
  
  // Google Sheet URL (stored in localStorage)
  const [googleSheetUrl] = useState<string>(() => {
    const savedUrl = localStorage.getItem('isni_google_sheet_url') || HOTEL_INFO.defaultGoogleSheetUrl;
    return /^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec(?:\?.*)?$/.test(savedUrl) ? savedUrl : '';
  });

  useEffect(() => {
    const syncSurfRoute = () => {
      const match = window.location.hash.match(/^#surf-(debutant|intermediaire)$/);
      const pathMatch = window.location.pathname.match(/surf-(debutant|intermediaire)/);
      setSurfLevel((match?.[1] ?? pathMatch?.[1] ?? null) as SurfLevel | null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', syncSurfRoute);
    window.addEventListener('hashchange', syncSurfRoute);
    return () => {
      window.removeEventListener('popstate', syncSurfRoute);
      window.removeEventListener('hashchange', syncSurfRoute);
    };
  }, []);

  const openSurfLevel = (level: SurfLevel) => {
    window.history.pushState({ surfLevel: level }, '', `#surf-${level}`);
    setSurfLevel(level);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeSurfPage = () => {
    const homeUrl = (window as Window & { isniData?: { homeUrl?: string } }).isniData?.homeUrl || `${window.location.origin}/`;
    window.history.pushState({}, '', homeUrl);
    setSurfLevel(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    if (surfLevel) {
      window.history.pushState({}, '', window.location.pathname + window.location.search);
      setSurfLevel(null);
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectRoomFromSection = (roomCode: string) => {
    setSelectedRoomCode(roomCode);
    scrollToSection('reservation');
  };

  const handleToggleActivity = (activityId: string) => {
    setSelectedActivityIds((selected) => selected.includes(activityId)
      ? selected.filter((id) => id !== activityId)
      : [...selected, activityId]
    );
  };

  return (
    <div className="min-h-screen bg-[#f2e8df] text-[#06306b] flex flex-col font-sans selection:bg-[#f05a2d] selection:text-white">
      <LoadingScreen />
      {/* Top Navigation */}
      <Header
        onScrollToSection={scrollToSection}
        onOpenSurfLevel={openSurfLevel}
      />

      <main className="flex-1">
        {surfLevel ? (
          <SurfLevelPage
            key={surfLevel}
            level={surfLevel}
            selected={selectedActivityIds.includes(`surf-${surfLevel}`)}
            onBack={closeSurfPage}
            onChangeLevel={openSurfLevel}
            onAddToRequest={() => {
              const activityId = `surf-${surfLevel}`;
              setSelectedActivityIds((selected) => selected.includes(activityId) ? selected : [...selected, activityId]);
              window.history.pushState({}, '', window.location.pathname + window.location.search);
              setSurfLevel(null);
              window.setTimeout(() => document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' }), 50);
            }}
          />
        ) : <>
        {/* Hero with quick booking bar */}
        <Hero
          onReserve={() => scrollToSection('reservation')}
          onExploreRooms={() => scrollToSection('chambres')}
        />

        {/* Animated residence highlights banner */}
        <MarqueeStrip />

        {/* Why Choose Résidence ISNI Section */}
        <WhySection />

        {/* 50/50 Split Room Showcase Panels */}
        <RoomsSection onSelectRoom={handleSelectRoomFromSection} />

        {/* Activities and excursions available to residence guests */}
        <ActivitiesSection onOpenSurfLevel={openSurfLevel} />

        {/* Breakfast Menu Section with real attached visual */}
        <BreakfastSection
          selectedBreakfast={selectedBreakfastCode}
          onSelectBreakfast={setSelectedBreakfastCode}
        />

        {/* Informations pratiques */}
        <GoodToKnow />

        {/* Booking form */}
        <BookingCalendar
          initialRoomCode={selectedRoomCode}
          initialBreakfastCode={selectedBreakfastCode}
          onBreakfastChange={setSelectedBreakfastCode}
          selectedActivityIds={selectedActivityIds}
          onToggleActivity={handleToggleActivity}
          googleSheetUrl={googleSheetUrl}
        />
        </>}
      </main>

      {/* Footer */}
      <Footer onScrollToSection={scrollToSection} />
    </div>
  );
}
