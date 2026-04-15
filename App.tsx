import "./global.css";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, SafeAreaView } from "react-native";
import { PremiumCard } from "./src/components/PremiumCard";
import { Rocket, Shield, Cpu, Layout } from "lucide-react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <StatusBar style="light" />
      <ScrollView 
        className="flex-1 px-6 pt-10"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Animated.View entering={FadeInUp.duration(1000).springify()}>
          <Text className="text-lime-400 font-bold text-sm tracking-widest uppercase mb-2">
            System 
          </Text>
          <Text className="text-white text-4xl font-black mb-8 leading-tight">
            Jusswap App{"\n"}
            <Text className="text-slate-500">Premium Ready.</Text>
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()}>
          <PremiumCard 
            title="NativeWind v4" 
            description="Tailwind CSS for React Native is configured and ready. Build with utility classes."
            icon={Layout}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
          <PremiumCard 
            title="TypeScript Core" 
            description="Full type safety across your components, hooks, and store."
            icon={Rocket}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}>
          <PremiumCard 
            title="TanStack Query" 
            description="Powerful asynchronous state management for API calls and caching."
            icon={Cpu}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()}>
          <PremiumCard 
            title="Zustand & Zod" 
            description="Lighweight global state and robust schema validation installed."
            icon={Shield}
          />
        </Animated.View>

        <View className="mt-8 items-center">
          <Text className="text-slate-500 text-xs italic">
            Built with Antigravity AI • Expo SDK 54
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
