import React from 'react';
import { View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { Header } from '@/components/ui/Header';
import { HeroSection } from '@/components/ui/HeroSection';
import { FeaturesSection } from '@/components/ui/FeaturesSection';
import { UserTypesSection } from '@/components/ui/UserTypesSection';
import { CTASection } from '@/components/ui/CTASection';
import { Footer } from '@/components/ui/Footer';

export default function HomeScreen() {
    const { isDark, colors } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.bgPrimary,
        },
        scrollView: {
            flex: 1,
        },
    });

    return (
        <View style={styles.container}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.bgPrimary} />
            <AnimatedBackground />
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <Header />
                <HeroSection />
                <FeaturesSection />
                <UserTypesSection />
                <CTASection />
                <Footer />
            </ScrollView>
        </View>
    );
}
