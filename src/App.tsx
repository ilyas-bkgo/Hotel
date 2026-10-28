import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MarqueeStrip } from './components/MarqueeStrip';
import { WhySection } from './components/WhySection';
import { RoomsSection } from './components/RoomsSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { BreakfastSection } from './components/BreakfastSection';
import { GoodToKnow } from './components/GoodToKnow';
import { BookingCalendar } from './components/BookingCalendar';
import { Footer } from './components/Footer';
import { WordpressExportModal } from './components/WordpressExportModal';
import { GoogleSheetModal } from './components/GoogleSheetModal';
import { HOTEL_INFO } from './data/hotelData';
import { BookingRecord } from './types';

export default function App() {
  const [isWordpressModalOpen, setIsWordpressModalOpen] = useState(false);
  const [isSheetModalOpen, setIsSheetModalOpen] = useState(false);

  // Booking shared state
  const [selectedRoomCode, setSelectedRoomCode] = useState('standard');
  const [selectedBreakfastCode, setSelectedBreakfastCode] = useState('beldi');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  
  // Google Sheet URL (stored in localStorage)
  const [googleSheetUrl, setGoogleSheetUrl] = useState<string>(() => {
    return localStorage.getItem('isni_google_sheet_url') || HOTEL_INFO.defaultGoogleSheetUrl;
  });

  // Recent bookings history in session
  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem('isni_recent_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleUpdateSheetUrl = (newUrl: string) => {
    setGoogleSheetUrl(newUrl);
    localStorage.setItem('isni_google_sheet_url', newUrl);
  };

  const handleNewBooking = (record: BookingRecord) => {
    const updated = [record, ...bookings];
    setBookings(updated);
    try {
      localStorage.setItem('isni_recent_bookings', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickBookFromHero = (inDate: string, outDate: string, room: string) => {
    setCheckInDate(inDate);
    setCheckOutDate(outDate);
    setSelectedRoomCode(room);
    scrollToSection('reservation');
  };

  const handleSelectRoomFromSection = (roomCode: string) => {
    setSelectedRoomCode(roomCode);
    scrollToSection('reservation');
  };

  const handleSelectActivityNote = (activityTitle: string) => {
    scrollToSection('reservation');
  };

  return (
    <div className="min-h-screen bg-[#f2e8df] text-[#06306b] flex flex-col font-sans selection:bg-[#f05a2d] selection:text-white">
      {/* Top Navigation */}
      <Header
        onOpenWordpressModal={() => setIsWordpressModalOpen(true)}
        onOpenSheetModal={() => setIsSheetModalOpen(true)}
        onScrollToSection={scrollToSection}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Hero with quick booking bar */}
        <Hero
          onQuickBook={handleQuickBookFromHero}
          onExploreRooms={() => scrollToSection('chambres')}
        />

        {/* Surf Camp animated Marquee Banner */}
        <MarqueeStrip />

        {/* Why Choose Résidence ISNI Section */}
        <WhySection />

        {/* 50/50 Split Room Showcase Panels */}
        <RoomsSection onSelectRoom={handleSelectRoomFromSection} />

        {/* Activities & Excursions inspired by Desert Surf Camp */}
        <ActivitiesSection onSelectActivityNote={handleSelectActivityNote} />

        {/* Breakfast Menu Section with real attached visual */}
        <BreakfastSection
          selectedBreakfast={selectedBreakfastCode}
          onSelectBreakfast={setSelectedBreakfastCode}
        />

        {/* "À Savoir" Practical Info (No parking mention) */}
        <GoodToKnow />

        {/* Visual Booking Calendar & Google Sheets Sync */}
        <BookingCalendar
          initialRoomCode={selectedRoomCode}
          initialCheckIn={checkInDate}
          initialCheckOut={checkOutDate}
          initialBreakfastCode={selectedBreakfastCode}
          googleSheetUrl={googleSheetUrl}
          onBookingSubmitted={handleNewBooking}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenWordpressModal={() => setIsWordpressModalOpen(true)}
        onOpenSheetModal={() => setIsSheetModalOpen(true)}
        onScrollToSection={scrollToSection}
      />

      {/* WordPress Theme (.ZIP) Exporter Modal */}
      <WordpressExportModal
        isOpen={isWordpressModalOpen}
        onClose={() => setIsWordpressModalOpen(false)}
      />

      {/* Google Sheets Configuration & History Modal */}
      <GoogleSheetModal
        isOpen={isSheetModalOpen}
        onClose={() => setIsSheetModalOpen(false)}
        googleSheetUrl={googleSheetUrl}
        onUpdateGoogleSheetUrl={handleUpdateSheetUrl}
        bookings={bookings}
      />
    </div>
  );
}
