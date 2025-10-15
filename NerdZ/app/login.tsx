import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const { colors } = useTheme();
  const { login, isLoading, user } = useAuth();
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Animated values for background orbs
  const orb1X = useSharedValue(0);
  const orb1Y = useSharedValue(0);
  const orb2X = useSharedValue(0);
  const orb2Y = useSharedValue(0);
  const orb3X = useSharedValue(0);
  const orb3Y = useSharedValue(0);

  useEffect(() => {
    // Animate orbs
    const animateOrb = (x: any, y: any, delay: number) => {
      setTimeout(() => {
        const sequence = withSequence(
          withTiming(50, { duration: 8000 }),
          withTiming(-30, { duration: 8000 }),
          withTiming(70, { duration: 8000 }),
          withTiming(0, { duration: 8000 })
        );
        x.value = withRepeat(sequence, -1);

        const ySequence = withSequence(
          withTiming(50, { duration: 8000 }),
          withTiming(80, { duration: 8000 }),
          withTiming(-50, { duration: 8000 }),
          withTiming(0, { duration: 8000 })
        );
        y.value = withRepeat(ySequence, -1);
      }, delay);
    };

    animateOrb(orb1X, orb1Y, 0);
    animateOrb(orb2X, orb2Y, 2000);
    animateOrb(orb3X, orb3Y, 4000);
  }, []);

  const orb1AnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: orb1X.value },
      { translateY: orb1Y.value },
      { scale: 1.1 }
    ],
  }));

  const orb2AnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: orb2X.value },
      { translateY: orb2Y.value },
      { scale: 0.9 }
    ],
  }));

  const orb3AnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: orb3X.value },
      { translateY: orb3Y.value },
      { scale: 1.05 }
    ],
  }));

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await login({ email, password });
      Alert.alert('Success', 'Login successful!');

      // TODO: Use rememberMe state for persistent sessions if needed
      console.log('Remember me:', rememberMe);

      // Redirect based on user role
      if (user?.is_teacher) {
        router.replace('/teachers');
      } else {
        router.replace('/student-dashboard');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Login failed');
    }
  };

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
    loginContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingTop: 80,
      paddingBottom: 40,
    },
    loginCard: {
      backgroundColor: 'rgba(30, 30, 45, 0.8)',
      borderRadius: 24,
      padding: 32,
      borderWidth: 1,
      borderColor: 'rgba(99, 102, 241, 0.2)',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.3,
      shadowRadius: 32,
      elevation: 20,
    },
    loginHeader: {
      alignItems: 'center',
      marginBottom: 32,
    },
    loginLogo: {
      width: 80,
      height: 80,
      borderRadius: 20,
      marginBottom: 20,
    },
    loginTitle: {
      fontSize: 32,
      fontWeight: '700',
      color: '#ffffff',
      textAlign: 'center',
      marginBottom: 8,
    },
    gradientText: {
      color: '#6366f1',
    },
    loginSubtitle: {
      fontSize: 16,
      color: '#b4b4c8',
      textAlign: 'center',
    },
    userTypeSelector: {
      flexDirection: 'row',
      backgroundColor: 'rgba(19, 19, 26, 0.6)',
      borderRadius: 16,
      padding: 4,
      marginBottom: 32,
      borderWidth: 1,
      borderColor: 'rgba(99, 102, 241, 0.2)',
    },
    userTypeBtn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      paddingVertical: 12,
      borderRadius: 12,
    },
    userTypeBtnActive: {
      backgroundColor: '#6366f1',
    },
    userTypeIcon: {
      fontSize: 20,
    },
    userTypeText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#b4b4c8',
    },
    userTypeTextActive: {
      color: '#ffffff',
    },
    loginForm: {
      marginBottom: 24,
    },
    formGroup: {
      marginBottom: 24,
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
      backgroundColor: '#13131a',
      borderWidth: 1,
      borderColor: 'rgba(99, 102, 241, 0.2)',
      borderRadius: 12,
      paddingHorizontal: 16,
    },
    inputIcon: {
      marginRight: 12,
    },
    input: {
      flex: 1,
      paddingVertical: 14,
      color: '#ffffff',
      fontSize: 16,
    },
    togglePassword: {
      padding: 8,
      marginLeft: 8,
    },
    formOptions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
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
    checkboxChecked: {
      backgroundColor: '#6366f1',
    },
    checkboxText: {
      color: '#b4b4c8',
      fontSize: 14,
    },
    forgotPassword: {
      color: '#6366f1',
      fontSize: 14,
      fontWeight: '600',
    },
    btn: {
      borderRadius: 12,
      overflow: 'hidden',
      marginBottom: 16,
    },
    btnGradient: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
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
      fontWeight: '600',
      marginHorizontal: 16,
      textTransform: 'uppercase',
    },
    socialLogin: {
      gap: 12,
      marginBottom: 24,
    },
    socialBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 12,
      gap: 12,
      borderWidth: 1,
      borderColor: 'rgba(99, 102, 241, 0.2)',
      backgroundColor: 'rgba(30, 30, 45, 0.6)',
    },
    socialBtnText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#ffffff',
    },
    signupLink: {
      alignItems: 'center',
    },
    signupText: {
      fontSize: 14,
      color: '#b4b4c8',
    },
    signupLinkText: {
      color: '#6366f1',
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.gradientBg}>
        <Animated.View style={[styles.gradientOrb, styles.orb1, orb1AnimatedStyle]}>
          <LinearGradient colors={['#6366f1', '#6366f1']} style={styles.orbGradient} />
        </Animated.View>
        <Animated.View style={[styles.gradientOrb, styles.orb2, orb2AnimatedStyle]}>
          <LinearGradient colors={['#ec4899', '#ec4899']} style={styles.orbGradient} />
        </Animated.View>
        <Animated.View style={[styles.gradientOrb, styles.orb3, orb3AnimatedStyle]}>
          <LinearGradient colors={['#a855f7', '#a855f7']} style={styles.orbGradient} />
        </Animated.View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.loginContainer}>
          <View style={styles.loginCard}>
            <View style={styles.loginHeader}>
              <Text style={styles.loginTitle}>
                Welcome to <Text style={styles.gradientText}>NerdZ</Text>
              </Text>
              <Text style={styles.loginSubtitle}>Study Smarter, Not Harder</Text>
            </View>

            <View style={styles.loginForm}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Email Address</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="mail-outline" size={20} color="#b4b4c8" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#b4b4c8"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed-outline" size={20} color="#b4b4c8" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#b4b4c8"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.togglePassword}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#b4b4c8"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.formOptions}>
                <TouchableOpacity
                  style={styles.checkboxLabel}
                  onPress={() => setRememberMe(!rememberMe)}
                >
                  <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                    {rememberMe && <Ionicons name="checkmark" size={14} color="#fff" />}
                  </View>
                  <Text style={styles.checkboxText}>Remember me</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.btn}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={['#6366f1', '#a855f7', '#ec4899']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.btnGradient}
                >
                  <Text style={styles.btnText}>
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Text>
                  <Ionicons name="arrow-forward" size={20} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialLogin}>
              <TouchableOpacity style={styles.socialBtn} onPress={() => Alert.alert('Coming Soon', 'Google login coming soon!')}>
                <Ionicons name="logo-google" size={20} color="#4285F4" />
                <Text style={styles.socialBtnText}>Continue with Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn} onPress={() => Alert.alert('Coming Soon', 'GitHub login coming soon!')}>
                <Ionicons name="logo-github" size={20} color="#ffffff" />
                <Text style={styles.socialBtnText}>Continue with GitHub</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.signupLink}>
              <Text style={styles.signupText}>
                Don't have an account?{' '}
                <Text style={styles.signupLinkText} onPress={() => router.push('/signup')}>
                  Sign Up
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
