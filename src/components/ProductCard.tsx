import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { Heart, Package } from 'lucide-react-native';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  isGrid?: boolean;
  onPress?: (product: Product) => void;
}

const ProductCard = ({ product, isGrid = false, onPress }: ProductCardProps) => {
  const [liked, setLiked] = useState(false);
  const cardWidth = 205; // Fixed width for horizontal scroll

  const displayPrice = product.price.split('.')[0];

  return (
    <Pressable 
      onPress={() => onPress?.(product)}
      style={!isGrid ? { width: cardWidth } : { width: '100%' }}
      className={`${!isGrid ? 'mr-5' : 'mb-4'} rounded-[22px] bg-white overflow-hidden shadow-sm border border-slate-100 flex-1`}
    >
      <View className="flex-1">
        {/* Reduced Height Image Section */}
        <View className="relative h-36 w-full bg-slate-50">
          <Image 
            source={product.image}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
          />
          <Pressable 
            onPress={() => setLiked(!liked)} 
            className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/95 items-center justify-center shadow-sm"
          >
            <Heart 
              size={16} 
              color={liked ? "#f43f5e" : "#64748b"} 
              fill={liked ? "#f43f5e" : "transparent"} 
            />
          </Pressable>
        </View>
        
        {/* Details Section (Alignment Theory) */}
        <View className="p-4 bg-white rounded-t-[20px] -mt-5 relative">
          <Text className="text-slate-900 font-bold text-sm mb-1.5" numberOfLines={1}>{product.name}</Text>
          
          <View className="flex-row items-center mb-2.5">
            {product.tags.slice(0, 2).map((tag, i) => (
              <View key={i} className="border border-slate-200 px-1.5 py-0.5 rounded-md mr-1 bg-slate-50">
                <Text className="text-slate-400 font-bold text-[7px] uppercase tracking-wider">{tag}</Text>
              </View>
            ))}
          </View>
          
          <Text className="text-slate-400 font-medium text-[10px] mb-3 leading-[14px]" numberOfLines={2}>
            {product.description}
          </Text>
          
          {/* Footer (Perfectly Aligned) */}
          <View className="flex-row items-center justify-between border-t border-slate-200 pt-3 mt-1">
            <View className="flex-col justify-center">
              <Text className="text-slate-400 font-bold text-[7px] uppercase tracking-wider mb-0.5">Price</Text>
              <Text className="text-slate-900 font-bold text-[16px] leading-tight">{displayPrice}</Text>
            </View>
            
            <View className="bg-transparent border border-[#4f46e5] px-3 h-[32px] rounded-lg active:bg-indigo-50 items-center justify-center flex-row">
              <Package size={12} color="#4f46e5" strokeWidth={2} style={{ marginRight: 4 }} />
              <Text className="text-[#4f46e5] font-bold text-[9px]">Add to cart</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductCard;
