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
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

type NotificationType = 'assignments' | 'grades' | 'announcements';

interface Notification {
  id: number;
  type: NotificationType;
  icon: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

export default function NotificationsScreen() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'assignments',
      icon: '📝',
      title: 'New Assignment: Math Calculus',
      message: 'Prof. Johnson has posted a new assignment for Chapter 5. Due date: Tomorrow at 11:59 PM',
      time: '5 minutes ago',
      unread: true,
    },
    {
      id: 2,
      type: 'grades',
      icon: '📊',
      title: 'Grade Updated: Physics Lab Report',
      message: 'You scored 88% on your Thermodynamics Lab Report. Great work!',
      time: '1 hour ago',
      unread: true,
    },
    {
      id: 3,
      type: 'announcements',
      icon: '📢',
      title: 'Class Schedule Change',
      message: 'Computer Science class has been moved from Room 101 to Lab 5 for tomorrow\'s session.',
      time: '3 hours ago',
      unread: true,
    },
    {
      id: 4,
      type: 'assignments',
      icon: '📝',
      title: 'Assignment Submitted Successfully',
      message: 'Your CS Project submission has been received. You\'ll be notified once it\'s graded.',
      time: 'Yesterday',
      unread: false,
    },
    {
      id: 5,
      type: 'grades',
      icon: '📊',
      title: 'New Grade Posted: Math Quiz #5',
      message: 'Your score: 95%. Excellent performance! You\'re in the top 10% of the class.',
      time: '6 hours ago',
      unread: true,
    },
    {
      id: 6,
      type: 'announcements',
      icon: '📢',
      title: 'Study Materials Available',
      message: 'Prof. Smith has uploaded new study materials for Physics Module 3.',
      time: '2 days ago',
      unread: false,
    },
  ]);

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

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
    Alert.alert('Success', 'All notifications marked as read');
  };

  const clearAll = () => {
    Alert.alert(
      'Clear All',
      'Are you sure you want to clear all notifications?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          onPress: () => setNotifications([]),
          style: 'destructive'
        },
      ]
    );
  };

  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = activeFilter === 'all' 
    ? notifications
    : activeFilter === 'unread'
    ? notifications.filter(n => n.unread)
    : notifications.filter(n => n.type === activeFilter);

  const getCount = (filter: string) => {
    if (filter === 'all') return notifications.length;
    if (filter === 'unread') return notifications.filter(n => n.unread).length;
    return notifications.filter(n => n.type === filter).length;
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

        <View style={styles.header}>
          <View>
            <Text style={styles.pageTitle}>
              Notifications <Text style={styles.gradientText}>Center</Text>
            </Text>
            <Text style={styles.pageSubtitle}>Stay updated with all your activities</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionButton} onPress={markAllRead}>
              <Ionicons name="checkmark-done" size={20} color="#b4b4c8" />
              <Text style={styles.actionButtonText}>Mark all read</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={clearAll}>
              <Ionicons name="trash-outline" size={20} color="#b4b4c8" />
              <Text style={styles.actionButtonText}>Clear all</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.tabs}
          contentContainerStyle={styles.tabsContent}
        >
          {[
            { key: 'all', label: 'All' },
            { key: 'unread', label: 'Unread' },
            { key: 'assignments', label: 'Assignments' },
            { key: 'grades', label: 'Grades' },
            { key: 'announcements', label: 'Announcements' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeFilter === tab.key && styles.tabActive]}
              onPress={() => setActiveFilter(tab.key)}
            >
              <Text style={[styles.tabText, activeFilter === tab.key && styles.tabTextActive]}>
                {tab.label}
              </Text>
              <View style={[styles.tabCount, getCount(tab.key) > 0 && tab.key === 'unread' && styles.tabCountNew]}>
                <Text style={styles.tabCountText}>{getCount(tab.key)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.notificationsList}>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <View key={notification.id} style={[styles.notificationItem, notification.unread && styles.notificationUnread]}>
                {notification.unread && <View style={styles.unreadIndicator} />}
                <Text style={styles.notificationIcon}>{notification.icon}</Text>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  <Text style={styles.notificationMessage}>{notification.message}</Text>
                  <View style={styles.notificationMeta}>
                    <Text style={styles.notificationTime}>{notification.time}</Text>
                    <Text style={styles.notificationCategory}>{notification.type}</Text>
                  </View>
                </View>
                <TouchableOpacity 
                  style={styles.dismissButton}
                  onPress={() => dismissNotification(notification.id)}
                >
                  <Ionicons name="close" size={20} color="#b4b4c8" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🔔</Text>
              <Text style={styles.emptyTitle}>No notifications</Text>
              <Text style={styles.emptyText}>You're all caught up! Check back later for updates.</Text>
            </View>
          )}
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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  gradientText: {
    color: '#6366f1',
  },
  pageSubtitle: {
    fontSize: 16,
    color: '#b4b4c8',
    marginBottom: 20,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(30, 30, 45, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    borderRadius: 12,
  },
  actionButtonText: {
    color: '#b4b4c8',
    fontSize: 14,
    fontWeight: '600',
  },
  tabs: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabsContent: {
    gap: 12,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(30, 30, 45, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    borderRadius: 12,
  },
  tabActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  tabText: {
    color: '#b4b4c8',
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#ffffff',
  },
  tabCount: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 24,
    alignItems: 'center',
  },
  tabCountNew: {
    backgroundColor: '#ef4444',
  },
  tabCountText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  notificationsList: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(30, 30, 45, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    position: 'relative',
  },
  notificationUnread: {
    borderColor: '#6366f1',
    backgroundColor: 'rgba(99, 102, 241, 0.05)',
  },
  unreadIndicator: {
    position: 'absolute',
    left: 8,
    top: '50%',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6366f1',
  },
  notificationIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 6,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#b4b4c8',
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  notificationTime: {
    fontSize: 12,
    color: '#b4b4c8',
  },
  notificationCategory: {
    fontSize: 12,
    color: '#6366f1',
    textTransform: 'capitalize',
  },
  dismissButton: {
    padding: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#b4b4c8',
    textAlign: 'center',
  },
});
