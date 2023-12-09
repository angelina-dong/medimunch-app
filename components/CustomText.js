// CustomText.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useFonts, Figtree_700Bold } from '@expo-google-fonts/dev';

const CustomText = (props) => {
  let [fontsLoaded] = useFonts({
    Figtree_700Bold,
  });

  const styles = StyleSheet.create({
    text: {
      fontFamily: 'Figtree_700Bold',
      fontSize: props.size,
      color: props.color,
      fontWeight: props.weight,
    },
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return <Text style={{...props.style, fontFamily: 'Figtree_700Bold'}}>{props.children}</Text>;
};

export default CustomText;