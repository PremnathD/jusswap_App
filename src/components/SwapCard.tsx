import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { Heart } from 'lucide-react-native';
import { Product } from '../data/products';

interface SwapCardProps {
  product: Product;
  isGrid?: boolean;
}

const SwapCard = ({ product, isGrid = false }: SwapCardProps) => {
  const [liked, setLiked] = useState(false);
  const cardWidth = 205; // Matches ProductCard width

  return (
    <View 
      style={!isGrid ? { width: cardWidth } : { width: '100%' }}
      className={`${!isGrid ? 'mr-5' : 'mb-4'} rounded-[22px] bg-white overflow-hidden shadow-sm border border-slate-100 flex-1`}
    >
      {/* Product Image */}
      <View className="h-36 w-full bg-slate-50">
        <Image 
          source={product.image}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
        />
      </View>
      
      {/* Details Section */}
      <View className="p-4 bg-white rounded-t-[20px] -mt-5 relative">
        <View className="flex-row items-center justify-between mb-1.5">
          <Text className="text-slate-900 font-bold text-sm flex-1 mr-2" numberOfLines={1}>
            {product.name}
          </Text>
          <Pressable 
            onPress={() => setLiked(!liked)}
            className="w-8 h-8 items-center justify-center rounded-full bg-slate-50"
          >
            <Heart 
              size={16} 
              color={liked ? "#f43f5e" : "#64748b"} 
              fill={liked ? "#f43f5e" : "transparent"} 
            />
          </Pressable>
        </View>
        
        {/* Tags Row */}
        <View className="flex-row items-center mb-2.5">
          {product.tags.slice(0, 2).map((tag, i) => (
            <View key={i} className="border border-slate-200 px-1.5 py-0.5 rounded-md mr-1 bg-slate-50">
              <Text className="text-slate-400 font-bold text-[7px] uppercase tracking-wider">{tag}</Text>
            </View>
          ))}
        </View>
        
        {/* Description */}
        <Text className="text-slate-400 font-medium text-[10px] mb-4 leading-[14px]" numberOfLines={2}>
          {product.description}
        </Text>
        
        {/* Solid Swap Button (Full Width) */}
        <Pressable 
          className="w-full h-10 rounded-xl border border-slate-200 items-center justify-center active:bg-slate-50"
        >
          <Text className="text-slate-900 font-bold text-[10px]">Swap the product</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SwapCard;
