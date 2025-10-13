import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

const createButtonStyle = (colors: { textSecondary: string }) => ({
  position: 'absolute',
  width: 3,
  height: 46,
  backgroundColor: colors.textSecondary,
} as StyleProp<ViewStyle>);

const buttonLeft = {
  left: -17,
  borderTopLeftRadius: 8,
  borderBottomLeftRadius: 8,
};

export default function PhoneMockup({ children }: { children: React.ReactNode }) {
  const { isDark, colors } = useTheme();
  const button = createButtonStyle(colors);
  
  const rotateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Create a swaying animation
    const swayAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(rotateY, {
          toValue: 0.4,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(rotateY, {
          toValue: -0.4,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(rotateY, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    swayAnimation.start();

    return () => swayAnimation.stop();
  }, [rotateY]);

  const rotateYInterpolate = rotateY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-15deg', '0deg', '15deg'],
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
      }}
    >
      <Animated.View
        style={{
          transform: [
            { perspective: 1000 },
            { rotateY: rotateYInterpolate },
          ],
          transformOrigin: 'top center',
        }}
      >
        {/* Phone Frame */}
        <View
          style={{
            position: 'relative',
            width: 300,
            height: 600,
            backgroundColor: '#1f2937',
            borderWidth: 14,
            borderColor: '#1f2937',
            borderRadius: 40,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 20,
          }}
        >
          {/* Top Notch */}
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              marginLeft: -74,
              width: 148,
              height: 18,
              backgroundColor: '#1f2937',
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
              zIndex: 10,
            }}
          />

          {/* Left Buttons */}
          <View style={[button, buttonLeft, { top: 124 }]} />
          <View style={[button, buttonLeft, { top: 178 }]} />

          {/* Right Button */}
          <View
            style={[
              button,
              {
                right: -17,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
              },
              { top: 142, height: 64 },
            ]}
          />

          {/* Screen Content */}
          <View
            style={{
              width: 272,
              height: 572,
              borderRadius: 32,
              overflow: 'hidden',
              backgroundColor: colors.bgPrimary,
            }}
          >
            {children}
          </View>
        </View>
      </Animated.View>
    </View>
  );
}