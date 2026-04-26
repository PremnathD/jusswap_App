import React, { useState } from 'react';
import {
  View, Text, SafeAreaView, Pressable, TextInput,
  ScrollView, KeyboardAvoidingView, Platform, StatusBar, Alert,
} from 'react-native';
import { Image } from 'expo-image';
import {
  X, ChevronLeft, Plus, Camera, Image as ImageIcon,
  ShoppingBag, Repeat, CheckCircle2, Trash2, ArrowRight, ArrowLeft, ChevronDown,
} from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';

interface PostListingPageProps {
  onBack: () => void;
  onPostSuccess: () => void;
}

const CATEGORIES = ['Electronics', 'Fashion', 'Home & Living', 'Sports', 'Books', 'Vehicles', 'Others'];
const CONDITIONS = ['Brand New', 'Like New', 'Good', 'Fair', 'For Parts'];

const PURPLE = '#af8cfa';
const PURPLE_LIGHT = '#f3eeff';
const PURPLE_MID = '#ede9fe';
const SLATE_BG = '#f8fafc';
const CARD_BG = '#ffffff';
const BORDER = '#f0f0f7';

export default function PostListingPage({ onBack, onPostSuccess }: PostListingPageProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [listingType, setListingType] = useState<'sell' | 'swap'>('sell');
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [condition, setCondition] = useState(CONDITIONS[0]);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [showSourceSheet, setShowSourceSheet] = useState(false);
  const [showCategorySheet, setShowCategorySheet] = useState(false);
  const [showConditionSheet, setShowConditionSheet] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const takeWithCamera = async () => {
    setShowSourceSheet(false);
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') { Alert.alert('Permission Required', 'Allow camera access in Settings.'); return; }
    try {
      const result = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.85 });
      if (!result.canceled && result.assets.length > 0) setImages(p => [...p, result.assets[0].uri].slice(0, 4));
    } catch { Alert.alert('Error', 'Could not open camera.'); }
  };

  const pickFromGallery = async () => {
    setShowSourceSheet(false);
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) { Alert.alert('Permission Required', 'Allow gallery access in Settings.'); return; }
    try {
      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.8 });
      if (!result.canceled && result.assets.length > 0) setImages(p => [...p, result.assets[0].uri].slice(0, 4));
    } catch { Alert.alert('Error', 'Could not open gallery.'); }
  };

  const removeImage = (i: number) => setImages(p => p.filter((_, idx) => idx !== i));

  // ── Photo Slot ─────────────────────────────────────────────────────────────
  const PhotoSlot = ({ index }: { index: number }) => {
    const hasImage = images[index];

    return hasImage ? (
      <View 
        className="w-[160px] h-[160px] rounded-[24px] overflow-hidden bg-[#f1f5f9]" 
      >
        <Image source={{ uri: images[index] }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
        <Pressable
          onPress={() => removeImage(index)}
          className="absolute top-2.5 right-2.5 w-[30px] h-[30px] rounded-full bg-[#ef4444] items-center justify-center"
          style={{ shadowColor: '#ef4444', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 6 }}
        >
          <Trash2 size={13} color="white" strokeWidth={3} />
        </Pressable>
      </View>
    ) : (
      <Pressable
        onPress={() => setShowSourceSheet(true)}
        className="w-[160px] h-[160px] rounded-[24px] border-2 border-dotted border-[#cbd5e1] bg-white items-center justify-center"
        style={({ pressed }) => pressed && { opacity: 0.7, borderColor: PURPLE }}
      >
        <View className="relative">
          <ImageIcon size={64} color="#e2e8f0" strokeWidth={1} />
          
          {/* Purple Plus Circle */}
          <View className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#5b21b6] items-center justify-center border-[3px] border-white">
            <Plus size={16} color="white" strokeWidth={3} />
          </View>
        </View>
      </Pressable>
    );
  };

  // ── Step 1 ──────────────────────────────────────────────────────────────────
  const renderStep1 = () => (
    <Animated.ScrollView 
      entering={FadeInDown.duration(450)} 
      className="flex-1 px-8"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Custom Back Button & Title */}
      <View className="mt-5 mb-10">
        <Text className="text-black text-[28px] font-bold tracking-[-0.5px]">Add product</Text>
      </View>

      {/* Grid (2x2 layout) */}
      <View className="flex-col items-center mb-8" style={{ gap: 32 }}>
        <View className="flex-row w-[360px] justify-between h-[160px]">
          <PhotoSlot index={0} />
          <PhotoSlot index={1} />
        </View>
        <View className="flex-row w-[360px] justify-between h-[160px]">
          <PhotoSlot index={2} />
          <PhotoSlot index={3} />
        </View>
      </View>

      {/* Tip */}
      <View className="flex-row items-center bg-[#fbf5ff] rounded-xl p-4 mb-10">
        <Text className="text-2xl">💡</Text>
        <Text className="text-[#8b5cf6] text-[13px] font-semibold ml-3 flex-1 leading-[18px]">
          Well-lit photos sell 3× faster. Use natural light for best results.
        </Text>
      </View>

      <View className="mb-10 items-center">
        <Pressable
          onPress={() => images.length > 0 && setStep(2)}
          disabled={images.length === 0}
          className={`w-full py-5 px-10 rounded-full flex-row items-center justify-center ${
            images.length > 0 ? 'bg-[#af8cfa]' : 'bg-[#e2e8f0]'
          }`}
          style={({ pressed }) => [
            images.length > 0 && pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] },
            images.length > 0 && {
              shadowColor: '#af8cfa',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 8
            }
          ]}
        >
          <Text 
            className={`text-lg font-bold tracking-wider mr-2 ${
              images.length > 0 ? 'text-white' : 'text-[#94a3b8]'
            }`}
          >
            Continue to Next Step
          </Text>
          <ArrowRight 
            size={22} 
            color={images.length > 0 ? 'white' : '#94a3b8'} 
            strokeWidth={3} 
          />
        </Pressable>
      </View>
    </Animated.ScrollView>
  );

  // ── Input helpers ───────────────────────────────────────────────────────────
  const inputBase: any = {
    backgroundColor: CARD_BG, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 15,
    fontSize: 14, fontWeight: '600', color: '#0f172a', borderWidth: 1.5, borderColor: BORDER,
  };
  const focusedBorder = { borderColor: PURPLE, backgroundColor: PURPLE_LIGHT };

  // Pre-compute form validity to avoid IIFE inside JSX (which causes keyboard dismissal)
  const isFormValid = !!(  
    title.trim() &&
    category !== 'Select Category' &&
    condition !== 'Select Condition' &&
    description.trim() &&
    (listingType === 'sell' ? price.trim() : lookingFor.trim())
  );

  // ── Step 2 ──────────────────────────────────────────────────────────────────
  const renderStep2 = () => (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, paddingHorizontal: 22 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: PURPLE, marginRight: 8 }} />
            <Text style={{ color: PURPLE, fontSize: 11, fontWeight: '700', letterSpacing: 1.8, textTransform: 'uppercase' }}>Step 2 / 2</Text>
          </View>
          <Text style={{ color: '#0f172a', fontSize: 30, fontWeight: '900', letterSpacing: -0.5 }}>Details</Text>
        </View>

        {/* Image strip */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingBottom: 4 }} style={{ marginBottom: 24 }}>
          {images.map((uri, i) => (
            <View key={i} style={{ width: 60, height: 60, borderRadius: 14, overflow: 'hidden', borderWidth: 2.5, borderColor: i === 0 ? PURPLE : 'transparent' }}>
              <Image source={{ uri }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
            </View>
          ))}
          {images.length < 4 && (
            <Pressable onPress={() => setShowSourceSheet(true)} style={{ width: 60, height: 60, borderRadius: 14, borderWidth: 1.5, borderStyle: 'dashed', borderColor: '#dde3f0', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f7f8fc' }}>
              <Plus size={18} color="#a0aec0" strokeWidth={2.5} />
            </Pressable>
          )}
        </ScrollView>

        {/* Sell / Swap */}
        <View className="bg-[#f1f4fb] rounded-[20px] p-1.5 flex-row mb-6">
          {(['sell', 'swap'] as const).map(type => (
            <Pressable
              key={type} onPress={() => setListingType(type)}
              className="flex-1 flex-row items-center justify-center py-3.5 rounded-2xl"
              style={({ pressed }) => [
                { backgroundColor: listingType === type ? '#ffffff' : 'transparent' },
                listingType === type && {
                  shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.07, shadowRadius: 8, elevation: 3
                }
              ]}
            >
              {type === 'sell'
                ? <ShoppingBag size={17} color={listingType === 'sell' ? PURPLE : '#94a3b8'} />
                : <Repeat size={17} color={listingType === 'swap' ? PURPLE : '#94a3b8'} />
              }
              <Text className={`ml-2 font-extrabold text-[13px] tracking-[1px] uppercase ${
                listingType === type ? 'text-[#0f172a]' : 'text-[#94a3b8]'
              }`}>
                {type}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Form fields */}
        <View className="flex-col" style={{ gap: 20 }}>
          {/* Title */}
          <View>
            <Text className="text-[#64748b] text-[11px] font-bold tracking-[1.2px] uppercase mb-2">Product Title</Text>
            <TextInput
              placeholder="e.g. Sony WH-1000XM5 Headphones"
              value={title} onChangeText={setTitle}
              onFocus={() => setFocusedField('title')} onBlur={() => setFocusedField('')}
              className="bg-white rounded-2xl px-4 py-4 text-[15px] font-bold text-[#0f172a] border-[1.5px]"
              style={{
                borderColor: focusedField === 'title' ? PURPLE : '#f0f0f7',
                backgroundColor: focusedField === 'title' ? PURPLE_LIGHT : '#ffffff'
              }}
              placeholderTextColor="#cbd5e1"
            />
          </View>

          {/* Category + Condition row */}
          <View className="flex-row z-[50]" style={{ gap: 16 }}>
            {/* Category Dropdown */}
            <View className="flex-1 relative z-[60]">
              <Text className="text-[#64748b] text-[11px] font-bold tracking-[1.2px] uppercase mb-2">Category</Text>
              <Pressable 
                onPress={() => {
                  setShowCategorySheet(!showCategorySheet);
                  setShowConditionSheet(false);
                }} 
                className={`flex-row items-center justify-between bg-white rounded-2xl px-4 py-4 border-[1.5px] ${showCategorySheet ? 'border-[#af8cfa]' : 'border-[#f0f0f7]'}`}
                style={showCategorySheet && { backgroundColor: '#f3eeff' }}
              >
                <Text className="text-[#0f172a] font-bold text-[14px]" numberOfLines={1}>{category}</Text>
                <ChevronDown size={18} color={PURPLE} style={{ transform: [{ rotate: showCategorySheet ? '180deg' : '0deg' }] }} />
              </Pressable>
              
              {showCategorySheet && (
                <Animated.View 
                  entering={FadeInDown.duration(200)}
                  className="absolute top-[76px] left-0 right-0 bg-white rounded-2xl border-[1.5px] border-[#f0f0f7] overflow-hidden shadow-xl"
                  style={{ elevation: 20, zIndex: 1000 }}
                >
                  <ScrollView style={{ maxHeight: 220 }} nestedScrollEnabled showsVerticalScrollIndicator={false}>
                    {CATEGORIES.map((opt) => (
                      <Pressable 
                        key={opt} 
                        onPress={() => { setCategory(opt); setShowCategorySheet(false); }}
                        className={`px-4 py-3.5 border-b border-[#f8f9fa] ${opt === category ? 'bg-[#f3eeff]' : ''}`}
                      >
                        <Text className={`text-[14px] ${opt === category ? 'text-[#af8cfa] font-bold' : 'text-[#334155] font-semibold'}`}>{opt}</Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </Animated.View>
              )}
            </View>

            {/* Condition Dropdown */}
            <View className="flex-1 relative z-[50]">
              <Text className="text-[#64748b] text-[11px] font-bold tracking-[1.2px] uppercase mb-2">Condition</Text>
              <Pressable 
                onPress={() => {
                  setShowConditionSheet(!showConditionSheet);
                  setShowCategorySheet(false);
                }} 
                className={`flex-row items-center justify-between bg-white rounded-2xl px-4 py-4 border-[1.5px] ${showConditionSheet ? 'border-[#af8cfa]' : 'border-[#f0f0f7]'}`}
                style={showConditionSheet && { backgroundColor: '#f3eeff' }}
              >
                <Text className="text-[#0f172a] font-bold text-[14px]" numberOfLines={1}>{condition}</Text>
                <ChevronDown size={18} color={PURPLE} style={{ transform: [{ rotate: showConditionSheet ? '180deg' : '0deg' }] }} />
              </Pressable>

              {showConditionSheet && (
                <Animated.View 
                  entering={FadeInDown.duration(200)}
                  className="absolute top-[76px] left-0 right-0 bg-white rounded-2xl border-[1.5px] border-[#f0f0f7] overflow-hidden shadow-xl"
                  style={{ elevation: 20, zIndex: 1000 }}
                >
                  <ScrollView style={{ maxHeight: 220 }} nestedScrollEnabled showsVerticalScrollIndicator={false}>
                    {CONDITIONS.map((opt) => (
                      <Pressable 
                        key={opt} 
                        onPress={() => { setCondition(opt); setShowConditionSheet(false); }}
                        className={`px-4 py-3.5 border-b border-[#f8f9fa] ${opt === condition ? 'bg-[#f3eeff]' : ''}`}
                      >
                        <Text className={`text-[14px] ${opt === condition ? 'text-[#af8cfa] font-bold' : 'text-[#334155] font-semibold'}`}>{opt}</Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </Animated.View>
              )}
            </View>
          </View>

          {/* Price / LookingFor */}
          {listingType === 'sell' ? (
            <Animated.View entering={FadeInDown.duration(280)}>
              <Text className="text-[#64748b] text-[11px] font-bold tracking-[1.2px] uppercase mb-2">Asking Price</Text>
              <View 
                className="flex-row items-center bg-white rounded-2xl px-4 py-4 border-[1.5px]"
                style={{
                  borderColor: focusedField === 'price' ? PURPLE : '#f0f0f7',
                  backgroundColor: focusedField === 'price' ? PURPLE_LIGHT : '#ffffff'
                }}
              >
                <Text className="text-[#af8cfa] font-black text-xl mr-2">₹</Text>
                <TextInput
                  placeholder="0.00"
                  value={price} onChangeText={setPrice}
                  keyboardType="numeric"
                  onFocus={() => setFocusedField('price')} onBlur={() => setFocusedField('')}
                  className="flex-1 text-[#0f172a] font-bold text-[15px]"
                  placeholderTextColor="#cbd5e1"
                />
              </View>
            </Animated.View>
          ) : (
            <Animated.View entering={FadeInDown.duration(280)}>
              <Text className="text-[#64748b] text-[11px] font-bold tracking-[1.2px] uppercase mb-2">Looking For</Text>
              <TextInput
                placeholder="e.g. iPhone 14, MacBook Air..."
                value={lookingFor} onChangeText={setLookingFor}
                onFocus={() => setFocusedField('looking')} onBlur={() => setFocusedField('')}
                className="bg-white rounded-2xl px-4 py-4 text-[15px] font-bold text-[#0f172a] border-[1.5px]"
                style={{
                  borderColor: focusedField === 'looking' ? PURPLE : '#f0f0f7',
                  backgroundColor: focusedField === 'looking' ? PURPLE_LIGHT : '#ffffff'
                }}
                placeholderTextColor="#cbd5e1"
              />
            </Animated.View>
          )}

          {/* Description */}
          <View>
            <Text className="text-[#64748b] text-[11px] font-bold tracking-[1.2px] uppercase mb-2">Description</Text>
            <TextInput
              placeholder="Describe your item — condition, what's included, reason for selling..."
              multiline numberOfLines={5}
              value={description} onChangeText={setDescription}
              onFocus={() => setFocusedField('desc')} onBlur={() => setFocusedField('')}
              className="bg-white rounded-2xl px-4 py-4 text-[15px] font-bold text-[#0f172a] border-[1.5px] h-[120px]"
              style={{
                textAlignVertical: 'top',
                borderColor: focusedField === 'desc' ? PURPLE : '#f0f0f7',
                backgroundColor: focusedField === 'desc' ? PURPLE_LIGHT : '#ffffff'
              }}
              placeholderTextColor="#cbd5e1"
            />
          </View>
        </View>

        {/* Post Button — always mounted, styled by isFormValid to avoid keyboard dismissal */}
        <Pressable
          onPress={() => isFormValid && setStep(3)}
          disabled={!isFormValid}
          className={`mt-10 py-5 rounded-3xl flex-row items-center justify-center ${isFormValid ? 'bg-[#af8cfa]' : 'bg-[#f1f5f9]'}`}
          style={({ pressed }) => isFormValid && ({
            opacity: pressed ? 0.9 : 1,
            transform: [{ scale: pressed ? 0.98 : 1 }],
            shadowColor: '#af8cfa', shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.4, shadowRadius: 20, elevation: 12,
          })}
        >
          {isFormValid
            ? <CheckCircle2 size={22} color="white" strokeWidth={3} />
            : <X size={20} color="#94a3b8" />
          }
          <Text className={`font-black text-lg ml-3 tracking-wider ${isFormValid ? 'text-white' : 'text-[#94a3b8]'}`}>
            {isFormValid
              ? 'PREVIEW LISTING'
              : 'Complete details to post'
            }
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  // ── Step 3: Preview ─────────────────────────────────────────────────────────
  const renderStep3 = () => (
    <Animated.ScrollView
      entering={FadeInDown.duration(400)}
      className="flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      {/* Hero Image Carousel */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        className="h-[280px] bg-[#f1f5f9]"
      >
        {images.map((uri, i) => (
          <View key={i} style={{ width: 400 }} className="h-[280px]">
            <Image source={{ uri }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
          </View>
        ))}
      </ScrollView>

      {/* Listing Badge */}
      <View className="px-5">
        <View className="-mt-5 self-start flex-row items-center bg-[#af8cfa] px-4 py-2 rounded-full"
          style={{ shadowColor: '#af8cfa', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 8, elevation: 6 }}
        >
          {listingType === 'sell'
            ? <ShoppingBag size={14} color="white" strokeWidth={3} />
            : <Repeat size={14} color="white" strokeWidth={3} />
          }
          <Text className="text-white font-black text-[11px] ml-1.5 tracking-widest uppercase">
            {listingType === 'sell' ? 'For Sale' : 'For Swap'}
          </Text>
        </View>

        {/* Title + Price */}
        <View className="mt-4 mb-1">
          <Text className="text-[#0f172a] text-2xl font-black leading-tight">{title}</Text>
          {listingType === 'sell' && price ? (
            <Text className="text-[#af8cfa] text-3xl font-black mt-1">₹{price}</Text>
          ) : lookingFor ? (
            <Text className="text-[#64748b] text-base font-semibold mt-1">Looking for: {lookingFor}</Text>
          ) : null}
        </View>

        {/* Divider */}
        <View className="h-[1px] bg-[#f0f0f7] my-4" />

        {/* Meta Info Row */}
        <View className="flex-row" style={{ gap: 12 }}>
          <View className="flex-1 bg-[#f8fafc] rounded-2xl px-4 py-3 border border-[#f0f0f7]">
            <Text className="text-[#94a3b8] text-[10px] font-bold uppercase tracking-wider mb-1">Category</Text>
            <Text className="text-[#0f172a] text-[14px] font-bold">{category}</Text>
          </View>
          <View className="flex-1 bg-[#f8fafc] rounded-2xl px-4 py-3 border border-[#f0f0f7]">
            <Text className="text-[#94a3b8] text-[10px] font-bold uppercase tracking-wider mb-1">Condition</Text>
            <Text className="text-[#0f172a] text-[14px] font-bold">{condition}</Text>
          </View>
        </View>

        {/* Description */}
        <View className="mt-4 bg-[#f8fafc] rounded-2xl px-4 py-4 border border-[#f0f0f7]">
          <Text className="text-[#94a3b8] text-[10px] font-bold uppercase tracking-wider mb-2">Description</Text>
          <Text className="text-[#334155] text-[15px] font-medium leading-relaxed">{description}</Text>
        </View>

        {/* Photo count */}
        <View className="mt-4 flex-row items-center">
          <View className="flex-row">
            {images.slice(0, 4).map((uri, i) => (
              <View
                key={i}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-white"
                style={{ marginLeft: i > 0 ? -12 : 0, zIndex: 4 - i }}
              >
                <Image source={{ uri }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
              </View>
            ))}
          </View>
          <Text className="text-[#64748b] text-sm font-semibold ml-3">{images.length} photo{images.length > 1 ? 's' : ''} attached</Text>
        </View>

        {/* Confirm Button */}
        <Pressable
          onPress={onPostSuccess}
          className="mt-8 py-5 rounded-3xl flex-row items-center justify-center bg-[#af8cfa]"
          style={({ pressed }) => ({
            opacity: pressed ? 0.9 : 1,
            transform: [{ scale: pressed ? 0.97 : 1 }],
            shadowColor: '#af8cfa', shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.4, shadowRadius: 20, elevation: 12,
          })}
        >
          <CheckCircle2 size={24} color="white" strokeWidth={3} />
          <Text className="text-white font-black text-lg ml-3 tracking-wider">
            {listingType === 'sell' ? 'CONFIRM & POST' : 'CONFIRM & SWAP'}
          </Text>
        </Pressable>

        {/* Edit link */}
        <Pressable
          onPress={() => setStep(2)}
          className="mt-4 py-4 rounded-3xl flex-row items-center justify-center border border-[#e2e8f0]"
        >
          <ArrowLeft size={18} color="#64748b" />
          <Text className="text-[#64748b] font-bold text-base ml-2">Go back and edit</Text>
        </Pressable>
      </View>
    </Animated.ScrollView>
  );

  // ── Generic Sheet ───────────────────────────────────────────────────────────
  const Sheet = ({ visible, onClose, children }: { visible: boolean; onClose: () => void; children: React.ReactNode }) => {
    if (!visible) return null;
    return (
      <Animated.View entering={FadeIn.duration(180)} exiting={FadeOut.duration(180)} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999, justifyContent: 'flex-end' }}>
        <Pressable onPress={onClose} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(10,12,30,0.52)' }} />
        <Animated.View entering={SlideInDown.duration(340).springify()} exiting={SlideOutDown.duration(220)} style={{ backgroundColor: CARD_BG, borderTopLeftRadius: 34, borderTopRightRadius: 34, paddingHorizontal: 24, paddingTop: 14, paddingBottom: 40 }}>
          <View style={{ width: 38, height: 5, backgroundColor: '#dde3f0', borderRadius: 10, alignSelf: 'center', marginBottom: 24 }} />
          {children}
        </Animated.View>
      </Animated.View>
    );
  };

  // ── Root ────────────────────────────────────────────────────────────────────
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: SLATE_BG }}>
        <StatusBar barStyle="dark-content" backgroundColor={SLATE_BG} />

        {/* Header */}
        <View style={{ paddingHorizontal: 22, paddingTop: 40, paddingBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Pressable
            onPress={step === 3 ? () => setStep(2) : step === 2 ? () => setStep(1) : onBack}
            style={({ pressed }) => ({ width: 44, height: 44, backgroundColor: CARD_BG, borderRadius: 15, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: BORDER, opacity: pressed ? 0.7 : 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 })}
          >
            <ChevronLeft size={22} color="#1e293b" strokeWidth={2.5} />
          </Pressable>

          {/* Progress pills */}
          <View style={{ flexDirection: 'row', gap: 6 }}>
            <View style={{ width: 30, height: 5, borderRadius: 10, backgroundColor: PURPLE }} />
            <View style={{ width: 30, height: 5, borderRadius: 10, backgroundColor: step >= 2 ? PURPLE : '#dde3f0' }} />
            <View style={{ width: 30, height: 5, borderRadius: 10, backgroundColor: step === 3 ? PURPLE : '#dde3f0' }} />
          </View>

          <Pressable
            onPress={onBack}
            style={({ pressed }) => ({ width: 44, height: 44, backgroundColor: '#f0f2f8', borderRadius: 15, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.7 : 1 })}
          >
            <X size={19} color="#64748b" strokeWidth={2.5} />
          </Pressable>
        </View>

        {step === 1 ? renderStep1() : step === 2 ? renderStep2() : renderStep3()}
      </SafeAreaView>

      {/* Source sheet */}
      <Sheet visible={showSourceSheet} onClose={() => setShowSourceSheet(false)}>
        <View className="mb-7">
          <Text className="text-[#0f172a] font-black text-2xl tracking-tighter">Add Photo</Text>
          <View className="flex-row items-center mt-1">
            <View 
              className="w-2 h-2 rounded-full mr-2" 
              style={{ backgroundColor: images.length >= 4 ? '#10b981' : PURPLE }} 
            />
            <Text className="text-[#64748b] text-sm font-semibold">
              {images.length === 0 ? 'Upload up to 4 photos' : `${images.length} of 4 photos added`}
            </Text>
          </View>
        </View>

        <View className="flex-row mb-8" style={{ gap: 20 }}>
          {[
            { 
              label: 'Camera', 
              icon: <Camera size={34} color={PURPLE} strokeWidth={2} />, 
              action: takeWithCamera,
              bg: 'bg-[#f5f3ff]',
              border: 'border-[#ddd6fe]'
            },
            { 
              label: 'Gallery', 
              icon: <ImageIcon size={34} color={PURPLE} strokeWidth={2} />, 
              action: pickFromGallery,
              bg: 'bg-[#eff6ff]',
              border: 'border-[#dbeafe]'
            },
          ].map((opt) => (
            <View key={opt.label} className="flex-1 items-center">
              <Pressable
                onPress={opt.action}
                className={`w-full aspect-square rounded-[28px] items-center justify-center border-2 ${opt.bg} ${opt.border}`}
                style={({ pressed }) => pressed && { 
                  backgroundColor: '#f1f5f9',
                  borderColor: PURPLE
                }}
              >
                {opt.icon}
              </Pressable>
              <Text className="text-[#0f172a] font-extrabold text-[15px] mt-3">{opt.label}</Text>
            </View>
          ))}
        </View>

        <Pressable 
          onPress={() => setShowSourceSheet(false)} 
          className="w-full py-[18px] items-center justify-center rounded-[20px] border"
          style={({ pressed }) => ({ 
            backgroundColor: pressed ? '#9575f0' : PURPLE,
            borderColor: '#9575f0',
            shadowColor: PURPLE,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 6
          })}
        >
          <Text className="text-black font-black text-base tracking-[1px] uppercase">Cancel</Text>
        </Pressable>
      </Sheet>

      {/* Form field dropdown handlers are now handled inline in renderStep2 */}
    </View>
  );
}
