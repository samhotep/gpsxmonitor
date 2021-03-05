import React, {useState, useEffect, useCallback} from 'react';
import {createDrawerNavigator, useIsDrawerOpen} from '@react-navigation/drawer';
import {ToastAndroid} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import styled from 'styled-components/native';
import ProductStack from './productStack';
import CategoryItem from '../components/items/categoryItem';
import HeaderTitle from '../components/headers/headerTitle';
import HeaderIcon from '../components/headers/headerIcon';
import ListItem from '../components/items/listItem';
import Input from '../components/inputs/input';
import Utils from '../utils/utils';
import DrawerLoader from '../components/loaders/drawerLoader';
import API from '../api/api';

const Drawer = createDrawerNavigator();

const StackNavigator = createStackNavigator();

export default function Dashboard({route, navigation}) {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={ProductStack} />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent({navigation}) {
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const isDrawerOpen = useIsDrawerOpen();

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

  const getTrackersLocation = () => {
    API.getTrackerLocation().then((result) => {});
  };

  const createObjects = () => {
    // TODO Get objects from API
    setLoading(true);
    API.getGroups()
      .then((groups) => {
        return API.getTrackers().then((trackers) => {
          setData(Utils.createCategories(groups, trackers));
          setLoading(false);
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        ToastAndroid.show(
          'Network request failed',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
    // API.getTrackers().then((result) => {
    //   setData(result);
    //   API.getStates(Utils.getTrackerIDs(result)).then((response) => {
    //     // console.log(response);
    //   });
    //   setLoading(false);
    //   // console.log(Utils.getTrackerIDs(result));
    //   // let res = Utils.getCategories(result);
    //   // console.log(res);
    // });
  };

  useEffect(() => {
    if (isDrawerOpen) {
      console.log('foucs');
      createObjects();
    }
  }, [isDrawerOpen]);

  if (loading) {
    return <DrawerLoader />;
  }

  return (
    <DrawerContainer
      // eslint-disable-next-line react-native/no-inline-styles
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <HeaderTitle
        source={require('../assets/back.png')}
        onPress={() => {
          if (clicked) {
            setClicked(false);
          } else {
            navigation.goBack();
          }
        }}
        // TODO Create a search object here, that is toggled on and off by pressing search
        // and by pressing 'X'. It should change the keyboard icon to search
        header={
          clicked ? (
            <ExtrasContainer>
              <Input
                autoFocus={true}
                width={100}
                color="#ffffff"
                selectionColor={'#ffffff'}
                noBorder={true}
                placeholder="Search..."
                placeholderTextColor="#4fc3f7"
              />
            </ExtrasContainer>
          ) : null
        }
        extras={
          // TODO Use fuse.js to search objects
          // import Fuse from 'fuse.js';
          <ExtrasContainer>
            {clicked === false ? (
              <HeaderIcon
                source={require('../assets/search.png')}
                size={20}
                onPress={() => {
                  setClicked(true);
                }}
              />
            ) : null}
            <HeaderIcon source={require('../assets/filter.png')} size={20} />
          </ExtrasContainer>
        }
        label="Objects"
      />
      <DrawerHeaderContainer>
        <DrawerIcon source={require('../assets/account.png')} />
        <HeaderContent>
          <DrawerLabel bold="bold">Test Test</DrawerLabel>
          <DrawerLabel underline="underline" color="#4788c7">
            ID #365
          </DrawerLabel>
        </HeaderContent>
      </DrawerHeaderContainer>
      <DrawerContentContainer>
        {/* TODO Create color wheel that appends different colors for each object */}
        {data.map((category, i) => {
          return (
            <CategoryContainer>
              <CategoryItem
                text={`${category.title} (${category.trackers.length})`}
                color={`#${category.color}`}
              />
              {category.trackers.map((tracker, j) => {
                return (
                  <ListItem
                    key={tracker.id}
                    text={tracker.label}
                    color="green"
                    selected={false}
                    onPress={() => {}}
                  />
                );
              })}
            </CategoryContainer>
          );
        })}
      </DrawerContentContainer>
    </DrawerContainer>
  );
}

const DrawerContainer = styled.ScrollView`
  flex-direction: column;
`;

const DrawerIcon = styled.Image`
  height: ${(props) => props.size || 60}px;
  width: ${(props) => props.size || 60}px;
  margin: 10px;
`;

const DrawerLabel = styled.Text`
  font-weight: ${(props) => (props.bold ? props.bold : 'normal')};
  font-size: 14px;
  text-align: left;
  color: ${(props) => props.color || '#707070'};
  text-decoration: ${(props) => props.underline || 'none'};
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
  background-color: #ffffff;
`;

const ExtrasContainer = styled.View`
  flex-direction: row;
`;

const CategoryContainer = styled.View`
  flex-direction: column;
  width: 100%;
`;

// TODO Add get_states to API to get locations
let x = {
  success: true,
  user_time: '2014-07-09 07:50:58',
  state: {
    source_id: 65894,
    gps: {
      updated: '2013-02-19 10:48:08',
      signal_level: 25,
      location: {
        lat: 56.826068,
        lng: 60.594338,
      },
      heading: 45,
      speed: 20,
      alt: 10,
      precision: 50,
      gsm_lbs: false,
    },
    connection_status: 'active',
    movement_status: 'moving',
    gsm: {
      updated: '2013-02-19 10:48:08',
      signal_level: 70,
      network_name: 'T-MOBILE',
      roaming: false,
    },
    last_update: '2013-02-19 10:48:08',
    battery_level: 100,
    battery_update: '2013-02-19 10:48:08',
    inputs: [true, true, false],
    inputs_update: '2013-02-19 10:48:08',
    outputs: [true, true, false],
    outputs_update: '2013-02-19 10:48:08',
    additional: {
      hardware_key: {
        value: 564648745158875,
        updated: '2013-02-19 10:48:08',
      },
    },
  },
};

// TODO Add get last GPS point to API

let y = {
  success: true,
  value: {
    lat: 53.445181,
    lng: -2.276432,
    alt: 10,
    satellites: 8,
    get_time: '2011-06-18 03:39:44',
    address: '4B Albany Road, Manchester, Great Britain',
    heading: 298,
    speed: 70,
    precision: 100,
    gsm_lbs: true,
    parking: true,
  },
};
