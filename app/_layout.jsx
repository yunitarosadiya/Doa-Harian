import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [showSplashText, setShowSplashText] = useState(true);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    setTimeout(async () => {
      await SplashScreen.hideAsync();
      setShowSplashText(false);
    }, 2000);
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
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
    backgroundColor: '#ffffff'
  },
  splashText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'System',
  },
});

