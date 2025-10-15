import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

const STUDENT_FEATURES = [
  'Access unlimited study materials',
  'Create personal notes & mind maps',
  'Take tests and track your scores',
  'Get study tips and motivation',
  'Connect with your teachers',
];

const TEACHER_FEATURES = [
  'Upload & organize study materials',
  'Schedule tests and quizzes',
  'Monitor student progress',
  'Create personalized timetables',
  'Connect with students easily',
];

export function UserTypesSection() {
  const { colors } = useTheme();
  const router = useRouter();

  const styles = StyleSheet.create({
    userTypes: {
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
    btnText: {
      color: colors.textPrimary,
      fontSize: 16,
      fontWeight: '600',
    },
    btnSecondaryText: {
      color: colors.accentPink,
    },
  });

  return (
    <View style={styles.userTypes}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Built for Students & Teachers</Text>
        <Text style={styles.sectionSubtitle}>Two powerful experiences, one amazing platform</Text>
      </View>

      <View style={styles.userCards}>
        {/* Student Card */}
        <View style={[styles.userCard, styles.studentCard]}>
          <View style={styles.userCardHeader}>
            <Text style={styles.userIcon}>🎓</Text>
            <Text style={styles.userCardTitle}>For Students</Text>
          </View>
          <View style={styles.userFeatures}>
            {STUDENT_FEATURES.map((feature, index) => (
              <View key={index} style={styles.userFeature}>
                <Ionicons name="checkmark" size={16} color="#10b981" />
                <Text style={styles.userFeatureText}>{feature}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={() => router.push('/login')}>
            <Text style={styles.btnText}>Sign Up as Student</Text>
          </TouchableOpacity>
        </View>

        {/* Teacher Card */}
        <View style={[styles.userCard, styles.teacherCard]}>
          <View style={styles.userCardHeader}>
            <Text style={styles.userIcon}>👨‍🏫</Text>
            <Text style={styles.userCardTitle}>For Teachers</Text>
          </View>
          <View style={styles.userFeatures}>
            {TEACHER_FEATURES.map((feature, index) => (
              <View key={index} style={styles.userFeature}>
                <Ionicons name="checkmark" size={16} color="#10b981" />
                <Text style={styles.userFeatureText}>{feature}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={[styles.btn, styles.btnSecondary]} onPress={() => router.push('/login')}>
            <Text style={[styles.btnText, styles.btnSecondaryText]}>Sign Up as Teacher</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
