import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

export function AnimatedBackground() {
  const { colors } = useTheme();
  const orb1Anim = useRef(new Animated.Value(0)).current;
  const orb2Anim = useRef(new Animated.Value(0)).current;
  const orb3Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateOrbs = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(orb1Anim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(orb1Anim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(orb2Anim, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(orb2Anim, {
            toValue: 0,
            duration: 4000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(orb3Anim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true,
          }),
          Animated.timing(orb3Anim, {
            toValue: 0,
            duration: 5000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateOrbs();
  }, []);

  const styles = StyleSheet.create({
    gradientBg: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
    },
    gradientOrb: {
      position: 'absolute',
      borderRadius: 250,
      opacity: 0.15,
    },
    orb1: {
      width: 500,
      height: 500,
      backgroundColor: colors.accentPurple,
      top: -100,
      right: -100,
    },
    orb2: {
      width: 400,
      height: 400,
      backgroundColor: colors.accentPink,
      bottom: -50,
      left: -50,
    },
    orb3: {
      width: 350,
      height: 350,
      backgroundColor: colors.accentViolet,
      top: '50%',
      left: '50%',
      marginTop: -175,
      marginLeft: -175,
    },
  });

  return (
    <View style={styles.gradientBg}>
      <Animated.View
        style={[
          styles.gradientOrb,
          styles.orb1,
          {
            transform: [
              {
                translateY: orb1Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -20],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.gradientOrb,
          styles.orb2,
          {
            transform: [
              {
                translateX: orb2Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 15],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.gradientOrb,
          styles.orb3,
          {
            transform: [
              {
                translateY: orb3Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 25],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
}
