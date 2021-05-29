import React, {useState, useEffect} from 'react';
import {ToastAndroid, useWindowDimensions} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AuthStack from './authStack';
import Dashboard from './dashboard';
import SettingsScreen from '../screens/settingsScreen';
import FloatingLoader from '../components/loaders/floatingLoader';
import API from '../api/api';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

function SettingsDrawer({route, navigation}) {
  const window = useWindowDimensions();
  return (
    <Drawer.Navigator
      initialRouteName="Auth"
      edgeWidth={0}
      drawerPosition="right"
      // eslint-disable-next-line react-native/no-inline-styles
      drawerStyle={{
        backgroundColor: '#ffffff',
        width: window.width,
      }}
      drawerContent={(props) => <SettingsScreen {...props} />}>
      <Drawer.Screen
        name="Auth"
        component={AuthStack}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}

export default function MainStack({route, navigation}) {
  const [loggedIn, setLoggedIn] = useState();
  const [subscribed, setSubscribed] = useState();
  const [loading, setLoading] = useState(true);

  /**
   * Check if the user session is still valid, if not then redirect to the home page
   */
  useEffect(() => {
    API.checkIn()
      .then((result) => {
        if (result === true) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
        return API.authenticateBilling();
      })
      .then((result) => {
        if (result !== 400) {
          if (result.isSubscriptionValid === true) {
            setSubscribed(true);
          } else {
            setSubscribed(false);
          }
        } else {
          setSubscribed(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        ToastAndroid.show(
          error.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
  }, []);

  if (loading) {
    return <FloatingLoader />;
  }

  return (
    <Stack.Navigator initialRouteName="Main">
      {loggedIn && subscribed ? (
        <Stack.Screen
          name="Main"
          component={Dashboard}
          options={{headerShown: false}}
        />
      ) : null}
      <Stack.Screen
        name="Settings"
        component={SettingsDrawer}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
