import React, { useState } from 'react';
import { Download, FileCode, Check, Copy, X, FolderArchive, Layers, ExternalLink, HelpCircle } from 'lucide-react';
import { getWordpressThemeFiles, generateWordpressThemeZip, GeneratedFile } from '../utils/wordpressThemeGenerator';

interface WordpressExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WordpressExportModal: React.FC<WordpressExportModalProps> = ({ isOpen, onClose }) => {
  const [files] = useState<GeneratedFile[]>(() => getWordpressThemeFiles());
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const currentFile = files[activeFileIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsDownloading(true);
      const blob = await generateWordpressThemeZip();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'residence-isni-theme.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Failed to generate zip:', e);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#f2e8df] w-full max-w-5xl rounded-3xl shadow-2xl border-4 border-[#06306b] flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-[#06306b] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#f05a2d] flex items-center justify-center text-white shadow">
              <FolderArchive className="w-5 h-5" />
            </div>
            <div>
              <span className="font-marker text-xs text-[#f29acb] uppercase tracking-wider block">
                Livrable WordPress & cPanel
              </span>
              <h2 className="font-bebas text-2xl sm:text-3xl tracking-wide leading-none">
                EXPORT THÈME WORDPRESS « RÉSIDENCE ISNI »
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadZip}
              disabled={isDownloading}
              className="px-4 py-2 bg-[#f05a2d] hover:bg-[#d44519] text-white font-archivo font-extrabold text-xs uppercase tracking-wider rounded-full shadow-md flex items-center gap-2 cursor-pointer transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? 'Génération...' : 'Télécharger .ZIP (residence-isni-theme.zip)'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Info Banner for Cap Connect & cPanel */}
        <div className="bg-[#cfe5d8] px-6 py-3 border-b border-[#06306b]/10 flex flex-wrap items-center justify-between gap-3 text-xs font-archivo text-[#06306b]">
          <div className="flex items-center gap-2">
            <span className="font-bold">Hébergement cible :</span>
            <span>Cap Connect (cPanel + WP Toolkit) · WordPress 7.1.3 · PHP 8.1.34</span>
          </div>
          <span className="bg-[#1f6f78] text-white font-bold px-2.5 py-0.5 rounded-full text-[11px]">
            9 Fichiers Prêts à l'Emploi
          </span>
        </div>

        {/* Modal Body: Left Files List, Right Code Viewer */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          
          {/* File Selector Sidebar (4 Cols) */}
          <div className="md:col-span-4 bg-[#faf5f0] border-r border-[#06306b]/10 p-4 overflow-y-auto space-y-1.5">
            <span className="text-[11px] font-archivo font-bold text-gray-500 uppercase tracking-wider px-2 block mb-2">
              Architecture des fichiers du thème
            </span>

            {files.map((file, idx) => (
              <button
                key={file.name}
                onClick={() => setActiveFileIndex(idx)}
                className={`w-full text-left p-2.5 rounded-xl text-xs font-archivo font-semibold transition-all flex items-center justify-between cursor-pointer ${
                  activeFileIndex === idx
                    ? 'bg-[#06306b] text-white shadow-sm'
                    : 'bg-white hover:bg-[#e8d9cc] text-[#06306b]'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <FileCode className="w-3.5 h-3.5 shrink-0 opacity-70" />
                  <span className="truncate">{file.name}</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  activeFileIndex === idx ? 'bg-white/20 text-white' : 'text-gray-400'
                }`}>
                  {file.name.endsWith('.php') ? 'PHP' : file.name.endsWith('.js') ? 'JS' : file.name.endsWith('.gs') ? 'Apps Script' : 'Code'}
                </span>
              </button>
            ))}

            {/* Installation guide note */}
            <div className="mt-6 p-4 rounded-2xl bg-white border border-[#06306b]/10 text-xs font-archivo text-[#06306b]">
              <div className="font-bold flex items-center gap-1.5 mb-1 text-[#f05a2d]">
                <HelpCircle className="w-4 h-4" />
                <span>Installation Express</span>
              </div>
              <p className="text-[11px] leading-relaxed text-gray-600">
                Téléversez directement l'archive ZIP dans WordPress (<strong>Apparence &gt; Thèmes &gt; Téléverser</strong>). Aucune modification de code requise !
              </p>
            </div>
          </div>

          {/* File Preview & Code Area (8 Cols) */}
          <div className="md:col-span-8 flex flex-col bg-[#1e1e1e] overflow-hidden">
            
            {/* Code Toolbar */}
            <div className="bg-[#2d2d2d] px-4 py-2.5 flex items-center justify-between border-b border-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-gray-300 font-bold">
                  {currentFile.name}
                </span>
                <span className="text-[11px] font-archivo text-gray-400">
                  — {currentFile.description}
                </span>
              </div>

              <button
                onClick={handleCopy}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-archivo rounded-md flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copié !' : 'Copier le code'}</span>
              </button>
            </div>

            {/* Code content */}
            <div className="flex-1 p-4 overflow-auto">
              <pre className="font-mono text-xs text-gray-200 leading-relaxed whitespace-pre font-normal">
                {currentFile.content}
              </pre>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-white p-4 px-6 border-t border-[#06306b]/10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs font-archivo text-gray-600">
            Conforme au cahier des charges : <strong>CPT isni_booking</strong>, endpoints AJAX avec nonces & honeypot, calcul côté serveur, <strong>google-apps-script.gs</strong> inclus.
          </p>

          <button
            onClick={handleDownloadZip}
            className="px-6 py-2.5 bg-[#f05a2d] hover:bg-[#d44519] text-white font-archivo font-extrabold text-xs uppercase tracking-wider rounded-full shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Télécharger le ZIP maintenant</span>
          </button>
        </div>

      </div>
    </div>
  );
};
