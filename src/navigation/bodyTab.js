import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';
import ProductStack from './productStack';

const Tab = createBottomTabNavigator();

export default function BodyTab({route, navigation}) {
  let isMounted = true;

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Product') {
            return <TabBarIcon source={require('../assets/home.png')} />;
          } else if (route.name === 'Search') {
            return <TabBarIcon source={require('../assets/search.png')} />;
          } else if (route.name === 'Cart') {
            return <TabBarIcon source={require('../assets/cart.png')} />;
          } else if (route.name === 'Favorites') {
            return <TabBarIcon source={require('../assets/favorite.png')} />;
          } else if (route.name === 'Orders') {
            return <TabBarIcon source={require('../assets/orders.png')} />;
          }
        },
      })}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#ffffff',
        inactiveTintColor: '#ffffff',
        style: {
          backgroundColor: '#333333',
          height: 50,
        },
      }}>
      <Tab.Screen
        name="Product"
        component={ProductStack}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="Search"
        component={ProductStack}
        options={{
          title: 'Search',
        }}
      />
      <Tab.Screen
        name="Cart"
        component={ProductStack}
        options={{
          title: 'Cart',
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={ProductStack}
        options={{
          title: 'Favorites',
        }}
      />
      <Tab.Screen
        name="Orders"
        component={ProductStack}
        options={{
          title: 'Orders',
        }}
      />
    </Tab.Navigator>
  );
}

function TabBarIcon(props) {
  return (
    <Container>
      <IconImage source={props.source} />
    </Container>
  );
}

const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

const IconImage = styled.Image`
  width: 20px;
  height: 20px;
`;
