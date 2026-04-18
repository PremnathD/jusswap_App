export interface Product {
  id: number;
  name: string;
  tags: string[];
  description: string;
  price: string;
  image: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    tags: ['IN01', 'Black and White'],
    description: 'Experience premium sound with noise-canceling technology and a long-lasting battery life. Ideal for travel and work.',
    price: '₹200.00',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Tiara Fragrance',
    tags: ['Perfume', 'Luxury'],
    description: 'A delicate blend of floral and musk notes, designed for the modern woman. Sophisticated and long-lasting.',
    price: '₹450.00',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1974&auto=format&fit=crop',
  }
];

export const SWAPS: Product[] = [
  {
    id: 101,
    name: 'Vintage Camera',
    tags: ['Photography', 'Retro'],
    description: 'A beautifully preserved 35mm film camera. Perfect for enthusiasts and collectors of vintage gear.',
    price: '0', // Not used in SwapCard
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1938&auto=format&fit=crop',
  },
  {
    id: 102,
    name: 'Graphic Tablet',
    tags: ['Design', 'Digital'],
    description: 'Professional graphic tablet with pressure-sensitive pen. Minimal wear, includes all original cables.',
    price: '0', // Not used in SwapCard
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop',
  }
];
