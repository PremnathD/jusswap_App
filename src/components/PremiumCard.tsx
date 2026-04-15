import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LucideIcon, Zap } from 'lucide-react-native';

interface PremiumCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
}

export const PremiumCard = ({ title, description, icon: Icon = Zap }: PremiumCardProps) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      className="bg-slate-800/50 border border-slate-700 p-6 rounded-3xl mb-4 overflow-hidden"
    >
      <View className="flex-row items-center mb-3">
        <View className="bg-lime-400 p-2 rounded-xl mr-3">
          <Icon size={20} color="#000" />
        </View>
        <Text className="text-white text-xl font-bold font-sans">{title}</Text>
      </View>
      <Text className="text-slate-400 text-sm leading-5">
        {description}
      </Text>
      
      {/* Subtle Gradient Hint */}
      <View className="absolute -bottom-10 -right-10 w-32 h-32 bg-lime-400/10 rounded-full blur-3xl" />
    </TouchableOpacity>
  );
};
