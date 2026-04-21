export interface Product {
  id: number;
  name: string;
  tags: string[];
  description: string;
  price: string;
  image: string;
  rating?: string;
  badge?: string;
  donor?: string;
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

export const DONATIONS: Product[] = [
  {
    id: 201,
    name: 'St. Mary’s Orphanage Support',
    tags: ['Orphanage', 'Support'],
    description: 'Contributing to the daily needs of 40 children. We accept clothes, books, and educational toys.',
    price: 'CONTRIBUTE',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop',
    rating: '4.9',
    badge: 'Top Choice',
    donor: 'Care Foundation'
  },
  {
    id: 202,
    name: 'City Youth Center Books',
    tags: ['Education', 'Library'],
    description: 'Seeking used storybooks and educational materials for our community library project.',
    price: 'DONATE',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop',
    rating: '4.7',
    badge: 'Urgent',
    donor: 'Local Library'
  }
];
