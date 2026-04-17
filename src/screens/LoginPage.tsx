import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  Pressable, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform, 
  Keyboard, 
  TouchableWithoutFeedback 
} from 'react-native';
import { Image } from 'expo-image';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { Eye, EyeOff } from 'lucide-react-native';

const LoginPage = ({ onLogin }: { onLogin?: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="flex-1 bg-white">
      <Animated.View style={{ flex: 1 }} entering={FadeIn.duration(800)}>
        {/* Background Image */}
        <Image
          source="https://lebiryprumdaarwlhqxr.supabase.co/storage/v1/object/public/jusswap%20app/Intro%20Page/LoginPage.jpg"
          style={StyleSheet.absoluteFillObject}
          contentFit="cover"
        />
        
        <KeyboardAvoidingView 
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 justify-end">
              
              {/* This container ensures the white background goes all the way to the bottom */}
              <View className="bg-white rounded-t-[50px] overflow-hidden">
                <Animated.View 
                  entering={FadeInUp.delay(300).duration(800)} 
                  className="w-full px-8 pt-12 pb-12 shadow-2xl"
                >
                  {/* Email Input */}
                  <View className="mb-6">
                    <TextInput
                      className="w-full bg-slate-50 px-6 py-5 rounded-2xl text-slate-900 border border-slate-100 font-medium"
                      placeholder="Email Address"
                      placeholderTextColor="#94a3b8"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      value={email}
                      onChangeText={setEmail}
                    />
                  </View>

                  {/* Password Input */}
                  <View className="mb-3 relative">
                    <TextInput
                      className="w-full bg-slate-50 px-6 py-5 rounded-2xl text-slate-900 border border-slate-100 font-medium"
                      placeholder="Password"
                      placeholderTextColor="#94a3b8"
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={setPassword}
                    />
                    <Pressable 
                      onPress={() => setShowPassword(!showPassword)}
                      className="absolute right-6 top-[22px]"
                      hitSlop={20}
                    >
                      {showPassword ? (
                        <EyeOff size={22} color="#64748b" />
                      ) : (
                        <Eye size={22} color="#64748b" />
                      )}
                    </Pressable>
                  </View>

                  {/* Forgot Password */}
                  <Pressable className="items-end mb-10">
                    <Text className="text-slate-900 font-bold text-[14px] px-1">Forgot Password?</Text>
                  </Pressable>

                  {/* Sign In Button */}
                  <Pressable 
                    onPress={onLogin}
                    className="w-full bg-white py-3 rounded-2xl border-[2.5px] border-slate-600 items-center justify-center active:bg-slate-50 active:scale-[0.98] transition-all mb-8 shadow-sm"
                  >
                    <Text className="text-slate-900 text-[22px] font-black tracking-tight">
                      Sign In
                    </Text>
                  </Pressable>

                  {/* Footer Text */}
                  <View className="flex-row justify-center items-center pb-4">
                    <Text className="text-slate-400 text-[14px] font-medium">Don't have an account? </Text>
                    <Pressable>
                      <Text className="text-slate-900 font-bold text-[14px]">Sign Up</Text>
                    </Pressable>
                  </View>

                </Animated.View>
              </View>

            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

      </Animated.View>
    </View>
  );
};

export default LoginPage;
