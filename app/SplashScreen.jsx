import React, {useEffect, useRef, useReffrom} from 'react';
import {View, Animated, StyleSheet, Image} from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      router.replace('/tabs');
    });
  }, []);



  return (
    <View style={StyleSheet.container}>
      <Animated.Image
        source={require('../styles/logo.png')}
        style={[Styles.logo, {opscity: fadeAnim}]}
        resizeMode="contain"
      />
   </View>
  );
}