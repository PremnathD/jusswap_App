import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  Pressable, 
  TextInput, 
  ScrollView, 
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Modal
} from 'react-native';
import { Image } from 'expo-image';
import { 
  X, 
  ChevronLeft, 
  Plus, 
  Camera, 
  ShoppingBag, 
  Repeat,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon
} from 'lucide-react-native';
import Animated, { 
  FadeIn, 
  FadeInDown, 
  FadeOut,
  Layout
} from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';

interface PostListingPageProps {
  onBack: () => void;
  onPostSuccess: () => void;
}

const CATEGORIES = ['Electronics', 'Fashion', 'Home', 'Sports', 'Books', 'Others'];
const CONDITIONS = ['New', 'Like New', 'Good', 'Fair'];

const PostListingPage = ({ onBack, onPostSuccess }: PostListingPageProps) => {
  const [step, setStep] = useState(1);
  const [listingType, setListingType] = useState<'sell' | 'swap'>('sell');
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [condition, setCondition] = useState(CONDITIONS[0]);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [showSourceModal, setShowSourceModal] = useState(false);

  const takeWithCamera = async () => {
    setShowSourceModal(false);
    try {
      console.log("Requesting camera permissions...");
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to take a photo!');
        return;
      }

      console.log("Launching camera...");
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
      });

      if (!result.canceled) {
        setImages([...images, result.assets[0].uri].slice(0, 4));
      }
    } catch (error) {
      console.error("Camera Error:", error);
      alert("Something went wrong with the camera. Error: " + (error as Error).message);
    }
  };

  const pickFromGallery = async () => {
    setShowSourceModal(false);
    try {
      console.log("Requesting gallery permissions...");
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to pick images!');
        return;
      }

      console.log("Launching image library...");
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: 4 - images.length,
        quality: 0.8,
      });

      if (!result.canceled) {
        const newImages = result.assets.map(asset => asset.uri);
        setImages([...images, ...newImages].slice(0, 4));
      }
    } catch (error) {
      console.error("Gallery Error:", error);
      alert("Something went wrong while picking images. Error: " + (error as Error).message);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleNext = () => {
    if (images.length > 0) {
      setStep(2);
    }
  };

  const handlePost = () => {
    // In a real app, this would call an API
    onPostSuccess();
  };

  const renderStep1 = () => (
    <Animated.View 
      entering={FadeInDown.duration(600)} 
      className="flex-1 px-8"
    >
      <Text className="text-slate-400 font-medium text-lg mt-4">Visuals First</Text>
      <Text className="text-slate-900 font-bold text-3xl mt-1">Upload Images</Text>
      <Text className="text-slate-500 mt-2 leading-relaxed">
        Select up to 4 high-quality images of your item. The first image will be your primary cover.
      </Text>

      {/* Image Grid */}
      <View className="flex-row flex-wrap mt-8 -mx-2">
        {images.map((img, index) => (
          <Animated.View 
            key={index} 
            layout={Layout.springify()}
            entering={FadeIn.duration(400)}
            className="w-1/2 p-2 aspect-square"
          >
            <View className="flex-1 rounded-3xl overflow-hidden border border-slate-100 bg-white shadow-sm relative">
              <Image source={img} style={{ flex: 1 }} contentFit="cover" />
              <Pressable 
                onPress={() => removeImage(index)}
                className="absolute top-2 right-2 bg-rose-500 w-8 h-8 rounded-full items-center justify-center shadow-lg active:scale-90"
              >
                <X size={16} color="white" strokeWidth={3} />
              </Pressable>
              {index === 0 && (
                <View className="absolute bottom-3 left-3 bg-[#af8cfa] px-3 py-1 rounded-full">
                  <Text className="text-white text-[10px] font-bold uppercase tracking-wider">Primary</Text>
                </View>
              )}
            </View>
          </Animated.View>
        ))}

        {images.length < 4 && (
          <Pressable 
            onPress={() => setShowSourceModal(true)}
            className="w-1/2 p-2 aspect-square"
          >
            <View className="flex-1 rounded-3xl border-2 border-dashed border-slate-200 items-center justify-center bg-slate-50 active:bg-slate-100">
              <Camera size={28} color="#94a3b8" />
              <Text className="text-slate-400 font-bold text-xs mt-2">Add Photo</Text>
              <View className="absolute bottom-4 right-4 bg-[#af8cfa] w-7 h-7 rounded-full items-center justify-center">
                <Plus size={16} color="white" strokeWidth={3} />
              </View>
            </View>
          </Pressable>
        )}
      </View>

      {images.length === 0 && (
        <View className="flex-row items-center mt-6 bg-amber-50 p-4 rounded-2xl border border-amber-100">
          <AlertCircle size={20} color="#d97706" />
          <Text className="text-amber-700 text-xs font-medium ml-3 flex-1">
            At least one photo is required to proceed with your listing.
          </Text>
        </View>
      )}

      <View className="flex-1 justify-end pb-10">
        <Pressable 
          onPress={handleNext}
          disabled={images.length === 0}
          className={`w-full py-4 rounded-2xl flex-row items-center justify-center shadow-sm ${images.length > 0 ? 'bg-[#af8cfa] active:scale-[0.98]' : 'bg-slate-200'}`}
        >
          <Text className="text-white text-lg font-black mr-2">Next Step</Text>
          <ChevronLeft size={20} color="white" strokeWidth={3} style={{ transform: [{ rotate: '180deg' }] }} />
        </Pressable>
      </View>
    </Animated.View>
  );

  const renderStep2 = () => (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView 
        className="flex-1 px-8" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text className="text-slate-400 font-medium text-lg mt-4">Almost Done</Text>
        <Text className="text-slate-900 font-bold text-3xl mt-1">Product Details</Text>

        {/* Sell / Swap Toggle */}
        <View className="bg-slate-100 p-1.5 rounded-2xl flex-row mt-6 mb-8">
          <Pressable 
            onPress={() => setListingType('sell')}
            className={`flex-1 py-3 rounded-xl flex-row items-center justify-center ${listingType === 'sell' ? 'bg-white shadow-sm' : ''}`}
          >
            <ShoppingBag size={18} color={listingType === 'sell' ? '#af8cfa' : '#64748b'} />
            <Text className={`font-bold ml-2 ${listingType === 'sell' ? 'text-slate-900' : 'text-slate-500'}`}>To Sell</Text>
          </Pressable>
          <Pressable 
            onPress={() => setListingType('swap')}
            className={`flex-1 py-3 rounded-xl flex-row items-center justify-center ${listingType === 'swap' ? 'bg-white shadow-sm' : ''}`}
          >
            <Repeat size={18} color={listingType === 'swap' ? '#af8cfa' : '#64748b'} />
            <Text className={`font-bold ml-2 ${listingType === 'swap' ? 'text-slate-900' : 'text-slate-500'}`}>To Swap</Text>
          </Pressable>
        </View>

        {/* Form Fields */}
        <View className="space-y-5">
          <View>
            <Text className="text-slate-500 font-bold text-xs mb-2 uppercase tracking-wide">Product Title</Text>
            <TextInput 
              placeholder="What are you listing?" 
              value={title}
              onChangeText={setTitle}
              className="bg-white px-5 py-4 rounded-2xl border border-slate-100 font-medium text-slate-900"
            />
          </View>

          <View className="flex-row space-x-4">
            <View className="flex-1">
              <Text className="text-slate-500 font-bold text-xs mb-2 uppercase tracking-wide">Category</Text>
              <Pressable className="bg-white px-5 h-14 rounded-2xl border border-slate-100 flex-row items-center justify-between">
                <Text className="font-medium text-slate-900">{category}</Text>
                <ChevronLeft size={16} color="#94a3b8" style={{ transform: [{ rotate: '-90deg' }] }} />
              </Pressable>
            </View>
            <View className="flex-1">
              <Text className="text-slate-500 font-bold text-xs mb-2 uppercase tracking-wide">Condition</Text>
              <Pressable className="bg-white px-5 h-14 rounded-2xl border border-slate-100 flex-row items-center justify-between">
                <Text className="font-medium text-slate-900">{condition}</Text>
                <ChevronLeft size={16} color="#94a3b8" style={{ transform: [{ rotate: '-90deg' }] }} />
              </Pressable>
            </View>
          </View>

          {listingType === 'sell' ? (
            <Animated.View entering={FadeInDown}>
              <Text className="text-slate-500 font-bold text-xs mb-2 uppercase tracking-wide">Price (INR)</Text>
              <View className="bg-white px-5 py-4 rounded-2xl border border-slate-100 flex-row items-center">
                <Text className="text-slate-400 font-bold text-lg mr-2">₹</Text>
                <TextInput 
                  placeholder="0.00" 
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="numeric"
                  className="flex-1 font-bold text-slate-900 text-lg"
                />
              </View>
            </Animated.View>
          ) : (
            <Animated.View entering={FadeInDown}>
              <Text className="text-slate-500 font-bold text-xs mb-2 uppercase tracking-wide">Looking For</Text>
              <TextInput 
                placeholder="What would you like in exchange?" 
                value={lookingFor}
                onChangeText={setLookingFor}
                className="bg-white px-5 py-4 rounded-2xl border border-slate-100 font-medium text-slate-900"
              />
            </Animated.View>
          )}

          <View>
            <Text className="text-slate-500 font-bold text-xs mb-2 uppercase tracking-wide">Description</Text>
            <TextInput 
              placeholder="Tell us more about the item..." 
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
              className="bg-white px-5 py-4 rounded-2xl border border-slate-100 font-medium text-slate-900 h-32"
              textAlignVertical="top"
            />
          </View>
        </View>

        <Pressable 
          onPress={handlePost}
          className="w-full bg-[#af8cfa] py-4 rounded-2xl items-center justify-center flex-row mt-10 shadow-lg active:scale-[0.98]"
        >
          <CheckCircle2 size={24} color="white" className="mr-3" />
          <Text className="text-white text-xl font-black ml-3">Post Listing</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* Custom Header */}
      <View className="px-8 pt-4 pb-2 flex-row items-center justify-between">
        <Pressable 
          onPress={step === 2 ? () => setStep(1) : onBack}
          className="w-12 h-12 bg-white rounded-2xl items-center justify-center shadow-sm border border-slate-100 active:scale-95"
        >
          <ChevronLeft size={24} color="#1e293b" strokeWidth={2.5} />
        </Pressable>
        
        <View className="flex-row items-center space-x-2">
          <View className={`w-2.5 h-2.5 rounded-full ${step === 1 ? 'bg-[#af8cfa]' : 'bg-slate-300'}`} />
          <View className={`w-2.5 h-2.5 rounded-full ${step === 2 ? 'bg-[#af8cfa]' : 'bg-slate-300'}`} />
        </View>

        <Pressable 
          onPress={onBack}
          className="w-12 h-12 bg-slate-100 rounded-2xl items-center justify-center active:scale-95"
        >
          <X size={24} color="#64748b" />
        </Pressable>
      </View>

      {step === 1 ? renderStep1() : renderStep2()}

      {/* Selection Modal (Action Sheet) */}
      <Modal
        visible={showSourceModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSourceModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowSourceModal(false)}>
          <View className="flex-1 justify-end bg-black/40">
            <TouchableWithoutFeedback>
              <View className="bg-white rounded-t-[40px] px-8 pt-10 pb-12 shadow-2xl">
                <Text className="text-slate-900 font-bold text-2xl mb-8">Add Photo</Text>
                
                <View className="space-y-4">
                  <Pressable 
                    onPress={takeWithCamera}
                    className="flex-row items-center bg-slate-50 p-6 rounded-3xl active:bg-slate-100"
                  >
                    <View className="bg-[#af8cfa]/10 p-3 rounded-2xl mr-5">
                      <Camera size={26} color="#af8cfa" />
                    </View>
                    <View>
                      <Text className="text-slate-900 font-bold text-lg">Take a Photo</Text>
                      <Text className="text-slate-500 text-sm">Use your camera to snap a shot</Text>
                    </View>
                  </Pressable>

                  <Pressable 
                    onPress={pickFromGallery}
                    className="flex-row items-center bg-slate-50 p-6 rounded-3xl active:bg-slate-100"
                  >
                    <View className="bg-[#af8cfa]/10 p-3 rounded-2xl mr-5">
                      <ImageIcon size={26} color="#af8cfa" />
                    </View>
                    <View>
                      <Text className="text-slate-900 font-bold text-lg">Choose from Gallery</Text>
                      <Text className="text-slate-500 text-sm">Pick images from your phone storage</Text>
                    </View>
                  </Pressable>

                  <Pressable 
                    onPress={() => setShowSourceModal(false)}
                    className="mt-6 py-4 items-center"
                  >
                    <Text className="text-slate-400 font-bold text-lg">Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

export default PostListingPage;
