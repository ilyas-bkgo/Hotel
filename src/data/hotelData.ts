import { RoomType, ActivityItem, BreakfastFormula } from '../types';

export const ROOMS: RoomType[] = [
  {
    code: 'simple',
    name: 'Chambre simple · 1 personne',
    inventory: 0,
    priceMAD: 320,
    description: 'Tarif par nuit selon le barème fourni. La disponibilité est confirmée par la réception.',
    capacity: 1,
    image: '/assets/images/isni/twin-bedroom.jpg',
    highlights: ['1 personne', 'Tarif par nuit', 'Confirmation par la réception']
  },
  {
    code: 'double',
    name: 'Chambre double · 2 personnes',
    inventory: 0,
    priceMAD: 420,
    description: 'Tarif par nuit selon le barème fourni. La disponibilité est confirmée par la réception.',
    capacity: 2,
    image: '/assets/images/isni/living-room.jpg',
    highlights: ['2 personnes', 'Tarif par nuit', 'Confirmation par la réception']
  },
  {
    code: 'triple',
    name: 'Chambre triple · 3 personnes',
    inventory: 0,
    priceMAD: 480,
    description: 'Tarif par nuit selon le barème fourni. La disponibilité est confirmée par la réception.',
    capacity: 3,
    image: '/assets/images/isni/family-suite.jpg',
    highlights: ['3 personnes', 'Tarif par nuit', 'Confirmation par la réception']
  },
  {
    code: 'quadruple',
    name: 'Chambre quadruple · 4 personnes',
    inventory: 0,
    priceMAD: 520,
    description: 'Tarif par nuit selon le barème fourni. La disponibilité est confirmée par la réception.',
    capacity: 4,
    image: '/assets/images/isni/family-suite.jpg',
    highlights: ['4 personnes', 'Tarif par nuit', 'Confirmation par la réception']
  }
];

export const PROPERTY_GALLERY = [
  { src: '/assets/images/isni/living-room.jpg', alt: 'Salon aménagé avec canapé et table basse', label: 'Salon' },
  { src: '/assets/images/isni/twin-bedroom.jpg', alt: 'Chambre avec deux lits et linge de maison', label: 'Chambre' },
  { src: '/assets/images/isni/kitchenette.jpg', alt: 'Coin équipé avec téléviseur et bouilloire', label: 'Équipements' },
  { src: '/assets/images/isni/family-suite.jpg', alt: 'Espace salon et salle à manger de la suite', label: 'Suite' },
  { src: '/assets/images/isni/dining-room.jpg', alt: 'Table dressée dans la salle de restauration', label: 'Restauration' },
  { src: '/assets/images/isni/balcony.jpg', alt: 'Vue depuis un balcon de la résidence', label: 'Vue' },
];

export const ACCOMMODATION_DETAILS = [
  {
    title: 'Studio Confort',
    area: '36 m²',
    image: '/assets/images/isni/kitchenette.jpg',
    description: 'Pensé pour allier confort et fonctionnalité, le studio offre une vue agréable sur le jardin Ibn Zaidoun. Il comprend un grand lit, deux canapés-lits et une kitchenette entièrement équipée. Salle de bain privée avec douche et WC, Wi-Fi gratuit.',
  },
  {
    title: 'Studio quadruple · vue jardin',
    area: '36 m²',
    image: '/assets/images/isni/twin-bedroom.jpg',
    description: 'Une configuration adaptée aux familles ou aux amis, avec trois lits simples et deux canapés-lits. Le studio dispose d’une kitchenette équipée, d’une salle de bain privée avec douche et WC, du Wi-Fi gratuit et d’un balcon avec vue sur le jardin Ibn Zaidoun.',
  },
  {
    title: 'Chambre quadruple avec balcon',
    area: '36 m²',
    image: '/assets/images/isni/family-suite.jpg',
    description: 'Peut accueillir jusqu’à quatre personnes avec deux lits simples et deux canapés-lits. Elle comprend une kitchenette équipée, une salle de bain privée avec douche et WC, un balcon et le Wi-Fi gratuit. La vue jardin dépend de la disponibilité.',
  },
  {
    title: 'Appartement deux chambres',
    area: '55 m²',
    image: '/assets/images/isni/twin-bedroom.jpg',
    description: 'Un hébergement spacieux pour les familles ou les groupes, avec deux chambres séparées, un salon, trois lits simples, un lit double et deux canapés-lits. Kitchenette équipée, salle de bain privée avec douche et WC, Wi-Fi gratuit. Balcon avec vue sur le jardin selon disponibilité.',
  },
  {
    title: 'Appartement une chambre',
    area: '36 m²',
    image: '/assets/images/isni/living-room.jpg',
    description: 'Un espace fonctionnel avec deux lits simples et deux canapés-lits, une kitchenette équipée, une salle de bain privée avec douche et WC et le Wi-Fi gratuit. Balcon avec vue sur le jardin Ibn Zaidoun selon disponibilité.',
  },
];

