import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function SignupScreen() {
  const { colors } = useTheme();
  const { signup, isLoading, user } = useAuth();
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Profile fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

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

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword || !firstName || !lastName || !username) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    try {
      await signup({
        email,
        username: username,
        password,
        is_teacher: userType === 'teacher',
        firstName,
        lastName,
        bio
      });
      Alert.alert('Success', 'Account created successfully!');

      // Redirect based on user role
      if (user?.is_teacher) {
        router.replace('/teachers');
      } else {
        router.replace('/student-dashboard');
      }
    } catch (error: any) {
      console.log({
        email,
        username: username,
        password,
        is_teacher: userType === 'teacher',
        firstName,
        lastName,
        bio
      });
      console.error(error)
      Alert.alert('Error', error.message || 'Signup failed');
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
    signupLinkText: { color: '#6366f1', fontWeight: '600' },
    formSection: { marginBottom: 24 },
    formSectionTitle: { fontSize: 18, fontWeight: '600', color: '#ffffff', marginBottom: 16 },
    formRow: { flexDirection: 'row', gap: 16 },
    formLabel: { fontSize: 14, fontWeight: '600', color: '#ffffff', marginBottom: 8 },
    required: { color: '#ef4444' },
    formInput: { backgroundColor: '#1e1e2d', borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16, color: '#ffffff', fontSize: 16 },
    formTextarea: { minHeight: 80, textAlignVertical: 'top' },
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
                Join <Text style={styles.gradientText}>NerdZ</Text>
              </Text>
              <Text style={styles.loginSubtitle}>Create your account to get started</Text>
            </View>

            <View style={styles.userTypeSelector}>
              <TouchableOpacity
                style={[styles.userTypeBtn, userType === 'student' && styles.userTypeBtnActive]}
                onPress={() => setUserType('student')}
              >
                <Text style={styles.userTypeIcon}>🎓</Text>
                <Text style={[styles.userTypeText, userType === 'student' && styles.userTypeTextActive]}>
                  Student
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.userTypeBtn, userType === 'teacher' && styles.userTypeBtnActive]}
                onPress={() => setUserType('teacher')}
              >
                <Text style={styles.userTypeIcon}>👨‍🏫</Text>
                <Text style={[styles.userTypeText, userType === 'teacher' && styles.userTypeTextActive]}>
                  Teacher
                </Text>
              </TouchableOpacity>
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
                    placeholder="Create a password"
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

              <View style={styles.formGroup}>
                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed-outline" size={20} color="#b4b4c8" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm your password"
                    placeholderTextColor="#b4b4c8"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.togglePassword}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Ionicons
                      name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#b4b4c8"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.formSection}>
                <Text style={styles.formSectionTitle}>Profile Information</Text>

                <View style={styles.formRow}>
                  <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.formLabel}>First Name <Text style={styles.required}>*</Text></Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="Enter your first name"
                      placeholderTextColor="#b4b4c8"
                      value={firstName}
                      onChangeText={setFirstName}
                    />
                  </View>
                  <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.formLabel}>Last Name <Text style={styles.required}>*</Text></Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="Enter your last name"
                      placeholderTextColor="#b4b4c8"
                      value={lastName}
                      onChangeText={setLastName}
                    />
                  </View>
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Username <Text style={styles.required}>*</Text></Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Choose a unique username"
                    placeholderTextColor="#b4b4c8"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Bio</Text>
                  <TextInput
                    style={[styles.formInput, styles.formTextarea]}
                    placeholder="Tell us about yourself..."
                    placeholderTextColor="#b4b4c8"
                    value={bio}
                    onChangeText={setBio}
                    multiline
                    numberOfLines={3}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.btn}
                onPress={handleSignup}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={['#6366f1', '#a855f7', '#ec4899']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.btnGradient}
                >
                  <Text style={styles.btnText}>
                    {isLoading ? 'Creating Account...' : 'Create Account'}
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
              <TouchableOpacity style={styles.socialBtn} onPress={() => Alert.alert('Coming Soon', 'Google signup coming soon!')}>
                <Ionicons name="logo-google" size={20} color="#4285F4" />
                <Text style={styles.socialBtnText}>Continue with Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn} onPress={() => Alert.alert('Coming Soon', 'GitHub signup coming soon!')}>
                <Ionicons name="logo-github" size={20} color="#ffffff" />
                <Text style={styles.socialBtnText}>Continue with GitHub</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.signupLink}>
              <Text style={styles.signupText}>
                Already have an account?{' '}
                <Text style={styles.signupLinkText} onPress={() => router.push('/login')}>
                  Sign In
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
