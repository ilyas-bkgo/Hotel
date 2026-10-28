import React from 'react';
import { assetUrl } from '../utils/assets';
import { ArrowLeft, ArrowRight, Check, Compass, ShieldCheck, Waves } from 'lucide-react';
import { SurfLevel } from '../types';

interface SurfLevelPageProps {
  level: SurfLevel;
  selected: boolean;
  onBack: () => void;
  onChangeLevel: (level: SurfLevel) => void;
  onAddToRequest: () => void;
}

const pageContent = {
  debutant: {
    label: 'Débutant',
    eyebrow: 'Votre première vague commence ici',
    title: 'DÉCOUVRIR LE SURF',
    intro: 'Vous n’avez jamais surfé ou vous souhaitez reprendre les bases ? Une sortie encadrée à Taghazout pour découvrir le surf à votre rythme.',
    levelNote: 'Aucune expérience préalable nécessaire. Le moniteur confirmera le déroulement selon les conditions du jour.',
    steps: [
      ['01', 'Prendre ses repères', 'Découvrir la planche, les règles de sécurité et les consignes données avant la session.'],
      ['02', 'Apprendre les bases', 'Travailler la position sur la planche, la rame et le redressement avec l’accompagnement du moniteur.'],
      ['03', 'Se lancer dans les vagues', 'S’initier aux premières vagues adaptées au niveau et aux conditions rencontrées.'],
    ],
    focus: ['Sécurité et repères dans l’eau', 'Équilibre et position sur la planche', 'Rame et redressement', 'Premières vagues, à son rythme'],
    faqs: [
      ['Faut-il déjà avoir surfé ?', 'Non. Indiquez votre expérience dans les demandes particulières afin que la réception puisse préparer votre demande.'],
      ['Le matériel est-il fourni ?', 'L’affiche ISNI indique planche et combinaison incluses. Les modalités exactes sont à confirmer auprès de la résidence.'],
      ['Quel est le tarif ?', 'Le tarif et la disponibilité de la sortie sont à confirmer par la réception.'],
    ],
  },
  intermediaire: {
    label: 'Intermédiaire',
    eyebrow: 'Gagner en aisance, une vague à la fois',
    title: 'FAIRE ÉVOLUER SON SURF',
    intro: 'Vous avez déjà surfé et souhaitez gagner en aisance ? Choisissez le niveau intermédiaire et partagez votre expérience avec la réception.',
    levelNote: 'Le moniteur pourra valider le niveau et adapter les objectifs à votre pratique et aux conditions du jour.',
    steps: [
      ['01', 'Évaluer ses habitudes', 'Décrire les vagues déjà surfées et les points que vous souhaitez améliorer.'],
      ['02', 'Choisir un objectif', 'Travailler, selon la session, le placement, le timing, la rame ou la direction de la vague.'],
      ['03', 'Progresser en confiance', 'Faire le point avec le moniteur sur les conditions et la suite de votre progression.'],
    ],
    focus: ['Placement et lecture des vagues', 'Timing et rame', 'Prise de vague et direction', 'Objectifs adaptés au niveau confirmé sur place'],
    faqs: [
      ['Quel niveau faut-il avoir ?', 'Choisissez cette option si vous avez déjà une expérience du surf. Décrivez-la dans vos demandes afin que le moniteur puisse vous orienter.'],
      ['Le matériel est-il fourni ?', 'L’affiche ISNI indique planche et combinaison incluses. Le matériel adapté et les modalités restent à confirmer.'],
      ['Le tarif est-il différent ?', 'Aucun tarif par niveau n’a été fourni. La réception confirmera le prix et la disponibilité avant toute réservation.'],
    ],
  },
} satisfies Record<SurfLevel, {
  label: string; eyebrow: string; title: string; intro: string; levelNote: string;
  steps: string[][]; focus: string[]; faqs: string[][];
}>;

