import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  Pressable, 
  ScrollView, 
  TextInput,
  Platform,
  FlatList
} from 'react-native';
import Animated, { 
  FadeInDown, 
  FadeInRight,
  Layout,
  FadeIn,
  FadeOut
} from 'react-native-reanimated';
import { 
  Search, 
  X,
  ArrowLeft,
  MoreVertical
} from 'lucide-react-native';
import ChatBoxPage from './ChatBoxPage';

// --- Types ---
interface ChatMember {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  color: string;
}

// --- Dummy Data ---
const CHAT_MEMBERS: ChatMember[] = [
  {
    id: '1',
    name: 'Sakthi',
    lastMessage: 'Hi, how are u?',
    time: '08:24 AM',
    unreadCount: 3,
    color: '#FF9B9B', // Soft Red
  },
  {
    id: '2',
    name: 'Sruthi',
    lastMessage: 'Iphone is Avaliable Now',
    time: '08:24 AM',
    color: '#AF8CFA', // Purple (Brand)
  },
  {
    id: '3',
    name: 'Rahul',
    lastMessage: 'hey man I want that product',
    time: '08:24 AM',
    color: '#82C3FF', // Soft Blue
  },
  {
    id: '4',
    name: 'Raveen',
    lastMessage: 'Thanks broooo!',
    time: '08:24 AM',
    color: '#FFD782', // Soft Orange
  },
  {
    id: '5',
    name: 'Abishek',
    lastMessage: 'Nice Deal',
    time: '08:24 AM',
    unreadCount: 3,
    color: '#82FFB0', // Soft Green
  },
  {
    id: '6',
    name: 'Shivai',
    lastMessage: 'Its Amazing',
    time: '08:24 AM',
    color: '#FF82E2', // Soft Pink
  },
  {
    id: '7',
    name: 'riya',
    lastMessage: 'Lol',
    time: '08:24 AM',
    color: '#A0A0A0', // Gray
  },
];

// --- Components ---

const AvatarPlaceholder = ({ name, color }: { name: string, color: string }) => {
  const initial = name.charAt(0).toUpperCase();
  return (
    <View 
      className="w-14 h-14 rounded-full items-center justify-center shadow-sm"
      style={{ backgroundColor: color }}
    >
      <Text className="text-white font-bold text-xl">{initial}</Text>
    </View>
  );
};

const ChatListItem = ({ item, index, onPress }: { item: ChatMember, index: number, onPress: () => void }) => {
  return (
    <Animated.View 
      entering={FadeInDown.delay(index * 100).duration(600)}
      layout={Layout.springify()}
    >
      <Pressable 
        onPress={onPress}
        className="flex-row items-center px-8 py-4 active:bg-slate-50 border-b border-slate-50"
      >
        <AvatarPlaceholder name={item.name} color={item.color} />
        
        <View className="flex-1 ml-4 justify-center">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-slate-900 font-bold text-[17px] tracking-tight">{item.name}</Text>
            <Text className="text-slate-400 text-[11px] font-medium tracking-tight">{item.time}</Text>
          </View>
          
          <View className="flex-row justify-between items-center">
            <Text 
              className="text-slate-500 text-sm font-medium flex-1 mr-2" 
              numberOfLines={1}
            >
              {item.lastMessage}
            </Text>
            
            {item.unreadCount ? (
              <View className="bg-rose-500 w-5 h-5 rounded-full items-center justify-center">
                <Text className="text-white text-[10px] font-bold">{item.unreadCount.toString().padStart(2, '0')}</Text>
              </View>
            ) : null}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const ChatPage = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<ChatMember | null>(null);

  const filteredMembers = useMemo(() => {
    if (!searchQuery) return CHAT_MEMBERS;
    return CHAT_MEMBERS.filter(member => 
      member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  if (selectedChat) {
    return (
      <ChatBoxPage 
        member={selectedChat} 
        onBack={() => setSelectedChat(null)} 
      />
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View 
        className="px-8 pt-[50px] pb-4 bg-white z-10"
        style={{ 
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isSearchOpen ? 0.05 : 0,
          shadowRadius: 10,
          elevation: isSearchOpen ? 5 : 0,
        }}
      >
        <View className="flex-row items-center justify-between h-12">
          {!isSearchOpen ? (
            <Animated.View 
              entering={FadeInRight.duration(400)}
              exiting={FadeOut.duration(200)}
              className="flex-row items-center flex-1"
            >
              <Text className="text-slate-900 font-bold text-[32px] tracking-tight">Chat</Text>
            </Animated.View>
          ) : (
            <Animated.View 
              entering={FadeInRight.duration(400)}
              className="flex-1 flex-row items-center bg-slate-50 rounded-2xl px-4 h-12 mr-4"
            >
              <Search size={18} color="#94a3b8" />
              <TextInput 
                autoFocus
                placeholder="Search member..."
                className="flex-1 ml-2 text-slate-700 font-bold text-sm"
                placeholderTextColor="#cbd5e1"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <Pressable onPress={() => setSearchQuery('')}>
                  <X size={18} color="#94a3b8" />
                </Pressable>
              )}
            </Animated.View>
          )}

          <Pressable 
            onPress={() => {
              setIsSearchOpen(!isSearchOpen);
              if (isSearchOpen) setSearchQuery('');
            }}
            className="w-11 h-11 items-center justify-cente active:scale-95"
          >
            {isSearchOpen ? (
              <X size={22} color="#1e293b" strokeWidth={2.5} />
            ) : (
              <Search size={22} color="#1e293b" strokeWidth={2.5} />
            )}
          </Pressable>
        </View>
      </View>

      {/* List */}
      <FlatList
        data={filteredMembers}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ChatListItem 
            item={item} 
            index={index} 
            onPress={() => setSelectedChat(item)} 
          />
        )}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center mt-20 px-8">
            <Text className="text-slate-400 font-bold text-lg text-center">No members found matching "{searchQuery}"</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ChatPage;
