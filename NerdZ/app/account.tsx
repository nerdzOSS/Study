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
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function AccountScreen() {
  // State for forms
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  
  // State for UI
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

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

  const handleResetPassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill all password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    setIsResettingPassword(true);
    // Simulate API call
    setTimeout(() => {
      setIsResettingPassword(false);
      Alert.alert('Success', 'Password reset successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 2000);
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    setIsSendingEmail(true);
    // Simulate API call
    setTimeout(() => {
      setIsSendingEmail(false);
      Alert.alert('Success', 'Reset link sent to your email');
      setResetEmail('');
    }, 2000);
  };

  const handleLogout = () => {
    Alert.alert(
      'Go Back',
      'Return to home screen?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Go Home', 
          onPress: () => router.replace('/'),
          style: 'default'
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText !== 'DELETE') {
      Alert.alert('Error', 'Please type DELETE to confirm');
      return;
    }

    Alert.alert(
      'Demo Mode',
      'Account deletion is not available in demo mode',
      [{ text: 'OK' }]
    );
    setShowDeleteModal(false);
    setDeleteConfirmText('');
  };

  const handleLogoutAllDevices = () => {
    Alert.alert(
      'Logout All Devices',
      'Are you sure you want to logout from all devices?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout All', 
          onPress: () => Alert.alert('Success', 'Logged out from all devices'),
          style: 'destructive'
        },
      ]
    );
  };

  const handleEnable2FA = () => {
    Alert.alert(
      'Enable 2FA',
      'Two-factor authentication will be enabled for your account',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Enable', 
          onPress: () => Alert.alert('Success', '2FA enabled successfully')
        },
      ]
    );
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
            <Image source={require('../assets/images/icon.png')} style={styles.logo} />
            <Text style={styles.brandName}>NerdZ</Text>
          </View>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.pageTitle}>
            Account <Text style={styles.gradientText}>Management</Text>
          </Text>
          <Text style={styles.pageSubtitle}>Manage your account settings and security</Text>
        </View>

        <View style={styles.accountGrid}>
          {/* Reset Password Card */}
          <View style={styles.accountCard}>
            <Text style={styles.cardIcon}>🔒</Text>
            <Text style={styles.cardTitle}>Reset Password</Text>
            <Text style={styles.cardDescription}>Update your password to keep your account secure</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Current Password</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color="#b4b4c8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter current password"
                  placeholderTextColor="#b4b4c8"
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>New Password</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color="#b4b4c8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter new password"
                  placeholderTextColor="#b4b4c8"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Confirm New Password</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color="#b4b4c8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm new password"
                  placeholderTextColor="#b4b4c8"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.btn, styles.btnPrimary]} 
              onPress={handleResetPassword}
              disabled={isResettingPassword}
            >
              <LinearGradient
                colors={['#6366f1', '#a855f7', '#ec4899']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.btnGradient}
              >
                <Text style={styles.btnText}>
                  {isResettingPassword ? 'Updating...' : 'Reset Password'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Forgot Password Card */}
          <View style={styles.accountCard}>
            <Text style={styles.cardIcon}>📧</Text>
            <Text style={styles.cardTitle}>Forgot Password</Text>
            <Text style={styles.cardDescription}>Send a password reset link to your email</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color="#b4b4c8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#b4b4c8"
                  value={resetEmail}
                  onChangeText={setResetEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.btn, styles.btnPrimary]} 
              onPress={handleForgotPassword}
              disabled={isSendingEmail}
            >
              <LinearGradient
                colors={['#6366f1', '#a855f7', '#ec4899']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.btnGradient}
              >
                <Text style={styles.btnText}>
                  {isSendingEmail ? 'Sending...' : 'Send Reset Link'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Logout Card */}
          <View style={styles.accountCard}>
            <Text style={styles.cardIcon}>🚪</Text>
            <Text style={styles.cardTitle}>Logout</Text>
            <Text style={styles.cardDescription}>Sign out of your account on this device</Text>
            
            <View style={styles.actionInfo}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Current Session</Text>
                <Text style={styles.infoValue}>user@example.com</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Login Time</Text>
                <Text style={styles.infoValue}>Today at 9:30 AM</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.btn, styles.btnDanger]} 
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={20} color="#fff" />
              <Text style={styles.btnText}>Logout from Account</Text>
            </TouchableOpacity>
          </View>

          {/* Delete Account Card */}
          <View style={[styles.accountCard, styles.dangerCard]}>
            <Text style={styles.cardIcon}>⚠️</Text>
            <Text style={styles.cardTitle}>Delete Account</Text>
            <Text style={styles.cardDescription}>Permanently delete your account and all data</Text>
            
            <View style={styles.warningBox}>
              <Ionicons name="warning-outline" size={20} color="#ef4444" />
              <View style={styles.warningText}>
                <Text style={styles.warningStrong}>Warning:</Text>
                <Text style={styles.warningDesc}> This action cannot be undone. All your data will be permanently deleted.</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.btn, styles.btnDanger]} 
              onPress={() => setShowDeleteModal(true)}
            >
              <Ionicons name="trash-outline" size={20} color="#fff" />
              <Text style={styles.btnText}>Delete My Account</Text>
            </TouchableOpacity>
          </View>

          {/* Active Sessions Card */}
          <View style={styles.accountCard}>
            <Text style={styles.cardIcon}>🔐</Text>
            <Text style={styles.cardTitle}>Active Sessions</Text>
            <Text style={styles.cardDescription}>Manage devices where you're logged in</Text>
            
            <View style={styles.sessionsList}>
              <View style={[styles.sessionItem, styles.currentSession]}>
                <View style={styles.sessionInfo}>
                  <Ionicons name="desktop-outline" size={20} color="#b4b4c8" />
                  <View style={styles.sessionDetails}>
                    <Text style={styles.sessionName}>Windows PC</Text>
                    <Text style={styles.sessionMeta}>Current device • Chrome</Text>
                  </View>
                </View>
                <View style={styles.sessionBadge}>
                  <Text style={styles.sessionBadgeText}>Active</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.btn, styles.btnSecondary]} 
              onPress={handleLogoutAllDevices}
            >
              <Text style={[styles.btnText, styles.btnSecondaryText]}>Logout All Devices</Text>
            </TouchableOpacity>
          </View>

          {/* Two-Factor Authentication Card */}
          <View style={styles.accountCard}>
            <Text style={styles.cardIcon}>🛡️</Text>
            <Text style={styles.cardTitle}>Two-Factor Authentication</Text>
            <Text style={styles.cardDescription}>Add an extra layer of security to your account</Text>
            
            <View style={styles.featureStatus}>
              <Ionicons name="close-circle-outline" size={20} color="#ef4444" />
              <Text style={styles.featureStatusText}>Disabled</Text>
            </View>

            <TouchableOpacity 
              style={[styles.btn, styles.btnSecondary]} 
              onPress={handleEnable2FA}
            >
              <Text style={[styles.btnText, styles.btnSecondaryText]}>Enable Two-Factor Authentication</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Delete Account Modal */}
      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>⚠️ Confirm Account Deletion</Text>
              <TouchableOpacity onPress={() => setShowDeleteModal(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalBody}>
              <View style={styles.dangerMessage}>
                <Ionicons name="warning" size={48} color="#ef4444" />
                <Text style={styles.dangerTitle}>This action is permanent and cannot be undone</Text>
                <Text style={styles.dangerText}>
                  All your data including courses, assignments, grades, and notes will be permanently deleted.
                </Text>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Type "DELETE" to confirm</Text>
                <TextInput
                  style={[styles.input, styles.dangerInput]}
                  placeholder="DELETE"
                  placeholderTextColor="#b4b4c8"
                  value={deleteConfirmText}
                  onChangeText={setDeleteConfirmText}
                  autoCapitalize="characters"
                />
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity 
                  style={[styles.btn, styles.btnSecondary, styles.modalBtn]} 
                  onPress={() => {
                    setShowDeleteModal(false);
                    setDeleteConfirmText('');
                  }}
                >
                  <Text style={[styles.btnText, styles.btnSecondaryText]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.btn, styles.btnDanger, styles.modalBtn]}
                  onPress={handleDeleteAccount}
                  disabled={deleteConfirmText !== 'DELETE'}
                >
                  <Text style={[styles.btnText, deleteConfirmText !== 'DELETE' && styles.btnDisabled]}>
                    Delete My Account
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  gradientText: {
    color: '#6366f1',
  },
  pageSubtitle: {
    fontSize: 16,
    color: '#b4b4c8',
    textAlign: 'center',
  },
  accountGrid: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 20,
  },
  accountCard: {
    backgroundColor: 'rgba(30, 30, 45, 0.6)',
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  dangerCard: {
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  cardIcon: {
    fontSize: 36,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#b4b4c8',
    marginBottom: 20,
    lineHeight: 22,
  },
  formGroup: {
    marginBottom: 16,
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
  dangerInput: {
    borderColor: 'rgba(239, 68, 68, 0.3)',
    paddingLeft: 16,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
    marginTop: 8,
  },
  btnPrimary: {
    overflow: 'hidden',
  },
  btnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    gap: 8,
    width: '100%',
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  btnDanger: {
    backgroundColor: '#ef4444',
  },
  btnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  btnSecondaryText: {
    color: '#b4b4c8',
  },
  btnDisabled: {
    opacity: 0.5,
  },
  actionInfo: {
    backgroundColor: 'rgba(99, 102, 241, 0.05)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#b4b4c8',
  },
  infoValue: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  warningBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
    marginBottom: 16,
    gap: 12,
  },
  warningText: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  warningStrong: {
    color: '#ef4444',
    fontWeight: '700',
    fontSize: 14,
  },
  warningDesc: {
    color: '#b4b4c8',
    fontSize: 14,
    lineHeight: 20,
  },
  sessionsList: {
    marginBottom: 16,
  },
  sessionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(99, 102, 241, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  currentSession: {
    borderColor: '#10b981',
  },
  sessionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  sessionDetails: {
    flex: 1,
  },
  sessionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  sessionMeta: {
    fontSize: 13,
    color: '#b4b4c8',
  },
  sessionBadge: {
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sessionBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  featureStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 12,
    marginBottom: 16,
  },
  featureStatusText: {
    color: '#ef4444',
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'rgba(30, 30, 45, 0.95)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    width: '100%',
    maxWidth: 500,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(99, 102, 241, 0.2)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    flex: 1,
  },
  modalBody: {
    padding: 24,
  },
  dangerMessage: {
    alignItems: 'center',
    marginBottom: 24,
  },
  dangerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  dangerText: {
    fontSize: 14,
    color: '#b4b4c8',
    textAlign: 'center',
    lineHeight: 22,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  modalBtn: {
    flex: 1,
  },
});
