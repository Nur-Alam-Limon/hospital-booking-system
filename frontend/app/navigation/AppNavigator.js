import React, { useEffect, useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import { clearToken, getToken } from '../utils/auth';
import { Ionicons } from '@expo/vector-icons'; 
import CreateHospitalScreen from '../screens/CreateHospitalScreen';
import ShowBookingsScreen from '../screens/ShowBookingScreen';
import { Button, View } from 'react-native';
import { AuthContext } from '../utils/AuthContext';
import BookingScreen from '../screens/BookingScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {

  const handleLogout = async () => {
    await clearToken();
    setIsAuthenticated(false);
  };
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
            <Button onPress={() => {
              handleLogout();
            }} 
            title="Logout" 
            color="#4f46e5" 
            />
          </View>
        ),
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Create') iconName = 'add-circle';
          else if (route.name === 'Bookings') iconName = 'clipboard';
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4f46e5',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Create" component={CreateHospitalScreen} />
      <Tab.Screen name="Bookings" component={ShowBookingsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    getToken().then(token => setIsAuthenticated(!!token));
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: !isAuthenticated }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Main" component={BottomTabs} />
          <Stack.Screen name="Book" component={BookingScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
