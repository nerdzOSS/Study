import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PhoneMockup from '@/components/phone';
import { useTheme, type ColorScheme } from '@/contexts/ThemeContext';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const { isDark, colors, toggleTheme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const orb1Anim = useRef(new Animated.Value(0)).current;
  const orb2Anim = useRef(new Animated.Value(0)).current;
  const orb3Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Hero section animations
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

    // Floating orb animations
    const animateOrbs = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(orb1Anim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(orb1Anim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(orb2Anim, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(orb2Anim, {
            toValue: 0,
            duration: 4000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(orb3Anim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true,
          }),
          Animated.timing(orb3Anim, {
            toValue: 0,
            duration: 5000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateOrbs();
  }, []);

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>N</Text>
        </View>
        <Text style={styles.brandName}>NerdZ</Text>
      </View>
      <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
        <Ionicons 
          name={isDark ? "sunny-outline" : "moon-outline"} 
          size={20} 
          color={colors.textPrimary} 
        />
      </TouchableOpacity>
    </View>
  );

  const renderAnimatedBackground = () => (
    <View style={styles.gradientBg}>
      <Animated.View
        style={[
          styles.gradientOrb,
          styles.orb1,
          {
            transform: [
              {
                translateY: orb1Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -20],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.gradientOrb,
          styles.orb2,
          {
            transform: [
              {
                translateX: orb2Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 15],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.gradientOrb,
          styles.orb3,
          {
            transform: [
              {
                translateY: orb3Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 25],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );

  const renderHeroSection = () => (
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

        <TouchableOpacity style={styles.ctaButton}>
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
          {/* Screen 1: Study Dashboard */}
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

  const renderFeaturesSection = () => (
    <View style={styles.features}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Everything You Need to Succeed</Text>
        <Text style={styles.sectionSubtitle}>
          Powerful features designed to make studying engaging and effective
        </Text>
      </View>

      <View style={styles.featuresGrid}>
        {[
          { icon: '🤖', title: 'AI-Powered Assistant', desc: 'Get instant help with your doubts and personalized study recommendations' },
          { icon: '🎨', title: 'Customizable Interface', desc: 'Make it yours with themes, colors, and layouts that match your vibe' },
          { icon: '📊', title: 'Progress Tracking', desc: 'Visualize your improvement with detailed analytics and test history' },
          { icon: '🎵', title: 'Lofi Music Player', desc: 'Study with curated playlists designed to boost your concentration' },
          { icon: '⏰', title: 'Smart Timers', desc: 'Pomodoro technique, alarms, and reminders to keep you on track' },
          { icon: '🏆', title: 'Rewards System', desc: 'Earn badges and achievements to stay motivated and engaged' },
        ].map((feature, index) => (
          <View key={index} style={styles.featureCard}>
            <Text style={styles.featureIcon}>{feature.icon}</Text>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDescription}>{feature.desc}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderUserTypesSection = () => (
    <View style={styles.userTypes}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Built for Students & Teachers</Text>
        <Text style={styles.sectionSubtitle}>Two powerful experiences, one amazing platform</Text>
      </View>

      <View style={styles.userCards}>
        <View style={[styles.userCard, styles.studentCard]}>
          <View style={styles.userCardHeader}>
            <Text style={styles.userIcon}>🎓</Text>
            <Text style={styles.userCardTitle}>For Students</Text>
          </View>
          <View style={styles.userFeatures}>
            {[
              'Access unlimited study materials',
              'Create personal notes & mind maps',
              'Take tests and track your scores',
              'Get study tips and motivation',
              'Connect with your teachers',
            ].map((feature, index) => (
              <View key={index} style={styles.userFeature}>
                <Ionicons name="checkmark" size={16} color="#10b981" />
                <Text style={styles.userFeatureText}>{feature}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={[styles.btn, styles.btnPrimary]}>
            <Text style={styles.btnText}>Sign Up as Student</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.userCard, styles.teacherCard]}>
          <View style={styles.userCardHeader}>
            <Text style={styles.userIcon}>👨‍🏫</Text>
            <Text style={styles.userCardTitle}>For Teachers</Text>
          </View>
          <View style={styles.userFeatures}>
            {[
              'Upload & organize study materials',
              'Schedule tests and quizzes',
              'Monitor student progress',
              'Create personalized timetables',
              'Connect with students easily',
            ].map((feature, index) => (
              <View key={index} style={styles.userFeature}>
                <Ionicons name="checkmark" size={16} color="#10b981" />
                <Text style={styles.userFeatureText}>{feature}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={[styles.btn, styles.btnSecondary]}>
            <Text style={[styles.btnText, styles.btnSecondaryText]}>Sign Up as Teacher</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderCTASection = () => (
    <View style={styles.ctaSection}>
      <Text style={styles.ctaTitle}>Ready to Transform Your Study Game?</Text>
      <Text style={styles.ctaDescription}>
        Join thousands of students already studying smarter with NerdZ
      </Text>
      <TouchableOpacity style={[styles.btn, styles.btnPrimary, styles.btnLarge]}>
        <Text style={styles.btnText}>Get Started Free</Text>
        <Ionicons name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      <View style={styles.footerContent}>
        <View style={styles.footerSection}>
          <View style={styles.logoContainer}>
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>N</Text>
            </View>
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
  );

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.bgPrimary} />
      {renderAnimatedBackground()}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderHeroSection()}
        {renderFeaturesSection()}
        {renderUserTypesSection()}
        {renderCTASection()}
        {renderFooter()}
      </ScrollView>
    </View>
  );
}

interface Styles {
  // View styles
  container: ViewStyle;
  scrollView: ViewStyle;
  gradientBg: ViewStyle;
  gradientOrb: ViewStyle;
  orb1: ViewStyle;
  orb2: ViewStyle;
  orb3: ViewStyle;
  header: ViewStyle;
  themeToggle: ViewStyle;
  logoContainer: ViewStyle;
  logoPlaceholder: ViewStyle;
  hero: ViewStyle;
  heroContent: ViewStyle;
  heroBadge: ViewStyle;
  pulseDot: ViewStyle;
  heroImage: ViewStyle;
  heroStats: ViewStyle;
  stat: ViewStyle;
  screenContent: ViewStyle;
  activeScreen: ViewStyle;
  appHeader: ViewStyle;
  appBody: ViewStyle;
  studyStats: ViewStyle;
  statBox: ViewStyle;
  statIcon: TextStyle;
  statInfo: ViewStyle;
  progressCard: ViewStyle;
  progressHeader: TextStyle;
  progressBar: ViewStyle;
  progressFill: ViewStyle;
  features: ViewStyle;
  sectionHeader: ViewStyle;
  featuresGrid: ViewStyle;
  featureCard: ViewStyle;
  featureIcon: TextStyle;
  userTypes: ViewStyle;
  userCards: ViewStyle;
  userCard: ViewStyle;
  studentCard: ViewStyle;
  teacherCard: ViewStyle;
  userCardHeader: ViewStyle;
  userIcon: TextStyle;
  userFeatures: ViewStyle;
  userFeature: ViewStyle;
  btn: ViewStyle;
  btnPrimary: ViewStyle;
  btnSecondary: ViewStyle;
  btnLarge: ViewStyle;
  ctaSection: ViewStyle;
  ctaButton: ViewStyle;
  footer: ViewStyle;
  footerSection: ViewStyle;
  footerContent: ViewStyle;
  footerBottom: ViewStyle;
  
  // Text styles
  logoText: TextStyle;
  brandName: TextStyle;
  badgeText: TextStyle;
  heroTitle: TextStyle;
  gradientText: TextStyle;
  heroDescription: TextStyle;
  ctaButtonText: TextStyle;
  statNumber: TextStyle;
  statLabel: TextStyle;
  statValue: TextStyle;
  statName: TextStyle;
  progressText: TextStyle;
  sectionTitle: TextStyle;
  sectionSubtitle: TextStyle;
  featureTitle: TextStyle;
  featureDescription: TextStyle;
  userCardTitle: TextStyle;
  userFeatureText: TextStyle;
  btnText: TextStyle;
  btnSecondaryText: TextStyle;
  ctaTitle: TextStyle;
  ctaDescription: TextStyle;
  footerDescription: TextStyle;
  footerBottomText: TextStyle;
  time: TextStyle;
  statusIcons: TextStyle;
  appTitle: TextStyle;
}

const createStyles = (colors: ColorScheme) => StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
  scrollView: {
    flex: 1,
  },
  gradientBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  gradientOrb: {
    position: 'absolute',
    borderRadius: 250,
    opacity: 0.15,
  },
  orb1: {
    width: 500,
    height: 500,
    backgroundColor: colors.accentPurple,
    top: -100,
    right: -100,
  },
  orb2: {
    width: 400,
    height: 400,
    backgroundColor: colors.accentPink,
    bottom: -50,
    left: -50,
  },
  orb3: {
    width: 350,
    height: 350,
    backgroundColor: colors.accentViolet,
    top: '50%',
    left: '50%',
    marginTop: -175,
    marginLeft: -175,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: colors.bgSecondary,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    zIndex: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: colors.accentPurple,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  brandName: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '700',
  },
  themeToggle: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
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
  floatingCard: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  card1: {
    top: 60,
    left: -20,
    zIndex: 2,
  },
  card2: {
    top: 240,
    right: -20,
    zIndex: 2,
  },
  card3: {
    bottom: 120,
    left: 20,
    zIndex: 2,
  },
  cardIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  cardSubtitle: {
    color: colors.textSecondary,
    fontSize: 13,
  },
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
  userTypes: {
    paddingHorizontal: width > 768 ? 40 : 20,
    paddingVertical: width > 768 ? 80 : 60,
    maxWidth: width > 1200 ? 1200 : '100%',
    alignSelf: 'center',
    width: '100%',
  },
  userCards: {
    flexDirection: width > 768 ? 'row' : 'column',
    gap: width > 768 ? 32 : 24,
    alignItems: width > 768 ? 'stretch' : 'center',
  },
  userCard: {
    backgroundColor: colors.cardBg,
    padding: width > 768 ? 40 : width > 480 ? 32 : 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.borderColor,
    flex: width > 768 ? 1 : 0,
    width: width > 768 ? 'auto' : '100%',
    maxWidth: width > 768 ? undefined : 500,
  },
  studentCard: {
    borderTopWidth: 3,
    borderTopColor: colors.accentPurple,
  },
  teacherCard: {
    borderTopWidth: 3,
    borderTopColor: colors.accentPink,
  },
  userCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  userIcon: {
    fontSize: width > 768 ? 32 : width > 480 ? 28 : 24,
    marginRight: width > 768 ? 12 : 8,
  },
  userCardTitle: {
    fontSize: width > 768 ? 29 : width > 480 ? 26 : 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  userFeatures: {
    marginBottom: 32,
  },
  userFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userFeatureText: {
    color: colors.textSecondary,
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
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
  btnSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.accentPink,
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
  btnSecondaryText: {
    color: colors.accentPink,
  },
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
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 64,
    backgroundColor: colors.bgSecondary,
    borderTopWidth: 1,
    borderTopColor: colors.borderColor,
  },
  footerContent: {
    marginBottom: 32,
  },
  footerSection: {
    alignItems: 'center',
  },
  footerDescription: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 27,
  },
  footerBottom: {
    alignItems: 'center',
    paddingTop: 32,
    borderTopWidth: 1,
    borderTopColor: colors.borderColor,
  },
  footerBottomText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  // Phone Mockup Styles
  phoneMockup: {
    position: 'relative',
    alignSelf: 'center',
    zIndex: 1,
  },
  phoneFrame: {
    width: 340,
    height: 690,
    backgroundColor: '#2d2d3a',
    borderRadius: 50,
    padding: 14,
    shadowColor: colors.accentPurple,
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.3,
    shadowRadius: 80,
    elevation: 20,
  },
  phoneNotch: {
    position: 'absolute',
    top: 18,
    left: '50%',
    marginLeft: -70,
    width: 140,
    height: 28,
    backgroundColor: '#000',
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    zIndex: 10,
  },
  phoneNotchSpeaker: {
    position: 'absolute',
    top: 8,
    left: '50%',
    marginLeft: -25,
    width: 50,
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
  },
  phoneScreen: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.bgPrimary,
    borderRadius: 38,
    overflow: 'hidden',
  },
  screenCarousel: {
    width: '100%',
    height: '100%',
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
