import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TaskScreen from '../screens/taskScreen';
import HeaderTitle from '../components/headers/headerTitle';

const Stack = createStackNavigator();

export default function TaskStack({route, navigation}) {
  //   const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="TaskScreen" headerMode="screen">
      <Stack.Screen
        name="TaskScreen"
        component={TaskScreen}
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
    </Stack.Navigator>
  );
}
