import React from 'react';
import { assetUrl } from '../utils/assets';
import { ArrowRight, Waves } from 'lucide-react';
import { SurfLevel } from '../types';

interface ActivitiesSectionProps {
  onOpenSurfLevel: (level: SurfLevel) => void;
}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ onOpenSurfLevel }) => (
  <section id="activites" className="relative overflow-hidden bg-[#f2e8df] py-20 lg:py-28">
    <div aria-hidden="true" className="ghost-title pointer-events-none absolute right-5 top-5 z-0 whitespace-nowrap opacity-25">SURF & ATLANTIQUE</div>
    <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <span className="mb-2 inline-block -rotate-1 font-marker text-lg tracking-wide text-[#f05a2d]">À vivre pendant votre séjour</span>
        <h2 className="mb-4 font-bebas text-4xl leading-none tracking-tight text-[#06306b] sm:text-6xl">SURF À TAGHAZOUT</h2>
        <p className="font-sans text-base text-[#06306b]/80 sm:text-lg">Choisissez le parcours qui correspond à votre expérience. La réception confirmera le programme, le tarif et les disponibilités.</p>
      </div>

      <article className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border-4 border-white bg-white shadow-2xl lg:grid-cols-[.95fr_1.05fr]">
        <div className="image-drift-frame group relative min-h-[350px] overflow-hidden lg:min-h-[570px]">
          <img src={assetUrl("/assets/images/surf_lesson_taghazout_1793212942727.jpg")} alt="Surfeurs en session sur la côte marocaine" className="image-drift absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06306b]/90 via-[#06306b]/15 to-transparent" />
          <span className="stamp-badge absolute left-6 top-6 border-2 border-white bg-[#f05a2d] px-5 py-2 font-bebas text-lg text-white shadow-lg">RÉSIDENCE ISNI · AGADIR</span>
          <div className="absolute bottom-7 left-7 text-white"><Waves className="mb-3 h-8 w-8 text-[#f29acb]" /><p className="mb-1 font-marker text-sm uppercase tracking-widest text-[#f29acb]">Taghazout</p><h3 className="font-bebas text-5xl leading-[.9] sm:text-6xl">CHOISISSEZ<br />VOTRE NIVEAU</h3></div>
        </div>

        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
          <span className="mb-4 font-marker text-sm uppercase tracking-wider text-[#1f6f78]">Deux parcours, une sortie sur demande</span>
          <p className="mb-7 leading-7 text-[#06306b]/80">L’affiche de la résidence annonce une excursion à Taghazout, une session de surf, le transport vers les spots, la planche, la combinaison, un moniteur et le déjeuner. Le tarif reste à confirmer.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <button onClick={() => onOpenSurfLevel('debutant')} className="group rounded-2xl border-2 border-[#06306b]/10 bg-[#faf5f0] p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-[#f05a2d] hover:shadow-xl">
              <span className="font-marker text-xs uppercase tracking-widest text-[#f05a2d]">Je découvre</span>
              <span className="mt-2 block font-bebas text-3xl text-[#06306b]">DÉBUTANT</span>
              <span className="mt-2 flex items-center justify-between text-sm text-[#06306b]/70">Voir le parcours <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </button>
            <button onClick={() => onOpenSurfLevel('intermediaire')} className="group rounded-2xl border-2 border-[#06306b]/10 bg-[#faf5f0] p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-[#1f6f78] hover:shadow-xl">
              <span className="font-marker text-xs uppercase tracking-widest text-[#1f6f78]">J’ai déjà surfé</span>
              <span className="mt-2 block font-bebas text-3xl text-[#06306b]">INTERMÉDIAIRE</span>
              <span className="mt-2 flex items-center justify-between text-sm text-[#06306b]/70">Voir le parcours <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </button>
          </div>
        </div>
      </article>
    </div>
  </section>
);
