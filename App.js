import {View, SafeAreaView} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/components/navigation/Navigation';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
        <Toast />
      </View>
    </SafeAreaView>
  );
}
