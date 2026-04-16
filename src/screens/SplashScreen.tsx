import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { Image } from 'expo-image';
import Svg, { Rect, Defs, RadialGradient, Stop } from 'react-native-svg';
import Animated, { 
  FadeIn, 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withSequence, 
  withTiming, 
  Easing 
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const CENTER_X = width / 2;
const CENTER_Y = height * 0.42;

const R1 = 85; 
const R2 = 145;
const R3 = 215;

const FloatingItem = ({ angle, radius, imageUrl, size = 48 }: any) => {
  const radian = (angle * Math.PI) / 180;
  const half = size / 2;
  const x = CENTER_X + radius * Math.cos(radian) - half;
  const y = CENTER_Y + radius * Math.sin(radian) - half;

  const floating = useSharedValue(0);

  React.useEffect(() => {
    floating.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000 + Math.random() * 1000, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 2000 + Math.random() * 1000, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    // Stillness
  }));

  return (
    <Animated.View style={[{ position: 'absolute', left: x, top: y, width: size, height: size }, animatedStyle]}>
      <View className="items-center justify-center" style={{ width: size, height: size }}>
        {imageUrl && imageUrl.startsWith('http') ? (
          <Image source={imageUrl} style={{ width: '100%', height: '100%' }} contentFit="contain" />
        ) : (
          <Text className="text-slate-500 font-bold text-[8px] text-center px-1">
            {imageUrl || 'IMG URL'}
          </Text>
        )}
      </View>
    </Animated.View>
  );
};

const SplashScreen = ({ onEnter }: { onEnter: () => void }) => {
  return (
    <Pressable onPress={onEnter} className="flex-1 bg-white">
      {/* Image Background */}
      <Image
        source="https://lebiryprumdaarwlhqxr.supabase.co/storage/v1/object/public/jusswap%20app/jusswapBackgroundSplash.jpg"
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />

      {/* Concentric Design */}
      <View 
        className="absolute border-[3px] border-white/90 rounded-full" 
        style={{ width: R1 * 2, height: R1 * 2, left: CENTER_X - R1, top: CENTER_Y - R1 }} 
      />
      <View 
        className="absolute border-[3px] border-white/90 rounded-full" 
        style={{ width: R2 * 2, height: R2 * 2, left: CENTER_X - R2, top: CENTER_Y - R2 }} 
      />
      <View 
        className="absolute border-[3px] border-white/80 rounded-full" 
        style={{ width: R3 * 2, height: R3 * 2, left: CENTER_X - R3, top: CENTER_Y - R3 }} 
      />

      {/* Floating Elements */}
      <FloatingItem angle={-90} radius={R3} size={76} imageUrl="https://lebiryprumdaarwlhqxr.supabase.co/storage/v1/object/public/jusswap%20app/Splash%20page/splash-Women1.png" />
      <FloatingItem angle={-45} radius={R3} size={66} imageUrl="https://lebiryprumdaarwlhqxr.supabase.co/storage/v1/object/public/jusswap%20app/Splash%20page/splash-paper.png" />
      <FloatingItem angle={10} radius={R3} size={54} imageUrl="https://lebiryprumdaarwlhqxr.supabase.co/storage/v1/object/public/jusswap%20app/Splash%20page/splash-Men2.png" />
      <FloatingItem angle={210} radius={R3} size={58} imageUrl="https://lebiryprumdaarwlhqxr.supabase.co/storage/v1/object/public/jusswap%20app/Splash%20page/splash-Men1.png" />
      <FloatingItem angle={-140} radius={R2} size={120} imageUrl="https://lebiryprumdaarwlhqxr.supabase.co/storage/v1/object/public/jusswap%20app/Splash%20page/splash-rocket.png" />
      <FloatingItem angle={-30} radius={R2} size={74} imageUrl="https://lebiryprumdaarwlhqxr.supabase.co/storage/v1/object/public/jusswap%20app/Splash%20page/splash-heart.png" />
      <FloatingItem angle={150} radius={R2} size={80} imageUrl="https://lebiryprumdaarwlhqxr.supabase.co/storage/v1/object/public/jusswap%20app/Splash%20page/splash-bulb.png" />
      <FloatingItem angle={60} radius={R2} size={84} imageUrl="https://lebiryprumdaarwlhqxr.supabase.co/storage/v1/object/public/jusswap%20app/Splash%20page/splash-zoom.png" />
      <FloatingItem angle={120} radius={R3} size={82} imageUrl="https://lebiryprumdaarwlhqxr.supabase.co/storage/v1/object/public/jusswap%20app/Splash%20page/Splash-Women3.png" />

      {/* Logo without Glow */}
      <View 
        className="absolute items-center justify-center"
        style={{ width: 160, height: 160, left: CENTER_X - 80, top: CENTER_Y - 80 }}
      >
        <Image
          source="https://lebiryprumdaarwlhqxr.supabase.co/storage/v1/object/public/jusswap%20app/JusswapLogo.svg"
          style={{ width: 110, height: 110 }}
          contentFit="contain"
        />
      </View>

      {/* Text moved down */}
      <View className="absolute bottom-[12%] w-full flex-center px-6" style={{ zIndex: 10 }}>
        <Animated.View entering={FadeIn.duration(1000)}>
          <Text className="text-[44px] font-black text-slate-900 text-center tracking-tighter leading-[50px]">
            <Text className="text-violet-600">Swap</Text> smarter{"\n"}Live better
          </Text>
        </Animated.View>
      </View>


    </Pressable>
  );
};

export default SplashScreen;
