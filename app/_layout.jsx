import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useCallback, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';

// Tahan splash screen dulu
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [showSplashText, setShowSplashText] = useState(true);

  useEffect(() => {
    if (loaded) {
      // Tambahkan delay manual sebelum hide splash
      setTimeout(async () => {
        await SplashScreen.hideAsync();
        setShowSplashText(false);
      }, 2000);
    }
  }, [loaded]);

  // Kalau belum siap, tampilkan null
  if (!loaded || showSplashText) {
    return (
      <View style={styles.splash}>
        <Text style={styles.splashText}>Kumpulan Doa Harian</Text>
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  splashText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
});
