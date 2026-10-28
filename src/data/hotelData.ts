import { RoomType, ActivityItem, BreakfastFormula } from '../types';

export const ROOMS: RoomType[] = [
  {
    code: 'standard',
    name: 'Chambre Standard',
    inventory: 15,
    priceMAD: 450,
    description: 'Chambre lumineuse idéale pour voyageurs solo ou couples en quête de confort après une journée dans les vagues. Literie douillette, salle d’eau privative et ambiance marocaine épurée.',
    capacity: 2,
    image: '/src/assets/images/isni_suite_room_1793212941115.jpg',
    highlights: ['Grand lit Queen ou 2 lits simples', 'Salle de bain privative avec douche à l’italienne', 'Wi-Fi haut débit gratuit', 'Espace rangement planches et combinaisons']
  },
  {
    code: 'confort',
    name: 'Chambre Confort avec Balcon',
    inventory: 10,
    priceMAD: 600,
    description: 'Plus spacieuse avec petit balcon donnant sur la douceur d’Agadir. Parfait pour se détendre au soleil couchant avec un thé à la menthe avant de rejoindre l’ambiance de la ville.',
    capacity: 2,
    image: '/src/assets/images/hero_agadir_surf_camp_1793212941609.jpg',
    highlights: ['Balcon privatif avec table bistrot', 'Coin salon détente avec banquette', 'Climatisation réversible', 'Mini-réfrigérateur & bouilloire thé']
  },
  {
    code: 'suite',
    name: 'Suite Appart-Hôtel',
    inventory: 4,
    priceMAD: 900,
    description: 'Le summum de l’indépendance pour les petits groupes ou familles de surfeurs. Grand salon contemporain aux touches berbères, kitchenette équipée et vaste terrasse ensoleillée.',
    capacity: 4,
    image: '/src/assets/images/isni_suite_room_1793212941115.jpg',
    highlights: ['Grand salon séparé avec canapés convertibles', 'Kitchenette moderne toute équipée', 'Terrasse panoramique privée', 'Idéal pour séjours surf longue durée']
  }
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
    id: 'surf-lesson',
    title: 'Cours de Surf Débutant & Intermédiaire',
    price: 'Sur demande (dès 350 DH)',
    priceMAD: 350,
    category: 'surf',
    duration: 'Demi-journée (2h de cours + free surf)',
    description: 'Encadrement par des moniteurs locaux certifiés sur les meilleurs spots abrités d’Agadir et d’Anza. Planche et combinaison intégrale fournies.',
    included: ['Transport depuis la résidence', 'Matériel de surf complet', 'Coaching personnalisé', 'Analyse vidéo debriefing']
  },
  {
    id: 'surf-guiding',
    title: 'Surf Guiding Spots Secrets Taghazout',
    price: 'Sur demande (dès 400 DH)',
    priceMAD: 400,
    category: 'surf',
    duration: 'Journée complète',
    description: 'Pour surfeurs autonomes : nous vous emmenons là où les vagues déroulent le mieux selon la marée, le vent et la houle (Anchor Point, Killer Point, Imsouane Bay).',
    included: ['Guide local bilingue', 'Chasse aux vagues 4x4', 'Pique-nique marocain en bord de falaise', 'Stockage sécurisé à l’hôtel']
  },
  {
    id: 'petit-sahara',
    title: 'Excursion Petit Sahara & Dunes de Tifnit',
    price: '25 € (250 DH)',
    priceMAD: 250,
    category: 'excursion',
    duration: 'Demi-journée',
    description: 'Échappée sauvage en 4x4 vers les spectaculaires dunes dorées se jetant dans l’océan Atlantique, visite des grottes de pêcheurs troglodytes et thé chez l’habitant.',
    included: ['4x4 climatisé & chauffeur', 'Balade sur les crêtes de sable', 'Arrêt photos falaises océaniques', 'Pause thé & pâtisseries marocaines']
  },
  {
    id: 'surfskate',
    title: 'Coaching Surfskate & Carving',
    price: '15 € (150 DH)',
    priceMAD: 150,
    category: 'surf',
    duration: '1h30',
    description: 'Perfectionnez votre équilibre, vos manœuvres et vos virages sur le bitume lisse de la promenade d’Agadir et des bowls avec un Carver.',
    included: ['Planches Carver fournies', 'Protections et casque', 'Conseils biomécaniques surf', 'Session coucher de soleil']
  },
  {
    id: 'paradise-valley',
    title: 'Randonnée Paradise Valley & Piscines Naturelles',
    price: '20 € (200 DH)',
    priceMAD: 200,
    category: 'excursion',
    duration: 'Demi-journée (5h)',
    description: 'Exploration de la gorge luxuriante de l’Atlas, baignade rafraîchissante dans les vasques turquoise d’eau de source et déjeuner tajine sous les palmiers.',
    included: ['Guide de randonnée pédestre', 'Temps libre baignade & sauts sécurisés', 'Tajine berbère traditionnel en plein air', 'Transport aller-retour']
  },
  {
    id: 'rooftop-yoga',
    title: 'Sunset Yoga & Étirements Post-Surf',
    price: '120 DH',
    priceMAD: 120,
    category: 'bien-etre',
    duration: '1h15',
    description: 'Séance de Vinyasa doux sur le rooftop de la Résidence face à la brise marine pour détendre les épaules, le dos et le souffle après la session de surf.',
    included: ['Tapis de yoga fournis', 'Tisane bio relaxante', 'Musique d’ambiance apaisante', 'Vue dorée sur les toits d’Agadir']
  }
];

export const HOTEL_INFO = {
  name: 'Résidence ISNI',
  tagline: 'Apparts-Hôtel & Surf Camp Lifestyle',
  city: 'Agadir',
  country: 'Maroc',
  address: 'Avenue Allal Ben Abdellah, Agadir 80000',
  phone: '+212 5 28 84 21 00',
  whatsapp: '+212 6 61 24 55 88',
  email: 'contact@residence-isni.ma',
  checkIn: '14:00',
  checkOut: '12:00',
  totalRooms: 29,
  defaultGoogleSheetUrl: 'https://script.google.com/macros/s/AKfycbz_SAMPLE_ISNI_GOOGLE_SHEET_URL/exec'
};

export const GOOD_TO_KNOW = [
  {
    title: 'Check-in & Check-out flexibles',
    desc: 'Accueil chaleureux dès 14h00. Départ jusqu’à 12h00 pour profiter d’une dernière session de surf matinale sans stress.'
  },
  {
    title: 'Local à Planches & Séchage',
    desc: 'Râtelier sécurisé dédié au matériel de surf, avec point de rinçage à l’eau douce pour vos combinaisons et serviettes.'
  },
  {
    title: 'Navettes Aéroport & Spots',
    desc: 'Sur simple demande, nous organisons votre transfert direct depuis l’aéroport d’Agadir Al Massira (30 min) et vers les spots.'
  },
  {
    title: 'Emplacement Idéal au Cœur de la Ville',
    desc: 'Situé sur l’Avenue Allal Ben Abdellah, vous accédez aux cafés traditionnels, commerces locaux et à la plage d’Agadir en quelques minutes.'
  }
];
