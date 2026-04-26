import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  TextInput,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import {
  ChevronLeft,
  DollarSign,
  MessageSquare,
  CheckCircle2,
  ShieldCheck,
  Tag,
  TrendingDown,
} from 'lucide-react-native';
import Animated, {
  FadeInDown,
  FadeIn,
} from 'react-native-reanimated';
import { Product } from '../data/products';

interface MakeOfferPageProps {
  product: Product;
  onBack: () => void;
  onOfferSent: () => void;
}

const PURPLE = '#af8cfa';
const PURPLE_LIGHT = '#f5f0ff';

export default function MakeOfferPage({ product, onBack, onOfferSent }: MakeOfferPageProps) {
  const [offerAmount, setOfferAmount] = useState('');
  const [message, setMessage] = useState('');
  const [focusedField, setFocusedField] = useState('');
  const [sending, setSending] = useState(false);

  const handleSendOffer = () => {
    if (!offerAmount.trim()) {
      Alert.alert('Incomplete Details', 'Please enter your offer amount.');
      return;
    }
    setSending(true);
    // Simulate async offer placement
    setTimeout(() => {
      setSending(false);
      onOfferSent();
    }, 1800);
  };

  const inputStyle = (field: string) => ({
    backgroundColor: focusedField === field ? PURPLE_LIGHT : '#f8fafc',
    borderWidth: 1.5,
    borderColor: focusedField === field ? PURPLE : '#eef0f6',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#0f172a',
    marginBottom: 12,
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <Animated.View
          entering={FadeIn.duration(300)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingTop: 12,
            paddingBottom: 10,
            backgroundColor: '#f8fafc',
          }}
        >
          <Pressable
            onPress={onBack}
            style={({ pressed }) => ({
              width: 44,
              height: 44,
              borderRadius: 14,
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#eef0f6',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.7 : 1,
              marginRight: 14,
            })}
          >
            <ChevronLeft size={22} color="#1e293b" strokeWidth={2.5} />
          </Pressable>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#94a3b8', fontSize: 11, fontWeight: '700', letterSpacing: 1.2, textTransform: 'uppercase' }}>
              Negotiation
            </Text>
            <Text style={{ color: '#0f172a', fontSize: 22, fontWeight: '900', letterSpacing: -0.5 }}>
              Make an Offer
            </Text>
          </View>
          {/* Trust badge */}
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#ecfdf5', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 }}>
            <ShieldCheck size={14} color="#10b981" />
            <Text style={{ color: '#10b981', fontWeight: '700', fontSize: 11, marginLeft: 5 }}>Verified</Text>
          </View>
        </Animated.View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 160, paddingTop: 8 }}
        >
          {/* ── Product Card ───────────────────────────────────────────────────── */}
          <Animated.View
            entering={FadeInDown.duration(400)}
            style={{
              backgroundColor: '#fff',
              borderRadius: 24,
              padding: 14,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 24,
              borderWidth: 1,
              borderColor: '#eef0f6',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.05,
              shadowRadius: 12,
              elevation: 3,
            }}
          >
            <View style={{ width: 80, height: 80, borderRadius: 18, overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
              <Image source={product.image} style={{ width: '100%', height: '100%' }} contentFit="cover" />
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={{ color: '#0f172a', fontWeight: '800', fontSize: 15, marginBottom: 4 }} numberOfLines={1}>
                {product.name}
              </Text>
              <Text style={{ color: '#94a3b8', fontWeight: '600', fontSize: 12, marginBottom: 4 }}>
                Listed Price
              </Text>
              <Text style={{ color: '#0f172a', fontWeight: '900', fontSize: 18 }}>{product.price}</Text>
            </View>
          </Animated.View>

          {/* ── Offer Amount ──────────────────────────────────────────────────── */}
          <Animated.View entering={FadeInDown.delay(100).duration(400)} style={{ marginBottom: 24 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
              <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: PURPLE_LIGHT, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                <Tag size={16} color={PURPLE} />
              </View>
              <Text style={{ color: '#94a3b8', fontSize: 11, fontWeight: '700', letterSpacing: 1.4, textTransform: 'uppercase' }}>Your Offer</Text>
            </View>

            <View style={{ position: 'relative' }}>
              <TextInput
                placeholder="Enter amount"
                value={offerAmount}
                onChangeText={setOfferAmount}
                onFocus={() => setFocusedField('offer')}
                onBlur={() => setFocusedField('')}
                keyboardType="numeric"
                placeholderTextColor="#cbd5e1"
                style={[inputStyle('offer'), { paddingLeft: 40, fontSize: 18, fontWeight: '900' }]}
              />
              <View style={{ position: 'absolute', left: 16, top: 16 }}>
                <Text style={{ fontSize: 18, fontWeight: '900', color: focusedField === 'offer' ? PURPLE : '#0f172a' }}>₹</Text>
              </View>
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <TrendingDown size={14} color="#10b981" />
              <Text style={{ color: '#10b981', fontSize: 12, fontWeight: '600', marginLeft: 6 }}>
                Reasonable offers have a 80% higher success rate
              </Text>
            </View>
          </Animated.View>

          {/* ── Message to Seller ─────────────────────────────────────────────── */}
          <Animated.View entering={FadeInDown.delay(200).duration(400)} style={{ marginBottom: 24 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
              <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: '#eff6ff', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                <MessageSquare size={16} color="#3b82f6" />
              </View>
              <Text style={{ color: '#94a3b8', fontSize: 11, fontWeight: '700', letterSpacing: 1.4, textTransform: 'uppercase' }}>Message to Seller (Optional)</Text>
            </View>

            <TextInput
              placeholder="E.g. I can pick it up today!"
              value={message}
              onChangeText={setMessage}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField('')}
              placeholderTextColor="#cbd5e1"
              multiline
              numberOfLines={4}
              style={[inputStyle('message'), { minHeight: 120, textAlignVertical: 'top' }]}
            />
          </Animated.View>

          {/* ── How it works ──────────────────────────────────────────────────── */}
          <Animated.View 
            entering={FadeInDown.delay(300).duration(400)}
            style={{ 
              backgroundColor: '#fff', 
              borderRadius: 24, 
              padding: 20, 
              borderWidth: 1, 
              borderColor: '#eef0f6' 
            }}
          >
            <Text style={{ color: '#0f172a', fontWeight: '800', fontSize: 14, marginBottom: 12 }}>How it works</Text>
            <View style={{ gap: 12 }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: PURPLE_LIGHT, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                  <Text style={{ color: PURPLE, fontSize: 10, fontWeight: 'bold' }}>1</Text>
                </View>
                <Text style={{ flex: 1, color: '#64748b', fontSize: 13, lineHeight: 18 }}>You send an offer to the seller</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: PURPLE_LIGHT, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                  <Text style={{ color: PURPLE, fontSize: 10, fontWeight: 'bold' }}>2</Text>
                </View>
                <Text style={{ flex: 1, color: '#64748b', fontSize: 13, lineHeight: 18 }}>The seller accepts, rejects, or counter-offers</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: PURPLE_LIGHT, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                  <Text style={{ color: PURPLE, fontSize: 10, fontWeight: 'bold' }}>3</Text>
                </View>
                <Text style={{ flex: 1, color: '#64748b', fontSize: 13, lineHeight: 18 }}>Once accepted, you can proceed with the transaction</Text>
              </View>
            </View>
          </Animated.View>
        </ScrollView>

        {/* ── Sticky Send Offer Button ────────────────────────────────────────── */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#eef0f6',
            paddingHorizontal: 20,
            paddingTop: 14,
            paddingBottom: 34,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -6 },
            shadowOpacity: 0.06,
            shadowRadius: 16,
            elevation: 20,
          }}
        >
          <Pressable
            onPress={handleSendOffer}
            disabled={sending}
            style={({ pressed }) => ({
              backgroundColor: sending ? '#c4b5fd' : PURPLE,
              borderRadius: 22,
              height: 58,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              opacity: pressed ? 0.9 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }],
              shadowColor: PURPLE,
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.35,
              shadowRadius: 18,
              elevation: 12,
            })}
          >
            {sending ? (
              <Text style={{ color: '#fff', fontWeight: '900', fontSize: 17, letterSpacing: 0.5 }}>
                Sending Offer…
              </Text>
            ) : (
              <>
                <CheckCircle2 size={22} color="#fff" strokeWidth={3} />
                <Text style={{ color: '#fff', fontWeight: '900', fontSize: 17, marginLeft: 10, letterSpacing: 0.5 }}>
                  Send Offer
                </Text>
              </>
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
