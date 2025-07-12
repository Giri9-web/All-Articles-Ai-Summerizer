import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import SummarizerScreen from './src/screens/SummarizerScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HelpScreen from './src/screens/HelpScreen';
import CompareScreen from './src/screens/CompareScreen';
import SummaryDetailScreen from './src/screens/SummaryDetailScreen';
import LanguageMenuScreen from './src/screens/LanguageMenuScreen';

// Icons
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Summarizer') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: '#3B82F6',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'BharatSummarizer' }}
      />
      <Tab.Screen 
        name="Summarizer" 
        component={SummarizerScreen}
        options={{ title: 'AI Summarizer' }}
      />
      <Tab.Screen 
        name="History" 
        component={HistoryScreen}
        options={{ title: 'History' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#3B82F6',
                },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            >
              <Stack.Screen 
                name="Main" 
                component={TabNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="Login" 
                component={LoginScreen}
                options={{ title: 'Sign In' }}
              />
              <Stack.Screen 
                name="Register" 
                component={RegisterScreen}
                options={{ title: 'Create Account' }}
              />
              <Stack.Screen 
                name="Settings" 
                component={SettingsScreen}
                options={{ title: 'Settings' }}
              />
              <Stack.Screen 
                name="Help" 
                component={HelpScreen}
                options={{ title: 'Help Center' }}
              />
              <Stack.Screen 
                name="Compare" 
                component={CompareScreen}
                options={{ title: 'Feature Comparison' }}
              />
              <Stack.Screen 
                name="SummaryDetail" 
                component={SummaryDetailScreen}
                options={{ title: 'Summary Details' }}
              />
              <Stack.Screen 
                name="LanguageMenu" 
                component={LanguageMenuScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar style="light" />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}