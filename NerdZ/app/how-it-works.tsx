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

export default function HowItWorksScreen() {
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

  const steps = [
    {
      number: 1,
      icon: '✨',
      title: 'Create Your Account',
      desc: 'Sign up for free in seconds. Choose whether you\'re a student or teacher, and you\'re ready to go!',
    },
    {
      number: 2,
      icon: '⚙️',
      title: 'Set Up Your Profile',
      desc: 'Add your courses, set study goals, customize your dashboard, and personalize your learning experience.',
    },
    {
      number: 3,
      icon: '📚',
      title: 'Start Learning',
      desc: 'Access study materials, create notes, use the pomodoro timer, and track your progress in real-time.',
    },
    {
      number: 4,
      icon: '🎯',
      title: 'Track & Improve',
      desc: 'Monitor your analytics, earn achievements, compete on leaderboards, and continuously improve!',
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
              <Text style={styles.badgeText}>Simple & Effective</Text>
            </View>
            <Text style={styles.heroTitle}>
              How <Text style={styles.gradientText}>NerdZ</Text>{'\n'}Works
            </Text>
            <Text style={styles.heroDescription}>
              Get started in minutes and transform your study experience. Here's how NerdZ makes learning easier.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Getting Started in 4 Simple Steps</Text>
            <Text style={styles.sectionSubtitle}>Join thousands of students in just a few minutes</Text>
          </View>
          <View style={styles.stepsGrid}>
            {steps.map((step, index) => (
              <View key={index} style={styles.stepCard}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{step.number}</Text>
                </View>
                <Text style={styles.stepIcon}>{step.icon}</Text>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDesc}>{step.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>For Students</Text>
            <Text style={styles.sectionSubtitle}>Your complete learning companion</Text>
          </View>
          <View style={styles.userCards}>
            <View style={[styles.userCard, styles.studentCard]}>
              <View style={styles.userCardHeader}>
                <Text style={styles.userIcon}>🎓</Text>
                <Text style={styles.userCardTitle}>Daily Study Workflow</Text>
              </View>
              <View style={styles.userFeatures}>
                {[
                  'Check your schedule and upcoming classes',
                  'Review assignments and deadlines',
                  'Start focused study sessions with timer',
                  'Take notes and create study materials',
                  'Track progress and earn achievements',
                ].map((feature, idx) => (
                  <View key={idx} style={styles.userFeature}>
                    <Ionicons name="checkmark" size={20} color="#10b981" />
                    <Text style={styles.userFeatureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={[styles.userCard, styles.teacherCard]}>
              <View style={styles.userCardHeader}>
                <Text style={styles.userIcon}>👨‍🏫</Text>
                <Text style={styles.userCardTitle}>For Teachers</Text>
              </View>
              <View style={styles.userFeatures}>
                {[
                  'Upload study materials and resources',
                  'Create and schedule assignments',
                  'Monitor student progress & grades',
                  'Generate automated timetables',
                  'Communicate with students easily',
                ].map((feature, idx) => (
                  <View key={idx} style={styles.userFeature}>
                    <Ionicons name="checkmark" size={20} color="#10b981" />
                    <Text style={styles.userFeatureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Get Started?</Text>
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
              <Text style={styles.ctaButtonText}>Start Free Today</Text>
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
  section: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#b4b4c8',
    textAlign: 'center',
  },
  stepsGrid: {
    gap: 16,
  },
  stepCard: {
    backgroundColor: 'rgba(30, 30, 45, 0.6)',
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    position: 'relative',
  },
  stepNumber: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
  },
  stepIcon: {
    fontSize: 40,
    marginBottom: 16,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  stepDesc: {
    fontSize: 15,
    color: '#b4b4c8',
    lineHeight: 24,
  },
  userCards: {
    gap: 20,
  },
  userCard: {
    backgroundColor: 'rgba(30, 30, 45, 0.6)',
    padding: 28,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    borderTopWidth: 3,
  },
  studentCard: {
    borderTopColor: '#6366f1',
  },
  teacherCard: {
    borderTopColor: '#ec4899',
  },
  userCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  userCardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  userFeatures: {
    gap: 12,
  },
  userFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userFeatureText: {
    color: '#b4b4c8',
    fontSize: 15,
    flex: 1,
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
