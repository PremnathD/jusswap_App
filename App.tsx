import "./global.css";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, SafeAreaView } from "react-native";
import SplashScreen from "./src/screens/SplashScreen";
import Animated, { 
  FadeInDown, 
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS
} from "react-native-reanimated";

import IntroPage from "./src/screens/IntroPage";
import LoginStartPage from "./src/screens/LoginStartPage";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'intro' | 'loginStart'>('splash');
  const opacity = useSharedValue(1);

  const handleEnter = () => {
    // Fade out the splash screen
    opacity.value = withTiming(0, { duration: 800 }, (finished) => {
      if (finished) {
        runOnJS(setCurrentScreen)('intro');
      }
    });
  };

  const handleContinue = () => {
    setCurrentScreen('loginStart');
  };

  const animatedSplashStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (currentScreen === 'splash') {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar style="dark" />
        <Animated.View style={[{ flex: 1 }, animatedSplashStyle]}>
          <SplashScreen onEnter={handleEnter} />
        </Animated.View>
      </View>
    );
  }

  if (currentScreen === 'intro') {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar style="dark" />
        <IntroPage onContinue={handleContinue} />
      </View>
    );
  }

  if (currentScreen === 'loginStart') {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar style="dark" />
        <LoginStartPage />
      </View>
    );
  }

  return null;
}
