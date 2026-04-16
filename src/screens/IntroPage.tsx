import React, { useEffect } from 'react';
import { View, Text, ScrollView, Pressable, Dimensions, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  FadeInDown, 
  FadeInRight, 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  Easing 
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const TAG_ROWS = [
  [
    { label: "Books", type: "default" },
    { label: "Gaming Console", type: "accent" },
    { label: "Dress", type: "default" },
    { label: "Watch", type: "default" },
    { label: "Furniture", type: "default" },
  ],
  [
    { label: "Arts", type: "default" },
    { label: "Coffee mugs", type: "default" },
    { label: "Mobile", type: "accent" },
    { label: "Car", type: "default" },
    { label: "Computers", type: "default" },
  ],
  [
    { label: "Home Decor", type: "accent" },
    { label: "PS5", type: "default" },
    { label: "Sofa", type: "default" },
    { label: "Charger", type: "default" },
  ],
  [
    { label: "Poster", type: "default" },
    { label: "Table", type: "default" },
    { label: "Glass", type: "default" },
    { label: "Gold ring", type: "accent" },
  ],
];

const TagPill = ({ label, type }: { label: string, type: string }) => (
  <View 
    className={`px-6 py-3.5 rounded-full border mr-3 ${
      type === "accent" 
        ? "bg-violet-400 border-violet-500" 
        : "bg-slate-100 border-slate-200"
    }`}
  >
    <Text 
      className={`text-[15px] font-bold tracking-tight ${
        type === "accent" ? "text-white" : "text-slate-800"
      }`}
    >
      {label}
    </Text>
  </View>
);

const AutoScrollRow = ({ tags, duration, reverse = false }: { tags: any[], duration: number, reverse?: boolean }) => {
  const [contentWidth, setContentWidth] = React.useState(0);
  const translateX = useSharedValue(0);

  useEffect(() => {
    if (contentWidth > 0) {
      // Logic for seamless bidirectional looping:
      // We start centered on the middle set of tags (-contentWidth).
      // Left scroll moves toward -2*contentWidth, Right scroll moves toward 0.
      const startValue = -contentWidth;
      const targetValue = reverse ? 0 : -2 * contentWidth;
      
      translateX.value = startValue;
      translateX.value = withRepeat(
        withTiming(targetValue, {
          duration: duration,
          easing: Easing.linear,
        }),
        -1,
        false
      );
    }
  }, [contentWidth]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // Render 3 sets: [Buffer1, Main, Buffer2]
  return (
    <View className="overflow-hidden py-1">
      <Animated.View style={[animatedStyle, { flexDirection: 'row' }]}>
        {/* Set 1: Buffer Left */}
        <View className="flex-row">
          {tags.map((tag, i) => <TagPill key={`s1-${i}`} label={tag.label} type={tag.type} />)}
        </View>
        
        {/* Set 2: Main (Measured) */}
        <View 
          onLayout={(e) => {
            if (contentWidth === 0) setContentWidth(e.nativeEvent.layout.width);
          }}
          className="flex-row"
        >
          {tags.map((tag, i) => <TagPill key={`s2-${i}`} label={tag.label} type={tag.type} />)}
        </View>

        {/* Set 3: Buffer Right */}
        <View className="flex-row">
          {tags.map((tag, i) => <TagPill key={`s3-${i}`} label={tag.label} type={tag.type} />)}
        </View>
      </Animated.View>
    </View>
  );
};

const IntroPage = ({ onContinue }: { onContinue: () => void }) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top Layer: Typography */}
      <View className="px-6 pt-8 pb-4 items-center">
        <Animated.View entering={FadeInDown.delay(200).duration(800)}>
          <Text className="text-[64px] font-black text-slate-900 leading-[70px] tracking-tighter text-center">
            Swaps
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(400).duration(800)} className="mt-4">
          <Text className="text-slate-900 text-[13px] leading-7 font-normal text-center px-4">
            You can swap anything you have. Get anything you want.{"\n"}No money. Just value.
          </Text>
        </Animated.View>
      </View>

      {/* Mid Layer: Infinite Marquee Tags */}
      <View className="py-16 gap-3 space-y-10">
        <AutoScrollRow tags={TAG_ROWS[0]} duration={12000} />
        <AutoScrollRow tags={TAG_ROWS[1]} duration={15000} reverse />
        <AutoScrollRow tags={TAG_ROWS[2]} duration={14000} />
        <AutoScrollRow tags={TAG_ROWS[3]} duration={13000} reverse />
      </View>

      {/* Bottom Layer: Image & Button */}
      <View className="flex-1 justify-end px-6 pb-8">
        <View className="absolute inset-x-0 bottom-0 items-center justify-end -z-10">
          <Image
            source="https://lebiryprumdaarwlhqxr.supabase.co/storage/v1/object/public/jusswap%20app/Intro%20Page/introPage.png"
            style={{ width: 1150, height: 500, marginBottom: -100 }}
            contentFit="cover"
          />
        </View>

        {/* Continue Button */}
        <Animated.View entering={FadeInDown.delay(1000).duration(800)}>
          <Pressable 
            onPress={onContinue}
            className="overflow-hidden rounded-full shadow-lg shadow-black/20"
          >
            <View className="px-8 py-5 items-center justify-center bg-[#151515]">
              <Text className="text-white text-[18px] font-bold tracking-wide">
                Continue
              </Text>
            </View>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default IntroPage;
