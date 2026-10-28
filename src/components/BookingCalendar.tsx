import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  Send, 
  Coffee, 
  Sparkles,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ROOMS, BREAKFAST_FORMULAS, HOTEL_INFO } from '../data/hotelData';
import { BookingFormState, BookingRecord } from '../types';

interface BookingCalendarProps {
  initialRoomCode?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialBreakfastCode?: string;
  onBookingSubmitted?: (record: BookingRecord) => void;
  googleSheetUrl: string;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({
  initialRoomCode = 'standard',
  initialCheckIn,
  initialCheckOut,
  initialBreakfastCode = 'beldi',
  onBookingSubmitted,
  googleSheetUrl,
}) => {
  // Dates initialization
  const today = useMemo(() => new Date(), []);
  const todayStr = useMemo(() => today.toISOString().split('T')[0], [today]);

  const defaultIn = useMemo(() => {
    if (initialCheckIn) return initialCheckIn;
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, [initialCheckIn]);

  const defaultOut = useMemo(() => {
    if (initialCheckOut) return initialCheckOut;
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toISOString().split('T')[0];
  }, [initialCheckOut]);

  // Form State
  const [form, setForm] = useState<BookingFormState>({
    checkIn: defaultIn,
    checkOut: defaultOut,
    roomCode: initialRoomCode,
    guests: 2,
    breakfastCode: initialBreakfastCode,
    fullName: '',
    email: '',
    phone: '',
    notes: '',
    websiteHoneypot: '',
  });

  // Calendar display month state
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  // Submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<BookingRecord | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Sync external changes
  React.useEffect(() => {
    if (initialRoomCode) setForm(prev => ({ ...prev, roomCode: initialRoomCode }));
  }, [initialRoomCode]);

  React.useEffect(() => {
    if (initialBreakfastCode) setForm(prev => ({ ...prev, breakfastCode: initialBreakfastCode }));
  }, [initialBreakfastCode]);

  React.useEffect(() => {
    if (initialCheckIn) setForm(prev => ({ ...prev, checkIn: initialCheckIn }));
    if (initialCheckOut) setForm(prev => ({ ...prev, checkOut: initialCheckOut }));
  }, [initialCheckIn, initialCheckOut]);

  // Calculation helpers
  const nights = useMemo(() => {
    if (!form.checkIn || !form.checkOut) return 1;
    const d1 = new Date(form.checkIn);
    const d2 = new Date(form.checkOut);
    const diff = Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [form.checkIn, form.checkOut]);

  const selectedRoom = useMemo(() => {
    return ROOMS.find(r => r.code === form.roomCode) || ROOMS[0];
  }, [form.roomCode]);

  const selectedBreakfast = useMemo(() => {
    return BREAKFAST_FORMULAS.find(b => b.code === form.breakfastCode);
  }, [form.breakfastCode]);

  const roomTotalPrice = nights * selectedRoom.priceMAD;
  const breakfastUnitPrice = selectedBreakfast ? selectedBreakfast.priceDH : 0;
  const breakfastTotalPrice = nights * breakfastUnitPrice * form.guests;
  const totalStayPrice = roomTotalPrice + breakfastTotalPrice;

  // Calendar generation helpers
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 is Sun
  // Convert so Monday is 0
  const startOffset = (firstDayOfWeek + 6) % 7;

  const handlePrevMonth = () => {
    setCurrentMonthDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleDateClick = (dateStr: string) => {
    if (dateStr < todayStr) return; // cannot select past

    if (!form.checkIn || (form.checkIn && form.checkOut)) {
      // Start new selection
      setForm(prev => ({ ...prev, checkIn: dateStr, checkOut: '' }));
    } else {
      // Second click: if clicked before checkIn, set as new checkIn
      if (dateStr <= form.checkIn) {
        setForm(prev => ({ ...prev, checkIn: dateStr, checkOut: '' }));
      } else {
        setForm(prev => ({ ...prev, checkOut: dateStr }));
      }
    }
  };

  const isSelectedRange = (dateStr: string) => {
    if (!form.checkIn) return false;
    if (dateStr === form.checkIn) return 'start';
    if (dateStr === form.checkOut) return 'end';
    if (form.checkIn && form.checkOut && dateStr > form.checkIn && dateStr < form.checkOut) {
      return 'middle';
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    // Anti-spam honeypot
    if (form.websiteHoneypot) {
      setSubmissionError('Validation anti-spam échouée.');
      return;
    }

    if (!form.checkIn || !form.checkOut) {
      setSubmissionError('Veuillez sélectionner vos dates d’arrivée et de départ.');
      return;
    }

    if (!form.fullName || !form.email || !form.phone) {
      setSubmissionError('Veuillez renseigner votre nom, email et téléphone.');
      return;
    }

    setIsSubmitting(true);

    const bookingId = `ISNI-${Date.now().toString().slice(-6)}`;
    const newRecord: BookingRecord = {
      ...form,
      id: bookingId,
      nights,
      roomPrice: roomTotalPrice,
      breakfastPrice: breakfastTotalPrice,
      totalPriceMAD: totalStayPrice,
      status: 'en_attente',
      createdAt: new Date().toISOString(),
    };

    try {
      // Real sync with Google Apps Script Web App if configured
      if (googleSheetUrl && googleSheetUrl.startsWith('http')) {
        try {
          await fetch(googleSheetUrl, {
            method: 'POST',
            mode: 'no-cors', // Standard Google Apps Script cross-origin Web App mode
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: bookingId,
              timestamp: new Date().toLocaleString('fr-FR'),
              fullName: form.fullName,
              email: form.email,
              phone: form.phone,
              roomType: selectedRoom.name,
              checkIn: form.checkIn,
              checkOut: form.checkOut,
              nights,
              guests: form.guests,
              breakfast: selectedBreakfast ? `${selectedBreakfast.name} (${selectedBreakfast.priceDH} DH)` : 'Aucun',
              totalPriceMAD: totalStayPrice,
              status: 'en_attente',
              notes: form.notes,
            }),
          });
        } catch (sheetErr) {
          console.warn('Google Sheet endpoint webhook warning:', sheetErr);
        }
      }

      // Trigger Confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f05a2d', '#06306b', '#f29acb', '#1f6f78'],
      });

      setSubmissionSuccess(newRecord);
      if (onBookingSubmitted) {
        onBookingSubmitted(newRecord);
      }
    } catch (err: any) {
      setSubmissionError('Une erreur est survenue lors de l’envoi. Veuillez réessayer ou utiliser WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Bonjour Résidence ISNI Agadir !\n` +
      `Je souhaite réserver un séjour :\n` +
      `• Chambre : ${selectedRoom.name}\n` +
      `• Dates : du ${form.checkIn || '...'} au ${form.checkOut || '...'} (${nights} nuits)\n` +
      `• Personnes : ${form.guests}\n` +
      `• Petit-déjeuner : ${selectedBreakfast ? selectedBreakfast.name : 'Sans formule'}\n` +
      `• Estimation : ${totalStayPrice} MAD\n` +
      `• Nom : ${form.fullName || 'Client'}\n` +
      `Merci de me confirmer la disponibilité !`
    );
    const cleanNum = HOTEL_INFO.whatsapp.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanNum}?text=${text}`;
  };

  return (
    <section id="reservation" className="py-20 lg:py-28 bg-[#f2e8df] relative overflow-hidden">
      
      {/* Ghost Background Title */}
      <div 
        aria-hidden="true" 
        className="ghost-title absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-25 pointer-events-none select-none z-0"
      >
        BOOK YOUR STAY
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-marker text-lg text-[#f05a2d] tracking-wide inline-block -rotate-1 mb-2">
            Disponibilité & Tarifs en Direct
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl text-[#06306b] tracking-tight leading-none mb-3">
            CALENDRIER DE RÉSERVATION ISNI
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#06306b]/80">
            Interface fluide type Booking.com : sélectionnez vos dates, visualisez le total en temps réel et recevez votre confirmation instantanée synchronisée avec Google Sheets.
          </p>
        </div>

        {/* Success Modal Notification */}
        {submissionSuccess && (
          <div className="mb-12 max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border-4 border-[#1f6f78] animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#cfe5d8] text-[#1f6f78] flex items-center justify-center shrink-0">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div>
                <span className="font-marker text-xs text-[#1f6f78] uppercase tracking-wider block">
                  Demande Enregistrée avec Succès !
                </span>
                <h3 className="font-bebas text-3xl text-[#06306b] leading-tight">
                  RÉSERVATION #{submissionSuccess.id}
                </h3>
              </div>
            </div>

            <p className="font-sans text-sm sm:text-base text-[#06306b]/80 mb-6 leading-relaxed">
              Merci <strong className="text-[#06306b]">{submissionSuccess.fullName}</strong> ! Votre demande pour <strong>{selectedRoom.name}</strong> du <strong>{submissionSuccess.checkIn}</strong> au <strong>{submissionSuccess.checkOut}</strong> ({submissionSuccess.nights} nuits) a bien été envoyée à notre réception et enregistrée dans le Google Sheet.
            </p>

            <div className="bg-[#f2e8df] p-4 rounded-2xl mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-archivo text-[#06306b]">
              <div>
                <span className="text-gray-500 block">Voyageurs</span>
                <strong>{submissionSuccess.guests} personnes</strong>
              </div>
              <div>
                <span className="text-gray-500 block">Petit-déjeuner</span>
                <strong>{selectedBreakfast ? selectedBreakfast.name : 'Aucun'}</strong>
              </div>
              <div>
                <span className="text-gray-500 block">Total estimé</span>
                <strong className="text-[#f05a2d] font-bold text-sm">{submissionSuccess.totalPriceMAD} MAD</strong>
              </div>
              <div>
                <span className="text-gray-500 block">Statut</span>
                <span className="inline-block bg-[#06306b] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase">En attente</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-archivo font-bold text-xs uppercase tracking-wider rounded-full shadow-md flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirmer plus vite par WhatsApp</span>
              </a>

              <button
                onClick={() => setSubmissionSuccess(null)}
                className="px-6 py-3 bg-[#06306b] hover:bg-[#042048] text-white font-archivo font-bold text-xs uppercase tracking-wider rounded-full shadow-md"
              >
                Faire une autre réservation
              </button>
            </div>
          </div>
        )}

        {/* Main Booking Interface Container */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#06306b]/10 p-6 sm:p-10 lg:p-12">
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Honeypot hidden input */}
            <input
              type="text"
              name="website"
              value={form.websiteHoneypot}
              onChange={(e) => setForm({ ...form, websiteHoneypot: e.target.value })}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* LEFT SIDE: Interactive Visual Calendar & Stay Specs (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              
              <div>
                {/* Step indicator */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-7 h-7 rounded-full bg-[#f05a2d] text-white font-bebas text-lg flex items-center justify-center">
                    1
                  </span>
                  <h3 className="font-bebas text-2xl sm:text-3xl text-[#06306b] tracking-wide">
                    CHOISISSEZ VOS DATES DE SÉJOUR
                  </h3>
                </div>

                {/* Calendar Navigation Month Header */}
                <div className="bg-[#f2e8df] rounded-2xl p-4 mb-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    className="p-2 rounded-xl bg-white hover:bg-[#06306b] hover:text-white text-[#06306b] transition-colors cursor-pointer shadow-sm"
                    aria-label="Mois précédent"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="text-center">
                    <span className="font-bebas text-2xl text-[#06306b] tracking-wide block">
                      {monthNames[month]} {year}
                    </span>
                    <span className="text-[11px] font-archivo text-[#06306b]/70 font-semibold">
                      Sélectionnez votre date d'arrivée puis de départ
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="p-2 rounded-xl bg-white hover:bg-[#06306b] hover:text-white text-[#06306b] transition-colors cursor-pointer shadow-sm"
                    aria-label="Mois suivant"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Weekdays Row */}
                <div className="grid grid-cols-7 gap-1 text-center font-archivo font-bold text-xs text-[#06306b]/70 mb-2">
                  <span>LUN</span>
                  <span>MAR</span>
                  <span>MER</span>
                  <span>JEU</span>
                  <span>VEN</span>
                  <span>SAM</span>
                  <span>DIM</span>
                </div>

                {/* Calendar Grid of Days */}
                <div className="grid grid-cols-7 gap-1.5 mb-6">
                  {/* Empty offset spaces */}
                  {Array.from({ length: startOffset }).map((_, idx) => (
                    <div key={`empty-${idx}`} className="h-10 sm:h-12" />
                  ))}

                  {/* Month days */}
                  {Array.from({ length: daysInMonth }).map((_, idx) => {
                    const dayNum = idx + 1;
                    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                    const isPast = dateStr < todayStr;
                    const rangeState = isSelectedRange(dateStr);

                    let buttonClasses = 'h-10 sm:h-12 rounded-xl font-archivo text-xs sm:text-sm font-bold flex flex-col items-center justify-center transition-all cursor-pointer relative ';

                    if (isPast) {
                      buttonClasses += 'text-gray-300 bg-gray-50/50 cursor-not-allowed';
                    } else if (rangeState === 'start' || rangeState === 'end') {
                      buttonClasses += 'bg-[#f05a2d] text-white shadow-md scale-105 z-10';
                    } else if (rangeState === 'middle') {
                      buttonClasses += 'bg-[#f05a2d]/20 text-[#06306b] font-extrabold';
                    } else {
                      buttonClasses += 'bg-[#f2e8df]/50 hover:bg-[#cfe5d8] text-[#06306b]';
                    }

                    return (
                      <button
                        type="button"
                        key={dateStr}
                        disabled={isPast}
                        onClick={() => handleDateClick(dateStr)}
                        className={buttonClasses}
                      >
                        <span>{dayNum}</span>
                        {rangeState === 'start' && (
                          <span className="text-[8px] uppercase tracking-tighter leading-none -mt-0.5">Arrivée</span>
                        )}
                        {rangeState === 'end' && (
                          <span className="text-[8px] uppercase tracking-tighter leading-none -mt-0.5">Départ</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Date display banner */}
                <div className="bg-[#cfe5d8]/40 border border-[#1f6f78]/20 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs font-archivo text-[#06306b]">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-[#f05a2d]" />
                    <span>
                      Séjour : <strong>{form.checkIn || '...'}</strong> au <strong>{form.checkOut || '...'}</strong>
                    </span>
                  </div>
                  <span className="bg-[#1f6f78] text-white font-bold px-2.5 py-1 rounded-full text-xs">
                    {nights} {nights > 1 ? 'nuits' : 'nuit'}
                  </span>
                </div>

              </div>

              {/* Room and Formula Pickers under the Calendar */}
              <div className="mt-8 space-y-4 pt-6 border-t border-[#06306b]/10">
                
                {/* Room selector */}
                <div>
                  <label className="block text-xs font-archivo font-bold text-[#06306b] uppercase tracking-wider mb-2">
                    Type de Chambre (Total 29 chambres)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {ROOMS.map((r) => {
                      const isRSelected = form.roomCode === r.code;
                      return (
                        <button
                          type="button"
                          key={r.code}
                          onClick={() => setForm({ ...form, roomCode: r.code })}
                          className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                            isRSelected
                              ? 'border-[#f05a2d] bg-[#f05a2d]/5 shadow-sm'
                              : 'border-[#06306b]/15 bg-white hover:border-[#06306b]'
                          }`}
                        >
                          <span className="block font-bebas text-lg text-[#06306b] leading-tight">
                            {r.name}
                          </span>
                          <span className="font-archivo text-xs font-extrabold text-[#f05a2d]">
                            {r.priceMAD} MAD / nuit
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Breakfast selector */}
                <div>
                  <label className="block text-xs font-archivo font-bold text-[#06306b] uppercase tracking-wider mb-2">
                    Formule Petit-Déjeuner
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, breakfastCode: 'none' })}
                      className={`p-2.5 rounded-xl border-2 text-center transition-all cursor-pointer ${
                        form.breakfastCode === 'none'
                          ? 'border-[#06306b] bg-[#06306b] text-white'
                          : 'border-[#06306b]/15 bg-white text-[#06306b]'
                      }`}
                    >
                      <span className="block text-xs font-archivo font-bold">Sans formule</span>
                      <span className="text-[10px] opacity-80">0 DH</span>
                    </button>

                    {BREAKFAST_FORMULAS.map((b) => {
                      const isBSelected = form.breakfastCode === b.code;
                      return (
                        <button
                          type="button"
                          key={b.code}
                          onClick={() => setForm({ ...form, breakfastCode: b.code })}
                          className={`p-2.5 rounded-xl border-2 text-center transition-all cursor-pointer ${
                            isBSelected
                              ? 'border-[#f05a2d] bg-[#f05a2d] text-white'
                              : 'border-[#06306b]/15 bg-white text-[#06306b]'
                          }`}
                        >
                          <span className="block text-xs font-archivo font-bold">{b.name}</span>
                          <span className="text-[10px] opacity-80">+{b.priceDH} DH/j</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT SIDE: Guest Details & Dynamic Pricing Receipt (5 Cols) */}
            <div className="lg:col-span-5 bg-[#faf5f0] p-6 sm:p-8 rounded-3xl border-2 border-[#06306b]/10 flex flex-col justify-between">
              
              <div>
                {/* Step indicator */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-7 h-7 rounded-full bg-[#06306b] text-white font-bebas text-lg flex items-center justify-center">
                    2
                  </span>
                  <h3 className="font-bebas text-2xl sm:text-3xl text-[#06306b] tracking-wide">
                    VOS COORDONNÉES
                  </h3>
                </div>

                {/* Form fields */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-xs font-archivo font-bold text-[#06306b] mb-1">
                      Nombre de Voyageurs
                    </label>
                    <select
                      value={form.guests}
                      onChange={(e) => setForm({ ...form, guests: parseInt(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#06306b]/20 bg-white font-archivo text-xs sm:text-sm text-[#06306b] focus:ring-2 focus:ring-[#f05a2d]"
                    >
                      <option value={1}>1 Adulte</option>
                      <option value={2}>2 Adultes</option>
                      <option value={3}>3 Adultes</option>
                      <option value={4}>4 Adultes (Capacité Suite)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-archivo font-bold text-[#06306b] mb-1">
                      Nom et Prénom *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="Ex: Yassine Benali"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#06306b]/20 bg-white font-archivo text-xs sm:text-sm text-[#06306b] focus:ring-2 focus:ring-[#f05a2d]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-archivo font-bold text-[#06306b] mb-1">
                      Email de Confirmation *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        placeholder="contact@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#06306b]/20 bg-white font-archivo text-xs sm:text-sm text-[#06306b] focus:ring-2 focus:ring-[#f05a2d]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-archivo font-bold text-[#06306b] mb-1">
                      Téléphone / WhatsApp *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        placeholder="+212 6 00 00 00 00"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#06306b]/20 bg-white font-archivo text-xs sm:text-sm text-[#06306b] focus:ring-2 focus:ring-[#f05a2d]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-archivo font-bold text-[#06306b] mb-1">
                      Demandes particulières / Activités souhaitées
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Ex: cours de surf à Taghazout, heure d'arrivée tardive..."
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#06306b]/20 bg-white font-archivo text-xs sm:text-sm text-[#06306b] focus:ring-2 focus:ring-[#f05a2d]"
                    />
                  </div>
                </div>

                {/* Error message banner */}
                {submissionError && (
                  <div className="mb-4 p-3 rounded-xl bg-red-100 text-red-800 text-xs font-archivo">
                    {submissionError}
                  </div>
                )}

                {/* Price Breakdown Receipt */}
                <div className="bg-white rounded-2xl p-5 border border-[#06306b]/15 mb-6 space-y-2.5 text-xs font-archivo text-[#06306b]">
                  <div className="flex justify-between items-center text-gray-600">
                    <span>
                      {selectedRoom.name} ({nights} nuits × {selectedRoom.priceMAD} MAD)
                    </span>
                    <span className="font-bold text-[#06306b]">{roomTotalPrice} MAD</span>
                  </div>

                  {selectedBreakfast ? (
                    <div className="flex justify-between items-center text-gray-600">
                      <span>
                        Petit-déj {selectedBreakfast.name} ({form.guests} pers × {nights} j × {selectedBreakfast.priceDH} DH)
                      </span>
                      <span className="font-bold text-[#1f6f78]">+{breakfastTotalPrice} MAD</span>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center text-gray-400">
                      <span>Petit-déjeuner non inclus</span>
                      <span>0 MAD</span>
                    </div>
                  )}

                  <div className="pt-3 border-t-2 border-dashed border-[#06306b]/20 flex justify-between items-baseline">
                    <span className="font-bold text-sm text-[#06306b]">Total Estimé :</span>
                    <span className="font-bebas text-3xl text-[#f05a2d] leading-none">
                      {totalStayPrice} MAD
                    </span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#f05a2d] hover:bg-[#d44519] disabled:opacity-60 text-white font-archivo font-black text-sm uppercase tracking-wider rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande de réservation'}
                  </span>
                </button>

                <div className="text-center">
                  <span className="text-[11px] font-archivo text-gray-500 block mb-1.5">
                    Ou réservez instantanément via messagerie directe :
                  </span>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-archivo font-bold text-[#25D366] hover:underline"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Contacter la réception sur WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>

          </form>

        </div>

      </div>
    </section>
  );
};
