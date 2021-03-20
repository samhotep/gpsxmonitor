import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/homeScreen';
import HeaderIcon from '../components/headers/headerIcon';
import styled from 'styled-components';

const Stack = createStackNavigator();

export default function HomeStack({route, navigation}) {
  //   const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="HomeScreen" headerMode="screen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: (props) => (
            <LogoTitle
              title="Map"
              {...props}
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          ),
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
                let nav = navigation.dangerouslyGetParent();
                nav.toggleDrawer();
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
        source={require('../assets/mail_warn.png')}
        onPress={props.onPress}
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
  font-size: 20px;
  color: #ffffff;
  font-weight: bold;
`;

let x = {
  success: true,
  list: [
    {
      id: 250,
      label: 'M09-UAP 935Z',
      group_id: 15,
      source: {
        id: 244,
        device_id: '866795035815966',
        model: 'bce_fms500_one',
        blocked: false,
        tariff_id: 2,
        phone: '256707653534',
        status_listing_id: null,
        creation_date: '2020-04-23',
        tariff_end_date: '2020-04-24',
      },
      tag_bindings: [],
      clone: false,
    },
    {
      id: 251,
      label: 'M10-UAR 662V',
      group_id: 15,
      source: {
        id: 245,
        device_id: '866795035826013',
        model: 'bce_fms500_one',
        blocked: false,
        tariff_id: 2,
        phone: '256707653531',
        status_listing_id: null,
        creation_date: '2020-04-23',
        tariff_end_date: '2020-04-24',
      },
      tag_bindings: [],
      clone: false,
    },
    {
      id: 274,
      label: 'UBG 066T Toyota Hillux',
      group_id: 5,
      source: {
        id: 268,
        device_id: '861230049838197',
        model: 'bce_fms500_lightplus',
        blocked: false,
        tariff_id: 2,
        phone: '256707653609',
        status_listing_id: null,
        creation_date: '2020-04-24',
        tariff_end_date: '2020-04-25',
      },
      tag_bindings: [],
      clone: false,
    },
    {
      id: 557,
      label: '2010104 - URA MALABA CUSTOMS',
      group_id: 2,
      source: {
        id: 4,
        device_id: '864626044880224',
        model: 'bce_fms500_lightplus',
        blocked: false,
        tariff_id: 2,
        phone: '256770420898',
        status_listing_id: null,
        creation_date: '2020-03-27',
        tariff_end_date: '2020-03-28',
      },
      tag_bindings: [],
      clone: true,
    },
    {
      id: 3282,
      label: '2010094 - URA LIRA GENSET',
      group_id: 2,
      source: {
        id: 991,
        device_id: '860922040727459',
        model: 'bce_fms500_lightplus',
        blocked: false,
        tariff_id: 2,
        phone: '256784301180',
        status_listing_id: null,
        creation_date: '2020-09-02',
        tariff_end_date: '2020-09-03',
      },
      tag_bindings: [],
      clone: true,
    },
    {
      id: 3369,
      label: '2010093 - URA ELEGU GENSET',
      group_id: 2,
      source: {
        id: 992,
        device_id: '860922041049242',
        model: 'bce_fms500_lightplus',
        blocked: false,
        tariff_id: 2,
        phone: '256783849396',
        status_listing_id: null,
        creation_date: '2020-09-02',
        tariff_end_date: '2020-09-03',
      },
      tag_bindings: [],
      clone: true,
    },
    {
      id: 5013,
      label: '2010091 - URA BUSITEMA GENSET',
      group_id: 2,
      source: {
        id: 1341,
        device_id: '860922041069778',
        model: 'bce_fms500_lightplus',
        blocked: false,
        tariff_id: 2,
        phone: '882360012105187',
        status_listing_id: null,
        creation_date: '2020-12-04',
        tariff_end_date: '2020-12-05',
      },
      tag_bindings: [],
      clone: true,
    },
  ],
};

let y = {
  success: true,
  list: [
    {
      address: 'Gulu - Arua Rd, Anaka, Uganda',
      satellites: 15,
      get_time: '2021-02-26 08:06:10',
      mileage: 0.0,
      heading: 162,
      speed: 0,
      alt: 975,
      lat: 2.6031808853,
      lng: 31.9491958618,
    },
    {
      address: '',
      satellites: 15,
      get_time: '2021-02-26 08:06:26',
      mileage: 0.04,
      heading: 218,
      speed: 10,
      alt: 1011,
      lat: 2.6033108234,
      lng: 31.9488582611,
    },
    {
      address: '',
      satellites: 15,
      get_time: '2021-02-26 08:06:32',
      mileage: 0.08,
      heading: 216,
      speed: 20,
      alt: 1011,
      lat: 2.6030781269,
      lng: 31.9486865997,
    },
    {
      address: '',
      satellites: 15,
      get_time: '2021-02-26 08:06:42',
      mileage: 0.18,
      heading: 194,
      speed: 38,
      alt: 1011,
      lat: 2.6022884846,
      lng: 31.9481773376,
    },
    {
      address: '',
      satellites: 15,
      get_time: '2021-02-26 08:06:56',
      mileage: 0.28,
      heading: 176,
      speed: 25,
      alt: 1009,
      lat: 2.6013512611,
      lng: 31.9482059479,
    },
  ],
};
