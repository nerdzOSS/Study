import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

type UserType = 'student' | 'teacher';

export default function LoginScreen() {
  const [userType, setUserType] = useState<UserType>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const handleLogin = () => {
    // Implement login logic here
    console.log('Login:', { userType, email, password, rememberMe });
    // Navigate to home screen or handle authentication
    router.replace('/(tabs)');
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic
  };

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
          style={[
            styles.gradientOrb,
            styles.orb1,
            getOrbTransform(orb1Anim),
          ]}
        >
          <LinearGradient
            colors={['#6366f1', '#6366f1']}
            style={styles.orbGradient}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.gradientOrb,
            styles.orb2,
            getOrbTransform(orb2Anim),
          ]}
        >
          <LinearGradient
            colors={['#ec4899', '#ec4899']}
            style={styles.orbGradient}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.gradientOrb,
            styles.orb3,
            getOrbTransform(orb3Anim),
          ]}
        >
          <LinearGradient
            colors={['#a855f7', '#a855f7']}
            style={styles.orbGradient}
          />
        </Animated.View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.loginCard}>
            {/* Logo Section */}
            <View style={styles.loginHeader}>
              <Image
                source={require('../assets/images/icon.png')}
                style={styles.loginLogo}
              />
              <Text style={styles.loginTitle}>
                Welcome to <Text style={styles.gradientText}>NerdZ</Text>
              </Text>
              <Text style={styles.loginSubtitle}>Study Smarter, Not Harder</Text>
            </View>

            {/* User Type Selection */}
            <View style={styles.userTypeSelector}>
              <TouchableOpacity
                style={[
                  styles.userTypeBtn,
                  userType === 'student' && styles.userTypeBtnActive,
                ]}
                onPress={() => setUserType('student')}
              >
                <Text style={styles.userTypeIcon}>🎓</Text>
                <Text
                  style={[
                    styles.userTypeText,
                    userType === 'student' && styles.userTypeTextActive,
                  ]}
                >
                  Student
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.userTypeBtn,
                  userType === 'teacher' && styles.userTypeBtnActive,
                ]}
                onPress={() => setUserType('teacher')}
              >
                <Text style={styles.userTypeIcon}>👨‍🏫</Text>
                <Text
                  style={[
                    styles.userTypeText,
                    userType === 'teacher' && styles.userTypeTextActive,
                  ]}
                >
                  Teacher
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Form */}
            <View style={styles.loginForm}>
              {/* Email Input */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Email Address</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color="#b4b4c8"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#b4b4c8"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#b4b4c8"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, styles.inputWithToggle]}
                    placeholder="Enter your password"
                    placeholderTextColor="#b4b4c8"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    style={styles.togglePassword}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={20}
                      color="#b4b4c8"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Form Options */}
              <View style={styles.formOptions}>
                <TouchableOpacity
                  style={styles.checkboxLabel}
                  onPress={() => setRememberMe(!rememberMe)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      rememberMe && styles.checkboxActive,
                    ]}
                  >
                    {rememberMe && (
                      <Ionicons name="checkmark" size={14} color="#fff" />
                    )}
                  </View>
                  <Text style={styles.checkboxText}>Remember me</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              {/* Sign In Button */}
              <TouchableOpacity
                style={styles.btnPrimary}
                onPress={handleLogin}
              >
                <LinearGradient
                  colors={['#6366f1', '#a855f7', '#ec4899']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.btnGradient}
                >
                  <Text style={styles.btnText}>Sign In</Text>
                  <Ionicons name="arrow-forward" size={20} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Login */}
            <View style={styles.socialLogin}>
              <TouchableOpacity
                style={styles.socialBtn}
                onPress={() => handleSocialLogin('Google')}
              >
                <Ionicons name="logo-google" size={20} color="#4285F4" />
                <Text style={styles.socialBtnText}>Continue with Google</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialBtn}
                onPress={() => handleSocialLogin('GitHub')}
              >
                <Ionicons name="logo-github" size={20} color="#fff" />
                <Text style={styles.socialBtnText}>Continue with GitHub</Text>
              </TouchableOpacity>
            </View>

            {/* Sign Up Link */}
            <View style={styles.signupLink}>
              <Text style={styles.signupText}>
                Don't have an account?{' '}
                <Text 
                  style={styles.signupLinkText}
                  onPress={() => router.push('/signup')}
                >
                  Sign up now
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    top: height * 0.4,
    left: width * 0.1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  loginCard: {
    backgroundColor: 'rgba(30, 30, 45, 0.8)',
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  loginHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  loginLogo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginBottom: 16,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  gradientText: {
    color: '#6366f1',
  },
  loginSubtitle: {
    color: '#b4b4c8',
    fontSize: 15,
  },
  userTypeSelector: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  userTypeBtn: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    borderRadius: 12,
  },
  userTypeBtnActive: {
    backgroundColor: '#6366f1',
    borderColor: 'transparent',
  },
  userTypeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  userTypeText: {
    color: '#b4b4c8',
    fontWeight: '600',
    fontSize: 16,
  },
  userTypeTextActive: {
    color: '#ffffff',
  },
  loginForm: {
    marginBottom: 24,
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
  inputWithToggle: {
    paddingRight: 48,
  },
  togglePassword: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  formOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#6366f1',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: '#6366f1',
  },
  checkboxText: {
    color: '#b4b4c8',
    fontSize: 14,
  },
  forgotPassword: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '500',
  },
  btnPrimary: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  btnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
  },
  dividerText: {
    color: '#b4b4c8',
    fontSize: 14,
    marginHorizontal: 16,
  },
  socialLogin: {
    gap: 12,
    marginBottom: 24,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 14,
    backgroundColor: '#13131a',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    borderRadius: 12,
  },
  socialBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  signupLink: {
    alignItems: 'center',
  },
  signupText: {
    color: '#b4b4c8',
    fontSize: 15,
  },
  signupLinkText: {
    color: '#6366f1',
    fontWeight: '600',
  },
});
