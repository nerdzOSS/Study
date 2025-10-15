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
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/contexts/AuthContext';
import { secureStorage } from '@/services/secureStorage';

const { width, height } = Dimensions.get('window');

interface Content {
  id: number;
  type: 'notes' | 'materials';
  subject: string;
  title: string;
  description: string;
  classTag: string;
  views: number;
  downloads: number;
  uploadDate: string;
  fileSize: string;
  icon: string;
}

export default function TeachersScreen() {
  const { logout, isAuthenticated, user, isTeacher, isStudent } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [contentTitle, setContentTitle] = useState('');
  const [contentDesc, setContentDesc] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const orb1Anim = useRef(new Animated.Value(0)).current;
  const orb2Anim = useRef(new Animated.Value(0)).current;
  const orb3Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Delay navigation to ensure component is fully mounted
    const timer = setTimeout(() => {
      if (isAuthenticated === false) {
        router.push('/login');
      } else if (isAuthenticated === true && isStudent) {
        router.push('/student-dashboard');
      } else if (isAuthenticated === true && !isStudent) {
        // Stay on teachers screen - we're already here
        setIsLoading(false);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, isStudent]);

  useEffect(() => {
    // Set loading to false once auth state is determined
    if (isAuthenticated !== undefined) {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const [contents, setContents] = useState<Content[]>([
    {
      id: 1,
      type: 'notes',
      subject: 'physics',
      title: 'Thermodynamics Chapter Notes',
      description: 'Complete notes for chapters 5-7 covering heat transfer and entropy',
      classTag: 'Class 12-A',
      views: 245,
      downloads: 89,
      uploadDate: '3 days ago',
      fileSize: '2.4 MB',
      icon: '📄',
    },
    {
      id: 2,
      type: 'materials',
      subject: 'mathematics',
      title: 'Calculus Practice Problems',
      description: '200+ solved problems with step-by-step solutions',
      classTag: 'Class 12-B',
      views: 412,
      downloads: 156,
      uploadDate: '1 week ago',
      fileSize: '5.8 MB',
      icon: '📊',
    },
    {
      id: 3,
      type: 'notes',
      subject: 'chemistry',
      title: 'Organic Chemistry Reactions',
      description: 'Key reactions and mechanisms with examples',
      classTag: 'Class 11-A',
      views: 198,
      downloads: 72,
      uploadDate: '2 days ago',
      fileSize: '1.9 MB',
      icon: '🧪',
    },
  ]);

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

  const filteredContents = contents.filter(content => {
    const matchesTab = activeTab === 'all' || content.type === activeTab;
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || content.subject === subjectFilter;
    return matchesTab && matchesSearch && matchesSubject;
  });

  const handleDelete = (id: number) => {
    Alert.alert(
      'Delete Content',
      'Are you sure you want to delete this content?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setContents(contents.filter(c => c.id !== id));
            Alert.alert('Success', 'Content deleted successfully');
          },
        },
      ]
    );
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
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
  };

  const handleUpload = () => {
    if (!contentTitle.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }
    Alert.alert('Success', 'Content uploaded successfully!');
    setUploadModalVisible(false);
    setContentTitle('');
    setContentDesc('');
  };

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
        <View style={styles.nav}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/images/icon.png')} style={styles.logo} />
            <Text style={styles.brandName}>NerdZ</Text>
          </View>
          <View style={styles.navActions}>
            <TouchableOpacity style={styles.navButton} onPress={() => router.push('/settings')}>
              <Ionicons name="settings-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.navButton, { backgroundColor: 'rgba(239, 68, 68, 0.2)', borderColor: 'rgba(239, 68, 68, 0.4)' }]} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.welcomeSection}>
          <View style={styles.welcomeContent}>
            <Text style={styles.pageTitle}>
              Content <Text style={styles.gradientText}>Dashboard</Text>
            </Text>
            <Text style={styles.pageSubtitle}>Upload and manage study materials for students</Text>
            <View style={styles.teacherBadge}>
              <Ionicons name="people-outline" size={20} color="#6366f1" />
              <Text style={styles.teacherBadgeText}>Content Provider</Text>
            </View>
          </View>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.btnPrimary} 
              onPress={() => setUploadModalVisible(true)}
            >
              <Ionicons name="cloud-upload-outline" size={20} color="#fff" />
              <Text style={styles.btnText}>Upload Notes</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.btnSecondary}
              onPress={() => setUploadModalVisible(true)}
            >
              <Ionicons name="document-outline" size={20} color="#b4b4c8" />
              <Text style={styles.btnSecondaryText}>Upload Material</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statsGrid}>
          {[
            { icon: '📚', label: 'Total Uploads', value: '42', trend: '↑ 8 this week', color: '#6366f1' },
            { icon: '👁️', label: 'Total Views', value: '1,248', trend: '↑ 124 today', color: '#3b82f6' },
            { icon: '⬇️', label: 'Total Downloads', value: '856', trend: '↑ 67 this week', color: '#10b981' },
            { icon: '🎓', label: 'Active Students', value: '156', trend: 'Across 4 classes', color: '#ec4899' },
          ].map((stat, index) => (
            <View key={index} style={[styles.statCard, { borderTopColor: stat.color }]}>
              <View style={styles.statContent}>
                <View style={styles.statInfo}>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statTrend}>{stat.trend}</Text>
                </View>
                <Text style={styles.statIcon}>{stat.icon}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.contentTabs}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll}>
            {[
              { key: 'all', icon: 'folder-outline', label: 'All Content', count: contents.length },
              { key: 'notes', icon: 'document-text-outline', label: 'Notes', count: contents.filter(c => c.type === 'notes').length },
              { key: 'materials', icon: 'book-outline', label: 'Materials', count: contents.filter(c => c.type === 'materials').length },
            ].map(tab => (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tabBtn, activeTab === tab.key && styles.tabBtnActive]}
                onPress={() => setActiveTab(tab.key)}
              >
                <Ionicons 
                  name={tab.icon as any} 
                  size={20} 
                  color={activeTab === tab.key ? '#fff' : '#b4b4c8'} 
                />
                <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
                  {tab.label}
                </Text>
                <View style={styles.tabCount}>
                  <Text style={styles.tabCountText}>{tab.count}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.searchFilter}>
            <View style={styles.searchBox}>
              <Ionicons name="search-outline" size={18} color="#b4b4c8" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search content..."
                placeholderTextColor="#b4b4c8"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <TouchableOpacity 
              style={styles.filterButton}
              onPress={() => {
                Alert.alert('Filter by Subject', '', [
                  { text: 'All', onPress: () => setSubjectFilter('all') },
                  { text: 'Physics', onPress: () => setSubjectFilter('physics') },
                  { text: 'Mathematics', onPress: () => setSubjectFilter('mathematics') },
                  { text: 'Chemistry', onPress: () => setSubjectFilter('chemistry') },
                ]);
              }}
            >
              <Text style={styles.filterButtonText}>
                {subjectFilter === 'all' ? 'All Subjects' : subjectFilter.charAt(0).toUpperCase() + subjectFilter.slice(1)}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#b4b4c8" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentGrid}>
          {filteredContents.length > 0 ? (
            filteredContents.map(content => (
              <View key={content.id} style={styles.contentCard}>
                <View style={styles.contentCardHeader}>
                  <View style={[styles.typeBadge, content.type === 'notes' ? styles.notesBadge : styles.materialBadge]}>
                    <Ionicons 
                      name={content.type === 'notes' ? 'document-text-outline' : 'book-outline'} 
                      size={14} 
                      color="#fff" 
                    />
                    <Text style={styles.typeBadgeText}>
                      {content.type === 'notes' ? 'Notes' : 'Material'}
                    </Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.menuBtn}
                    onPress={() => {
                      Alert.alert('Actions', 'Choose an action', [
                        { text: 'Edit', onPress: () => Alert.alert('Edit', 'Edit feature coming soon') },
                        { text: 'Download', onPress: () => Alert.alert('Download', 'Downloading...') },
                        { text: 'Delete', onPress: () => handleDelete(content.id), style: 'destructive' },
                        { text: 'Cancel', style: 'cancel' },
                      ]);
                    }}
                  >
                    <Ionicons name="ellipsis-vertical" size={20} color="#b4b4c8" />
                  </TouchableOpacity>
                </View>
                <View style={styles.contentCardBody}>
                  <Text style={styles.fileIcon}>{content.icon}</Text>
                  <Text style={styles.contentTitle}>{content.title}</Text>
                  <Text style={styles.contentDescription}>{content.description}</Text>
                  <View style={styles.contentMeta}>
                    <View style={styles.subjectTag}>
                      <Text style={styles.subjectTagText}>{content.subject}</Text>
                    </View>
                    <View style={styles.classTag}>
                      <Text style={styles.classTagText}>{content.classTag}</Text>
                    </View>
                  </View>
                  <View style={styles.contentStats}>
                    <View style={styles.statItem}>
                      <Ionicons name="eye-outline" size={14} color="#b4b4c8" />
                      <Text style={styles.statItemText}>{content.views} views</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Ionicons name="download-outline" size={14} color="#b4b4c8" />
                      <Text style={styles.statItemText}>{content.downloads} downloads</Text>
                    </View>
                  </View>
                  <View style={styles.uploadInfo}>
                    <Text style={styles.uploadDate}>Uploaded {content.uploadDate}</Text>
                    <Text style={styles.fileSize}>{content.fileSize}</Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📂</Text>
              <Text style={styles.emptyTitle}>No content found</Text>
              <Text style={styles.emptyText}>
                {searchQuery || subjectFilter !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'Start uploading notes and study materials for your students'}
              </Text>
              <TouchableOpacity 
                style={styles.emptyButton}
                onPress={() => setUploadModalVisible(true)}
              >
                <Text style={styles.emptyButtonText}>Upload Content</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.restrictionsNotice}>
          <View style={styles.noticeCard}>
            <Text style={styles.noticeIcon}>ℹ️</Text>
            <View style={styles.noticeContent}>
              <Text style={styles.noticeTitle}>Account Permissions</Text>
              <Text style={styles.noticeText}>
                As a Content Provider, you can upload and manage study materials and notes. For test creation and scheduling features, please contact the administrator.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={uploadModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setUploadModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>📤 Upload Content</Text>
              <TouchableOpacity onPress={() => setUploadModalVisible(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              <View style={styles.formSection}>
                <Text style={styles.formSectionTitle}>Content Details</Text>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Content Type <Text style={styles.required}>*</Text></Text>
                  <View style={styles.selectWrapper}>
                    <Text style={styles.selectText}>Notes</Text>
                    <Ionicons name="chevron-down" size={20} color="#b4b4c8" />
                  </View>
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Title <Text style={styles.required}>*</Text></Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="e.g., Thermodynamics Chapter Notes"
                    placeholderTextColor="#b4b4c8"
                    value={contentTitle}
                    onChangeText={setContentTitle}
                  />
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Description</Text>
                  <TextInput
                    style={[styles.formInput, styles.formTextarea]}
                    placeholder="Brief description of the content..."
                    placeholderTextColor="#b4b4c8"
                    value={contentDesc}
                    onChangeText={setContentDesc}
                    multiline
                    numberOfLines={3}
                  />
                </View>
                <View style={styles.formRow}>
                  <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.formLabel}>Subject <Text style={styles.required}>*</Text></Text>
                    <View style={styles.selectWrapper}>
                      <Text style={styles.selectText}>Physics</Text>
                      <Ionicons name="chevron-down" size={20} color="#b4b4c8" />
                    </View>
                  </View>
                  <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.formLabel}>Class <Text style={styles.required}>*</Text></Text>
                    <View style={styles.selectWrapper}>
                      <Text style={styles.selectText}>Class 12-A</Text>
                      <Ionicons name="chevron-down" size={20} color="#b4b4c8" />
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.formSection}>
                <Text style={styles.formSectionTitle}>Upload File</Text>
                <TouchableOpacity style={styles.uploadArea}>
                  <Ionicons name="cloud-upload-outline" size={48} color="#6366f1" />
                  <Text style={styles.uploadAreaTitle}>Drop files here or click to browse</Text>
                  <Text style={styles.uploadAreaText}>Supported: PDF, DOC, DOCX, PPT, PPTX (Max 50MB)</Text>
                  <View style={styles.browseBtn}>
                    <Text style={styles.browseBtnText}>Browse Files</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.cancelBtn}
                onPress={() => setUploadModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.uploadBtn} onPress={handleUpload}>
                <LinearGradient
                  colors={['#6366f1', '#a855f7', '#ec4899']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.uploadBtnGradient}
                >
                  <Text style={styles.uploadBtnText}>Upload Content</Text>
                </LinearGradient>
              </TouchableOpacity>
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
  nav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20, backgroundColor: 'rgba(19, 19, 26, 0.8)', borderBottomWidth: 1, borderBottomColor: 'rgba(99, 102, 241, 0.2)' },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 36, height: 36, borderRadius: 8, marginRight: 10 },
  brandName: { fontSize: 20, fontWeight: '700', color: '#ffffff' },
  navActions: { flexDirection: 'row', gap: 12 },
  navButton: { padding: 8, borderRadius: 10, backgroundColor: 'rgba(30, 30, 45, 0.6)', borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)' },
  backButton: { padding: 8, borderRadius: 10, backgroundColor: 'rgba(30, 30, 45, 0.6)', borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)' },
  welcomeSection: { paddingHorizontal: 20, paddingVertical: 32 },
  welcomeContent: { marginBottom: 24 },
  pageTitle: { fontSize: 32, fontWeight: '700', color: '#ffffff', marginBottom: 8 },
  gradientText: { color: '#6366f1' },
  pageSubtitle: { fontSize: 15, color: '#b4b4c8', marginBottom: 16 },
  teacherBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(99, 102, 241, 0.1)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, alignSelf: 'flex-start', gap: 6 },
  teacherBadgeText: { color: '#6366f1', fontSize: 14, fontWeight: '600' },
  quickActions: { flexDirection: 'row', gap: 12 },
  btnPrimary: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#6366f1', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 12 },
  btnText: { color: '#ffffff', fontSize: 15, fontWeight: '600' },
  btnSecondary: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: 'rgba(30, 30, 45, 0.6)', borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 12 },
  btnSecondaryText: { color: '#b4b4c8', fontSize: 15, fontWeight: '600' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 12, marginBottom: 24 },
  statCard: { flex: 1, minWidth: '47%', backgroundColor: 'rgba(30, 30, 45, 0.6)', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)', borderTopWidth: 3 },
  statContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  statInfo: { flex: 1 },
  statLabel: { fontSize: 13, color: '#b4b4c8', marginBottom: 6 },
  statValue: { fontSize: 28, fontWeight: '700', color: '#ffffff', marginBottom: 4 },
  statTrend: { fontSize: 12, color: '#10b981' },
  statIcon: { fontSize: 32 },
  contentTabs: { paddingHorizontal: 20, marginBottom: 20 },
  tabsScroll: { marginBottom: 16 },
  tabBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10, paddingHorizontal: 16, backgroundColor: 'rgba(30, 30, 45, 0.6)', borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)', borderRadius: 12, marginRight: 12 },
  tabBtnActive: { backgroundColor: '#6366f1', borderColor: '#6366f1' },
  tabText: { color: '#b4b4c8', fontSize: 14, fontWeight: '600' },
  tabTextActive: { color: '#ffffff' },
  tabCount: { backgroundColor: 'rgba(99, 102, 241, 0.2)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, minWidth: 24, alignItems: 'center' },
  tabCountText: { color: '#ffffff', fontSize: 12, fontWeight: '700' },
  searchFilter: { flexDirection: 'row', gap: 12 },
  searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#13131a', borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)', borderRadius: 12, paddingHorizontal: 12 },
  searchInput: { flex: 1, paddingVertical: 10, color: '#ffffff', fontSize: 14 },
  filterButton: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#13131a', borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10 },
  filterButtonText: { color: '#ffffff', fontSize: 14 },
  contentGrid: { paddingHorizontal: 20, paddingBottom: 40 },
  contentCard: { backgroundColor: 'rgba(30, 30, 45, 0.6)', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)', marginBottom: 16 },
  contentCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(99, 102, 241, 0.1)' },
  typeBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  notesBadge: { backgroundColor: '#6366f1' },
  materialBadge: { backgroundColor: '#ec4899' },
  typeBadgeText: { color: '#ffffff', fontSize: 12, fontWeight: '600' },
  menuBtn: { padding: 4 },
  contentCardBody: { padding: 16 },
  fileIcon: { fontSize: 40, marginBottom: 12 },
  contentTitle: { fontSize: 18, fontWeight: '600', color: '#ffffff', marginBottom: 8 },
  contentDescription: { fontSize: 14, color: '#b4b4c8', marginBottom: 12 },
  contentMeta: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  subjectTag: { backgroundColor: 'rgba(99, 102, 241, 0.1)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  subjectTagText: { color: '#6366f1', fontSize: 12, fontWeight: '600', textTransform: 'capitalize' },
  classTag: { backgroundColor: 'rgba(236, 72, 153, 0.1)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  classTagText: { color: '#ec4899', fontSize: 12, fontWeight: '600' },
  contentStats: { flexDirection: 'row', gap: 16, marginBottom: 12 },
  statItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statItemText: { fontSize: 13, color: '#b4b4c8' },
  uploadInfo: { flexDirection: 'row', justifyContent: 'space-between' },
  uploadDate: { fontSize: 12, color: '#b4b4c8' },
  fileSize: { fontSize: 12, color: '#b4b4c8' },
  emptyState: { alignItems: 'center', paddingVertical: 60 },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyTitle: { fontSize: 24, fontWeight: '700', color: '#ffffff', marginBottom: 8 },
  emptyText: { fontSize: 16, color: '#b4b4c8', textAlign: 'center', marginBottom: 24, paddingHorizontal: 20 },
  emptyButton: { backgroundColor: '#6366f1', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12 },
  emptyButtonText: { color: '#ffffff', fontSize: 15, fontWeight: '600' },
  restrictionsNotice: { paddingHorizontal: 20, paddingBottom: 40 },
  noticeCard: { flexDirection: 'row', backgroundColor: 'rgba(59, 130, 246, 0.1)', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(59, 130, 246, 0.2)', gap: 12 },
  noticeIcon: { fontSize: 24 },
  noticeContent: { flex: 1 },
  noticeTitle: { fontSize: 16, fontWeight: '600', color: '#ffffff', marginBottom: 6 },
  noticeText: { fontSize: 14, color: '#b4b4c8', lineHeight: 20 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.9)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#13131a', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: height * 0.9 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(99, 102, 241, 0.2)' },
  modalTitle: { fontSize: 24, fontWeight: '700', color: '#ffffff' },
  modalBody: { padding: 20, maxHeight: height * 0.6 },
  formSection: { marginBottom: 24 },
  formSectionTitle: { fontSize: 18, fontWeight: '600', color: '#ffffff', marginBottom: 16 },
  formGroup: { marginBottom: 16 },
  formLabel: { fontSize: 14, fontWeight: '600', color: '#ffffff', marginBottom: 8 },
  required: { color: '#ef4444' },
  selectWrapper: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e1e2d', borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16 },
  selectText: { color: '#ffffff', fontSize: 16 },
  formInput: { backgroundColor: '#1e1e2d', borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16, color: '#ffffff', fontSize: 16 },
  formTextarea: { minHeight: 80, textAlignVertical: 'top' },
  formRow: { flexDirection: 'row', gap: 16 },
  uploadArea: { backgroundColor: 'rgba(99, 102, 241, 0.05)', borderWidth: 2, borderColor: 'rgba(99, 102, 241, 0.2)', borderRadius: 16, borderStyle: 'dashed', padding: 32, alignItems: 'center' },
  uploadAreaTitle: { fontSize: 16, fontWeight: '600', color: '#ffffff', marginTop: 16, marginBottom: 8 },
  uploadAreaText: { fontSize: 13, color: '#b4b4c8', marginBottom: 16 },
  browseBtn: { backgroundColor: 'rgba(99, 102, 241, 0.1)', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.3)' },
  browseBtnText: { color: '#6366f1', fontSize: 14, fontWeight: '600' },
  modalFooter: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderTopWidth: 1, borderTopColor: 'rgba(99, 102, 241, 0.2)', gap: 12 },
  cancelBtn: { flex: 1, backgroundColor: 'rgba(30, 30, 45, 0.6)', borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  cancelBtnText: { color: '#b4b4c8', fontSize: 15, fontWeight: '600' },
  uploadBtn: { flex: 1, borderRadius: 12, overflow: 'hidden' },
  uploadBtnGradient: { paddingVertical: 14, alignItems: 'center' },
  uploadBtnText: { color: '#ffffff', fontSize: 15, fontWeight: '600' },
});
