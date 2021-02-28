import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/homeScreen';
import HomeStack from '../navigation/homeStack';
import HeaderIcon from '../components/headers/headerIcon';
import styled from 'styled-components';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

export default function ProductStack({route, navigation}) {
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      headerMode="screen"
      drawerPosition="right">
      <Stack.Screen
        name="HomeScreen"
        component={HomeStack}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
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
