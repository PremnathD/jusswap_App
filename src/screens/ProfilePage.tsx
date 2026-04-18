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
        {/* Redesigned Header Section */}
        <Animated.View 
          entering={FadeInDown.duration(600)}
          className="flex-row items-center justify-between pt-[50px] mb-8"
        >
          <View className="flex-row items-center">
            <Pressable 
              onPress={onBack}
              className="w-12 h-12 rounded-2xl bg-white items-center justify-center border border-slate-100 shadow-sm active:scale-95 transition-all"
            >
              <ArrowLeft size={22} color="#1e293b" strokeWidth={2.5} />
            </Pressable>
            <Text className="ml-5 text-slate-900 font-bold text-[28px] tracking-tight">Profile</Text>
          </View>

          <Pressable 
            className="w-12 h-12 rounded-2xl bg-white items-center justify-center border border-slate-100 shadow-sm active:scale-95"
          >
            <Bell size={20} color="#64748b" strokeWidth={2} />
            <View className="absolute top-3.5 right-3.5 w-2 h-2 bg-rose-500 rounded-full border border-white" />
          </Pressable>
        </Animated.View>

        {/* Removed redundant Profile text */}

        {/* Profile Card */}
        <Animated.View 
          entering={FadeInDown.duration(600)}
          className="items-center mb-10"
        >
          <View className="relative">
            <View className="w-28 h-28 rounded-full border-4 border-white shadow-xl shadow-slate-200 p-1">
              <Image 
                source="https://i.pinimg.com/1200x/69/78/19/69781905dd57ba144ab71ca4271ab294.jpg"
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
