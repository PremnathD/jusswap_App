import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

const LoginStartPage = () => {
  return (
    <View className="flex-1 bg-white">
      <Animated.View style={{ flex: 1 }} entering={FadeIn.duration(800)}>
        <Image
          source="https://lebiryprumdaarwlhqxr.supabase.co/storage/v1/object/public/jusswap%20app/Intro%20Page/LoginButtonPage.png"
          style={StyleSheet.absoluteFillObject}
          contentFit="cover"
        />
        
        {/* Bottom Content Overlay */}
        <View className="absolute bottom-16 inset-x-0 px-8 items-center">
          <Animated.View entering={FadeInDown.delay(300).duration(800)}>
            <Text className="text-[24px] font-black text-slate-900 text-center leading-[32px] tracking-tighter mb-8 px-2">
              Don't miss this app everyone's{"\n"}already swapping.
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(600).duration(800)} className="w-full">
            <Pressable className="w-full bg-[#af8cfa] py-5 rounded-full shadow-xl shadow-[#af8cfa]/40 items-center justify-center">
              <Text className="text-slate-900 text-[22px] font-bold tracking-tight">
                login
              </Text>
            </Pressable>
          </Animated.View>
        </View>

      </Animated.View>
    </View>
  );
};

export default LoginStartPage;
