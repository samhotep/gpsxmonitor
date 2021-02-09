import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/homeScreen';
import HeaderIcon from '../components/headers/headerIcon';
import styled from 'styled-components';

const Stack = createStackNavigator();

export default function ProductStack(props) {
  const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="HomeScreen" headerMode="screen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: (props) => <LogoTitle title="Map" {...props} />,
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
                navigation.toggleDrawer();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function LogoTitle(props) {
  return (
    <Container>
      <Title>{props.title}</Title>
      <HeaderIcon
        size={25}
        margin={5}
        source={require('../assets/mail.png')}
        onPress={() => {}}
      />
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  background-color: transparent;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 18px;
  color: #ffffff;
`;

const ImageContainer = styled.Image`
  width: 20px;
  height: 20px;
  margin: 15px;
`;

const Button = styled.TouchableOpacity``;
