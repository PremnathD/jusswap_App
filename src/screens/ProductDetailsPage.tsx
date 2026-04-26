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
  MessageCircle, 
  Share2,
  Tag
} from 'lucide-react-native';
import Animated, { 
  FadeInDown, 
  FadeInUp 
} from 'react-native-reanimated';
import { Product } from '../data/products';

const { width } = Dimensions.get('window');

interface ProductDetailsPageProps {
  product: Product;
  onBack: () => void;
  onMakeOffer?: () => void;
}

const ProductDetailsPage = ({ product, onBack, onMakeOffer }: ProductDetailsPageProps) => {
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
          <View className="bg-slate-50 rounded-[40px] overflow-hidden" style={{ height: 380 }}>
            <Image 
              source={product.image}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
            />
          </View>
        </Animated.View>

        {/* Thumbnail Gallery (Mock) */}
        <Animated.View 
          entering={FadeInDown.delay(200).duration(600)}
          className="flex-row px-6 mt-4 justify-between"
        >
          {[1, 2, 3].map((_, index) => (
            <View 
              key={index} 
              className={`w-[30%] h-24 rounded-3xl overflow-hidden bg-slate-50 border-2 ${index === 0 ? 'border-[#af8cfa]' : 'border-transparent'}`}
            >
              <Image 
                source={product.image} // Using same image for mock
                style={{ width: '100%', height: '100%' }}
                contentFit="cover"
              />
            </View>
          ))}
        </Animated.View>

        {/* Product Info Section */}
        <View className="px-8 mt-8">
          <Animated.View entering={FadeInDown.delay(300).duration(600)}>
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-slate-900 font-bold text-2xl flex-1 mr-4">{product.name}</Text>
              <Text className="text-slate-900 font-black text-2xl">{product.price}</Text>
            </View>
            
            <View className="flex-row items-center mb-6">
              {product.tags.map((tag, i) => (
                <View key={i} className="border border-slate-200 px-3 py-1.5 rounded-xl mr-2 bg-slate-50">
                  <Text className="text-slate-500 font-bold text-[10px] uppercase tracking-wider">{tag}</Text>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Description */}
          <Animated.View entering={FadeInDown.delay(400).duration(600)}>
            <Text className="text-slate-900 font-bold text-lg mb-3">Description</Text>
            <Text className="text-slate-400 font-medium text-[14px] leading-[22px]">
              {product.description}
              <Text className="text-slate-900 font-bold"> Read more...</Text>
            </Text>
          </Animated.View>

          {/* Product Highlights */}
          <Animated.View entering={FadeInDown.delay(500).duration(600)} className="mt-8">
            <Text className="text-slate-900 font-bold text-lg mb-4">Product highlights</Text>
            <View className="space-y-3">
              {[
                'Fast Charging',
                'With Noise Cancellation',
                'With Deep Bass',
                'upto 10.5m bluetooth Range',
                'Bluetooth Connectivity'
              ].map((highlight, i) => (
                <View key={i} className="flex-row items-center mb-3">
                  <View className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-3" />
                  <Text className="text-slate-600 font-medium text-[15px]">{highlight}</Text>
                </View>
              ))}
            </View>
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
        {/* Message Button */}
        <Pressable 
          className="flex-1 bg-[#af8cfa]/10 border border-[#af8cfa]/20 h-14 rounded-2xl flex-row items-center justify-center active:bg-[#af8cfa]/20"
        >
          <MessageCircle size={20} color="#af8cfa" fill="#af8cfa" style={{ opacity: 0.8 }} />
          <Text className="text-[#af8cfa] font-bold text-base ml-2">Message</Text>
        </Pressable>

        {/* Make Offer Button */}
        <Pressable 
          onPress={onMakeOffer}
          className="flex-[2] h-14 rounded-2xl flex-row items-center justify-center active:opacity-90"
          style={{
            backgroundColor: '#af8cfa',
            shadowColor: '#af8cfa',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.4,
            shadowRadius: 14,
            elevation: 10,
          }}
        >
          <Tag size={20} color="white" strokeWidth={2.5} />
          <Text className="text-white font-black text-base ml-2 tracking-wide">Make an Offer</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailsPage;
