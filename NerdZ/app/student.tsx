// Student Learning Platform - Full implementation with 9 sections
// Includes: Class Selection, Study Materials, Videos, AI Assistant, Quiz, Schedule, Pomodoro, Notes, Progress
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Animated, StatusBar, Image, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/contexts/AuthContext';

const { width, height } = Dimensions.get('window');
type Section = 'class-selection' | 'study-materials' | 'video-lectures' | 'ai-assistant' | 'quiz' | 'schedule' | 'pomodoro' | 'notes' | 'progress';

export default function StudentScreen() {
  const { isAuthenticated, isTeacher } = useAuth();
  const [activeSection, setActiveSection] = useState<Section>('class-selection');
  const [selectedClass, setSelectedClass] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [chatMessage, setChatMessage] = useState('');
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [pomodoroRunning, setPomodoroRunning] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const orb1Anim = useRef(new Animated.Value(0)).current;
  const orb2Anim = useRef(new Animated.Value(0)).current;
  const orb3Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    } else if (isTeacher) {
      router.replace('/teachers');
    }
  }, [isAuthenticated, isTeacher]);

  useEffect(() => {
    const animateOrb = (anim: Animated.Value, delay: number) => {
      Animated.loop(Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 20000, delay, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 20000, useNativeDriver: true }),
      ])).start();
    };
    animateOrb(orb1Anim, 0);
    animateOrb(orb2Anim, 5000);
    animateOrb(orb3Anim, 10000);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (pomodoroRunning && pomodoroTime > 0) {
      interval = setInterval(() => setPomodoroTime(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [pomodoroRunning, pomodoroTime]);

  const getOrbTransform = (anim: Animated.Value) => ({
    transform: [
      { translateX: anim.interpolate({ inputRange: [0, 0.25, 0.5, 0.75, 1], outputRange: [0, 50, -30, 70, 0] }) },
      { translateY: anim.interpolate({ inputRange: [0, 0.25, 0.5, 0.75, 1], outputRange: [0, 50, 80, -50, 0] }) },
      { scale: anim.interpolate({ inputRange: [0, 0.25, 0.5, 0.75, 1], outputRange: [1, 1.1, 0.9, 1.05, 1] }) },
    ],
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const menuItems = [
    { key: 'class-selection', icon: 'school-outline', label: 'Select Class' },
    { key: 'study-materials', icon: 'book-outline', label: 'Study Materials' },
    { key: 'video-lectures', icon: 'play-circle-outline', label: 'Video Lectures' },
    { key: 'ai-assistant', icon: 'chatbubble-outline', label: 'AI Assistant' },
    { key: 'quiz', icon: 'create-outline', label: 'AI Quiz' },
    { key: 'schedule', icon: 'calendar-outline', label: 'My Schedule' },
    { key: 'pomodoro', icon: 'timer-outline', label: 'Pomodoro Timer' },
    { key: 'notes', icon: 'document-text-outline', label: 'My Notes' },
    { key: 'progress', icon: 'trending-up-outline', label: 'Progress' },
  ];

  const renderSection = () => {
    if (activeSection === 'class-selection') {
      return (<View style={styles.section}><View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Select Your Class</Text><Text style={styles.sectionSubtitle}>Choose your class to get personalized content</Text></View><View style={styles.classGrid}>{[6, 7, 8, 9, 10, 11, 12, '🎓'].map((cls, i) => (<TouchableOpacity key={i} style={[styles.classCard, selectedClass === cls.toString() && styles.classCardActive]} onPress={() => { setSelectedClass(cls.toString()); Alert.alert('Success', `Class ${cls} selected!`); }}><Text style={styles.classNumber}>{cls}</Text><Text style={styles.className}>{typeof cls === 'number' ? `Class ${cls}` : 'College'}</Text><Text style={styles.classDesc}>{typeof cls === 'number' ? (cls === 10 ? 'Board Exam' : cls === 12 ? 'Final Year' : 'Foundation') : 'Higher Ed'}</Text></TouchableOpacity>))}</View></View>);
    }
    if (activeSection === 'study-materials') {
      return (<View style={styles.section}><View style={styles.sectionHeader}><Text style={styles.sectionTitle}>📖 Study Materials</Text></View><ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom:16}}>{['all', 'math', 'science', 'english'].map(s => (<TouchableOpacity key={s} style={[styles.filterBtn, subjectFilter === s && styles.filterBtnActive]} onPress={() => setSubjectFilter(s)}><Text style={[styles.filterBtnText, subjectFilter === s && styles.filterBtnTextActive]}>{s.charAt(0).toUpperCase() + s.slice(1)}</Text></TouchableOpacity>))}</ScrollView><View style={styles.materialsGrid}>{[{icon:'📐',title:'Algebra Basics',desc:'Algebraic expressions',pages:25},{icon:'🔬',title:'Chemical Reactions',desc:'Chemical equations',pages:30}].map((m,i) => (<View key={i} style={styles.materialCard}><Text style={styles.materialIcon}>{m.icon}</Text><Text style={styles.materialTitle}>{m.title}</Text><Text style={styles.materialDesc}>{m.desc}</Text><Text style={styles.metaText}>📄 {m.pages} pages</Text><TouchableOpacity style={styles.downloadBtn}><Text style={styles.downloadBtnText}>Download PDF</Text></TouchableOpacity></View>))}</View></View>);
    }
    if (activeSection === 'video-lectures') {
      return (<View style={styles.section}><View style={styles.sectionHeader}><Text style={styles.sectionTitle}>🎥 Video Lectures</Text></View><View style={styles.videoGrid}>{[{title:'Quadratic Equations',teacher:'Prof. Sharma',views:'1.2k',rating:'4.8',duration:'15:30'},{title:'Periodic Table',teacher:'Dr. Verma',views:'2.5k',rating:'4.9',duration:'20:15'}].map((v,i) => (<TouchableOpacity key={i} style={styles.videoCard}><View style={styles.videoThumbnail}><Ionicons name="play-circle" size={48} color="#fff" /><View style={styles.videoDuration}><Text style={styles.videoDurationText}>{v.duration}</Text></View></View><View style={styles.videoInfo}><Text style={styles.videoTitle}>{v.title}</Text><Text style={styles.videoTeacher}>{v.teacher}</Text><View style={styles.videoMeta}><Text style={styles.videoMetaText}>👁️ {v.views}</Text><Text style={styles.videoMetaText}>⭐ {v.rating}</Text></View></View></TouchableOpacity>))}</View></View>);
    }
    if (activeSection === 'ai-assistant') {
      return (<View style={styles.section}><View style={styles.sectionHeader}><Text style={styles.sectionTitle}>🤖 AI Study Assistant</Text></View><View style={styles.chatContainer}><View style={styles.chatMessages}><View style={styles.aiMessage}><Text style={styles.aiAvatar}>🤖</Text><View style={styles.messageContent}><Text style={styles.messageText}>Hello! I'm your AI study assistant. Ask me anything!</Text></View></View></View><View style={styles.quickQuestions}>{['Explain photosynthesis','What is Pythagoras theorem?'].map((q,i) => (<TouchableOpacity key={i} style={styles.quickQuestionBtn}><Text style={styles.quickQuestionText}>{q}</Text></TouchableOpacity>))}</View><View style={styles.chatInputContainer}><TextInput style={styles.chatInput} placeholder="Ask your question..." placeholderTextColor="#b4b4c8" value={chatMessage} onChangeText={setChatMessage} /><TouchableOpacity style={styles.chatSendBtn}><Ionicons name="send" size={20} color="#fff" /></TouchableOpacity></View></View></View>);
    }
    if (activeSection === 'quiz') {
      return (<View style={styles.section}><View style={styles.sectionHeader}><Text style={styles.sectionTitle}>📝 AI-Powered Quiz</Text></View><View style={styles.quizSetup}><View style={styles.quizOption}><Text style={styles.quizLabel}>Select Subject</Text><View style={styles.selectWrapper}><Text style={styles.selectText}>Mathematics</Text><Ionicons name="chevron-down" size={20} color="#b4b4c8" /></View></View><View style={styles.quizOption}><Text style={styles.quizLabel}>Number of Questions</Text><View style={styles.selectWrapper}><Text style={styles.selectText}>10 Questions</Text><Ionicons name="chevron-down" size={20} color="#b4b4c8" /></View></View><TouchableOpacity style={styles.startQuizBtn}><LinearGradient colors={['#6366f1','#a855f7','#ec4899']} start={{x:0,y:0}} end={{x:1,y:0}} style={styles.startQuizGradient}><Text style={styles.startQuizText}>Start Quiz</Text></LinearGradient></TouchableOpacity></View></View>);
    }
    if (activeSection === 'schedule') {
      return (<View style={styles.section}><View style={styles.sectionHeader}><Text style={styles.sectionTitle}>📅 My Study Schedule</Text></View><View style={styles.scheduleContainer}><View style={styles.weekDays}>{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((day,i) => (<View key={i} style={styles.dayColumn}><Text style={styles.dayHeader}>{day}</Text><View style={styles.dayTasks}>{i < 5 && (<View style={styles.taskItem}><Text style={styles.taskTime}>10:00</Text><Text style={styles.taskSubject}>Math</Text></View>)}</View></View>))}</View><TouchableOpacity style={styles.addTaskBtn}><Ionicons name="add-circle" size={24} color="#6366f1" /><Text style={styles.addTaskText}>Add Study Task</Text></TouchableOpacity></View></View>);
    }
    if (activeSection === 'pomodoro') {
      return (<View style={styles.section}><View style={styles.sectionHeader}><Text style={styles.sectionTitle}>⏱️ Pomodoro Timer</Text></View><View style={styles.pomodoroContainer}><View style={styles.pomodoroCircle}><Text style={styles.pomodoroMode}>Focus Time</Text><Text style={styles.pomodoroTime}>{formatTime(pomodoroTime)}</Text><Text style={styles.pomodoroSession}>Session 1 of 4</Text></View><View style={styles.pomodoroControls}><TouchableOpacity style={styles.timerBtn} onPress={() => setPomodoroRunning(!pomodoroRunning)}><Text style={styles.timerBtnText}>{pomodoroRunning ? 'Pause' : 'Start'}</Text></TouchableOpacity><TouchableOpacity style={styles.timerBtn} onPress={() => { setPomodoroTime(25 * 60); setPomodoroRunning(false); }}><Text style={styles.timerBtnText}>Reset</Text></TouchableOpacity></View><View style={styles.pomodoroStats}><View style={styles.statBox}><Text style={styles.statBoxValue}>0</Text><Text style={styles.statBoxLabel}>Completed</Text></View><View style={styles.statBox}><Text style={styles.statBoxValue}>0h</Text><Text style={styles.statBoxLabel}>Total Time</Text></View></View></View></View>);
    }
    if (activeSection === 'notes') {
      return (<View style={styles.section}><View style={styles.sectionHeader}><Text style={styles.sectionTitle}>✍️ My Notes</Text></View><View style={styles.notesContainer}><View style={styles.notesList}><TouchableOpacity style={styles.newNoteBtn}><Ionicons name="add" size={20} color="#fff" /><Text style={styles.newNoteBtnText}>New Note</Text></TouchableOpacity>{['Physics - Chapter 5','Math Formulas'].map((note,i) => (<TouchableOpacity key={i} style={styles.noteItem}><Text style={styles.noteItemTitle}>{note}</Text><Text style={styles.noteItemDate}>Today, 2:30 PM</Text></TouchableOpacity>))}</View><View style={styles.noteEditor}><TextInput style={styles.noteTitle} placeholder="Note title..." placeholderTextColor="#b4b4c8" value={noteTitle} onChangeText={setNoteTitle} /><TextInput style={styles.noteContent} placeholder="Start typing..." placeholderTextColor="#b4b4c8" value={noteContent} onChangeText={setNoteContent} multiline /><TouchableOpacity style={styles.saveNoteBtn}><Text style={styles.saveNoteBtnText}>Save Note</Text></TouchableOpacity></View></View></View>);
    }
    if (activeSection === 'progress') {
      return (<View style={styles.section}><View style={styles.sectionHeader}><Text style={styles.sectionTitle}>📈 My Progress</Text></View><View style={styles.progressStats}>{[{icon:'🔥',value:'15',label:'Day Streak'},{icon:'⏱️',value:'24h',label:'Total Time'},{icon:'✅',value:'12',label:'Quizzes'},{icon:'⭐',value:'92%',label:'Avg Score'}].map((stat,i) => (<View key={i} style={styles.progressStatCard}><Text style={styles.progressStatIcon}>{stat.icon}</Text><Text style={styles.progressStatValue}>{stat.value}</Text><Text style={styles.progressStatLabel}>{stat.label}</Text></View>))}</View><View style={styles.chartContainer}><Text style={styles.chartTitle}>Weekly Study Hours</Text><View style={styles.barChart}>{[60,80,40,90,70,50,30].map((h,i) => (<View key={i} style={styles.barWrapper}><View style={[styles.bar,{height:h}]}><Text style={styles.barValue}>{Math.floor(h/15)}h</Text></View><Text style={styles.barLabel}>{['M','T','W','T','F','S','S'][i]}</Text></View>))}</View></View><View style={styles.achievements}><Text style={styles.achievementsTitle}>Recent Achievements</Text>{[{icon:'🏆',title:'First Week',desc:'7 days streak'},{icon:'⭐',title:'Quiz Master',desc:'100% score'}].map((a,i) => (<View key={i} style={styles.achievementItem}><Text style={styles.achievementBadge}>{a.icon}</Text><View style={styles.achievementContent}><Text style={styles.achievementTitle}>{a.title}</Text><Text style={styles.achievementDesc}>{a.desc}</Text></View></View>))}</View></View>);
    }
    return null;
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
        <View style={styles.navActions}>
          <TouchableOpacity style={styles.navButton} onPress={() => router.push('/settings')}>
            <Ionicons name="settings-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mainContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sidebar}>
          <View style={styles.sidebarContent}>
            <Text style={styles.sidebarTitle}>📚 Learning Hub</Text>
            {menuItems.map((item) => (
              <TouchableOpacity key={item.key} style={[styles.menuItem, activeSection === item.key && styles.menuItemActive]} onPress={() => setActiveSection(item.key as Section)}>
                <Ionicons name={item.icon as any} size={20} color={activeSection === item.key ? '#fff' : '#b4b4c8'} />
                <Text style={[styles.menuItemText, activeSection === item.key && styles.menuItemTextActive]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>{renderSection()}</ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },
  gradientBg: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.15 },
  gradientOrb: { position: 'absolute', borderRadius: 1000 },
  orbGradient: { width: '100%', height: '100%', borderRadius: 1000 },
  orb1: { width: width * 1.2, height: width * 1.2, top: -width * 0.3, right: -width * 0.3 },
  orb2: { width: width * 0.9, height: width * 0.9, bottom: -width * 0.2, left: -width * 0.2 },
  orb3: { width: width * 0.8, height: width * 0.8, top: height * 0.5, left: width * 0.1 },
  nav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20, backgroundColor: 'rgba(19, 19, 26, 0.8)', borderBottomWidth: 1, borderBottomColor: 'rgba(99, 102, 241, 0.2)' },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 36, height: 36, borderRadius: 8, marginRight: 10 },
  brandName: { fontSize: 20, fontWeight: '700', color: '#ffffff' },
  navActions: { flexDirection: 'row', gap: 12 },
  navButton: { padding: 8, borderRadius: 10, backgroundColor: 'rgba(30, 30, 45, 0.6)', borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)' },
  backButton: { padding: 8, borderRadius: 10, backgroundColor: 'rgba(30, 30, 45, 0.6)', borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)' },
  mainContainer: { flex: 1 },
  sidebar: { maxHeight: 80, paddingVertical: 16, backgroundColor: 'rgba(19, 19, 26, 0.8)', borderBottomWidth: 1, borderBottomColor: 'rgba(99, 102, 241, 0.2)' },
  sidebarContent: { flexDirection: 'row', paddingHorizontal: 20, gap: 12 },
  sidebarTitle: { fontSize: 16, fontWeight: '700', color: '#ffffff', alignSelf: 'center', marginRight: 8 },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10, paddingHorizontal: 16, backgroundColor: 'rgba(30, 30, 45, 0.6)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)' },
  menuItemActive: { backgroundColor: '#6366f1', borderColor: '#6366f1' },
  menuItemText: { color: '#b4b4c8', fontSize: 14, fontWeight: '600' },
  menuItemTextActive: { color: '#ffffff' },
  mainContent: { flex: 1 },
  section: { padding: 20 },
  sectionHeader: { marginBottom: 24 },
  sectionTitle: { fontSize: 28, fontWeight: '700', color: '#ffffff', marginBottom: 8 },
  sectionSubtitle: { fontSize: 14, color: '#b4b4c8' },
  classGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  classCard: { width: (width - 52) / 2, backgroundColor: 'rgba(30, 30, 45, 0.6)', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)', alignItems: 'center' },
  classCardActive: { borderColor: '#6366f1', backgroundColor: 'rgba(99, 102, 241, 0.1)' },
  classNumber: { fontSize: 40, fontWeight: '700', color: '#6366f1', marginBottom: 8 },
  className: { fontSize: 18, fontWeight: '600', color: '#ffffff', marginBottom: 4 },
  classDesc: { fontSize: 13, color: '#b4b4c8', textAlign: 'center' },
  filterBtn: { paddingVertical: 10, paddingHorizontal: 16, backgroundColor: 'rgba(30, 30, 45, 0.6)', borderRadius: 12, marginRight: 12, borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)' },
  filterBtnActive: { backgroundColor: '#6366f1', borderColor: '#6366f1' },
  filterBtnText: { color: '#b4b4c8', fontSize: 14, fontWeight: '600' },
  filterBtnTextActive: { color: '#ffffff' },
  materialsGrid: { gap: 12 },
  materialCard: { backgroundColor: 'rgba(30, 30, 45, 0.6)', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)' },
  materialIcon: { fontSize: 32, marginBottom: 12 },
  materialTitle: { fontSize: 18, fontWeight: '600', color: '#ffffff', marginBottom: 8 },
  materialDesc: { fontSize: 14, color: '#b4b4c8', marginBottom: 12 },
  metaText: { fontSize: 13, color: '#b4b4c8', marginBottom: 8 },
  downloadBtn: { backgroundColor: '#6366f1', paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  downloadBtnText: { color: '#ffffff', fontSize: 14, fontWeight: '600' },
  videoGrid: { gap: 12 },
  videoCard: { backgroundColor: 'rgba(30, 30, 45, 0.6)', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)', overflow: 'hidden' },
  videoThumbnail: { height: 180, backgroundColor: '#1e1e2d', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  videoDuration: { position: 'absolute', bottom: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.8)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  videoDurationText: { color: '#ffffff', fontSize: 12, fontWeight: '600' },
  videoInfo: { padding: 16 },
  videoTitle: { fontSize: 16, fontWeight: '600', color: '#ffffff', marginBottom: 8 },
  videoTeacher: { fontSize: 14, color: '#b4b4c8', marginBottom: 8 },
  videoMeta: { flexDirection: 'row', gap: 16 },
  videoMetaText: { fontSize: 13, color: '#b4b4c8' },
  chatContainer: { flex: 1 },
  chatMessages: { backgroundColor: 'rgba(30, 30, 45, 0.6)', padding: 16, borderRadius: 16, marginBottom: 16, minHeight: 200 },
  aiMessage: { flexDirection: 'row', gap: 12 },
  aiAvatar: { fontSize: 32 },
  messageContent: { flex: 1, backgroundColor: '#1e1e2d', padding: 12, borderRadius: 12 },
  messageText: { color: '#ffffff', fontSize: 14, lineHeight: 20 },
  quickQuestions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  quickQuestionBtn: { backgroundColor: 'rgba(99, 102, 241, 0.1)', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.3)' },
  quickQuestionText: { color: '#6366f1', fontSize: 13 },
  chatInputContainer: { flexDirection: 'row', gap: 12 },
  chatInput: { flex: 1, backgroundColor: '#1e1e2d', borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, color: '#ffffff', fontSize: 14 },
  chatSendBtn: { backgroundColor: '#6366f1', width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  quizSetup: { gap: 16 },
  quizOption: { marginBottom: 16 },
  quizLabel: { fontSize: 14, fontWeight: '600', color: '#ffffff', marginBottom: 8 },
  selectWrapper: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e1e2d', borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16 },
  selectText: { color: '#ffffff', fontSize: 16 },
  startQuizBtn: { borderRadius: 12, overflow: 'hidden', marginTop: 8 },
  startQuizGradient: { paddingVertical: 14, alignItems: 'center' },
  startQuizText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  scheduleContainer: { gap: 16 },
  weekDays: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  dayColumn: { flex: 1, backgroundColor: 'rgba(30, 30, 45, 0.6)', borderRadius: 12, padding: 8, borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)' },
  dayHeader: { fontSize: 12, fontWeight: '600', color: '#ffffff', textAlign: 'center', marginBottom: 8 },
  dayTasks: { minHeight: 60 },
  taskItem: { backgroundColor: '#6366f1', padding: 6, borderRadius: 6, marginBottom: 4 },
  taskTime: { fontSize: 10, color: '#ffffff', fontWeight: '600' },
  taskSubject: { fontSize: 11, color: '#ffffff' },
  addTaskBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(99, 102, 241, 0.1)', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.3)' },
  addTaskText: { color: '#6366f1', fontSize: 16, fontWeight: '600' },
  pomodoroContainer: { alignItems: 'center', gap: 24 },
  pomodoroCircle: { width: 250, height: 250, borderRadius: 125, backgroundColor: 'rgba(30, 30, 45, 0.6)', borderWidth: 8, borderColor: '#6366f1', alignItems: 'center', justifyContent: 'center', gap: 12 },
  pomodoroMode: { fontSize: 14, color: '#b4b4c8', fontWeight: '600' },
  pomodoroTime: { fontSize: 48, fontWeight: '700', color: '#ffffff' },
  pomodoroSession: { fontSize: 13, color: '#b4b4c8' },
  pomodoroControls: { flexDirection: 'row', gap: 12 },
  timerBtn: { backgroundColor: '#6366f1', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12 },
  timerBtnText: { color: '#ffffff', fontSize: 14, fontWeight: '600' },
  pomodoroStats: { flexDirection: 'row', gap: 24 },
  statBox: { alignItems: 'center', backgroundColor: 'rgba(30, 30, 45, 0.6)', padding: 16, borderRadius: 12, minWidth: 100, borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)' },
  statBoxValue: { fontSize: 24, fontWeight: '700', color: '#ffffff', marginBottom: 4 },
  statBoxLabel: { fontSize: 13, color: '#b4b4c8' },
  notesContainer: { flexDirection: 'row', gap: 16, minHeight: 400 },
  notesList: { width: 150, gap: 8 },
  newNoteBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#6366f1', padding: 12, borderRadius: 12 },
  newNoteBtnText: { color: '#ffffff', fontSize: 14, fontWeight: '600' },
  noteItem: { backgroundColor: 'rgba(30, 30, 45, 0.6)', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)' },
  noteItemTitle: { fontSize: 13, fontWeight: '600', color: '#ffffff', marginBottom: 4 },
  noteItemDate: { fontSize: 11, color: '#b4b4c8' },
  noteEditor: { flex: 1, gap: 12 },
  noteTitle: { backgroundColor: '#1e1e2d', borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16, color: '#ffffff', fontSize: 18, fontWeight: '600' },
  noteContent: { flex: 1, backgroundColor: '#1e1e2d', borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)', borderRadius: 12, padding: 16, color: '#ffffff', fontSize: 14, textAlignVertical: 'top' },
  saveNoteBtn: { backgroundColor: '#6366f1', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  saveNoteBtnText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  progressStats: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  progressStatCard: { flex: 1, minWidth: '47%', backgroundColor: 'rgba(30, 30, 45, 0.6)', padding: 16, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)' },
  progressStatIcon: { fontSize: 32, marginBottom: 8 },
  progressStatValue: { fontSize: 28, fontWeight: '700', color: '#ffffff', marginBottom: 4 },
  progressStatLabel: { fontSize: 13, color: '#b4b4c8' },
  chartContainer: { backgroundColor: 'rgba(30, 30, 45, 0.6)', padding: 16, borderRadius: 16, marginBottom: 24, borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)' },
  chartTitle: { fontSize: 18, fontWeight: '600', color: '#ffffff', marginBottom: 16 },
  barChart: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 150, marginBottom: 8 },
  barWrapper: { flex: 1, alignItems: 'center', gap: 8 },
  bar: { backgroundColor: '#6366f1', width: '80%', borderRadius: 4, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 4 },
  barValue: { color: '#ffffff', fontSize: 10, fontWeight: '600' },
  barLabel: { fontSize: 12, color: '#b4b4c8' },
  achievements: { backgroundColor: 'rgba(30, 30, 45, 0.6)', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)' },
  achievementsTitle: { fontSize: 18, fontWeight: '600', color: '#ffffff', marginBottom: 16 },
  achievementItem: { flexDirection: 'row', gap: 12, padding: 12, backgroundColor: 'rgba(99, 102, 241, 0.05)', borderRadius: 12, marginBottom: 12 },
  achievementBadge: { fontSize: 32 },
  achievementContent: { flex: 1 },
  achievementTitle: { fontSize: 16, fontWeight: '600', color: '#ffffff', marginBottom: 4 },
  achievementDesc: { fontSize: 13, color: '#b4b4c8' },
});
