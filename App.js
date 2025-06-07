import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AlertScreen from './screens/AlertScreen';
import SOSScreen from './screens/SOSScreen';
import MapScreen from './screens/MapScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Início" component={HomeScreen} />
        <Stack.Screen name="Alertas" component={AlertScreen} />
        <Stack.Screen name="SOS" component={SOSScreen} />
        <Stack.Screen name="Mapa" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
