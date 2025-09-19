import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/App/HomeScreen';
import PortfolioScreen from '../screens/App/PortfolioScreen';
import ExplanationsScreen from '../screens/App/ExplanationScreen';
import ProfileScreen from '../screens/App/ProfileScreen';
import AddAssetScreen from '../screens/App/AddAssetScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const PortfolioStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PortfolioMain" component={PortfolioScreen} />
    <Stack.Screen name="AddAsset" component={AddAssetScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Portfólio') {
            iconName = 'wallet-outline';
          } else if (route.name === 'Explicações') {
            iconName = 'bulb-outline';
          } else if (route.name === 'Perfil') {
            iconName = 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF8C00',
        tabBarInactiveTintColor: '#A0AEC0',
        tabBarStyle: {
          backgroundColor: '#0E172A',
          borderTopColor: '#2D3748',
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Portfólio" component={PortfolioStack} />
      <Tab.Screen name="Explicações" component={ExplanationsScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;