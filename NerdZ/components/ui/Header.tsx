import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';

export function Header() {
  const { isDark, colors, toggleTheme } = useTheme();

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 60,
      paddingBottom: 20,
      backgroundColor: colors.bgSecondary,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderColor,
      zIndex: 10,
    },
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoPlaceholder: {
      width: 45,
      height: 45,
      borderRadius: 12,
      backgroundColor: colors.accentPurple,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    logoText: {
      color: colors.textPrimary,
      fontSize: 20,
      fontWeight: 'bold',
    },
    brandName: {
      color: colors.textPrimary,
      fontSize: 28,
      fontWeight: '700',
    },
    themeToggle: {
      padding: 10,
      borderRadius: 10,
      backgroundColor: colors.cardBg,
      borderWidth: 1,
      borderColor: colors.borderColor,
    },
  });

  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>N</Text>
        </View>
        <Text style={styles.brandName}>NerdZ</Text>
      </View>
      <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
        <Ionicons
          name={isDark ? 'sunny-outline' : 'moon-outline'}
          size={20}
          color={colors.textPrimary}
        />
      </TouchableOpacity>
    </View>
  );
}
