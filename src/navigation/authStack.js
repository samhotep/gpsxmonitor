import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import LoginScreen from '../screens/loginScreen';
import PasswordResetScreen from '../screens/passwordResetScreen';
import Dashboard from './dashboard';
import HeaderIcon from '../components/headers/headerIcon';

const Stack = createStackNavigator();

export default function AuthStack({route, navigation}) {
  // const navigation = useNavigation();
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ff1389',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          textAlign: 'center',
          fontSize: 40,
          marginTop: 120,
        },
      }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#ffffff',
            elevation: 0,
          },
          headerLeft: () => (
            <HeaderIcon source={require('../assets/qrcode.png')} />
          ),
          headerRight: () => (
            <HeaderIcon
              source={require('../assets/settings.png')}
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Reset"
        component={PasswordResetScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        navigationOptions={{
          drawerLockMode: 'locked-closed',
        }}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
