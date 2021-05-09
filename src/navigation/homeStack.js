import React, {useEffect, useState} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/homeScreen';
import DetailsScreen from '../screens/detailsScreen';
import HeaderIcon from '../components/headers/headerIcon';
import HeaderTitle from '../components/headers/headerTitle';
import styled from 'styled-components';

const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);

const Stack = createStackNavigator();

export default function HomeStack({route, navigation}) {
  //   const navigation = useNavigation();

  const updateDrawerScreen = (screen) => {
    eventEmitter.emit('event.homeEvent', {
      screen: screen,
    });
  };

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
              navigation={navigation}
              onPress={(event, screen) => {
                updateDrawerScreen(screen);
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
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{
          title: 'Object Details',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#1e96dc',
          },
          headerTitleStyle: {
            color: '#ffffff',
          },
          headerLeft: () => (
            <HeaderTitle
              source={require('../assets/back.png')}
              onPress={() => {
                navigation.goBack();
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
              onPress={() => {
                props.navigation.navigate('DetailsScreen');
              }}
            />
            <HeaderIcon
              size={25}
              margin={12}
              source={require('../assets/map_alert.png')}
              onPress={(event) => {
                props.onPress(event, 'Events');
              }}
            />
            <HeaderIcon
              size={25}
              margin={12}
              source={require('../assets/route.png')}
              onPress={(event) => {
                props.onPress(event, 'Tracks');
              }}
            />
          </>
        ) : null}
        <HeaderIcon
          size={25}
          margin={8}
          source={require('../assets/mail_warn.png')}
          onPress={(event) => {
            props.onPress(event, 'Notifications');
          }}
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
