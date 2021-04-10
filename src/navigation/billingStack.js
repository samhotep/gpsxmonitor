import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ConfirmationScreen from '../screens/confirmationScreen';
import SubscribeScreen from '../screens/subscribeScreen';
import SuccessScreen from '../screens/successScreen';
import HeaderTitle from '../components/headers/headerTitle';

const Stack = createStackNavigator();

export default function BillingStack({route, navigation}) {
  //   const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="Subscribe" headerMode="screen">
      <Stack.Screen
        name="Subscribe"
        component={SubscribeScreen}
        options={{
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
      <Stack.Screen
        name="Confirmation"
        component={ConfirmationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Success"
        component={SuccessScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
