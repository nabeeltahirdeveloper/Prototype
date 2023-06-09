import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from '../../screens/main/Main';
import Final from '../../screens/final/Final';

export default function Navigation() {
  const Stack = createNativeStackNavigator();
  const options = {
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    headerShown: false,
  };
  return (
    <Stack.Navigator initialRouteName={'Main'}>
      <Stack.Screen name="Main" component={Main} options={options} />
      <Stack.Screen name="Final" component={Final} options={options} />
    </Stack.Navigator>
  );
}
