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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/contexts/AuthContext';
import { secureStorage } from '@/services/secureStorage';

const { width, height } = Dimensions.get('window');

export default function StudentDashboardScreen() {
  const { logout, isAuthenticated, user, isTeacher } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const orb1Anim = useRef(new Animated.Value(0)).current;
  const orb2Anim = useRef(new Animated.Value(0)).current;
  const orb3Anim = useRef(new Animated.Value(0)).current;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Delay navigation to ensure component is fully mounted
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (isTeacher) {
        router.push('/teachers');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, isTeacher]);

  useEffect(() => {
    // Set loading to false once auth state is determined
    if (isAuthenticated !== undefined) {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

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

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#ffffff', fontSize: 18 }}>Loading...</Text>
      </View>
    );
  }

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
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.logoContainer}>
              <Image source={require('../assets/images/icon.png')} style={styles.logo} />
              <Text style={styles.brandName}>NerdZ</Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.notificationButton}>
                <Ionicons name="notifications-outline" size={24} color="#fff" />
                <View style={styles.notificationDot} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.settingsButton} onPress={() => router.push('/settings')}>
                <Ionicons name="settings-outline" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutButton} onPress={() => {
                Alert.alert(
                  'Logout',
                  'Are you sure you want to logout?',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'Logout',
                      style: 'destructive',
                      onPress: async () => {
                        try {
                          await logout();
                          // Small delay to ensure storage clearing completes
                          setTimeout(() => {
                            // Try router navigation first (works on mobile)
                            try {
                              router.replace('/login');
                            } catch (navError) {
                              // Fallback to direct navigation for web
                              if (typeof window !== 'undefined') {
                                window.location.href = '/login';
                              }
                            }
                          }, 100);
                        } catch (error) {
                          console.error('Logout error:', error);
                          Alert.alert('Error', 'Failed to logout');
                        }
                      },
                    },
                  ]
                );
              }}>
                <Ionicons name="log-out-outline" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.welcomeSection}>
            <Text style={styles.greeting}>
              Good Morning, <Text style={styles.userName}>Student</Text>! 👋
            </Text>
            <Text style={styles.subtitle}>Ready to make today productive?</Text>
          </View>

          <View style={styles.searchBox}>
            <Ionicons name="search-outline" size={20} color="#b4b4c8" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor="#b4b4c8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {[
            { icon: '🔥', value: '15 Days', label: 'Study Streak', trend: '+2 days', color: '#6366f1' },
            { icon: '⏱️', value: '4.5h', label: 'Today\'s Time', trend: '+30min', color: '#3b82f6' },
            { icon: '✅', value: '8/10', label: 'Tasks Done', trend: '2 left', color: '#10b981' },
            { icon: '📊', value: '92%', label: 'Avg Score', trend: '+5%', color: '#ec4899' },
          ].map((stat, index) => (
            <View key={index} style={[styles.statCard, { borderTopColor: stat.color }]}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <View style={styles.statInfo}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
              <Text style={styles.statTrend}>{stat.trend}</Text>
            </View>
          ))}
        </View>

        {/* Today's Schedule */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📅 Today's Schedule</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3 classes</Text>
            </View>
          </View>
          <View style={styles.scheduleList}>
            {[
              { time: 'Now', subject: 'Mathematics', topic: 'Linear Equations', progress: 75, status: 'ongoing' },
              { time: '11:30 AM', subject: 'Physics', topic: 'Newton\'s Laws', progress: 0, status: 'upcoming' },
              { time: '02:00 PM', subject: 'Chemistry', topic: 'Chemical Bonding', progress: 0, status: 'upcoming' },
            ].map((item, index) => (
              <View key={index} style={[styles.scheduleItem, item.status === 'ongoing' && styles.scheduleItemOngoing]}>
                <View style={[styles.timeBadge, item.status === 'ongoing' && styles.timeBadgeOngoing]}>
                  <Text style={[styles.timeText, item.status === 'ongoing' && styles.timeTextOngoing]}>
                    {item.time}
                  </Text>
                </View>
                <View style={styles.scheduleContent}>
                  <Text style={styles.scheduleSubject}>{item.subject}</Text>
                  <Text style={styles.scheduleTopic}>{item.topic}</Text>
                  {item.progress > 0 && (
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Assignments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📝 Pending Assignments</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3 due soon</Text>
            </View>
          </View>
          <View style={styles.assignmentsList}>
            {[
              { subject: 'Math', title: 'Algebra Problem Set', dueDate: 'Tomorrow', priority: 'high' },
              { subject: 'Physics', title: 'Lab Report', dueDate: '3 days', priority: 'medium' },
              { subject: 'English', title: 'Essay Writing', dueDate: '5 days', priority: 'low' },
            ].map((assignment, index) => (
              <View key={index} style={styles.assignmentCard}>
                <View style={[styles.priorityIndicator, styles[`priority${assignment.priority.charAt(0).toUpperCase() + assignment.priority.slice(1)}`]]} />
                <View style={styles.assignmentContent}>
                  <Text style={styles.assignmentSubject}>{assignment.subject}</Text>
                  <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                  <Text style={styles.assignmentDue}>Due: {assignment.dueDate}</Text>
                </View>
                <TouchableOpacity style={styles.assignmentButton}>
                  <Ionicons name="arrow-forward" size={20} color="#6366f1" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚡ Quick Actions</Text>
          <View style={styles.quickActions}>
            {[
              { icon: 'book-outline', label: 'Study Materials', color: '#6366f1' },
              { icon: 'play-circle-outline', label: 'Video Lectures', color: '#ec4899' },
              { icon: 'help-circle-outline', label: 'AI Assistant', color: '#8b5cf6' },
              { icon: 'timer-outline', label: 'Pomodoro', color: '#10b981' },
            ].map((action, index) => (
              <TouchableOpacity key={index} style={styles.quickActionCard}>
                <View style={[styles.quickActionIcon, { backgroundColor: action.color + '20' }]}>
                  <Ionicons name={action.icon as any} size={28} color={action.color} />
                </View>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'rgba(19, 19, 26, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(99, 102, 241, 0.2)',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 8,
    marginRight: 10,
  },
  brandName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  notificationButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(30, 30, 45, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    position: 'relative',
  },
  settingsButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.4)',
  },
  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
  },
  logoutButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
  welcomeSection: {
    marginBottom: 16,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  userName: {
    color: '#6366f1',
  },
  subtitle: {
    fontSize: 15,
    color: '#b4b4c8',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#13131a',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: 'rgba(30, 30, 45, 0.6)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    borderTopWidth: 3,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statInfo: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#b4b4c8',
  },
  statTrend: {
    fontSize: 12,
    color: '#10b981',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  badge: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  scheduleList: {
    gap: 12,
  },
  scheduleItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(30, 30, 45, 0.6)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    gap: 12,
  },
  scheduleItemOngoing: {
    borderColor: '#10b981',
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
  },
  timeBadge: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  timeBadgeOngoing: {
    backgroundColor: '#10b981',
  },
  timeText: {
    color: '#6366f1',
    fontSize: 13,
    fontWeight: '600',
  },
  timeTextOngoing: {
    color: '#ffffff',
  },
  scheduleContent: {
    flex: 1,
  },
  scheduleSubject: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  scheduleTopic: {
    fontSize: 14,
    color: '#b4b4c8',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
  },
  assignmentsList: {
    gap: 12,
  },
  assignmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 30, 45, 0.6)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    gap: 12,
    position: 'relative',
  },
  priorityIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  priorityHigh: {
    backgroundColor: '#ef4444',
  },
  priorityMedium: {
    backgroundColor: '#f59e0b',
  },
  priorityLow: {
    backgroundColor: '#10b981',
  },
  assignmentContent: {
    flex: 1,
    paddingLeft: 8,
  },
  assignmentSubject: {
    fontSize: 12,
    color: '#6366f1',
    fontWeight: '600',
    marginBottom: 4,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  assignmentDue: {
    fontSize: 13,
    color: '#b4b4c8',
  },
  assignmentButton: {
    padding: 8,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
  },
  quickActionCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: 'rgba(30, 30, 45, 0.6)',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickActionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
});
