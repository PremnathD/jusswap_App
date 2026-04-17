import React from 'react';
import { View, Text, SafeAreaView, Pressable } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const HomePage = () => {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <Animated.View 
        entering={FadeIn.duration(1000)}
        className="flex-1 items-center justify-center px-8"
      >
        <View className="bg-white p-10 rounded-[40px] shadow-2xl items-center w-full">
          <View className="w-20 h-20 bg-[#af8cfa]/20 rounded-full items-center justify-center mb-6">
            <Text className="text-4xl">👋</Text>
          </View>
          
          <Text className="text-3xl font-black text-slate-900 text-center mb-2">
            Welcome!
          </Text>
          <Text className="text-lg text-slate-500 text-center font-medium">
            Welcome to the home page of Jusswap.
          </Text>

          <Pressable className="mt-10 bg-slate-900 px-8 py-4 rounded-2xl active:scale-95 transition-all">
            <Text className="text-white font-bold text-lg">Get Started</Text>
          </Pressable>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default HomePage;