export const SurfLevelPage: React.FC<SurfLevelPageProps> = ({ level, selected, onBack, onChangeLevel, onAddToRequest }) => {
  const content = pageContent[level];

  return (
    <div className="surf-level-page min-h-[80vh] bg-[#faf5f0]">
      <section className="relative overflow-hidden bg-[#06306b] text-white">
        <img src={assetUrl("/assets/images/surf_lesson_taghazout_1793212942727.jpg")} alt="Surfeurs en session sur la côte marocaine" className="image-drift absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06306b]/95 via-[#06306b]/75 to-[#06306b]/20" />
        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-20 lg:py-28">
          <button onClick={onBack} className="mb-12 inline-flex items-center gap-2 text-sm font-bold text-white/85 transition hover:text-[#f29acb]">
            <ArrowLeft className="h-4 w-4" /> Retour à la résidence
          </button>
          <p className="font-marker text-sm uppercase tracking-[.2em] text-[#f29acb]">Surf · Taghazout · {content.label}</p>
          <h1 className="mt-4 max-w-4xl font-bebas text-6xl leading-[.9] sm:text-8xl">{content.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">{content.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm">Transport vers les spots</span>
            <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm">Planche & combinaison</span>
            <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm">Moniteur & déjeuner</span>
          </div>
        </div>
        <span aria-hidden="true" className="pointer-events-none absolute -bottom-7 right-4 font-bebas text-[clamp(7rem,22vw,19rem)] leading-none text-transparent opacity-20" style={{ WebkitTextStroke: '1px white' }}>SURF</span>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_.7fr] lg:py-20">
        <div>
          <p className="font-marker text-[#f05a2d]">VOTRE NIVEAU</p>
          <h2 className="mt-2 font-bebas text-4xl text-[#06306b] sm:text-5xl">{content.eyebrow}</h2>
          <p className="mt-5 max-w-2xl leading-7 text-[#26364e]">{content.levelNote}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {content.steps.map(([number, title, text]) => (
              <article key={number} className="rounded-2xl border border-[#06306b]/10 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <span className="font-bebas text-4xl text-[#f05a2d]">{number}</span>
                <h3 className="mt-2 font-archivo font-extrabold text-[#06306b]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
        <aside className="rounded-[2rem] bg-[#f2e8df] p-7 sm:p-9">
          <div className="flex items-center gap-3"><Compass className="h-6 w-6 text-[#f05a2d]" /><h2 className="font-bebas text-3xl text-[#06306b]">POINTS À ABORDER</h2></div>
          <ul className="mt-6 space-y-4">
            {content.focus.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-[#26364e]"><Check className="mt-1 h-4 w-4 shrink-0 text-[#1f6f78]" />{item}</li>)}
          </ul>
          <div className="mt-7 flex gap-3 rounded-2xl border border-[#1f6f78]/20 bg-white/75 p-4 text-sm leading-6 text-[#26364e]"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#1f6f78]" />La sortie est sur demande. Le prix, les horaires et la disponibilité sont confirmés par la réception.</div>
          <button onClick={onAddToRequest} className={`mt-7 flex w-full items-center justify-center gap-2 rounded-full px-5 py-4 font-archivo text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-0.5 ${selected ? 'bg-[#1f6f78]' : 'bg-[#f05a2d] hover:bg-[#d44519]'}`}>
            {selected ? <Check className="h-4 w-4" /> : <Waves className="h-4 w-4" />}{selected ? 'Ajouté à votre demande' : 'Ajouter à ma demande'}
          </button>
          <p className="mt-3 text-center text-xs text-slate-500">Tarif à confirmer · aucun montant ajouté à l’estimation</p>
        </aside>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div><p className="font-marker text-[#f05a2d]">CHOISIR SON PARCOURS</p><h2 className="font-bebas text-4xl text-[#06306b] sm:text-5xl">QUEL EST VOTRE NIVEAU ?</h2></div>
            <button onClick={() => onChangeLevel(level === 'debutant' ? 'intermediaire' : 'debutant')} className="inline-flex items-center gap-2 rounded-full border border-[#06306b]/20 px-5 py-3 text-sm font-bold text-[#06306b] transition hover:border-[#f05a2d] hover:text-[#f05a2d]">
              Voir {level === 'debutant' ? 'Intermédiaire' : 'Débutant'} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {content.faqs.map(([question, answer]) => <article key={question} className="rounded-2xl border border-[#06306b]/10 bg-[#faf5f0] p-6"><h3 className="font-archivo font-extrabold text-[#06306b]">{question}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{answer}</p></article>)}
          </div>
        </div>
      </section>
    </div>
  );
};
