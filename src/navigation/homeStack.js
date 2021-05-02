import React, {useEffect, useState} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/homeScreen';
import HeaderIcon from '../components/headers/headerIcon';
import styled from 'styled-components';

const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);

const Stack = createStackNavigator();

export default function HomeStack({route, navigation}) {
  //   const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="HomeScreen" headerMode="screen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: (props) => (
            <LogoTitle
              title="Map"
              {...props}
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          ),
          headerStyle: {
            backgroundColor: '#1e96dc',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <HeaderIcon
              size={25}
              source={require('../assets/dash.png')}
              onPress={() => {
                let nav = navigation.dangerouslyGetParent();
                nav.toggleDrawer();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function LogoTitle(props) {
  const [showIcons, setShowIcons] = useState(false);

  useEffect(() => {
    // Listener for location update events in dashboard
    const eventListener = eventEmitter.addListener('event.trackerEvent', () => {
      setShowIcons(true);
    });
    return () => {
      eventListener.remove();
    };
  }, []);
  return (
    <Container>
      <Title>{props.title}</Title>
      <IconsContainer>
        {showIcons ? (
          <>
            <HeaderIcon
              size={25}
              margin={12}
              source={require('../assets/alert.png')}
              onPress={props.onPress}
            />
            <HeaderIcon
              size={25}
              margin={12}
              source={require('../assets/map_alert.png')}
              onPress={props.onPress}
            />
            <HeaderIcon
              size={25}
              margin={12}
              source={require('../assets/route.png')}
              onPress={props.onPress}
            />
          </>
        ) : null}
        <HeaderIcon
          size={25}
          margin={8}
          source={require('../assets/mail_warn.png')}
          onPress={props.onPress}
        />
      </IconsContainer>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  background-color: transparent;
  align-items: center;
  justify-content: space-between;
`;

const IconsContainer = styled.View`
  flex-direction: row;
  background-color: transparent;
  align-items: center;
  justify-content: flex-end;
`;

const Title = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 20px;
  color: #ffffff;
  font-weight: bold;
`;
