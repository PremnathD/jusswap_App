import React from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import { Home, Compass, Plus, Heart, User } from 'lucide-react-native';

interface TabBarProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const TabBar = ({ activeTab, onTabPress }: TabBarProps) => {
  return (
    <View 
  className="absolute bottom-0 w-full"
  style={{ 
    overflow: 'visible',
    position: 'relative' // IMPORTANT
  }}
>
  
  {/* Main Bar FIRST */}
  <View 
    className="bg-white flex-row items-center justify-between px-6 border-t border-slate-100"
    style={{ 
      height: Platform.OS === 'ios' ? 90 : 70, 
      paddingBottom: Platform.OS === 'ios' ? 25 : 0,
      elevation: 5, // lower than FAB
      zIndex: 1,
    }}
  >
    {/* Left Tabs */}
    <Pressable 
      onPress={() => onTabPress('Home')}
      className="items-center justify-center flex-1"
    >
      <Home size={24} color={activeTab === 'Home' ? '#4f46e5' : '#94a3b8'} />
      <Text className={`text-[10px] mt-1 ${activeTab === 'Home' ? 'text-[#4f46e5]' : 'text-slate-400'}`}>
        Home
      </Text>
    </Pressable>

    <Pressable 
      onPress={() => onTabPress('Explore')}
      className="items-center justify-center flex-1 pr-4"
    >
      <Compass size={24} color={activeTab === 'Explore' ? '#4f46e5' : '#94a3b8'} />
      <Text className={`text-[10px] mt-1 ${activeTab === 'Explore' ? 'text-[#4f46e5]' : 'text-slate-400'}`}>
        Explore
      </Text>
    </Pressable>

    <View className="flex-1" />

    <Pressable 
      onPress={() => onTabPress('Favourite')}
      className="items-center justify-center flex-1 pl-4"
    >
      <Heart size={24} color={activeTab === 'Favourite' ? '#4f46e5' : '#94a3b8'} />
      <Text className="text-[10px] mt-1 text-slate-400">
        History
      </Text>
    </Pressable>

    <Pressable 
      onPress={() => onTabPress('Profile')}
      className="items-center justify-center flex-1"
    >
      <User size={24} color={activeTab === 'Profile' ? '#4f46e5' : '#94a3b8'} />
      <Text className="text-[10px] mt-1 text-slate-400">
        Profile
      </Text>
    </Pressable>
  </View>

  {/* FAB AFTER (so it's on top) */}
  <Pressable 
    onPress={() => onTabPress('Add')}
    className="absolute items-center justify-center bg-[#4f46e5] w-[60px] h-[60px] rounded-full"
    style={{ 
      top: -20,
      left: '50%',
      transform: [{ translateX: -30 }],
      zIndex: 10,
      elevation: 20, // 🔥 important for Android
    }}
  >
    <Plus size={30} color="white" strokeWidth={3} />
  </Pressable>

</View>
  );
};

export default TabBar;
