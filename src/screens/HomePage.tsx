import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TextInput, 
  ScrollView, 
  Pressable, 
  Dimensions,
  Modal,
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
  Package,
  CheckCircle2,
} from 'lucide-react-native';
import TabBar from '../components/TabBar';
import ProductCard from '../components/ProductCard';
import SwapCard from '../components/SwapCard';
import ProfilePage from './ProfilePage';
import ChatPage from './ChatPage';
import FavouritePage from './FavouritePage';
import ExplorePage from './ExplorePage';
import PostListingPage from './PostListingPage';
import ProductDetailsPage from './ProductDetailsPage';
import SwapDetailsPage from './SwapDetailsPage';
import MakeOfferPage from './MakeOfferPage';
import { Product, PRODUCTS, SWAPS } from '../data/products';

const { width } = Dimensions.get('window');

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSwap, setSelectedSwap] = useState<Product | null>(null);
  const [offerProduct, setOfferProduct] = useState<Product | null>(null);
  const [showOfferSuccess, setShowOfferSuccess] = useState(false);

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleSwapPress = (product: Product) => {
    setSelectedSwap(product);
  };

  const handleMakeOffer = () => {
    if (selectedProduct) {
      setOfferProduct(selectedProduct);
      setSelectedProduct(null);
    }
  };

  const handleOfferSent = () => {
    setOfferProduct(null);
    setShowOfferSuccess(true);
    setTimeout(() => {
      setShowOfferSuccess(false);
      setActiveTab('Home');
    }, 2800);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-1">
        {activeTab === 'Profile' && <ProfilePage onBack={() => setActiveTab('Home')} />}

        {activeTab === 'Chat' && <ChatPage />}

        {activeTab === 'Home' && (
          <ScrollView 
            showsVerticalScrollIndicator={false}
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 100 }}
          >
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
                    source="https://i.pinimg.com/1200x/69/78/19/69781905dd57ba144ab71ca4271ab294.jpg"
                    style={{ width: 44, height: 44, borderRadius: 50 }}
                    contentFit="cover"
                  />
                </Pressable>
              </View>
            </Animated.View>

            <View className="px-8">
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

              {/* Featured Sections */}
              <Animated.View 
                entering={FadeInDown.delay(400).duration(800)}
                className="mt-6 flex-row items-center justify-between"
                style={{ gap: 15 }}
              >
                <Pressable className="flex-1 bg-white h-[120px] rounded-[24px] p-4 shadow-sm border border-slate-50 relative overflow-hidden active:scale-98">
                  <Text className="text-slate-900 font-bold text-[16px] leading-[20px] w-[65%]">Explore{"\n"}Jusswap</Text>
                  <View className="absolute bottom-1 right-1">
                    <Image source="https://lebiryprumdaarwlhqxr.supabase.co/storage/v1/object/public/jusswap%20app/Main%20pages/Box1.png" style={{ width: 68, height: 68 }} contentFit="contain" />
                  </View>
                </Pressable>

                <Pressable className="flex-1 bg-white h-[120px] rounded-[24px] p-4 shadow-sm border border-slate-50 relative overflow-hidden active:scale-98">
                  <Text className="text-slate-900 font-bold text-[16px] leading-[20px] w-[65%]">Track{"\n"}packages</Text>
                  <View className="absolute bottom-1 right-1">
                    <Image source="https://lebiryprumdaarwlhqxr.supabase.co/storage/v1/object/public/jusswap%20app/Main%20pages/Box2.png" style={{ width: 68, height: 68 }} contentFit="contain" />
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
                
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 32 }}>
                  {PRODUCTS.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onPress={handleProductPress}
                    />
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
                
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 32 }}>
                  {SWAPS.map((swap) => (
                    <SwapCard 
                      key={swap.id} 
                      product={swap} 
                      onPress={handleSwapPress}
                    />
                  ))}
                </ScrollView>
              </View>
            </View>
          </ScrollView>
        )}

        {activeTab === 'Explore' && (
          <ExplorePage 
            onProfilePress={() => setActiveTab('Profile')} 
            onProductPress={handleProductPress}
            onSwapPress={handleSwapPress}
          />
        )}

        {activeTab === 'Favourite' && (
          <FavouritePage onBack={() => setActiveTab('Home')} />
        )}

        {activeTab === 'Add' && (
          <PostListingPage
            onBack={() => setActiveTab('Home')}
            onPostSuccess={() => setActiveTab('Home')}
          />
        )}

        {selectedProduct && (
          <View className="absolute inset-0 z-50 bg-white">
            <ProductDetailsPage 
              product={selectedProduct} 
              onBack={() => setSelectedProduct(null)}
              onMakeOffer={handleMakeOffer}
            />
          </View>
        )}

        {selectedSwap && (
          <View className="absolute inset-0 z-50 bg-white">
            <SwapDetailsPage 
              product={selectedSwap} 
              onBack={() => setSelectedSwap(null)} 
            />
          </View>
        )}

        {/* Offer Overlay */}
        {offerProduct && (
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 60, backgroundColor: '#f8fafc' }}>
            <MakeOfferPage
              product={offerProduct}
              onBack={() => {
                setOfferProduct(null);
                setSelectedProduct(offerProduct);
              }}
              onOfferSent={handleOfferSent}
            />
          </View>
        )}

        {/* Offer Success Toast */}
        {showOfferSuccess && (
          <View
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 70,
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <View
              style={{
                backgroundColor: '#fff', borderRadius: 32, padding: 36,
                alignItems: 'center', width: '80%',
                shadowColor: '#000', shadowOffset: { width: 0, height: 20 },
                shadowOpacity: 0.15, shadowRadius: 40, elevation: 30,
              }}
            >
              <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#ecfdf5', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <CheckCircle2 size={44} color="#10b981" strokeWidth={2.5} />
              </View>
              <Text style={{ color: '#0f172a', fontWeight: '900', fontSize: 22, textAlign: 'center', marginBottom: 8 }}>
                Offer Sent! 🚀
              </Text>
              <Text style={{ color: '#64748b', fontWeight: '500', fontSize: 14, textAlign: 'center', lineHeight: 22 }}>
                Your offer has been sent to the seller. You'll be notified when they respond.
              </Text>
            </View>
          </View>
        )}

        {/* Bottom Navigation Bar — hidden when Add/Details/Offer is open */}
        {activeTab !== 'Add' && !selectedProduct && !selectedSwap && !offerProduct && (
          <TabBar activeTab={activeTab} onTabPress={setActiveTab} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
