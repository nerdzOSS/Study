import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function FeaturesScreen() {
  const orb1Anim = useRef(new Animated.Value(0)).current;
  const orb2Anim = useRef(new Animated.Value(0)).current;
  const orb3Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateOrb = (anim: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 20000,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 20000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateOrb(orb1Anim, 0);
    animateOrb(orb2Anim, 5000);
    animateOrb(orb3Anim, 10000);
  }, []);

  const getOrbTransform = (anim: Animated.Value) => ({
    transform: [
      {
        translateX: anim.interpolate({
          inputRange: [0, 0.25, 0.5, 0.75, 1],
          outputRange: [0, 50, -30, 70, 0],
        }),
      },
      {
        translateY: anim.interpolate({
          inputRange: [0, 0.25, 0.5, 0.75, 1],
          outputRange: [0, 50, 80, -50, 0],
        }),
      },
      {
        scale: anim.interpolate({
          inputRange: [0, 0.25, 0.5, 0.75, 1],
          outputRange: [1, 1.1, 0.9, 1.05, 1],
        }),
      },
    ],
  });

  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Assistant',
      desc: 'Get instant help with your doubts, personalized study recommendations, and smart suggestions powered by advanced AI.',
      items: ['24/7 doubt solving', 'Personalized recommendations', 'Smart study plans', 'Concept explanations'],
    },
    {
      icon: '🎨',
      title: 'Customizable Interface',
      desc: 'Make NerdZ truly yours with custom themes, colors, layouts, and personalization options.',
      items: ['Dark & light modes', 'Custom color themes', 'Flexible layouts', 'Widget customization'],
    },
    {
      icon: '📊',
      title: 'Progress Tracking',
      desc: 'Visualize your improvement with detailed analytics, performance graphs, and comprehensive test history.',
      items: ['Performance analytics', 'Study time tracking', 'Grade monitoring', 'Goal setting'],
    },
    {
      icon: '🎵',
      title: 'Lofi Music Player',
      desc: 'Study with curated lofi playlists designed to boost concentration and create the perfect study atmosphere.',
      items: ['Curated playlists', 'Focus-enhancing music', 'Offline mode', 'Custom playlists'],
    },
    {
      icon: '⏰',
      title: 'Smart Timers',
      desc: 'Pomodoro technique timers, custom alarms, and smart reminders to keep you focused and on track.',
      items: ['Pomodoro timer', 'Custom intervals', 'Break reminders', 'Focus statistics'],
    },
    {
      icon: '🏆',
      title: 'Rewards System',
      desc: 'Earn badges, achievements, and rewards to stay motivated and make studying more engaging.',
      items: ['Achievement badges', 'Streak tracking', 'Leaderboards', 'Reward points'],
    },
    {
      icon: '📝',
      title: 'Smart Notes',
      desc: 'Create beautiful notes with rich text, images, code snippets, and organize them effortlessly.',
      items: ['Rich text editor', 'Code highlighting', 'Image support', 'Cloud sync'],
    },
    {
      icon: '🎥',
      title: 'Video Lectures',
      desc: 'Access video lectures, tutorials, and educational content from expert teachers.',
      items: ['HD video quality', 'Downloadable content', 'Playback speed control', 'Subtitles support'],
    },
    {
      icon: '👥',
      title: 'Community',
      desc: 'Connect with fellow students, share knowledge, and collaborate on study projects.',
      items: ['Discussion forums', 'Study groups', 'Peer tutoring', 'Q&A platform'],
    },
    {
      icon: '📈',
      title: 'Advanced Analytics',
      desc: 'Get deep insights into your study patterns, strengths, weaknesses, and improvement areas.',
      items: ['Performance reports', 'Study insights', 'Trend analysis', 'Recommendations'],
    },
    {
      icon: '📅',
      title: 'Smart Scheduling',
      desc: 'AI-powered timetable creation, automatic scheduling, and calendar integration.',
      items: ['Auto timetable', 'Calendar sync', 'Reminders', 'Event management'],
    },
    {
      icon: '🔔',
      title: 'Smart Notifications',
      desc: 'Never miss deadlines with intelligent notifications and customizable alert preferences.',
      items: ['Assignment reminders', 'Class notifications', 'Custom alerts', 'Email digests'],
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.gradientBg}>
        <Animated.View style={[styles.gradientOrb, styles.orb1, getOrbTransform(orb1Anim)]}>
          <LinearGradient colors={['#6366f1', '#6366f1']} style={styles.orbGradient} />
        </Animated.View>
        <Animated.View style={[styles.gradientOrb, styles.orb2, getOrbTransform(orb2Anim)]}>
          <LinearGradient colors={['#ec4899', '#ec4899']} style={styles.orbGradient} />
        </Animated.View>
        <Animated.View style={[styles.gradientOrb, styles.orb3, getOrbTransform(orb3Anim)]}>
          <LinearGradient colors={['#a855f7', '#a855f7']} style={styles.orbGradient} />
        </Animated.View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.nav}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/images/icon.png')} style={styles.logo} />
            <Text style={styles.brandName}>NerdZ</Text>
          </View>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroContent}>
            <View style={styles.heroBadge}>
              <View style={styles.pulseDot} />
              <Text style={styles.badgeText}>Powerful Features</Text>
            </View>
            <Text style={styles.heroTitle}>
              Everything You Need{'\n'}
              <Text style={styles.gradientText}>In One Place</Text>
            </Text>
            <Text style={styles.heroDescription}>
              Discover all the amazing features that make NerdZ the ultimate study platform for students and teachers.
            </Text>
          </View>
        </View>

        <View style={styles.featuresSection}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <Text style={styles.featureIcon}>{feature.icon}</Text>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.desc}</Text>
              <View style={styles.featureList}>
                {feature.items.map((item, idx) => (
                  <View key={idx} style={styles.featureListItem}>
                    <Text style={styles.checkmark}>✓</Text>
                    <Text style={styles.featureListText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Experience These Features?</Text>
          <Text style={styles.ctaDescription}>
            Join thousands of students already studying smarter with NerdZ
          </Text>
          <TouchableOpacity style={styles.ctaButton} onPress={() => router.push('/login')}>
            <LinearGradient
              colors={['#6366f1', '#a855f7', '#ec4899']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.ctaButtonGradient}
            >
              <Text style={styles.ctaButtonText}>Get Started Free</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <View style={styles.footerSection}>
              <View style={styles.logoContainer}>
                <Image source={require('../assets/images/icon.png')} style={styles.footerLogo} />
                <Text style={styles.brandName}>NerdZ</Text>
              </View>
              <Text style={styles.footerDescription}>
                Making study easier and more engaging for students worldwide.
              </Text>
            </View>
          </View>
          <View style={styles.footerBottom}>
            <Text style={styles.footerBottomText}>© 2024 NerdZ. Open Source & Free Forever.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  gradientBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.15,
  },
  gradientOrb: {
    position: 'absolute',
    borderRadius: 1000,
  },
  orbGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 1000,
  },
  orb1: {
    width: width * 1.2,
    height: width * 1.2,
    top: -width * 0.3,
    right: -width * 0.3,
  },
  orb2: {
    width: width * 0.9,
    height: width * 0.9,
    bottom: -width * 0.2,
    left: -width * 0.2,
  },
  orb3: {
    width: width * 0.8,
    height: width * 0.8,
    top: height * 0.5,
    left: width * 0.1,
  },
  scrollView: {
    flex: 1,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'rgba(19, 19, 26, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(99, 102, 241, 0.2)',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 12,
  },
  brandName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  backButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(30, 30, 45, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  hero: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 30, 45, 0.6)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    marginBottom: 24,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
    marginRight: 8,
  },
  badgeText: {
    color: '#b4b4c8',
    fontSize: 14,
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 56,
  },
  gradientText: {
    color: '#6366f1',
  },
  heroDescription: {
    fontSize: 18,
    color: '#b4b4c8',
    textAlign: 'center',
    lineHeight: 28,
    paddingHorizontal: 20,
  },
  featuresSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 16,
  },
  featureCard: {
    backgroundColor: 'rgba(30, 30, 45, 0.6)',
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  featureIcon: {
    fontSize: 40,
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  featureDescription: {
    fontSize: 15,
    color: '#b4b4c8',
    lineHeight: 24,
    marginBottom: 16,
  },
  featureList: {
    gap: 8,
  },
  featureListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkmark: {
    color: '#10b981',
    fontSize: 16,
    fontWeight: '700',
  },
  featureListText: {
    color: '#b4b4c8',
    fontSize: 14,
  },
  ctaSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  ctaTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  ctaDescription: {
    fontSize: 18,
    color: '#b4b4c8',
    textAlign: 'center',
    marginBottom: 32,
  },
  ctaButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  ctaButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 8,
  },
  ctaButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: 'rgba(19, 19, 26, 0.8)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(99, 102, 241, 0.2)',
  },
  footerContent: {
    marginBottom: 24,
  },
  footerSection: {
    alignItems: 'center',
  },
  footerLogo: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 12,
  },
  footerDescription: {
    color: '#b4b4c8',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
  },
  footerBottom: {
    alignItems: 'center',
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(99, 102, 241, 0.2)',
  },
  footerBottomText: {
    color: '#b4b4c8',
    fontSize: 13,
  },
});