export const BREAKFAST_FORMULAS: BreakfastFormula[] = [
  {
    code: 'continental',
    num: '01',
    name: 'Continental',
    priceDH: 35,
    items: [
      'Café ou thé traditionnel',
      'Jus d’orange fraîchement pressé',
      'Omelette nature ou aux fines herbes',
      'Pain artisanal, beurre de ferme, fromage & charcuterie'
    ],
    imageCropIndex: 1
  },
  {
    code: 'express',
    num: '02',
    name: 'Express',
    priceDH: 30,
    items: [
      'Café noir, café au lait ou thé vert',
      'Jus d’orange frais pur jus',
      'Petit pain au chocolat pur beurre croustillant'
    ],
    imageCropIndex: 2
  },
  {
    code: 'beldi',
    num: '03',
    name: 'Beldi (Traditionnel)',
    priceDH: 35,
    items: [
      'Café ou thé à la menthe fraîche',
      '1 msemen feuilleté chaud ou 1 batbout moelleux',
      'Jus d’orange pressé minute',
      'Huile d’olive vierge du Souss & fromage frais'
    ],
    imageCropIndex: 3
  }
];

export const ACTIVITIES: ActivityItem[] = [
  {
    id: 'surf-debutant',
    title: 'Surf · Débutant · Taghazout',
    price: 'Tarif à confirmer',
    priceMAD: 0,
    category: 'surf',
    duration: 'Sur demande',
    description: 'Une sortie surf à Taghazout pour découvrir la pratique avec un moniteur. Niveau, conditions et disponibilités à confirmer avec la résidence.',
    included: ['Excursion à Taghazout', 'Session de surf', 'Transport vers les spots', 'Planche, combinaison, moniteur et déjeuner inclus']
  },
  {
    id: 'surf-intermediaire',
    title: 'Surf · Intermédiaire · Taghazout',
    price: 'Tarif à confirmer',
    priceMAD: 0,
    category: 'surf',
    duration: 'Sur demande',
    description: 'Une sortie surf à Taghazout pour les voyageurs ayant déjà une expérience. Programme et disponibilités à confirmer avec la résidence.',
    included: ['Excursion à Taghazout', 'Session de surf', 'Transport vers les spots', 'Planche, combinaison, moniteur et déjeuner inclus']
  }
];

export const HOTEL_INFO = {
  name: 'Résidence ISNI',
  tagline: 'Apparts-Hôtel & Surf Camp Lifestyle',
  city: 'Agadir',
  country: 'Maroc',
  address: 'Avenue Allal Ben Abdellah, Agadir',
  phone: '+212 528 820 467',
  whatsapp: '+212 528 820 467',
  email: 'contact@residence-isni.ma',
  checkIn: '14:00',
  checkOut: '12:00',
  totalRooms: 29,
  defaultGoogleSheetUrl: ''
};

export const GOOD_TO_KNOW = [
  {
    title: 'Des chambres pour 1 à 4 personnes',
    desc: 'Le barème fourni distingue les chambres simples, doubles, triples et quadruples. Les disponibilités sont confirmées par la résidence.',
  },
  {
    title: 'Tarifs affichés par nuit',
    desc: '320 DH en simple, 420 DH en double, 480 DH en triple et 520 DH en quadruple, selon le barème fourni.',
  },
  {
    title: 'Petit-déjeuner en option',
    desc: 'Choisissez Continental (35 DH), Express (30 DH) ou Beldi (35 DH) par personne et par jour.',
  },
  {
    title: 'Sortie surf sur demande',
    desc: 'L’affiche fournie annonce une sortie à Taghazout avec transport, matériel, moniteur et déjeuner. Tarif et disponibilité à confirmer.',
  },
];
