import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BillingScreen from '../screens/billingScreen';
import SubscribeScreen from '../screens/subscribeScreen';
import SuccessScreen from '../screens/successScreen';

const Stack = createStackNavigator();

export default function BillingStack({route, navigation}) {
  //   const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="SubscribeScreen" headerMode="screen">
      <Stack.Screen
        name="Subscribe"
        component={SubscribeScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Billing"
        component={BillingScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Success"
        component={SuccessScreen}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
}
