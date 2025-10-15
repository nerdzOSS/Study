import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import PhoneMockup from '@/components/phone';
import { useTheme } from '@/contexts/ThemeContext';

export function HeroSection() {
  const router = useRouter();
  const { colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const styles = StyleSheet.create({
    hero: {
      paddingHorizontal: 20,
      paddingVertical: 40,
      zIndex: 5,
    },
    heroContent: {
      alignItems: 'center',
      marginBottom: 40,
    },
    heroBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.cardBg,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: colors.borderColor,
      marginBottom: 24,
    },
    pulseDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.success,
      marginRight: 8,
    },
    badgeText: {
      color: colors.textSecondary,
      fontSize: 14,
    },
    heroTitle: {
      fontSize: 64,
      fontWeight: '800',
      color: colors.textPrimary,
      textAlign: 'center',
      marginBottom: 24,
      lineHeight: 70,
    },
    gradientText: {
      color: colors.accentPurple,
    },
    heroDescription: {
      fontSize: 19,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 29,
      marginBottom: 40,
      paddingHorizontal: 20,
    },
    ctaButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.accentPurple,
      paddingHorizontal: 32,
      paddingVertical: 16,
      borderRadius: 12,
      marginBottom: 48,
      shadowColor: colors.accentPurple,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    ctaButtonText: {
      color: colors.textPrimary,
      fontSize: 18,
      fontWeight: '600',
      marginRight: 8,
    },
    heroStats: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    },
    stat: {
      alignItems: 'center',
    },
    statNumber: {
      fontSize: 32,
      fontWeight: '700',
      color: colors.accentPurple,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    heroImage: {
      position: 'relative',
      height: 600,
      alignItems: 'center',
      justifyContent: 'center',
    },
    screenContent: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.bgPrimary,
      padding: 13,
      flex: 1,
    },
    activeScreen: {
      opacity: 1,
    },
    appHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 8,
      paddingVertical: 8,
      marginTop: 8,
    },
    time: {
      fontSize: 11,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    statusIcons: {
      fontSize: 11,
      color: colors.textPrimary,
      opacity: 0.7,
    },
    appBody: {
      marginTop: 16,
      flex: 1,
    },
    appTitle: {
      fontSize: 21,
      fontWeight: '700',
      marginBottom: 16,
      color: colors.textPrimary,
    },
    studyStats: {
      flexDirection: 'row',
      gap: 13,
      marginBottom: 24,
    },
    statBox: {
      flex: 1,
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      borderWidth: 1,
      borderColor: 'rgba(99, 102, 241, 0.3)',
      borderRadius: 12,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 13,
    },
    statIcon: {
      fontSize: 32,
    },
    statInfo: {
      flex: 1,
    },
    statValue: {
      fontSize: 19,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    statName: {
      fontSize: 11,
      color: 'rgba(255, 255, 255, 0.6)',
    },
    progressCard: {
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      borderWidth: 1,
      borderColor: 'rgba(99, 102, 241, 0.3)',
      borderRadius: 12,
      padding: 16,
    },
    progressHeader: {
      fontWeight: '600',
      marginBottom: 13,
      color: colors.textPrimary,
    },
    progressBar: {
      width: '100%',
      height: 8,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 4,
      overflow: 'hidden',
      marginBottom: 8,
    },
    progressFill: {
      height: '100%',
      backgroundColor: colors.accentPurple,
      borderRadius: 4,
    },
    progressText: {
      fontSize: 12,
      color: 'rgba(255, 255, 255, 0.6)',
    },
  });

  return (
    <View style={styles.hero}>
      <Animated.View
        style={[
          styles.heroContent,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.heroBadge}>
          <View style={styles.pulseDot} />
          <Text style={styles.badgeText}>Open Source • Free Forever</Text>
        </View>

        <Text style={styles.heroTitle}>
          Study Smarter,{'\n'}
          <Text style={styles.gradientText}>Not Harder</Text>
        </Text>

        <Text style={styles.heroDescription}>
          Your all-in-one study platform designed for students who want to level up their learning game.
          Track progress, stay focused, and make studying actually enjoyable.
        </Text>

        <TouchableOpacity style={styles.ctaButton} onPress={() => router.replace('/login')}>
          <Text style={styles.ctaButtonText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>

        <View style={styles.heroStats}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>1000+</Text>
            <Text style={styles.statLabel}>Active Students</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>50+</Text>
            <Text style={styles.statLabel}>Teachers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>10k+</Text>
            <Text style={styles.statLabel}>Study Hours</Text>
          </View>
        </View>
      </Animated.View>

      <View style={styles.heroImage}>
        <PhoneMockup>
          <View style={[styles.screenContent, styles.activeScreen]}>
            <View style={styles.appHeader}>
              <Text style={styles.time}>9:41</Text>
              <Text style={styles.statusIcons}>📶 📡 🔋</Text>
            </View>
            <View style={styles.appBody}>
              <Text style={styles.appTitle}>📚 Study Dashboard</Text>
              <View style={styles.studyStats}>
                <View style={styles.statBox}>
                  <Text style={styles.statIcon}>🔥</Text>
                  <View style={styles.statInfo}>
                    <Text style={styles.statValue}>15</Text>
                    <Text style={styles.statName}>Day Streak</Text>
                  </View>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statIcon}>⏱️</Text>
                  <View style={styles.statInfo}>
                    <Text style={styles.statValue}>4.5h</Text>
                    <Text style={styles.statName}>Today</Text>
                  </View>
                </View>
              </View>
              <View style={styles.progressCard}>
                <Text style={styles.progressHeader}>Weekly Goal</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '75%' }]} />
                </View>
                <Text style={styles.progressText}>75% Complete</Text>
              </View>
            </View>
          </View>
        </PhoneMockup>
      </View>
    </View>
  );
}
