import React, {useEffect, useState, useRef} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TaskScreen from '../screens/taskScreen';
import AssigneeScreen from '../screens/assigneeScreen';
import TaskDetailScreen from '../screens/taskDetailScreen';
import HeaderTitle from '../components/headers/headerTitle';
import LogoTitle from '../components/headers/logoTitle';
import styled from 'styled-components';

const Stack = createStackNavigator();

export default function TaskStack({route, navigation}) {
  //   const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="TaskScreen" headerMode="screen">
      <Stack.Screen
        name="TaskScreen"
        component={TaskScreen}
        options={{
          headerShown: false,
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
          headerTitle: (props) => <LogoTitle {...props} />,
        }}
      />
      <Stack.Screen
        name="AssigneeScreen"
        component={AssigneeScreen}
        options={{
          title: 'Select assignee',
          headerShown: true,
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
      <Stack.Screen
        name="TaskDetailScreen"
        component={TaskDetailScreen}
        options={{
          title: 'Task Details',
          headerShown: true,
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
