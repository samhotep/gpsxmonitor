import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EmployeeScreen from '../screens/employeeScreen';
import MessageScreen from '../screens/messageScreen';
import HeaderTitle from '../components/headers/headerTitle';

const Stack = createStackNavigator();

export default function TaskStack({route, navigation}) {
  //   const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="EmployeeScreen" headerMode="screen">
      <Stack.Screen
        name="EmployeeScreen"
        component={EmployeeScreen}
        options={{
          headerTitle: 'Employees',
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
        name="MessageScreen"
        component={MessageScreen}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#1e96dc',
          },
          headerTitleStyle: {
            color: '#ffffff',
          },
        }}
      />
    </Stack.Navigator>
  );
}
