import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainContainer from './MainContainer';
import LogoSplash from './LogoSplash';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from 'expo';
import React, {useEffect, useState, useCallback} from 'react';

import { useFonts, Figtree_400Regular } from '@expo-google-fonts/dev';

function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  let [fontsLoaded] = useFonts({
    Figtree_400Regular,
  });
  
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <LogoSplash />;
  }

  return (
      <MainContainer />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // text : {
  //   fontFamily: 'Figtree_400Regular',
  //   fontSize: 20,
  //   color: 'black',
  //   fontWeight: 'bold',
  // }
});

export default App;