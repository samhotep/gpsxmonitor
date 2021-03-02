import React, {useState, useEffect} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import styled from 'styled-components/native';
import ProductStack from './productStack';

const Drawer = createDrawerNavigator();

const StackNavigator = createStackNavigator();

export default function Dashboard({route, navigation}) {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={CustomDrawerContent}>
      <Drawer.Screen name="Home" component={ProductStack} />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  //   const confirmLogout = () =>
  //     Alert.alert(
  //       "Logout",
  //       "Are you sure?",
  //       [
  //         {
  //           text: "Cancel",
  //           onPress: () => console.log("Cancel Pressed"),
  //           style: "cancel",
  //         },
  //         {
  //           text: "OK",
  //           onPress: () => {
  //             console.log("OK Pressed");
  //             props.navigation.reset({
  //               index: 0,
  //               routes: [
  //                 {
  //                   name: "Auth",
  //                   state: {
  //                     routes: [
  //                       {
  //                         name: "Login",
  //                       },
  //                     ],
  //                   },
  //                 },
  //               ],
  //             });
  //           },
  //         },
  //       ],
  //       { cancelable: false }
  //     );

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <DrawerHeaderContainer>
        <DrawerIcon source={require('../assets/account.png')} />
        <HeaderContent>
          <DrawerLabel bold="bold">Test Test</DrawerLabel>
          <DrawerLabel>ID #365</DrawerLabel>
        </HeaderContent>
      </DrawerHeaderContainer>
    </DrawerContentScrollView>
  );
}

const DrawerIcon = styled.Image`
  height: ${(props) => props.size || 60}px;
  width: ${(props) => props.size || 60}px;
  margin: 10px;
`;

const DrawerLabel = styled.Text`
  font-weight: ${(props) => (props.bold ? props.bold : 'normal')};
  font-size: 14px;
  text-align: left;
  color: #707070;
`;

const DrawerHeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const HeaderContent = styled.View`
  flex-direction: column;
`;

const DrawerContentContainer = styled.ScrollView`
  flex-grow: 1;
  background-color: #ffebee;
`;
