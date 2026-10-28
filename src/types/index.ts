export type SurfLevel = 'debutant' | 'intermediaire';

export interface RoomType {
  code: string;
  name: string;
  inventory: number;
  priceMAD: number;
  description: string;
  capacity: number;
  image: string;
  highlights: string[];
}

export interface ActivityItem {
  id: string;
  title: string;
  price: string;
  priceMAD: number;
  category: 'surf' | 'excursion' | 'bien-etre';
  description: string;
  duration: string;
  included: string[];
}

export interface BreakfastFormula {
  code: string;
  num: string;
  name: string;
  priceDH: number;
  items: string[];
  imageCropIndex: number;
}

export interface BookingFormState {
  checkIn: string;
  checkOut: string;
  roomCode: string;
  guests: number;
  breakfastCode: string;
  activities: string[];
  fullName: string;
  email: string;
  phone: string;
  notes: string;
  websiteHoneypot: string; // Honeypot field for anti-spam
}

export interface BookingRecord extends BookingFormState {
  id: string;
  nights: number;
  roomPrice: number;
  breakfastPrice: number;
  totalPriceMAD: number;
  status: 'en_attente' | 'confirmee' | 'annulee';
  createdAt: string;
}
