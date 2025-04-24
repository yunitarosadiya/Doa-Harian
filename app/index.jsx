import React, {useEffect, useRef} from 'react';
import {View, Image, StyleSheet, Animated, Dimensions} from 'react-native';

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  
  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets//images/logo.png')}
        style={[styles.logo, {opacity: fadeAnim}]}
        resizeMode="contain"
      />
    </View>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  logo: {
    width: width * 0.95,
    height: height * 0.95,
  },
});

export default SplashScreen;

