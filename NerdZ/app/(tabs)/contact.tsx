import React, { useState, useRef, useEffect } from 'react';
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
  TextInput,
  Alert,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { constants } from '@/constants/versions';

const { width, height } = Dimensions.get('window');

export default function ContactScreen() {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Animated values for gradient orbs
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

  const handleSubmit = async () => {
    if (!name || !email || !subject || !message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsSending(true);
    // Simulate API call

    const body = `Subject:${subject}\n\n${message}\n\nName:${name}\nEmail:${email}`

    Linking.openURL(`mailto:${constants.email}?subject=${encodeURIComponent(`${subject} | ${name}`)}&body=${encodeURIComponent(body)}`);
    setTimeout(() => {
      setIsSending(false);
      Alert.alert('Success', 'Message sent successfully!');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 2000);
  };

  const openEmail = () => {
    Linking.openURL(`mailto:${constants.email}`);
  };

  const openPhone = () => {
    Linking.openURL(`tel:${constants.phone}`);
  };

  const openSocial = (platform: string) => {
    platform = platform.toLowerCase()
    // Placeholder URLs - replace with actual social media links
    const urls: { [key: string]: string } = {
      twitter: constants.socials.find((social) => social.name === 'Twitter')?.url!,
      linkedin: constants.socials.find((social) => social.name === 'LinkedIn')?.url!,
      discord: constants.socials.find((social) => social.name === 'Discord')?.url!,
      github: constants.socials.find((social) => social.name === 'GitHub')?.url!,
      instagram: constants.socials.find((social) => social.name === 'Instagram')?.url!,
    };
    
    if (urls[platform]) {
      Linking.openURL(urls[platform]);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Animated Background */}
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
        {/* Navigation */}
      <View style={styles.nav}>
          <View style={styles.logoContainer}>
            <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
            <Text style={styles.brandName}>NerdZ</Text>
          </View>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.heroContent}>
            <View style={styles.heroBadge}>
              <View style={styles.pulseDot} />
              <Text style={styles.badgeText}>We'd Love to Hear From You</Text>
            </View>
            <Text style={styles.heroTitle}>
              Get in <Text style={styles.gradientText}>Touch</Text>
            </Text>
            <Text style={styles.heroDescription}>
              Have a question or feedback? We're here to help. Send us a message and we'll respond within 24 hours.
            </Text>
          </View>
        </View>

        {/* Contact Form Section */}
        <View style={styles.contactMain}>
          <View style={styles.formCard}>
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>Send a Message</Text>
              <Text style={styles.formSubtitle}>Fill out the form and we'll be in touch soon</Text>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>
                Full Name <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={20} color="#b4b4c8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  placeholderTextColor="#b4b4c8"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>
                Email Address <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color="#b4b4c8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="john@example.com"
                  placeholderTextColor="#b4b4c8"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>
                Subject <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="chatbox-outline" size={20} color="#b4b4c8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="How can we help?"
                  placeholderTextColor="#b4b4c8"
                  value={subject}
                  onChangeText={setSubject}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>
                Your Message <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.textarea}
                placeholder="Tell us more about what you need..."
                placeholderTextColor="#b4b4c8"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity 
              style={styles.submitButton} 
              onPress={handleSubmit}
              disabled={isSending}
            >
              <LinearGradient
                colors={['#6366f1', '#a855f7', '#ec4899']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.submitGradient}
              >
                <Text style={styles.submitText}>
                  {isSending ? 'Sending...' : 'Send Message'}
                </Text>
                <Ionicons name="send" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Contact Info Cards */}
          <View style={styles.contactInfo}>
            <TouchableOpacity style={styles.infoCard} onPress={openEmail}>
              <Text style={styles.infoIcon}>📧</Text>
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Email Us</Text>
                <Text style={styles.infoValue}>{constants.email}</Text>
                <Text style={styles.infoDetail}>We reply within 24 hours</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.infoCard} onPress={openPhone}>
              <Text style={styles.infoIcon}>📞</Text>
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Call Us</Text>
                <Text style={styles.infoValue}>{constants.phone}</Text>
                <Text style={styles.infoDetail}>Mon-Fri: 9AM - 6PM PST</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.infoCard}>
              <Text style={styles.infoIcon}>📍</Text>
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Visit Us</Text>
                <Text style={styles.infoValue}>{constants.address}</Text>
                <Text style={styles.infoDetail}>Drop by anytime!</Text>
              </View>
            </View>

            <View style={[styles.infoCard, styles.socialCard]}>
              <Text style={styles.socialTitle}>Follow Us</Text>
              <View style={styles.socialLinks}>
                <TouchableOpacity style={styles.socialBtn} onPress={() => openSocial('twitter')}>
                  <Ionicons name="logo-twitter" size={20} color="#fff" />
                  <Text style={styles.socialBtnText}>Twitter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialBtn} onPress={() => openSocial('linkedin')}>
                  <Ionicons name="logo-linkedin" size={20} color="#fff" />
                  <Text style={styles.socialBtnText}>LinkedIn</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialBtn} onPress={() => openSocial('discord')}>
                  <Ionicons name="logo-discord" size={20} color="#fff" />
                  <Text style={styles.socialBtnText}>Discord</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialBtn} onPress={() => openSocial('github')}>
                  <Ionicons name="logo-github" size={20} color="#fff" />
                  <Text style={styles.socialBtnText}>GitHub</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialBtn} onPress={() => openSocial('instagram')}>
                  <Ionicons name="logo-instagram" size={20} color="#fff" />
                  <Text style={styles.socialBtnText}>Instagram</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Reasons Section */}
        <View style={styles.reasonsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Why Reach Out?</Text>
            <Text style={styles.sectionSubtitle}>We're here for you, every step of the way</Text>
          </View>
          <View style={styles.reasonsGrid}>
            {[
              { icon: '💡', title: 'Feature Requests', desc: 'Have an idea? We love hearing suggestions from our community!' },
              { icon: '🐛', title: 'Report a Bug', desc: 'Found an issue? Let us know so we can fix it quickly.' },
              { icon: '🤝', title: 'Partnerships', desc: 'Interested in collaborating? We\'d love to work with you.' },
              { icon: '❓', title: 'General Inquiry', desc: 'Any other questions? Don\'t hesitate to ask!' },
            ].map((reason, index) => (
              <View key={index} style={styles.reasonCard}>
                <Text style={styles.reasonIcon}>{reason.icon}</Text>
                <Text style={styles.reasonTitle}>{reason.title}</Text>
                <Text style={styles.reasonDesc}>{reason.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaIcon}>💬</Text>
          <Text style={styles.ctaTitle}>Prefer Live Chat?</Text>
          <Text style={styles.ctaDescription}>
            Join our Discord community for instant support and connect with fellow students
          </Text>
          <TouchableOpacity style={styles.ctaButton} onPress={() => openSocial('discord')}>
            <LinearGradient
              colors={['#6366f1', '#a855f7', '#ec4899']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.ctaButtonGradient}
            >
              <Text style={styles.ctaButtonText}>Join Discord Community</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <View style={styles.footerSection}>
              <View style={styles.logoContainer}>
                <Image source={require('../../assets/images/icon.png')} style={styles.footerLogo} />
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
  contactMain: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 20,
  },
  formCard: {
    backgroundColor: 'rgba(30, 30, 45, 0.6)',
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  formHeader: {
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#b4b4c8',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  required: {
    color: '#ef4444',
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  input: {
    flex: 1,
    backgroundColor: '#13131a',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    borderRadius: 12,
    paddingVertical: 14,
    paddingLeft: 48,
    paddingRight: 16,
    color: '#ffffff',
    fontSize: 16,
  },
  textarea: {
    backgroundColor: '#13131a',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    borderRadius: 12,
    padding: 16,
    color: '#ffffff',
    fontSize: 16,
    minHeight: 120,
  },
  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
  },
  submitText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  contactInfo: {
    gap: 20,
  },
  infoCard: {
    backgroundColor: 'rgba(30, 30, 45, 0.6)',
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  infoIcon: {
    fontSize: 32,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 16,
    color: '#6366f1',
    marginBottom: 4,
    fontWeight: '600',
  },
  infoDetail: {
    fontSize: 13,
    color: '#b4b4c8',
  },
  socialCard: {
    flexDirection: 'column',
  },
  socialTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
  },
  socialLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
    borderRadius: 12,
  },
  socialBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  reasonsSection: {
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
  reasonsGrid: {
    gap: 16,
  },
  reasonCard: {
    backgroundColor: 'rgba(30, 30, 45, 0.6)',
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  reasonIcon: {
    fontSize: 40,
    marginBottom: 16,
  },
  reasonTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  reasonDesc: {
    fontSize: 15,
    color: '#b4b4c8',
    lineHeight: 24,
  },
  ctaSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  ctaIcon: {
    fontSize: 48,
    marginBottom: 16,
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
    lineHeight: 28,
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
