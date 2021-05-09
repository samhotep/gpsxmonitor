import React, {useEffect} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import SettingsScreen from '../screens/settingsScreen';
import HomeStack from '../navigation/homeStack';
import HeaderIcon from '../components/headers/headerIcon';
import styled from 'styled-components';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);

export default function ProductStack({route, navigation}) {
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      headerMode="screen"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerPosition="right">
      <Stack.Screen
        name="HomeScreen"
        component={HomeStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerShown: false,
          headerStyle: {
            backgroundColor: '#1e96dc',
          },
          headerTitleStyle: {
            color: '#ffffff',
          },
        }}
      />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent() {
  useEffect(() => {
    // Listener for location update events in dashboard
    const eventListener = eventEmitter.addListener(
      'event.homeEvent',
      (screen) => {
        console.log(screen);
      },
    );
    return () => {
      eventListener.remove();
    };
  }, []);
  return (
    <Container>
      <Title>Hello</Title>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const Title = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 18px;
  color: #808080;
`;
