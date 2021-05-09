import React, {useEffect, useState} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import SettingsScreen from '../screens/settingsScreen';
import HomeStack from '../navigation/homeStack';
import HeaderIcon from '../components/headers/headerIcon';
import Separator from '../components/separators/separator';
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
  const [type, setType] = useState('');
  useEffect(() => {
    // Listener for location update events in dashboard
    const eventListener = eventEmitter.addListener(
      'event.homeEvent',
      (event) => {
        console.log(event.screen);
        setType(event.screen);
      },
    );
    return () => {
      eventListener.remove();
    };
  }, []);
  return (
    <Container>
      {type === 'Notifications' ? null : (
        <HeaderContainer>
          <ImageContainer
            resizeMode="contain"
            source={require('../assets/map_alert_grey.png')}
          />
          <Title>{type} for the period:</Title>
        </HeaderContainer>
      )}
      <Separator />
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const ImageContainer = styled.Image`
  flex: 1;
  width: ${(props) => props.size || 28}px;
  height: ${(props) => props.size || 28}px;
  margin: ${(props) => props.margin || 10}px;
`;

const Title = styled.Text`
  flex: 5;
  font-family: 'Roboto-Regular';
  font-size: 18px;
  color: #202020;
`;
