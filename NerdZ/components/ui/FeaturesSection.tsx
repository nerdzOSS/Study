import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

const FEATURES = [
  { icon: '🤖', title: 'AI-Powered Assistant', desc: 'Get instant help with your doubts and personalized study recommendations' },
  { icon: '🎨', title: 'Customizable Interface', desc: 'Make it yours with themes, colors, and layouts that match your vibe' },
  { icon: '📊', title: 'Progress Tracking', desc: 'Visualize your improvement with detailed analytics and test history' },
  { icon: '🎵', title: 'Lofi Music Player', desc: 'Study with curated playlists designed to boost your concentration' },
  { icon: '⏰', title: 'Smart Timers', desc: 'Pomodoro technique, alarms, and reminders to keep you on track' },
  { icon: '🏆', title: 'Rewards System', desc: 'Earn badges and achievements to stay motivated and engaged' },
];

export function FeaturesSection() {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    features: {
      paddingHorizontal: width > 768 ? 40 : 20,
      paddingVertical: width > 768 ? 80 : 60,
      maxWidth: width > 1200 ? 1200 : '100%',
      alignSelf: 'center',
      width: '100%',
    },
    sectionHeader: {
      alignItems: 'center',
      marginBottom: 48,
    },
    sectionTitle: {
      fontSize: 48,
      fontWeight: '700',
      color: colors.textPrimary,
      textAlign: 'center',
      marginBottom: 16,
    },
    sectionSubtitle: {
      fontSize: 19,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 28,
    },
    featuresGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: 16,
    },
    featureCard: {
      width: width > 768 ? '30%' : width > 480 ? '45%' : '100%',
      minWidth: width > 768 ? 280 : width > 480 ? 200 : '100%',
      backgroundColor: colors.cardBg,
      padding: width > 768 ? 32 : width > 480 ? 24 : 20,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.borderColor,
      marginBottom: 16,
    },
    featureIcon: {
      fontSize: width > 768 ? 48 : width > 480 ? 40 : 36,
      marginBottom: width > 768 ? 16 : 12,
    },
    featureTitle: {
      fontSize: width > 768 ? 22 : width > 480 ? 20 : 18,
      fontWeight: '600',
      color: colors.textPrimary,
      marginBottom: width > 768 ? 12 : 8,
    },
    featureDescription: {
      fontSize: width > 768 ? 16 : width > 480 ? 15 : 14,
      color: colors.textSecondary,
      lineHeight: width > 768 ? 27 : width > 480 ? 24 : 22,
    },
  });

  return (
    <View style={styles.features}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Everything You Need to Succeed</Text>
        <Text style={styles.sectionSubtitle}>
          Powerful features designed to make studying engaging and effective
        </Text>
      </View>

      <View style={styles.featuresGrid}>
        {FEATURES.map((feature, index) => (
          <View key={index} style={styles.featureCard}>
            <Text style={styles.featureIcon}>{feature.icon}</Text>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDescription}>{feature.desc}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
