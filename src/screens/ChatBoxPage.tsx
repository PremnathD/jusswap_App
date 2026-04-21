import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  Pressable, 
  ScrollView, 
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Modal
} from 'react-native';
import { Image } from 'expo-image';
import Animated, { 
  FadeInDown, 
  FadeInRight,
  FadeIn
} from 'react-native-reanimated';
import { 
  ArrowLeft,
  MoreVertical,
  Send,
} from 'lucide-react-native';

// Import Types (Should ideally be in a shared types file, duplicating here for speed)
interface ChatMember {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  color: string;
}

interface ChatBoxPageProps {
  member: ChatMember;
  onBack: () => void;
}

const Avatar = ({ name, color }: { name: string, color: string }) => {
  const initial = name.charAt(0).toUpperCase();
  return (
    <View 
      className="w-10 h-10 rounded-full items-center justify-center shadow-sm"
      style={{ backgroundColor: color }}
    >
      <Text className="text-white font-bold text-lg">{initial}</Text>
    </View>
  );
};

const ChatBoxPage = ({ member, onBack }: ChatBoxPageProps) => {
  const [message, setMessage] = useState('');

  // Dummy messages mimicking the UI reference
  const MOCK_MESSAGES = [
    {
      id: '1',
      sender: 'other',
      text: 'Hello there!',
    },
    {
      id: '2',
      sender: 'other',
      text: 'Hey, is the PS5 still available? What’s the condition and how old is it?Also, are you open to swapping it?',
    },
    {
      id: '3',
      sender: 'other',
      text: 'I have an iPhone 15 in excellent condition for swap.',
      showAvatar: true
    },
    {
      id: '4',
      sender: 'me',
      text: 'PS5 is available 👍',
    },
    {
      id: '5',
      sender: 'me',
      text: 'And yes, I\'m open to swapping it 🤝\nLooking for something like a gaming laptop or iPhone. Let me know what you have for exchange!',
    }
  ];

  return (
    <Modal 
      visible={true} 
      animationType="slide" 
      onRequestClose={onBack}
    >
      <View className="flex-1 bg-white">
        {/* Header */}
      <View className="pt-[50px] pb-3 px-4 bg-white z-10 border-b border-slate-100 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Pressable onPress={onBack} className="p-2 -ml-2 active:opacity-50">
            <ArrowLeft size={24} color="#64748b" />
          </Pressable>
          
          <View className="ml-2 flex-row flex-1 items-center">
            {member.name === 'Sakthi' ? (
              <Image 
                source="https://i.pinimg.com/1200x/69/78/19/69781905dd57ba144ab71ca4271ab294.jpg" // Using an avatar image
                style={{ width: 44, height: 44, borderRadius: 22 }}
                contentFit="cover"
              />
            ) : (
              <Avatar name={member.name} color={member.color} />
            )}
            
            <View className="ml-3 justify-center">
              <Text className="text-slate-900 font-bold text-[17px] tracking-tight">{member.name}</Text>
              <View className="flex-row items-center mt-0.5">
                <View className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
                <Text className="text-slate-400 font-medium text-xs">Online</Text>
              </View>
            </View>
          </View>
        </View>

        <Pressable className="p-2 active:opacity-50">
          <MoreVertical size={22} color="#94a3b8" />
        </Pressable>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
        keyboardVerticalOffset={0}
      >
        {/* Chat Feed */}
        <ScrollView 
          className="flex-1 px-4" 
          contentContainerStyle={{ paddingVertical: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Date Separator */}
          <View className="self-center bg-[#9e9e9e] rounded-[10px] px-3 py-1 mb-6">
            <Text className="text-white text-[12px] font-bold">Today</Text>
          </View>

          {/* Messages */}
          {MOCK_MESSAGES.map((msg, index) => {
            const isMe = msg.sender === 'me';
            
            return (
              <Animated.View 
                key={msg.id} 
                entering={FadeInDown.delay(200 + (index * 100)).duration(400)}
                className={`mb-3 w-full flex-row ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                {!isMe && (
                  <View className="w-10 mr-2 justify-end pb-1">
                    {msg.showAvatar ? (
                      member.name === 'Sakthi' ? (
                        <Image 
                          source="https://i.pinimg.com/1200x/69/78/19/69781905dd57ba144ab71ca4271ab294.jpg"
                          style={{ width: 36, height: 36, borderRadius: 18 }}
                          contentFit="cover"
                        />
                      ) : (
                        <View className="scale-90">
                          <Avatar name={member.name} color={member.color} />
                        </View>
                      )
                    ) : null}
                  </View>
                )}

                <View className={`max-w-[80%] rounded-[16px] px-4 py-3 ${
                    isMe 
                      ? 'bg-[#121611]' // Dark Theme from Image
                      : 'bg-white border border-slate-700' 
                  }`}
                  style={{
                    borderTopRightRadius: isMe && index > 3 ? 4 : 16,
                    borderTopLeftRadius: !isMe && index > 1 && index < 3 ? 4 : 16,
                  }}
                >
                  <Text className={`text-[15px] leading-5 ${isMe ? 'text-white' : 'text-slate-800'}`}>
                    {msg.text}
                  </Text>
                </View>
              </Animated.View>
            );
          })}
        </ScrollView>

        {/* Input Area */}
        <View className="px-4 py-3 pb-8 bg-white flex-row items-center">
          <TextInput 
            placeholder="Enter your message"
            placeholderTextColor="#9ca3af"
            className="flex-1 bg-white border border-slate-800 rounded-full px-5 py-0 h-[52px] font-medium text-[15px] text-slate-800 mr-3"
            value={message}
            onChangeText={setMessage}
          />
          
          <Pressable className="w-[52px] h-[52px] bg-[#af8cfa] rounded-full items-center justify-center active:scale-95">
            <Send size={22} color="white" className="ml-1" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
    </Modal>
  );
};

export default ChatBoxPage;
