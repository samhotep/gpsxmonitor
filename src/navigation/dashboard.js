import React, {useState, useEffect} from 'react';
import {createDrawerNavigator, useIsDrawerOpen} from '@react-navigation/drawer';
import {
  Alert,
  NativeEventEmitter,
  NativeModules,
  ToastAndroid,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import styled from 'styled-components/native';
import ProductStack from './productStack';
import BillingStack from './billingStack';
import CategoryItem from '../components/items/categoryItem';
import HeaderTitle from '../components/headers/headerTitle';
import HeaderIcon from '../components/headers/headerIcon';
import ListItem from '../components/items/listItem';
import Input from '../components/inputs/input';
import Utils from '../utils/utils';
import DrawerLoader from '../components/loaders/drawerLoader';
import API from '../api/api';
import Storage from '../storage/storage';
import Separator from '../components/separators/separator';

const Drawer = createDrawerNavigator();

const StackNavigator = createStackNavigator();

const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);

export default function Dashboard({route, navigation}) {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={ProductStack} />
      <Drawer.Screen name="Billing" component={BillingStack} />
    </Drawer.Navigator>
  );
}
// TODO Timer to prevent too many rerenders
// Emitter for navigating to login on hash expiry
function CustomDrawerContent({navigation}) {
  const [clicked, setClicked] = useState(false);
  const [username, setUsername] = useState('');
  const [userID, setUserID] = useState(0);
  const [trackerStates, setTrackerStates] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatedDate, setUpdatedDate] = useState(Date.now());
  const isDrawerOpen = useIsDrawerOpen();

  const drawerItems = [
    {
      name: 'Subscriptions',
      source: require('../assets/subs.png'),
      onPress: () => {
        navigation.navigate('Billing', {screen: 'Transactions'});
      },
    },
    {
      name: 'Logout',
      source: require('../assets/logout.png'),
      onPress: () => confirmLogout(),
    },
  ];

  const confirmLogout = () =>
    Alert.alert(
      'Logout',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Logout Cancelled'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            console.log('Logged Out');
            Storage.removeUserToken();
            Storage.removeBillingToken();
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'Settings',
                  state: {
                    routes: [
                      {
                        name: 'Login',
                      },
                    ],
                  },
                },
              ],
            });
          },
        },
      ],
      {cancelable: false},
    );

  const updateScreenLocation = (tracker) => {
    // API.getTrackerLocation().then((result) => {});
    // On item press, get location, close drawer and update home screen marker
    eventEmitter.emit('event.trackerEvent', {
      label: tracker.label,
      id: tracker.id,
      ...trackerStates[tracker.id],
    });
    navigation.toggleDrawer();
  };

  const createObjects = () => {
    setLoading(true);
    API.getGroups()
      .then((groups) => {
        return API.getTrackers().then((trackers) => {
          setData(Utils.createCategories(groups, trackers));
          // Get detailed state info for each tracker
          API.getStates(Utils.getIDList(trackers)).then((result) => {
            setTrackerStates(result.states);
          });
          setLoading(false);
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        ToastAndroid.show(
          error.message,
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
    // Load objects on first render
    API.getUserInfo().then((result) => {
      setUsername(result.user_info.title);
      setUserID(result.user_info.id);
    });
    createObjects();
  }, []);

  useEffect(() => {
    // Update only after 3 min delay
    if (Date.now() - updatedDate > 180000 && isDrawerOpen) {
      createObjects();
      setUpdatedDate(Date.now());
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
        header={
          clicked ? (
            <ExtrasContainer>
              <Input
                autoFocus={true}
                width={120}
                margin={5}
                color="#ffffff"
                selectionColor={'#ffffff'}
                noBorder={true}
                placeholder="Search..."
                placeholderTextColor="#8bc9ed"
              />
              <HeaderIcon
                source={require('../assets/close.png')}
                size={18}
                margin={5}
                onPress={() => {
                  setClicked(false);
                }}
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
          <DrawerLabel bold="bold">{username}</DrawerLabel>
          {/* TODO Use real user id  */}
          <DrawerLabel underline="underline" color="#4788c7">
            ID #{userID}
          </DrawerLabel>
        </HeaderContent>
      </DrawerHeaderContainer>
      <DrawerContentContainer>
        {data.map((category, i) => {
          return (
            <CategoryContainer>
              <CategoryItem
                text={`${category.title} (${category.trackers.length})`}
                color={`#${category.color}`}
              />
              {/* TODO Create refs for selection of item */}
              {category.trackers.map((tracker, j) => {
                let state = trackerStates[tracker.id].connection_status;
                console.log(state);
                let color = '#e11616';
                if (state === 'active') {
                  color = '#69ce02';
                } else if (state === 'just_registered') {
                  color = '#999999';
                }
                return (
                  <ListItem
                    key={tracker.id}
                    text={tracker.label}
                    color={color}
                    selected={false}
                    onPress={() => {
                      updateScreenLocation(tracker);
                    }}
                  />
                );
              })}
            </CategoryContainer>
          );
        })}
        <Separator />
        {drawerItems.map((_, i) => {
          return (
            <DrawerItemContainer
              activeOpacity={0.6}
              underlayColor="#b5dbf1"
              onPress={_.onPress}>
              <>
                <DrawerIcon source={_.source} size={24} margin={10} />
                <DrawerLabel bold="bold">{_.name}</DrawerLabel>
              </>
            </DrawerItemContainer>
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
  margin: ${(props) => props.margin || 10}px;
`;

const DrawerLabel = styled.Text`
  font-weight: ${(props) => (props.bold ? props.bold : 'normal')};
  font-size: 14px;
  text-align: left;
  color: ${(props) => props.color || '#707070'};
  text-decoration: ${(props) => props.underline || 'none'};
  margin: 5px;
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
  align-items: center;
`;

const CategoryContainer = styled.View`
  flex-direction: column;
  width: 100%;
`;

const DrawerItemContainer = styled.TouchableHighlight`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 5px;
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
