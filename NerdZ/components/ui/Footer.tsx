import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

export function Footer() {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    footer: {
      paddingHorizontal: 20,
      paddingVertical: 64,
      backgroundColor: colors.bgSecondary,
      borderTopWidth: 1,
      borderTopColor: colors.borderColor,
    },
    footerContent: {
      marginBottom: 32,
    },
    footerSection: {
      alignItems: 'center',
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
    footerDescription: {
      color: colors.textSecondary,
      fontSize: 16,
      textAlign: 'center',
      marginTop: 16,
      lineHeight: 27,
    },
    footerBottom: {
      alignItems: 'center',
      paddingTop: 32,
      borderTopWidth: 1,
      borderTopColor: colors.borderColor,
    },
    footerBottomText: {
      color: colors.textSecondary,
      fontSize: 14,
    },
  });

  return (
    <View style={styles.footer}>
      <View style={styles.footerContent}>
        <View style={styles.footerSection}>
          <View style={styles.logoContainer}>
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>N</Text>
            </View>
            <Text style={styles.brandName}>NerdZ</Text>
          </View>
          <Text style={styles.footerDescription}>
            Making study easier and more engaging for students worldwide.
          </Text>
        </View>
      </View>
      <View style={styles.footerBottom}>
        <Text style={styles.footerBottomText}>© 2024 NerdZ. Open Source & Free Forever.</Text>
      </View>
    </View>
  );
}
