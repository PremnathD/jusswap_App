import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Star } from 'lucide-react-native';
import { Product } from '../data/products';

interface DonateCardProps {
  donation: Product;
}

const DonateCard = ({ donation }: DonateCardProps) => {
  return (
    <Animated.View 
      entering={FadeInUp.duration(600)}
      className="w-full bg-white rounded-[28px] overflow-hidden shadow-sm border border-slate-100 mb-5"
    >
      {/* Image Section */}
      <View className="p-3">
        <View className="relative w-full h-[220px] rounded-[20px] overflow-hidden">
          <Image 
            source={donation.image}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
          />
          
          {/* Top Floating Elements */}
          <View className="absolute top-4 left-4 right-4 flex-row items-center justify-between">
            <View className="flex-row">
              {donation.tags.map((tag, i) => (
                <View key={i} className="bg-white/20 px-3 py-1.5 rounded-full mr-2 backdrop-blur-md border border-white/30">
                  <Text className="text-white font-semibold text-[11px]">{tag}</Text>
                </View>
              ))}
            </View>
            
            {donation.rating && (
              <View className="flex-row items-center bg-white/20 px-2.5 py-1.5 rounded-full backdrop-blur-md border border-white/30">
                <Star size={12} color="#ffffff" fill="#ffffff" />
                <Text className="text-white font-bold text-[11px] ml-1">{donation.rating}</Text>
              </View>
            )}
          </View>

          {/* Pagination Indicators (Visual Only) */}
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center space-x-1.5">
            <View className="w-6 h-1.5 rounded-full bg-white" />
            <View className="w-1.5 h-1.5 rounded-full bg-white/50" />
            <View className="w-1.5 h-1.5 rounded-full bg-white/50" />
            <View className="w-1.5 h-1.5 rounded-full bg-white/50" />
          </View>
        </View>
      </View>

      {/* Details Section */}
      <View className="px-5 pb-5 mt-1">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-slate-900 font-bold text-[19px] flex-1 mr-4">
            {donation.name}
          </Text>
          {donation.badge && (
            <View className="border border-slate-200 px-3 py-1 rounded-full">
              <Text className="text-slate-600 font-semibold text-[12px]">{donation.badge}</Text>
            </View>
          )}
        </View>

        <Text className="text-slate-400 font-medium text-[13px] leading-[20px] mb-4">
          {donation.description}
        </Text>

        <Text className="text-slate-900 font-bold text-[13px] mb-5">
          {donation.donor || 'Annonymous Donor'}
        </Text>

        {/* Action Button */}
        <Pressable 
          className="w-full h-[50px] bg-black rounded-[16px] items-center justify-center active:bg-slate-800 shadow-sm"
        >
          <Text className="text-white font-bold text-[15px]">Apply for Donation</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
};

export default DonateCard;
