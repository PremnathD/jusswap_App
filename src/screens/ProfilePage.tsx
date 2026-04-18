import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  Pressable, 
  ScrollView, 
  Platform 
} from 'react-native';
import { Image } from 'expo-image';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { 
  ArrowLeft, 
  MapPin, 
  Package, 
  Heart, 
  Layout, 
  Bell, 
  Key, 
  Headphones, 
  ChevronRight 
} from 'lucide-react-native';

const SettingsItem = ({ icon: Icon, label, onPress, isLast = false }: any) => (
  <Pressable 
    onPress={onPress}
    className={`flex-row items-center justify-between py-4 px-4 ${!isLast ? 'border-b border-slate-50' : ''} active:bg-slate-50`}
  >
    <View className="flex-row items-center">
      <View className="w-10 h-10 items-center justify-center mr-2">
        <Icon size={22} color="#B796FF" strokeWidth={2} />
      </View>
      <Text className="text-slate-900 font-bold text-sm tracking-tight">{label}</Text>
    </View>
    <ChevronRight size={18} color="#cbd5e1" strokeWidth={2} />
  </Pressable>
);

interface ProfilePageProps {
  onBack: () => void;
}

const ProfilePage = ({ onBack }: ProfilePageProps) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        className="flex-1 px-8"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mt-4 mb-6">
          <Pressable 
            onPress={onBack}
            className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center border border-slate-100"
          >
            <ArrowLeft size={20} color="#1e293b" />
          </Pressable>
        </View>

        <Text className="text-slate-900 font-bold text-[36px] tracking-tight mb-8">Profile</Text>

        {/* Profile Card */}
        <Animated.View 
          entering={FadeInDown.duration(600)}
          className="items-center mb-10"
        >
          <View className="relative">
            <View className="w-28 h-28 rounded-full border-4 border-white shadow-xl shadow-slate-200 p-1">
              <Image 
                source="/Users/tilak/.gemini/antigravity/brain/a11823aa-e4b9-4252-81ee-1b18747ea0c5/tilak_avatar_3d_1776477003249.png"
                style={{ width: '100%', height: '100%', borderRadius: 56 }}
                contentFit="cover"
              />
            </View>
          </View>

          <Text className="text-slate-900 font-bold text-2xl mt-4">Tilak</Text>
          <Text className="text-slate-400 font-medium text-sm mt-1">tilak.g@gmail.com</Text>
          
          <View className="flex-row items-center mt-3 bg-[#B796FF20] px-3 py-1.5 rounded-full">
            <MapPin size={12} color="#B796FF" style={{ marginRight: 6 }} />
            <Text className="text-[#B796FF] font-bold text-[10px] uppercase tracking-wider">Coimbatore</Text>
          </View>

          <Pressable 
            className="mt-8 bg-[#B796FF] px-10 py-4 rounded-full shadow-lg shadow-[#B796FF40] active:scale-95"
            style={{ elevation: 5 }}
          >
            <Text className="text-white font-bold text-sm">Edit Profile</Text>
          </Pressable>
        </Animated.View>

        {/* Settings Group 1 */}
        <Animated.View 
          entering={FadeInDown.delay(100).duration(600)}
          className="bg-white rounded-[24px] border border-slate-100 overflow-hidden mb-6"
          style={{ 
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.03,
            shadowRadius: 10,
            elevation: 2
          }}
        >
          <SettingsItem icon={Package} label="Orders" onPress={() => {}} />
          <SettingsItem icon={Heart} label="Wishlist" onPress={() => {}} />
          <SettingsItem icon={Layout} label="Appearance" onPress={() => {}} isLast={true} />
        </Animated.View>

        {/* Settings Group 2 */}
        <Animated.View 
          entering={FadeInDown.delay(200).duration(600)}
          className="bg-white rounded-[24px] border border-slate-100 overflow-hidden"
          style={{ 
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.03,
            shadowRadius: 10,
            elevation: 2
          }}
        >
          <SettingsItem icon={Bell} label="Notification Settings" onPress={() => {}} />
          <SettingsItem icon={Key} label="Password Changed" onPress={() => {}} />
          <SettingsItem icon={Headphones} label="Help Centre" onPress={() => {}} isLast={true} />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;
