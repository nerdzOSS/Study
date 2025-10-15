import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

export function CTASection() {
  const router = useRouter();
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    ctaSection: {
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 80,
    },
    ctaTitle: {
      fontSize: 48,
      fontWeight: '700',
      color: colors.textPrimary,
      textAlign: 'center',
      marginBottom: 16,
    },
    ctaDescription: {
      fontSize: 19,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 32,
    },
    btn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 24,
      paddingVertical: 16,
      borderRadius: 12,
    },
    btnPrimary: {
      backgroundColor: colors.accentPurple,
      shadowColor: colors.accentPurple,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    btnLarge: {
      paddingHorizontal: 32,
      paddingVertical: 20,
    },
    btnText: {
      color: colors.textPrimary,
      fontSize: 16,
      fontWeight: '600',
      marginRight: 8,
    },
  });

  return (
    <View style={styles.ctaSection}>
      <Text style={styles.ctaTitle}>Ready to Transform Your Study Game?</Text>
      <Text style={styles.ctaDescription}>
        Join thousands of students already studying smarter with NerdZ
      </Text>
      <TouchableOpacity 
        style={[styles.btn, styles.btnPrimary, styles.btnLarge]} 
        onPress={() => router.replace('/login')}
      >
        <Text style={styles.btnText}>Get Started Free</Text>
        <Ionicons name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
