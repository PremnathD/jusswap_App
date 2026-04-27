import { supabase } from '../supabase';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  tags: string[];
  type: 'sell' | 'swap' | 'donation';
  category: string;
  condition: string;
  user_id: string;
  created_at: string;
}

export const productService = {
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Product[];
  },

  async getProductsByType(type: 'sell' | 'swap' | 'donation') {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('type', type)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Product[];
  },

  async createProduct(product: Omit<Product, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select();
    
    if (error) throw error;
    return data[0] as Product;
  },

  async getProductById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Product;
  }
};
