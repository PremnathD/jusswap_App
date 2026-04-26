import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  Pressable, 
  Dimensions,
  StyleSheet
} from 'react-native';
import { Image } from 'expo-image';
import { 
  ChevronLeft, 
  Heart, 
  Repeat, 
  Share2,
  ArrowRightLeft,
  User,
  ShieldCheck
} from 'lucide-react-native';
import Animated, { 
  FadeInDown, 
  FadeInUp 
} from 'react-native-reanimated';
import { Product } from '../data/products';

const { width } = Dimensions.get('window');

interface SwapDetailsPageProps {
  product: Product;
  onBack: () => void;
}

const SwapDetailsPage = ({ product, onBack }: SwapDetailsPageProps) => {
  const [liked, setLiked] = React.useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header Bar */}
      <View className="px-6 py-4 flex-row items-center justify-between z-10 bg-white">
        <Pressable 
          onPress={onBack}
          className="w-11 h-11 items-center justify-center rounded-full border border-slate-100 bg-white active:scale-95"
        >
          <ChevronLeft size={24} color="#1e293b" strokeWidth={2.5} />
        </Pressable>
        
        <View className="flex-row items-center">
          <Pressable 
            className="w-11 h-11 items-center justify-center rounded-full border border-slate-100 bg-white mr-3 active:scale-95"
          >
            <Share2 size={20} color="#1e293b" strokeWidth={2} />
          </Pressable>
          <Pressable 
            onPress={() => setLiked(!liked)}
            className="w-11 h-11 items-center justify-center rounded-full border border-slate-100 bg-white active:scale-95"
          >
            <Heart 
              size={20} 
              color={liked ? "#f43f5e" : "#1e293b"} 
              fill={liked ? "#f43f5e" : "transparent"}
              strokeWidth={2} 
            />
          </Pressable>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 160 }}
      >
        {/* Main Product Image Container */}
        <Animated.View 
          entering={FadeInUp.duration(600)}
          className="px-6"
        >
          <View className="bg-slate-50 rounded-[40px] overflow-hidden shadow-sm" style={{ height: 350 }}>
            <Image 
              source={product.image}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
            />
            
            {/* Swap Badge */}
            <View className="absolute top-6 left-6 bg-[#af8cfa] px-4 py-2 rounded-2xl flex-row items-center shadow-lg">
              <Repeat size={14} color="white" strokeWidth={3} />
              <Text className="text-white font-black text-[12px] ml-2 tracking-wider">SWAP MODE</Text>
            </View>
          </View>
        </Animated.View>

        {/* Product Info Section */}
        <View className="px-8 mt-8">
          <Animated.View entering={FadeInDown.delay(200).duration(600)}>
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-slate-900 font-bold text-2xl flex-1 mr-4">{product.name}</Text>
              <View className="bg-slate-100 px-3 py-1 rounded-lg">
                <Text className="text-slate-500 font-bold text-xs uppercase">Available</Text>
              </View>
            </View>
            
            <View className="flex-row items-center mb-6">
              {product.tags.map((tag, i) => (
                <View key={i} className="border border-slate-200 px-3 py-1.5 rounded-xl mr-2 bg-slate-50">
                  <Text className="text-slate-500 font-bold text-[10px] uppercase tracking-wider">{tag}</Text>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Looking For Section (Unique to Swap) */}
          <Animated.View 
            entering={FadeInDown.delay(300).duration(600)}
            className="bg-[#af8cfa]/5 border border-[#af8cfa]/20 rounded-3xl p-6 mb-8"
          >
            <View className="flex-row items-center mb-3">
              <View className="bg-[#af8cfa] p-1.5 rounded-lg mr-3">
                <ArrowRightLeft size={18} color="white" />
              </View>
              <Text className="text-[#af8cfa] font-black text-lg">Looking For</Text>
            </View>
            <Text className="text-slate-600 font-bold text-[16px] leading-6">
              User is looking to swap this for a <Text className="text-slate-900">High-end Mechanical Keyboard</Text> or <Text className="text-slate-900">Wireless Earbuds</Text> of similar value.
            </Text>
          </Animated.View>

          {/* Description */}
          <Animated.View entering={FadeInDown.delay(400).duration(600)}>
            <Text className="text-slate-900 font-bold text-lg mb-3">Item Condition</Text>
            <Text className="text-slate-400 font-medium text-[15px] leading-[24px] mb-6">
              {product.description}
            </Text>
            
            <View className="flex-row items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <View className="bg-white p-2 rounded-xl mr-3 shadow-sm">
                <ShieldCheck size={20} color="#10b981" />
              </View>
              <Text className="text-slate-600 font-bold text-sm">Verified Product Condition</Text>
            </View>
          </Animated.View>

          {/* Owner Info */}
          <Animated.View 
            entering={FadeInDown.delay(500).duration(600)}
            className="mt-10 pt-8 border-t border-slate-100 flex-row items-center justify-between"
          >
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-full bg-slate-100 items-center justify-center mr-4 border-2 border-slate-50">
                <User size={24} color="#94a3b8" />
              </View>
              <View>
                <Text className="text-slate-900 font-bold text-lg">Alex Rivera</Text>
                <Text className="text-slate-400 font-medium text-xs">Joined 2 years ago • 48 Swaps</Text>
              </View>
            </View>
            <Pressable className="bg-slate-50 px-4 py-2 rounded-xl active:bg-slate-100">
              <Text className="text-[#af8cfa] font-bold text-sm">View Profile</Text>
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Tab with Action Buttons */}
      <View 
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-8 pt-4 pb-10 flex-row items-center justify-between"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 12,
          elevation: 20,
          gap: 16
        }}
      >
        <Pressable 
          className="flex-1 bg-slate-100 border border-slate-200 h-14 rounded-2xl flex-row items-center justify-center active:bg-slate-200"
        >
          <Text className="text-slate-900 font-bold text-base">Message</Text>
        </Pressable>

        <Pressable 
          className="flex-[2] bg-[#af8cfa] h-14 rounded-2xl flex-row items-center justify-center shadow-lg shadow-[#af8cfa]/30 active:scale-[0.98]"
        >
          <Repeat size={20} color="white" strokeWidth={3} />
          <Text className="text-white font-black text-base ml-3">Request Swap</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SwapDetailsPage;
