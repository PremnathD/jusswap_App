import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  Pressable, 
  FlatList,
  Dimensions
} from 'react-native';
import { Image } from 'expo-image';
import { Search, ShoppingBag } from 'lucide-react-native';
import Animated, { 
  FadeInDown, 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,     
  interpolateColor  
} from 'react-native-reanimated';
import ProductCard from '../components/ProductCard';
import SwapCard from '../components/SwapCard';
import DonateCard from '../components/DonateCard';
import { PRODUCTS, SWAPS, DONATIONS } from '../data/products';

interface ExplorePageProps {
  onProfilePress: () => void;
}

const ExplorePage = ({ onProfilePress }: ExplorePageProps) => {
  const [activeTab, setActiveTab] = useState<'Sell' | 'Swap' | 'Donate'>('Sell');
  const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width - 64); // Fallback to screen width minus padding
  const slideValue = useSharedValue(0);

  const toggleTab = (tab: 'Sell' | 'Swap' | 'Donate') => {
    setActiveTab(tab);
    const tabIndex = tab === 'Sell' ? 0 : tab === 'Swap' ? 1 : 2;
    slideValue.value = withSpring(tabIndex, {
      damping: 20,
      stiffness: 150,
      mass: 0.8
    });
  };

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    const shift = (containerWidth - 8) / 3; // Total width / 3
    return {
      transform: [
        { 
          translateX: slideValue.value * shift 
        }
      ]
    };
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Header Section */}
        <View className="px-8 pt-[50px] pb-4 bg-white z-10 flex-row items-center justify-between">
          {/* Left: Profile Picture */}
          <View className="flex-row items-center">
            <Pressable onPress={onProfilePress} className="rounded-full shadow-sm active:scale-95 overflow-hidden border-2 border-[#af8cfa]/20 mr-3">
              <Image 
                source="https://i.pinimg.com/1200x/69/78/19/69781905dd57ba144ab71ca4271ab294.jpg"
                style={{ width: 35, height: 35, borderRadius: 22 }}
                contentFit="cover"
              />
            </Pressable>
            <Text className="text-slate-900 font-bold text-[20px] tracking-tight">Explore</Text>
          </View>
          
          {/* Right: Search & Cart */}
          <View className="flex-row items-center">
            {/* Search Icon */}
            <Pressable className="mr-3 w-11 h-11 items-center justify-center active:scale-95">
              <Search size={22} color="#1e293b" />
            </Pressable>
            {/* Cart Icon */}
            <Pressable className="w-11 h-11 items-center justify-center active:scale-95 relative">
              <ShoppingBag size={22} color="#1e293b" />
              <View className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500 border-2 border-white" />
            </Pressable>
          </View>
        </View>

        {/* Tab Toggle */}
        <View className="px-8 mt-5 mb-6">
          <View 
            onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
            className="flex-row items-center bg-slate-100 p-1.5 rounded-[24px] relative h-[52px] overflow-hidden"
          >
            {/* Animated Background Slider (INDICATOR) */}
            <Animated.View 
              style={[
                {
                  position: 'absolute',
                  top: 4,
                  left: 4,
                  bottom: 4,
                  width: '31%', // Adjusted for 3 tabs
                  backgroundColor: '#ffffff',
                  borderRadius: 20,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  // Removed elevation to ensure it doesn't pop over text
                },
                animatedBackgroundStyle
              ]}
            />
            
            {/* TABS CONTAINER (ENSURE ON TOP) */}
            <View className="flex-row flex-1 z-10">
              <Pressable 
                onPress={() => toggleTab('Sell')}
                className="flex-1 items-center justify-center p-2"
              >
                <Text style={{ zIndex: 20 }} className={`font-bold text-[13px] ${activeTab === 'Sell' ? 'text-slate-900' : 'text-slate-400'}`}>
                  Sell 
                </Text>
              </Pressable>
              
              <Pressable 
                onPress={() => toggleTab('Swap')}
                className="flex-1 items-center justify-center p-2"
              >
                <Text style={{ zIndex: 20 }} className={`font-bold text-[13px] ${activeTab === 'Swap' ? 'text-slate-900' : 'text-slate-400'}`}>
                  Swap 
                </Text>
              </Pressable>

              <Pressable 
                onPress={() => toggleTab('Donate')}
                className="flex-1 items-center justify-center p-2"
              >
                <Text style={{ zIndex: 20 }} className={`font-bold text-[13px] ${activeTab === 'Donate' ? 'text-slate-900' : 'text-slate-400'}`}>
                  Donate
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Content Section List */}
        <FlatList 
          key={activeTab === 'Donate' ? 'single' : 'grid'} // Force refresh on layout change
          data={activeTab === 'Sell' ? PRODUCTS : activeTab === 'Swap' ? SWAPS : DONATIONS}
          keyExtractor={(item) => item.id.toString()}
          numColumns={activeTab === 'Donate' ? 1 : 2}
          columnWrapperStyle={activeTab === 'Donate' ? null : { justifyContent: 'space-between', paddingHorizontal: 32 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 150, paddingHorizontal: activeTab === 'Donate' ? 24 : 0 }}
          renderItem={({ item, index }) => (
            <Animated.View 
              entering={FadeInDown.delay(index * 100).duration(600)} 
              style={{ width: activeTab === 'Donate' ? '100%' : '47%' }}
            >
              {activeTab === 'Sell' ? (
                <ProductCard product={item} isGrid={true} />
              ) : activeTab === 'Swap' ? (
                <SwapCard product={item} isGrid={true} />
              ) : (
                <DonateCard donation={item} />
              )}
            </Animated.View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ExplorePage;
