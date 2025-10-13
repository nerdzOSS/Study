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

export default function AboutScreen() {
  // Animated values for gradient orbs
  const orb1Anim = useRef(new Animated.Value(0)).current;
  const orb2Anim = useRef(new Animated.Value(0)).current;
  const orb3Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate gradient orbs
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Animated Background */}
      <View style={styles.gradientBg}>
        <Animated.View
          style={[styles.gradientOrb, styles.orb1, getOrbTransform(orb1Anim)]}
        >
          <LinearGradient
            colors={['#6366f1', '#6366f1']}
            style={styles.orbGradient}
          />
        </Animated.View>
        <Animated.View
          style={[styles.gradientOrb, styles.orb2, getOrbTransform(orb2Anim)]}
        >
          <LinearGradient
            colors={['#ec4899', '#ec4899']}
            style={styles.orbGradient}
          />
        </Animated.View>
        <Animated.View
          style={[styles.gradientOrb, styles.orb3, getOrbTransform(orb3Anim)]}
        >
          <LinearGradient
            colors={['#a855f7', '#a855f7']}
            style={styles.orbGradient}
          />
        </Animated.View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Navigation */}
        <View style={styles.nav}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/icon.png')}
              style={styles.logo}
            />
            <Text style={styles.brandName}>NerdZ</Text>
          </View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.heroContent}>
            <View style={styles.heroBadge}>
              <View style={styles.pulseDot} />
              <Text style={styles.badgeText}>Our Story</Text>
            </View>
            <Text style={styles.heroTitle}>
              Making Education{'\n'}
              <Text style={styles.gradientText}>Accessible to All</Text>
            </Text>
            <Text style={styles.heroDescription}>
              NerdZ was created by students, for students. We believe learning
              should be engaging, accessible, and free for everyone.
            </Text>
          </View>
        </View>

        {/* Mission & Vision Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Our Mission & Vision</Text>
            <Text style={styles.sectionSubtitle}>What drives us every day</Text>
          </View>
          <View style={styles.missionCards}>
            <View style={[styles.missionCard, styles.missionCardPurple]}>
              <View style={styles.missionCardHeader}>
                <Text style={styles.missionIcon}>🎯</Text>
                <Text style={styles.missionCardTitle}>Our Mission</Text>
              </View>
              <Text style={styles.missionDescription}>
                To provide students worldwide with a free, comprehensive study
                platform that makes learning enjoyable, organized, and
                effective. We're committed to democratizing education through
                technology.
              </Text>
            </View>

            <View style={[styles.missionCard, styles.missionCardPink]}>
              <View style={styles.missionCardHeader}>
                <Text style={styles.missionIcon}>🚀</Text>
                <Text style={styles.missionCardTitle}>Our Vision</Text>
              </View>
              <Text style={styles.missionDescription}>
                To become the world's most loved study platform, empowering
                millions of students to achieve their academic goals and unlock
                their full potential through innovative, accessible tools.
              </Text>
            </View>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>NerdZ by the Numbers</Text>
            <Text style={styles.sectionSubtitle}>Our growing community</Text>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>1000+</Text>
              <Text style={styles.statLabel}>Active Students</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>50+</Text>
              <Text style={styles.statLabel}>Expert Teachers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>10k+</Text>
              <Text style={styles.statLabel}>Study Hours</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>98%</Text>
              <Text style={styles.statLabel}>Satisfaction Rate</Text>
            </View>
          </View>
        </View>

        {/* Values Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Why Choose NerdZ</Text>
            <Text style={styles.sectionSubtitle}>What makes us different</Text>
          </View>
          <View style={styles.valuesGrid}>
            {[
              {
                icon: '💯',
                title: '100% Free',
                desc: 'No hidden fees, no subscriptions, no paywalls. Quality education should be accessible to everyone.',
              },
              {
                icon: '🔓',
                title: 'Open Source',
                desc: 'Built by the community, for the community. Transparent, secure, and continuously improving.',
              },
              {
                icon: '🎨',
                title: 'Student-Focused',
                desc: 'Designed with actual student needs in mind. Every feature solves a real problem.',
              },
              {
                icon: '🔒',
                title: 'Privacy First',
                desc: 'Your data belongs to you. We never sell your information or compromise your privacy.',
              },
              {
                icon: '⚡',
                title: 'Fast & Reliable',
                desc: 'Lightning-fast performance, 99.9% uptime, and reliable infrastructure you can count on.',
              },
              {
                icon: '🌍',
                title: 'Global Community',
                desc: 'Connect with students worldwide. Share knowledge, collaborate, and grow together.',
              },
            ].map((value, index) => (
              <View key={index} style={styles.valueCard}>
                <Text style={styles.valueIcon}>{value.icon}</Text>
                <Text style={styles.valueTitle}>{value.title}</Text>
                <Text style={styles.valueDescription}>{value.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Join Our Growing Community</Text>
          <Text style={styles.ctaDescription}>
            Be part of the education revolution
          </Text>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => router.push('/login')}
          >
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

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <View style={styles.footerSection}>
              <View style={styles.logoContainer}>
                <Image
                  source={require('../../assets/images/icon.png')}
                  style={styles.footerLogo}
                />
                <Text style={styles.brandName}>NerdZ</Text>
              </View>
              <Text style={styles.footerDescription}>
                Making study easier and more engaging for students worldwide.
              </Text>
            </View>
          </View>
          <View style={styles.footerBottom}>
            <Text style={styles.footerBottomText}>
              © 2024 NerdZ. Open Source & Free Forever.
            </Text>
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
  missionCards: {
    gap: 20,
  },
  missionCard: {
    backgroundColor: 'rgba(30, 30, 45, 0.6)',
    padding: 28,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    borderTopWidth: 3,
  },
  missionCardPurple: {
    borderTopColor: '#6366f1',
  },
  missionCardPink: {
    borderTopColor: '#ec4899',
  },
  missionCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  missionIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  missionCardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  missionDescription: {
    fontSize: 16,
    color: '#b4b4c8',
    lineHeight: 26,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 20,
  },
  stat: {
    alignItems: 'center',
    minWidth: '40%',
  },
  statNumber: {
    fontSize: 40,
    fontWeight: '700',
    color: '#6366f1',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#b4b4c8',
    textAlign: 'center',
  },
  valuesGrid: {
    gap: 16,
  },
  valueCard: {
    backgroundColor: 'rgba(30, 30, 45, 0.6)',
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  valueIcon: {
    fontSize: 40,
    marginBottom: 16,
  },
  valueTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  valueDescription: {
    fontSize: 15,
    color: '#b4b4c8',
    lineHeight: 24,
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
