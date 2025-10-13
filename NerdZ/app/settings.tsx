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
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

type SettingsSection = 'profile' | 'account' | 'notifications' | 'appearance' | 'privacy' | 'preferences';

export default function SettingsScreen() {
  const [activeSection, setActiveSection] = useState<SettingsSection>('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    displayName: 'John Doe',
    bio: 'Physics and Mathematics Teacher with 10+ years of experience',
    phone: '+1 (555) 123-4567',
    dob: '1985-05-15',
    location: 'New York, USA',
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    submissions: true,
    reminders: true,
    messages: false,
    weeklySummary: true,
    pushNotifications: false,
    sound: true,
  });

  const [displaySettings, setDisplaySettings] = useState({
    compactMode: false,
    animations: true,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: true,
    onlineStatus: true,
    activityStatus: false,
  });

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

  const navItems = [
    { key: 'profile' as SettingsSection, icon: 'person-outline', label: 'Profile' },
    { key: 'account' as SettingsSection, icon: 'lock-closed-outline', label: 'Account' },
    { key: 'notifications' as SettingsSection, icon: 'notifications-outline', label: 'Notifications' },
    { key: 'appearance' as SettingsSection, icon: 'color-palette-outline', label: 'Appearance' },
    { key: 'privacy' as SettingsSection, icon: 'shield-outline', label: 'Privacy' },
    { key: 'preferences' as SettingsSection, icon: 'settings-outline', label: 'Preferences' },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Profile Settings</Text>
              <Text style={styles.sectionSubtitle}>Manage your public profile information</Text>
            </View>

            <View style={styles.card}>
              <View style={styles.profilePhotoSection}>
                <Image
                  source={{ uri: 'https://ui-avatars.com/api/?name=John+Doe&size=200&background=6366f1&color=fff' }}
                  style={styles.profilePhoto}
                />
                <View style={styles.photoActions}>
                  <TouchableOpacity style={styles.btnPrimary}>
                    <Text style={styles.btnText}>Change Photo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnSecondary}>
                    <Text style={styles.btnSecondaryText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Personal Information</Text>
              <View style={styles.formGroup}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={styles.input}
                  value={profileData.firstName}
                  onChangeText={(text) => setProfileData({ ...profileData, firstName: text })}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  value={profileData.lastName}
                  onChangeText={(text) => setProfileData({ ...profileData, lastName: text })}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Bio</Text>
                <TextInput
                  style={[styles.input, styles.textarea]}
                  value={profileData.bio}
                  onChangeText={(text) => setProfileData({ ...profileData, bio: text })}
                  multiline
                  numberOfLines={3}
                />
              </View>
              <TouchableOpacity style={styles.saveButton}>
                <LinearGradient
                  colors={['#6366f1', '#a855f7', '#ec4899']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.saveButtonGradient}
                >
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'account':
        return (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Account Settings</Text>
              <Text style={styles.sectionSubtitle}>Manage your account credentials</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Email Address</Text>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Current Email</Text>
                <TextInput
                  style={styles.input}
                  value="john.doe@example.com"
                  editable={false}
                />
              </View>
              <TouchableOpacity style={styles.saveButton}>
                <LinearGradient
                  colors={['#6366f1', '#a855f7', '#ec4899']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.saveButtonGradient}
                >
                  <Text style={styles.saveButtonText}>Update Email</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={[styles.card, styles.dangerCard]}>
              <Text style={styles.cardTitle}>Danger Zone</Text>
              <View style={styles.dangerItem}>
                <View style={styles.dangerInfo}>
                  <Text style={styles.dangerTitle}>Deactivate Account</Text>
                  <Text style={styles.dangerDesc}>Temporarily disable your account</Text>
                </View>
                <TouchableOpacity style={styles.btnDanger}>
                  <Text style={styles.btnText}>Deactivate</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.dangerItem}>
                <View style={styles.dangerInfo}>
                  <Text style={styles.dangerTitle}>Delete Account</Text>
                  <Text style={styles.dangerDesc}>Permanently delete your account</Text>
                </View>
                <TouchableOpacity style={styles.btnDanger}>
                  <Text style={styles.btnText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );

      case 'notifications':
        return (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Notification Preferences</Text>
              <Text style={styles.sectionSubtitle}>Control how you receive notifications</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Email Notifications</Text>
              {[
                { key: 'submissions', label: 'New Student Submissions', desc: 'Get notified when students submit work' },
                { key: 'reminders', label: 'Upcoming Tests Reminder', desc: 'Receive reminders about scheduled tests' },
                { key: 'messages', label: 'Student Messages', desc: 'Get emails when students send messages' },
                { key: 'weeklySummary', label: 'Weekly Summary', desc: 'Receive a weekly report of activities' },
              ].map((item) => (
                <View key={item.key} style={styles.toggleItem}>
                  <View style={styles.toggleInfo}>
                    <Text style={styles.toggleLabel}>{item.label}</Text>
                    <Text style={styles.toggleDesc}>{item.desc}</Text>
                  </View>
                  <Switch
                    value={notificationSettings[item.key as keyof typeof notificationSettings]}
                    onValueChange={(value) =>
                      setNotificationSettings({ ...notificationSettings, [item.key]: value })
                    }
                    trackColor={{ false: '#767577', true: '#6366f1' }}
                    thumbColor="#ffffff"
                  />
                </View>
              ))}
            </View>
          </View>
        );

      case 'appearance':
        return (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Appearance</Text>
              <Text style={styles.sectionSubtitle}>Customize how NerdZ looks</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Display Options</Text>
              {[
                { key: 'compactMode', label: 'Compact Mode', desc: 'Reduce spacing and make UI compact' },
                { key: 'animations', label: 'Animations', desc: 'Enable smooth animations' },
              ].map((item) => (
                <View key={item.key} style={styles.toggleItem}>
                  <View style={styles.toggleInfo}>
                    <Text style={styles.toggleLabel}>{item.label}</Text>
                    <Text style={styles.toggleDesc}>{item.desc}</Text>
                  </View>
                  <Switch
                    value={displaySettings[item.key as keyof typeof displaySettings]}
                    onValueChange={(value) =>
                      setDisplaySettings({ ...displaySettings, [item.key]: value })
                    }
                    trackColor={{ false: '#767577', true: '#6366f1' }}
                    thumbColor="#ffffff"
                  />
                </View>
              ))}
            </View>
          </View>
        );

      case 'privacy':
        return (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Privacy & Security</Text>
              <Text style={styles.sectionSubtitle}>Manage your privacy settings</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Two-Factor Authentication</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>Disabled</Text>
              </View>
              <Text style={styles.cardDesc}>Add an extra layer of security to your account</Text>
              <TouchableOpacity style={styles.saveButton}>
                <LinearGradient
                  colors={['#6366f1', '#a855f7', '#ec4899']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.saveButtonGradient}
                >
                  <Text style={styles.saveButtonText}>Enable 2FA</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Privacy Settings</Text>
              {[
                { key: 'profileVisibility', label: 'Profile Visibility', desc: 'Allow students to view your profile' },
                { key: 'onlineStatus', label: 'Show Online Status', desc: 'Let students see when you\'re online' },
                { key: 'activityStatus', label: 'Activity Status', desc: 'Share your activity status' },
              ].map((item) => (
                <View key={item.key} style={styles.toggleItem}>
                  <View style={styles.toggleInfo}>
                    <Text style={styles.toggleLabel}>{item.label}</Text>
                    <Text style={styles.toggleDesc}>{item.desc}</Text>
                  </View>
                  <Switch
                    value={privacySettings[item.key as keyof typeof privacySettings]}
                    onValueChange={(value) =>
                      setPrivacySettings({ ...privacySettings, [item.key]: value })
                    }
                    trackColor={{ false: '#767577', true: '#6366f1' }}
                    thumbColor="#ffffff"
                  />
                </View>
              ))}
            </View>
          </View>
        );

      case 'preferences':
        return (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Preferences</Text>
              <Text style={styles.sectionSubtitle}>Customize your experience</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Language & Region</Text>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Language</Text>
                <View style={styles.selectWrapper}>
                  <Text style={styles.selectText}>English (US)</Text>
                  <Ionicons name="chevron-down" size={20} color="#b4b4c8" />
                </View>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Timezone</Text>
                <View style={styles.selectWrapper}>
                  <Text style={styles.selectText}>EST - Eastern Time</Text>
                  <Ionicons name="chevron-down" size={20} color="#b4b4c8" />
                </View>
              </View>
              <TouchableOpacity style={styles.saveButton}>
                <LinearGradient
                  colors={['#6366f1', '#a855f7', '#ec4899']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.saveButtonGradient}
                >
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

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

      <View style={styles.nav}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/icon.png')} style={styles.logo} />
          <Text style={styles.brandName}>NerdZ</Text>
        </View>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.sidebar}
          contentContainerStyle={styles.sidebarContent}
        >
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={[styles.navItem, activeSection === item.key && styles.navItemActive]}
              onPress={() => setActiveSection(item.key)}
            >
              <Ionicons 
                name={item.icon as any} 
                size={20} 
                color={activeSection === item.key ? '#ffffff' : '#b4b4c8'} 
              />
              <Text style={[styles.navItemText, activeSection === item.key && styles.navItemTextActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {renderSection()}
        </ScrollView>
      </View>
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
  mainContent: {
    flex: 1,
  },
  sidebar: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    maxHeight: 80,
  },
  sidebarContent: {
    gap: 12,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(30, 30, 45, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    borderRadius: 12,
  },
  navItemActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  navItemText: {
    color: '#b4b4c8',
    fontSize: 16,
    fontWeight: '600',
  },
  navItemTextActive: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionHeader: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#b4b4c8',
  },
  card: {
    backgroundColor: 'rgba(30, 30, 45, 0.6)',
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  cardDesc: {
    fontSize: 14,
    color: '#b4b4c8',
    marginBottom: 16,
  },
  profilePhotoSection: {
    alignItems: 'center',
    gap: 16,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  photoActions: {
    flexDirection: 'row',
    gap: 12,
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
  input: {
    backgroundColor: '#13131a',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: '#ffffff',
    fontSize: 16,
  },
  textarea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  selectWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#13131a',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  selectText: {
    color: '#ffffff',
    fontSize: 16,
  },
  toggleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(99, 102, 241, 0.1)',
  },
  toggleInfo: {
    flex: 1,
    marginRight: 16,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  toggleDesc: {
    fontSize: 13,
    color: '#b4b4c8',
  },
  saveButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },
  saveButtonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  btnPrimary: {
    backgroundColor: '#6366f1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(99, 102, 241, 0.3)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  btnDanger: {
    backgroundColor: '#ef4444',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  btnSecondaryText: {
    color: '#b4b4c8',
    fontSize: 14,
    fontWeight: '600',
  },
  dangerCard: {
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  dangerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(239, 68, 68, 0.1)',
  },
  dangerInfo: {
    flex: 1,
    marginRight: 16,
  },
  dangerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  dangerDesc: {
    fontSize: 13,
    color: '#b4b4c8',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  statusBadgeText: {
    color: '#ef4444',
    fontSize: 12,
    fontWeight: '600',
  },
});
