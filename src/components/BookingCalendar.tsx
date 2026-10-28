import React, { useState, useMemo } from 'react';
import {
  User, 
  Mail, 
  Phone, 
  CheckCircle, 
  X,
  Send, 
  MessageCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ROOMS, BREAKFAST_FORMULAS, ACTIVITIES, HOTEL_INFO } from '../data/hotelData';
import { BookingFormState, BookingRecord } from '../types';
import { formatLocalDate } from '../utils/date';

interface BookingCalendarProps {
  initialRoomCode?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialBreakfastCode?: string;
  onBreakfastChange: (code: string) => void;
  selectedActivityIds: string[];
  onToggleActivity: (activityId: string) => void;
  googleSheetUrl: string;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({
  initialRoomCode = 'double',
  initialCheckIn,
  initialCheckOut,
  initialBreakfastCode = 'none',
  onBreakfastChange,
  selectedActivityIds = [],
  onToggleActivity,
  googleSheetUrl,
}) => {
  // Dates initialization
  const today = useMemo(() => new Date(), []);
  const todayStr = useMemo(() => formatLocalDate(today), [today]);

  // Form State
  const [form, setForm] = useState<BookingFormState>({
    checkIn: initialCheckIn || '',
    checkOut: initialCheckOut || '',
    roomCode: initialRoomCode,
    guests: ROOMS.find(room => room.code === initialRoomCode)?.capacity ?? 2,
    breakfastCode: initialBreakfastCode,
    activities: [],
    fullName: '',
    email: '',
    phone: '',
    notes: '',
    websiteHoneypot: '',
  });

  // Submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<BookingRecord | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Sync external changes
  React.useEffect(() => {
    if (initialRoomCode) setForm(prev => ({ ...prev, roomCode: initialRoomCode, guests: ROOMS.find(room => room.code === initialRoomCode)?.capacity ?? prev.guests }));
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
    if (!form.checkIn || !form.checkOut) return 0;
    const [inYear, inMonth, inDay] = form.checkIn.split('-').map(Number);
    const [outYear, outMonth, outDay] = form.checkOut.split('-').map(Number);
    const start = Date.UTC(inYear, inMonth - 1, inDay);
    const end = Date.UTC(outYear, outMonth - 1, outDay);
    return end > start ? Math.round((end - start) / 86_400_000) : 0;
  }, [form.checkIn, form.checkOut]);

  const selectedRoom = useMemo(() => {
    return ROOMS.find(r => r.code === form.roomCode) || ROOMS[0];
  }, [form.roomCode]);

  const selectedBreakfast = useMemo(() => {
    return BREAKFAST_FORMULAS.find(b => b.code === form.breakfastCode);
  }, [form.breakfastCode]);

  const selectedActivities = useMemo(
    () => ACTIVITIES.filter((activity) => selectedActivityIds.includes(activity.id)),
    [selectedActivityIds]
  );

  const roomTotalPrice = nights * selectedRoom.priceMAD;
  const breakfastUnitPrice = selectedBreakfast ? selectedBreakfast.priceDH : 0;
  const breakfastTotalPrice = nights * breakfastUnitPrice * form.guests;
  const totalStayPrice = roomTotalPrice + breakfastTotalPrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    // Anti-spam honeypot
    if (form.websiteHoneypot) {
      setSubmissionError('Validation anti-spam échouée.');
      return;
    }

    if (!form.checkIn || !form.checkOut || nights < 1) {
      setSubmissionError('Veuillez sélectionner vos dates d’arrivée et de départ.');
      return;
    }

    if (!form.fullName || !form.email || !form.phone) {
      setSubmissionError('Veuillez renseigner votre nom, email et téléphone.');
      return;
    }

    if (!/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec(?:\?.*)?$/.test(googleSheetUrl)) {
      setSubmissionError('La réservation en ligne n’est pas encore connectée. Contactez-nous via WhatsApp pour envoyer votre demande.');
      return;
    }

    setIsSubmitting(true);

    const bookingId = `ISNI-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    const newRecord: BookingRecord = {
      ...form,
      activities: selectedActivities.map((activity) => activity.title),
      id: bookingId,
      nights,
      roomPrice: roomTotalPrice,
      breakfastPrice: breakfastTotalPrice,
      totalPriceMAD: totalStayPrice,
      status: 'en_attente',
      createdAt: new Date().toISOString(),
    };

    try {
      // Apps Script accepts this simple cross-origin POST, but no-cors makes its
      // response unreadable. The UI must therefore describe this as submitted,
      // never as a verified spreadsheet write or a confirmed booking.
      await fetch(googleSheetUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          id: bookingId,
          timestamp: new Date().toLocaleString('fr-FR'),
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          roomType: selectedRoom.name,
          roomCode: selectedRoom.code,
          checkIn: form.checkIn,
          checkOut: form.checkOut,
          nights,
          guests: form.guests,
          breakfast: selectedBreakfast ? `${selectedBreakfast.name} (${selectedBreakfast.priceDH} DH)` : 'Aucun',
          breakfastCode: form.breakfastCode,
          roomPriceMAD: roomTotalPrice,
          breakfastPriceMAD: breakfastTotalPrice,
          activities: selectedActivities.map((activity) => activity.title).join(', '),
          totalPriceMAD: totalStayPrice,
          status: 'en_attente',
          notes: form.notes,
          websiteHoneypot: form.websiteHoneypot,
        }),
      });

      // Trigger Confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f05a2d', '#06306b', '#f29acb', '#1f6f78'],
      });

      setSubmissionSuccess(newRecord);
    } catch (err: any) {
      setSubmissionError('Une erreur est survenue lors de l’envoi. Veuillez réessayer ou utiliser WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppLink = (record?: BookingRecord) => {
    const room = ROOMS.find(item => item.code === (record?.roomCode ?? form.roomCode)) || ROOMS[0];
    const breakfast = BREAKFAST_FORMULAS.find(item => item.code === (record?.breakfastCode ?? form.breakfastCode));
    const guests = record?.guests ?? form.guests;
    const checkIn = record?.checkIn ?? form.checkIn;
    const checkOut = record?.checkOut ?? form.checkOut;
    const nightsCount = record?.nights ?? nights;
    const name = record?.fullName ?? form.fullName;
    const email = record?.email ?? form.email;
    const phone = record?.phone ?? form.phone;
    const notes = record?.notes ?? form.notes;
    const roomTotal = record?.roomPrice ?? roomTotalPrice;
    const breakfastTotal = record?.breakfastPrice ?? breakfastTotalPrice;
    const total = record?.totalPriceMAD ?? totalStayPrice;
    const activities = record?.activities ?? selectedActivities.map((activity) => activity.title);
    const text = encodeURIComponent(
      `Bonjour Résidence ISNI Agadir !\n` +
      `Je souhaite réserver un séjour :\n` +
      `• Hébergement : ${room.name}\n` +
      `• Dates : du ${checkIn || '...'} au ${checkOut || '...'} (${nightsCount} nuits)\n` +
      `• Voyageurs : ${guests}\n` +
      `• Petit-déjeuner : ${breakfast ? `${breakfast.name} (${breakfast.priceDH} DH/personne/jour)` : 'Aucun'}\n` +
      `• Prix chambre : ${roomTotal} MAD\n` +
      `• Prix petits-déjeuners : ${breakfastTotal} MAD\n` +
      (activities.length ? `• Activités demandées : ${activities.join(', ')} (tarif à confirmer)\n` : '• Activités demandées : aucune\n') +
      `• Total estimé hors activités : ${total} MAD\n\n` +
      `Coordonnées :\n• Nom : ${name || 'À compléter'}\n• Email : ${email || 'À compléter'}\n• Téléphone / WhatsApp : ${phone || 'À compléter'}\n` +
      (notes ? `• Demandes particulières : ${notes}\n` : '• Demandes particulières : aucune\n') +
      `\nMerci de me confirmer la disponibilité !`
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
            COMPOSER VOTRE SÉJOUR
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#06306b]/80">
            Choisissez vos dates, le type d’hébergement et les options souhaitées. Votre demande sera confirmée par la résidence.
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
                  Demande transmise · À confirmer
                </span>
                <h3 className="font-bebas text-3xl text-[#06306b] leading-tight">
                  RÉSERVATION #{submissionSuccess.id}
                </h3>
              </div>
            </div>

            <p className="font-sans text-sm sm:text-base text-[#06306b]/80 mb-6 leading-relaxed">
              Merci <strong className="text-[#06306b]">{submissionSuccess.fullName}</strong> ! Votre demande pour <strong>{ROOMS.find(room => room.code === submissionSuccess.roomCode)?.name || submissionSuccess.roomCode}</strong> du <strong>{submissionSuccess.checkIn}</strong> au <strong>{submissionSuccess.checkOut}</strong> ({submissionSuccess.nights} nuits) a été envoyée à Google Sheets. La réservation reste en attente de confirmation par notre équipe.
            </p>

            {submissionSuccess.activities.length > 0 && (
              <p className="text-sm font-archivo text-[#06306b]/80 mb-6">
                <strong>Activités demandées :</strong> {submissionSuccess.activities.join(', ')} · tarif à confirmer.
              </p>
            )}

            <div className="mb-6 rounded-2xl border border-[#06306b]/10 bg-white p-4 text-xs leading-6 text-[#06306b]">
              <strong className="mb-1 block font-archivo uppercase tracking-wide">Coordonnées enregistrées</strong>
              <p>{submissionSuccess.fullName} · {submissionSuccess.email} · {submissionSuccess.phone}</p>
              {submissionSuccess.notes && <p><strong>Demandes particulières :</strong> {submissionSuccess.notes}</p>}
              <p><strong>Prix de la chambre :</strong> {submissionSuccess.roomPrice} MAD · <strong>Petits-déjeuners :</strong> {submissionSuccess.breakfastPrice} MAD</p>
            </div>

            <div className="bg-[#f2e8df] p-4 rounded-2xl mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-archivo text-[#06306b]">
              <div>
                <span className="text-gray-500 block">Voyageurs</span>
                <strong>{submissionSuccess.guests} personnes</strong>
              </div>
              <div>
                <span className="text-gray-500 block">Petit-déjeuner</span>
                <strong>{BREAKFAST_FORMULAS.find(item => item.code === submissionSuccess.breakfastCode)?.name || 'Aucun'}</strong>
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
                href={getWhatsAppLink(submissionSuccess)}
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
                    VOTRE SÉJOUR
                  </h3>
                </div>

                <div className="mb-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="isni-check-in" className="mb-1.5 block text-xs font-archivo font-bold uppercase tracking-wider text-[#06306b]">Date d’arrivée</label>
                    <input id="isni-check-in" type="date" value={form.checkIn} min={todayStr}
                      onChange={(e) => setForm((prev) => ({ ...prev, checkIn: e.target.value, checkOut: prev.checkOut && prev.checkOut <= e.target.value ? '' : prev.checkOut }))}
                      className="w-full rounded-xl border border-[#06306b]/20 bg-white px-3.5 py-3 font-archivo text-sm text-[#06306b] focus:ring-2 focus:ring-[#f05a2d]" required />
                  </div>
                  <div>
                    <label htmlFor="isni-check-out" className="mb-1.5 block text-xs font-archivo font-bold uppercase tracking-wider text-[#06306b]">Date de départ</label>
                    <input id="isni-check-out" type="date" value={form.checkOut} min={form.checkIn || todayStr}
                      onChange={(e) => setForm((prev) => ({ ...prev, checkOut: e.target.value }))}
                      className="w-full rounded-xl border border-[#06306b]/20 bg-white px-3.5 py-3 font-archivo text-sm text-[#06306b] focus:ring-2 focus:ring-[#f05a2d]" required />
                  </div>
                </div>
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#1f6f78]/20 bg-[#cfe5d8]/40 p-4 text-xs font-archivo text-[#06306b]">
                  <span>{form.checkIn && form.checkOut ? `Séjour du ${form.checkIn} au ${form.checkOut}` : 'Sélectionnez vos dates d’arrivée et de départ'}</span>
                  <span className="rounded-full bg-[#1f6f78] px-3 py-1 font-bold text-white">{nights} {nights === 1 ? 'nuit' : 'nuits'}</span>
                </div>
              </div>

              {/* Room and breakfast choices */}
              <div className="mt-8 space-y-4 pt-6 border-t border-[#06306b]/10">
                
                {/* Room selector */}
                <div>
                  <label className="block text-xs font-archivo font-bold text-[#06306b] uppercase tracking-wider mb-2">
                    Type de Chambre (Total 29 chambres)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ROOMS.map((r) => {
                      const isRSelected = form.roomCode === r.code;
                      return (
                        <button
                          type="button"
                          key={r.code}
                          onClick={() => setForm((prev) => ({ ...prev, roomCode: r.code, guests: r.capacity }))}
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
                      onClick={() => { setForm((prev) => ({ ...prev, breakfastCode: 'none' })); onBreakfastChange('none'); }}
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
                          onClick={() => { const code = isBSelected ? 'none' : b.code; setForm((prev) => ({ ...prev, breakfastCode: code })); onBreakfastChange(code); }}
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
                      onChange={(e) => { const guests = parseInt(e.target.value); const matchingRoom = ROOMS.find((room) => room.capacity === guests); setForm((prev) => ({ ...prev, guests, roomCode: matchingRoom?.code ?? prev.roomCode })); }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#06306b]/20 bg-white font-archivo text-xs sm:text-sm text-[#06306b] focus:ring-2 focus:ring-[#f05a2d]"
                    >
                      {[1, 2, 3, 4].map((count) => (
                        <option key={count} value={count}>{count} {count > 1 ? 'Voyageurs' : 'Voyageur'}</option>
                      ))}
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

                {selectedActivities.length > 0 && (
                  <div className="bg-[#cfe5d8]/35 border border-[#1f6f78]/20 rounded-2xl p-4 mb-5">
                    <h4 className="font-archivo font-extrabold text-xs uppercase tracking-wide text-[#06306b] mb-2">Activités demandées</h4>
                    <ul className="space-y-1.5">
                      {selectedActivities.map((activity) => (
                        <li key={activity.id} className="flex items-center justify-between gap-3 text-xs font-archivo text-[#06306b]">
                          <span>{activity.title} <strong className="text-[#1f6f78]">· Tarif à confirmer</strong></span>
                          <button type="button" onClick={() => onToggleActivity(activity.id)} className="shrink-0 rounded-full p-1 text-[#06306b]/60 transition hover:bg-white hover:text-[#f05a2d]" aria-label={`Retirer ${activity.title}`}><X className="h-4 w-4" /></button>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 text-[10px] text-[#06306b]/65">Les activités sont exclues du total jusqu’à confirmation du tarif par la réception.</p>
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
