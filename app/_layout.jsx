import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useCallback, useState } from 'react';
import { Text, View, stylesheet } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMomo-Regular.ttf'),
  });

  const [showSplashText, setShowSplashText] = usestate(true);

  useEffect(() => {
    if (loaded) {
      setTimeout(async () => {
        await SplashScreen.hideAsync();
        setShowSplashText(false);
      }, 2000);
    }
  }, [loaded]);

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
        <stack.screen name="(tabs)" options={{ headerShown: false }} />
        <stack.screen name="(index)" options={{ headerShown: false}} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = stylesheet.create({
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundcolor: '#ffffff'
  },
  splashText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333'
  },
});