import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EmployeeScreen from '../screens/employeeScreen';
import MessageScreen from '../screens/messageScreen';
import styled from 'styled-components';

const Stack = createStackNavigator();

export default function TaskStack({route, navigation}) {
  //   const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="EmployeeScreen" headerMode="screen">
      <Stack.Screen
        name="EmployeeScreen"
        component={EmployeeScreen}
        options={{
          headerShown: false,
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
          headerBackImage: () => (
            <ImageContainer source={require('../assets/back.png')} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

const ImageContainer = styled.Image`
  height: ${(props) => props.size || 24}px;
  width: ${(props) => props.size || 24}px;
`;
