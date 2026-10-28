import React, { useState } from 'react';
import { Sheet, Copy, Check, Send, ExternalLink, X, Table, Sparkles, CheckCircle2 } from 'lucide-react';
import { BookingRecord } from '../types';

interface GoogleSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  googleSheetUrl: string;
  onUpdateGoogleSheetUrl: (url: string) => void;
  bookings: BookingRecord[];
}

export const GoogleSheetModal: React.FC<GoogleSheetModalProps> = ({
  isOpen,
  onClose,
  googleSheetUrl,
  onUpdateGoogleSheetUrl,
  bookings,
}) => {
  const [urlInput, setUrlInput] = useState(googleSheetUrl);
  const [copiedScript, setCopiedScript] = useState(false);
  const [testStatus, setTestStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const scriptContent = `/**
 * Google Apps Script - Résidence ISNI Réservations
 * Déployer en tant qu'Application Web (Accès : Tout le monde)
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var rawData = e.postData ? e.postData.contents : "{}";
    var data = JSON.parse(rawData);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) ss = SpreadsheetApp.create("Résidence ISNI - Réservations");
    
    var sheetName = "Réservations";
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.appendRow([
        "Horodatage", "ID", "Nom Client", "Email", "Téléphone", 
        "Chambre", "Arrivée", "Départ", "Nuits", "Personnes", 
        "Formule Petit-Déj", "Total (MAD)", "Statut", "Notes"
      ]);
      sheet.getRange("A1:N1").setBackground("#06306b").setFontColor("#ffffff").setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      data.timestamp || new Date(),
      data.id || "ISNI-" + new Date().getTime(),
      data.fullName || "",
      data.email || "",
      data.phone || "",
      data.roomType || "",
      data.checkIn || "",
      data.checkOut || "",
      data.nights || "",
      data.guests || 1,
      data.breakfast || "none",
      data.totalPriceMAD || 0,
      data.status || "en_attente",
      data.notes || ""
    ]);
    sheet.autoResizeColumns(1, 14);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Enregistré avec succès dans Google Sheets",
      id: data.id
    })).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}`;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(scriptContent);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateGoogleSheetUrl(urlInput);
    setTestStatus('URL enregistrée !');
    setTimeout(() => setTestStatus(null), 2500);
  };

  const handleSendTestPing = async () => {
    setTestStatus('Envoi du ping de test...');
    try {
      if (urlInput && urlInput.startsWith('http')) {
        await fetch(urlInput, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: 'TEST-PING',
            timestamp: new Date().toLocaleString('fr-FR'),
            fullName: 'Test Intégration ISNI',
            email: 'test@residence-isni.ma',
            phone: '+212 6 00 00 00 00',
            roomType: 'Chambre Confort',
            checkIn: '2026-11-01',
            checkOut: '2026-11-04',
            nights: 3,
            guests: 2,
            breakfast: 'Beldi (35 DH)',
            totalPriceMAD: 2010,
            status: 'test',
            notes: 'Ping de test de la synchronisation',
          }),
        });
      }
      setTestStatus('✅ Ping envoyé avec succès ! Vérifiez votre feuille Google Sheets.');
    } catch (e: any) {
      setTestStatus('⚠️ Signal envoyé en mode no-cors. Vérifiez votre Google Sheet.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#f2e8df] w-full max-w-4xl rounded-3xl shadow-2xl border-4 border-[#06306b] flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#06306b] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1f6f78] flex items-center justify-center text-white shadow">
              <Sheet className="w-5 h-5" />
            </div>
            <div>
              <span className="font-marker text-xs text-[#f29acb] uppercase tracking-wider block">
                Synchronisation en direct
              </span>
              <h2 className="font-bebas text-2xl sm:text-3xl tracking-wide leading-none">
                INTÉGRATION GOOGLE SHEETS & APPS SCRIPT
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Webhook URL Input */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#06306b]/10">
            <h3 className="font-bebas text-xl text-[#06306b] mb-2">
              1. URL DE L'APPLICATION WEB GOOGLE APPS SCRIPT
            </h3>
            <p className="text-xs font-archivo text-gray-600 mb-4">
              Collez ci-dessous l'URL de votre script déployé pour que chaque réservation s’y enregistre instantanément :
            </p>

            <form onSubmit={handleSaveUrl} className="flex flex-wrap sm:flex-nowrap gap-3">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://script.google.com/macros/s/.../exec"
                className="w-full px-4 py-2.5 rounded-xl border border-[#06306b]/20 font-mono text-xs bg-[#f2e8df]/30 focus:ring-2 focus:ring-[#f05a2d]"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#06306b] hover:bg-[#042048] text-white font-archivo font-bold text-xs uppercase rounded-xl shrink-0 cursor-pointer"
              >
                Enregistrer
              </button>
              <button
                type="button"
                onClick={handleSendTestPing}
                className="px-4 py-2.5 bg-[#f05a2d] hover:bg-[#d44519] text-white font-archivo font-bold text-xs uppercase rounded-xl shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Tester</span>
              </button>
            </form>

            {testStatus && (
              <p className="mt-2 text-xs font-archivo font-semibold text-[#1f6f78]">
                {testStatus}
              </p>
            )}
          </div>

          {/* Quick Script Copy */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#06306b]/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bebas text-xl text-[#06306b]">
                2. CODE APPS SCRIPT (« google-apps-script.gs »)
              </h3>
              <button
                onClick={handleCopyScript}
                className="px-3 py-1.5 bg-[#06306b] hover:bg-[#042048] text-white text-xs font-archivo rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedScript ? 'Copié !' : 'Copier le script'}</span>
              </button>
            </div>
            <p className="text-xs font-archivo text-gray-600 mb-3">
              Créez un projet sur <strong>script.google.com</strong>, collez ce code, puis déployez en <em>Application Web</em> (Accès : Tout le monde).
            </p>
            <div className="bg-[#1e1e1e] p-3.5 rounded-xl max-h-40 overflow-y-auto">
              <pre className="text-[11px] font-mono text-gray-200">{scriptContent}</pre>
            </div>
          </div>

          {/* Recent Session Bookings Table */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#06306b]/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bebas text-xl text-[#06306b] flex items-center gap-2">
                <Table className="w-4 h-4 text-[#f05a2d]" />
                <span>RÉSERVATIONS ENREGISTRÉES DANS CETTE SESSION ({bookings.length})</span>
              </h3>
            </div>

            {bookings.length === 0 ? (
              <p className="text-xs font-archivo text-gray-500 italic py-4 text-center">
                Aucune réservation effectuée pour l'instant. Utilisez le calendrier pour faire votre première demande !
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-archivo text-[#06306b]">
                  <thead className="bg-[#f2e8df] text-[#06306b] font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-2.5 rounded-l-lg">ID</th>
                      <th className="p-2.5">Client</th>
                      <th className="p-2.5">Chambre</th>
                      <th className="p-2.5">Dates</th>
                      <th className="p-2.5">Petit-Déj</th>
                      <th className="p-2.5 text-right">Total MAD</th>
                      <th className="p-2.5 rounded-r-lg text-center">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-gray-50">
                        <td className="p-2.5 font-bold font-mono text-[11px] text-[#f05a2d]">{b.id}</td>
                        <td className="p-2.5 font-semibold">{b.fullName}</td>
                        <td className="p-2.5">{b.roomCode}</td>
                        <td className="p-2.5">{b.checkIn} au {b.checkOut} ({b.nights}n)</td>
                        <td className="p-2.5">{b.breakfastCode}</td>
                        <td className="p-2.5 text-right font-bold">{b.totalPriceMAD} MAD</td>
                        <td className="p-2.5 text-center">
                          <span className="bg-[#cfe5d8] text-[#1f6f78] px-2 py-0.5 rounded text-[10px] font-bold">
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="bg-white p-4 px-6 border-t border-[#06306b]/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#06306b] hover:bg-[#042048] text-white font-archivo font-bold text-xs uppercase rounded-full cursor-pointer"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
