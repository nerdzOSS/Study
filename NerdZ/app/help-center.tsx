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

export default function HelpCenterScreen() {
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

  const categories = [
    {
      icon: '🚀',
      title: 'Getting Started',
      desc: 'Learn the basics and set up your account',
    },
    {
      icon: '👤',
      title: 'Account & Profile',
      desc: 'Manage your account settings and preferences',
    },
    {
      icon: '📚',
      title: 'Courses & Learning',
      desc: 'Everything about courses and study materials',
    },
    {
      icon: '✅',
      title: 'Assignments & Tests',
      desc: 'How to submit and track your assignments',
    },
    {
      icon: '⚙️',
      title: 'Technical Support',
      desc: 'Troubleshooting and technical issues',
    },
    {
      icon: '💳',
      title: 'Billing & Payments',
      desc: 'Questions about pricing and payments',
    },
  ];

  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'Click the "Get Started" button, choose Student or Teacher, and fill in your email and password. You\'ll be ready to go in seconds!',
    },
    {
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page, enter your email, and we\'ll send you a reset link.',
    },
    {
      question: 'Can I use NerdZ on mobile?',
      answer: 'Yes! NerdZ is fully responsive and works perfectly on all devices - desktop, tablet, and mobile.',
    },
    {
      question: 'How do I contact support?',
      answer: 'Visit our Contact page or email us at support@nerdz.com. We typically respond within 24 hours.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely! We use industry-standard encryption and never share your data with third parties.',
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
              <Text style={styles.badgeText}>We're Here to Help</Text>
            </View>
            <Text style={styles.heroTitle}>
              <Text style={styles.gradientText}>Help Center</Text>
            </Text>
            <Text style={styles.heroDescription}>
              Find answers to common questions, browse guides, or contact our support team.
            </Text>
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Browse by Category</Text>
            <Text style={styles.sectionSubtitle}>Find quick answers to your questions</Text>
          </View>
          <View style={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryCard}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryDesc}>{category.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          </View>
          <View style={styles.faqGrid}>
            {faqs.map((faq, index) => (
              <View key={index} style={styles.faqCard}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Still Need Help?</Text>
          <Text style={styles.ctaDescription}>Our support team is ready to assist you</Text>
          <TouchableOpacity style={styles.ctaButton} onPress={() => router.push('/contact')}>
            <LinearGradient
              colors={['#6366f1', '#a855f7', '#ec4899']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.ctaButtonGradient}
            >
              <Text style={styles.ctaButtonText}>Contact Support</Text>
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
    marginBottom: 32,
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  categoryCard: {
    backgroundColor: 'rgba(30, 30, 45, 0.6)',
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    width: width > 768 ? '48%' : '100%',
  },
  categoryIcon: {
    fontSize: 40,
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  categoryDesc: {
    fontSize: 15,
    color: '#b4b4c8',
    lineHeight: 24,
  },
  faqGrid: {
    gap: 16,
  },
  faqCard: {
    backgroundColor: 'rgba(30, 30, 45, 0.6)',
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  faqQuestion: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  faqAnswer: {
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
