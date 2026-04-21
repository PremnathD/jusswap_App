import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  Pressable 
} from 'react-native';
import { Image } from 'expo-image';
import { ArrowLeft } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface FavouritePageProps {
  onBack: () => void;
}

const WISH_LIST_ITEMS = [
  {
    id: '1',
    name: 'Wireless headsPhones',
    price: '₹1000.00',
    tags: ['IN01', 'Black and White'],
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'casio watch',
    price: '₹2000.00',
    tags: ['IN01', 'Black and White'],
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1988&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'One side bag',
    price: '₹500.00',
    tags: ['IN01', 'Black and White'],
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1938&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'Camera k1200',
    price: '₹3000.00',
    tags: ['IN01', 'Black and White'],
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1938&auto=format&fit=crop'
  }
];

const FavouritePage = ({ onBack }: FavouritePageProps) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Header Section */}
        <View className="px-8 pt-[50px] pb-4 z-10 bg-white">
          <View className="flex-row items-center h-12">
            <Pressable 
              onPress={onBack}
              className="mr-4 w-11 h-11 items-center justify-center active:scale-95"
            >
              <ArrowLeft size={18} color="#1e293b" strokeWidth={2.5} />
            </Pressable>
            <Text className="text-slate-900 font-bold text-[20px] tracking-tight">Wish List</Text>
          </View>
        </View>

        {/* Wish List Items */}
        <ScrollView 
          className="flex-1 px-8"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 100 }}
        >
          {WISH_LIST_ITEMS.map((item, index) => (
            <Animated.View 
              key={item.id}
              entering={FadeInDown.delay(index * 150).duration(600)}
              className="flex-row items-center mb-8"
            >
              <View className="w-[120px] h-[120px] bg-[#f4f4f5] rounded-[16px] overflow-hidden mr-5 shadow-sm">
                <Image 
                  source={item.image} 
                  style={{ width: '100%', height: '100%' }} 
                  contentFit="cover" 
                />
              </View>
              
              <View className="flex-1 justify-center py-1">
                <Text className="text-[17px] font-bold text-slate-900 leading-tight">
                  {item.name}
                </Text>
                
                <Text className="text-[14px] font-bold text-slate-400 mt-1">
                  {item.price}
                </Text>
                
                <View className="flex-row flex-wrap items-center mt-2 mb-3">
                  {item.tags.map((tag, i) => (
                    <View 
                      key={i} 
                      className="border border-slate-300 rounded-[4px] px-1.5 py-[2px] mr-2 mb-1 bg-white"
                    >
                      <Text className="text-[9px] font-bold text-slate-600">{tag}</Text>
                    </View>
                  ))}
                </View>
                
                <Pressable className="bg-[#af8cfa] rounded-full self-start px-6 py-2.5 active:scale-95 shadow-sm shadow-[#af8cfa]/30">
                  <Text className="text-white text-[12px] font-bold tracking-wide">Move To Bag</Text>
                </Pressable>
              </View>
            </Animated.View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FavouritePage;
