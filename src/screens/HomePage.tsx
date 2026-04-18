import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TextInput, 
  ScrollView, 
  Pressable, 
  Dimensions
} from 'react-native';
import { Image } from 'expo-image';
import Animated, { 
  FadeInDown
} from 'react-native-reanimated';
import { 
  Search, 
  MapPin, 
  Bell, 
  MessageCircle,
  ChevronRight,
  Filter,
  Package
} from 'lucide-react-native';
import TabBar from '../components/TabBar';
import ProductCard from '../components/ProductCard';
import SwapCard from '../components/SwapCard';
import ProfilePage from './ProfilePage';
import { PRODUCTS, SWAPS } from '../data/products';

const { width } = Dimensions.get('window');

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-1">
        {activeTab === 'Profile' ? (
          <ProfilePage onBack={() => setActiveTab('Home')} />
        ) : (
          <>
            {/* Header Section */}
            <Animated.View 
              entering={FadeInDown.duration(800)}
              className="px-8 pt-[40px] pb-[1px] flex-row items-center justify-between"
            >
              <View className="flex-1 mr-4">
                <Text className="text-slate-400 font-medium text-lg leading-tight">
                  {getGreeting()}
                </Text>
                <View className="flex-row items-center mt-1">
                  <Text className="text-slate-900 font-bold text-[32px] leading-tight">Tilak</Text>
                  <View className="w-2 h-2 rounded-full bg-[#af8cfa] ml-2 mt-4" />
                </View>
                
                <Pressable className="flex-row items-center mt-3 active:opacity-60">
                  <View className="bg-[#af8cfa]/10 p-1.5 rounded-lg">
                    <MapPin size={16} color="#af8cfa" />
                  </View>
                  <Text className="text-slate-500 font-semibold text-sm ml-2">Coimbatore, TN</Text>
                  <ChevronRight size={14} color="#94a3b8" className="ml-1" />
                </Pressable>
              </View>
              
              <View className="flex-row items-center">
                <Pressable className="mr-4 w-11 h-11 items-center justify-center bg-white rounded-xl shadow-sm border border-slate-100 active:scale-95">
                  <View className="relative">
                    <Bell size={20} color="#64748b" strokeWidth={2} />
                    <View className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white" />
                  </View>
                </Pressable>

                <Pressable onPress={() => setActiveTab('Profile')} className="p-1 rounded-xl">
                  <Image 
                    source="/Users/tilak/.gemini/antigravity/brain/a11823aa-e4b9-4252-81ee-1b18747ea0c5/tilak_avatar_3d_1776477003249.png"
                    style={{ width: 44, height: 44, borderRadius: 12 }}
                    contentFit="cover"
                  />
                </Pressable>
              </View>
            </Animated.View>

            <ScrollView 
              showsVerticalScrollIndicator={false}
              className="flex-1 px-8"
              contentContainerStyle={{ paddingBottom: 100 }}
            >
              {/* Search Bar Section */}
              <Animated.View 
                entering={FadeInDown.delay(200).duration(800)}
                className="mt-6 flex-row items-center space-x-6"
              >
                <View className="flex-1 flex-row items-center bg-white h-14 rounded-2xl px-5 shadow-sm border border-slate-100">
                  <Search size={20} color="#94a3b8" />
                  <TextInput 
                    placeholder="Search items..." 
                    className="flex-1 ml-3 text-slate-600 font-medium text-sm"
                    placeholderTextColor="#94a3b8"
                  />
                </View>
              </Animated.View>

              {/* Featured Sections (Small with 15px Gap) */}
              <Animated.View 
                entering={FadeInDown.delay(400).duration(800)}
                className="mt-6 flex-row items-center justify-between"
                style={{ gap: 15 }}
              >
                {/* Explore Jusswap Box */}
                <Pressable 
                  className="flex-1 bg-white h-[120px] rounded-[24px] p-4 shadow-sm border border-slate-50 relative overflow-hidden active:scale-98"
                >
                  <Text className="text-slate-900 font-bold text-[16px] leading-[20px] w-[65%]">
                    Explore{"\n"}Jusswap
                  </Text>
                  <View className="absolute bottom-1 right-1">
                    <Image 
                      source="https://lebiryprumdaarwlhqxr.supabase.co/storage/v1/object/public/jusswap%20app/Main%20pages/Box1.png"
                      style={{ width: 68, height: 68 }}
                      contentFit="contain"
                    />
                  </View>
                </Pressable>

                {/* Track Packages Box */}
                <Pressable 
                  className="flex-1 bg-white h-[120px] rounded-[24px] p-4 shadow-sm border border-slate-50 relative overflow-hidden active:scale-98"
                >
                  <Text className="text-slate-900 font-bold text-[16px] leading-[20px] w-[65%]">
                    Track{"\n"}packages
                  </Text>
                  <View className="absolute bottom-1 right-1">
                    <Image 
                      source="https://lebiryprumdaarwlhqxr.supabase.co/storage/v1/object/public/jusswap%20app/Main%20pages/Box2.png"
                      style={{ width: 68, height: 68 }}
                      contentFit="contain"
                    />
                  </View>
                </Pressable>
              </Animated.View>

              {/* Product Feed Section */}
              <View className="mt-10 pb-20 -mx-8">
                <View className="flex-row items-center justify-between mb-6 px-8">
                  <Text className="text-slate-900 font-bold text-2xl">Product for sale</Text>
                  <Pressable className="flex-row items-center">
                    <Text className="text-indigo-600 font-bold text-sm mr-1">View All</Text>
                    <ChevronRight size={16} color="#4f46e5" />
                  </Pressable>
                </View>
                
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 32 }}
                >
                  {PRODUCTS.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </ScrollView>
              </View>

              {/* Featured Swaps Section */}
              <View className="mt-4 pb-32 -mx-8">
                <View className="flex-row items-center justify-between mb-6 px-8">
                  <Text className="text-slate-900 font-bold text-2xl">Featured Swaps</Text>
                  <Pressable className="flex-row items-center">
                    <Text className="text-indigo-600 font-bold text-sm mr-1">All Swaps</Text>
                    <ChevronRight size={16} color="#4f46e5" />
                  </Pressable>
                </View>
                
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 32 }}
                >
                  {SWAPS.map((swap) => (
                    <SwapCard key={swap.id} product={swap} />
                  ))}
                </ScrollView>
              </View>
            </ScrollView>
          </>
        )}

        {/* Bottom Navigation Bar */}
        <TabBar activeTab={activeTab} onTabPress={setActiveTab} />
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
