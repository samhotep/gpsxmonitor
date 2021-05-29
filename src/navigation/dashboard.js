import React, {useState, useEffect, useRef} from 'react';
import {createDrawerNavigator, useIsDrawerOpen} from '@react-navigation/drawer';
import {
  Alert,
  Linking,
  NativeEventEmitter,
  NativeModules,
  ToastAndroid,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import styled from 'styled-components/native';
import ProductStack from './productStack';
import BillingStack from './billingStack';
import TaskStack from './taskStack';
import CategoryItem from '../components/items/categoryItem';
import DrawerTitle from '../components/headers/drawerTitle';
import ListItem from '../components/items/listItem';
import Utils from '../utils/utils';
import DrawerLoader from '../components/loaders/drawerLoader';
import API from '../api/api';
import lists from '../components/lists/lists';
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
      <Drawer.Screen name="Tasks" component={TaskStack} />
    </Drawer.Navigator>
  );
}
// Emitter for navigating to login on hash expiry
function CustomDrawerContent({navigation}) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [username, setUsername] = useState('');
  const [userID, setUserID] = useState(0);
  const [trackerStates, setTrackerStates] = useState([]);
  const [trackersList, setTrackersList] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const isDrawerOpen = useIsDrawerOpen();
  const searchRef = useRef();

  let tests = [
    {
      arrival_date: null,
      creation_date: '2020-04-07 13:19:01',
      description: 'Visiting URA',
      external_id: null,
      from: '2021-05-28 00:00:00',
      id: 1,
      label: 'Visiting URA',
      location: {
        address: 'Kampala, Central Region, Uganda, P.O. BOX 4365',
        lat: 0.33036264,
        lng: 32.63800979,
        radius: 50,
      },
      max_delay: 0,
      min_arrival_duration: 0,
      min_stay_duration: 0,
      origin: 'manual',
      status: 'assigned',
      status_change_date: null,
      stay_duration: 0,
      to: '2020-04-07 23:59:59',
      tracker_id: 6079,
      type: 'task',
      user_id: 1,
    },
    {
      arrival_date: null,
      creation_date: '2020-04-17 08:40:00',
      description: 'Delivery Parcels in Kampala',
      external_id: '45156',
      form: {
        created: '2020-04-17 08:40:00',
        description: '',
        fields: [Array],
        id: 7,
        label: 'Delivery Note',
        submit_in_zone: false,
        submit_location: [Object],
        submitted: null,
        task_id: 10,
        template_id: 5,
        values: null,
      },
      from: '2020-04-17 00:00:00',
      id: 10,
      label: 'Delivering parcels',
      location: {
        address: 'Kampala Road, Kampala, Uganda',
        lat: 0.3133012,
        lng: 32.5809105,
        radius: 150,
      },
      max_delay: 0,
      min_arrival_duration: 0,
      min_stay_duration: 0,
      origin: 'manual',
      status: 'assigned',
      status_change_date: null,
      stay_duration: 0,
      to: '2020-04-18 23:59:59',
      tracker_id: 6080,
      type: 'task',
      user_id: 1,
    },
    {
      arrival_date: null,
      creation_date: '2020-04-17 08:53:33',
      description: '',
      external_id: null,
      form: {
        created: '2020-04-17 08:53:33',
        description: '',
        fields: [Array],
        id: 8,
        label: 'New form',
        submit_in_zone: false,
        submit_location: [Object],
        submitted: null,
        task_id: 11,
        template_id: null,
        values: null,
      },
      from: '2020-04-17 00:00:00',
      id: 11,
      label: 'Power Reconnection',
      location: {
        address: 'Kampala, Uganda',
        lat: 0.3475964,
        lng: 32.5825197,
        radius: 150,
      },
      max_delay: 0,
      min_arrival_duration: 0,
      min_stay_duration: 0,
      origin: 'manual',
      status: 'unassigned',
      status_change_date: null,
      stay_duration: 0,
      to: '2020-04-17 23:59:59',
      tracker_id: null,
      type: 'task',
      user_id: 1,
    },
    {
      arrival_date: null,
      creation_date: '2021-05-29 08:53:33',
      description: '',
      external_id: null,
      form: {
        created: '2020-04-17 08:53:33',
        description: '',
        fields: [Array],
        id: 8,
        label: 'New form',
        submit_in_zone: false,
        submit_location: [Object],
        submitted: null,
        task_id: 11,
        template_id: null,
        values: null,
      },
      from: '2021-05-29 00:00:00',
      id: 11,
      label: 'Power Reconnection',
      location: {
        address: 'Kampala, Uganda',
        lat: 0.3475964,
        lng: 32.5825197,
        radius: 150,
      },
      max_delay: 0,
      min_arrival_duration: 0,
      min_stay_duration: 0,
      origin: 'manual',
      status: 'done',
      status_change_date: null,
      stay_duration: 0,
      to: '2021-05-30 23:59:59',
      tracker_id: 6080,
      type: 'task',
      user_id: 1,
    },
  ];

  const drawerItems = [
    {
      name: 'Chat messages',
      source: require('../assets/chat.png'),
      onPress: () => {
        // navigation.navigate('Tasks', {screen: 'TaskScreen'});
      },
    },
    {
      name: 'Tasks',
      source: require('../assets/tasks.png'),
      onPress: () => {
        navigation.navigate('Tasks', {screen: 'TaskScreen'});
      },
    },
    {
      name: 'Subscriptions',
      source: require('../assets/subs.png'),
      onPress: () => {
        navigation.navigate('Billing', {screen: 'Transactions'});
      },
    },
    {
      name: 'Support',
      source: require('../assets/help.png'),
      onPress: () => {
        // navigation.navigate('Billing', {screen: 'Transactions'});
      },
    },
    {
      name: 'Settings',
      source: require('../assets/gear.png'),
      onPress: () => {
        navigation.navigate('Home', {screen: 'SettingsScreen'});
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
    Storage.setCurrentTracker(tracker);
    // API.getTrackerLocation().then((result) => {});
    // On item press, get location, close drawer and update home screen marker
    eventEmitter.emit('event.trackerEvent', {
      data: {
        id: tracker.id,
        label: tracker.label,
        group_id: tracker.group_id,
        ...trackerStates[tracker.id],
      },
      trackers: trackersList,
      states: trackerStates,
    });
    navigation.toggleDrawer();
    createObjects();
  };

  const createObjects = () => {
    // TODO Load tasks from endpoint
    setLoading(true);
    let groups = [];
    let _trackers = [];
    API.getGroups()
      .then((result) => {
        groups = result;
        return API.getTrackers();
      })
      .then((trackers) => {
        Storage.setAllTrackers(trackers);
        setTrackersList(trackers);
        _trackers = trackers;
        // Get detailed state info for each tracker
        return API.getStates(Utils.getIDList(trackers));
      })
      .then((result) => {
        setTrackerStates(result.states);
        setData(Utils.createCategories(groups, _trackers));
        return API.getTasks();
      })
      .then((taskList) => {
        // Storage.setAllTasks(taskList);
        Storage.setAllTasks(tests);
        setLoading(false);
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
  };

  // TODO Create search function
  const searchTrackers = (term) => {
    for (const tracker in trackersList) {
      if (term === tracker) {
      }
      console.log(tracker);
    }
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
    Storage.getLastDate().then((date) => {
      if ((Date.now() - date > 120000 && isDrawerOpen) || date === null) {
        createObjects();
        Storage.setLastDate(Date.now());
      }
    });
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
      <DrawerTitle
        navigation={navigation}
        showSearch={showSearch}
        searchString={searchString}
        resetSearch={() => {
          if (showSearch) {
            setSearchString('');
            setShowSearch(false);
          } else {
            setShowSearch(true);
          }
        }}
        onChangeText={(text) => {
          //  TODO Search and filter trackers
          setSearchString(text);
        }}
      />
      <DrawerHeaderContainer>
        <DrawerIcon source={require('../assets/account.png')} />
        <HeaderContent>
          <DrawerLabel bold="bold">{username}</DrawerLabel>
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
                return (
                  <ListItem
                    key={tracker.id}
                    text={tracker.label}
                    color={() => {
                      return lists.statusColors[
                        trackerStates[tracker.id].connection_status
                      ].color;
                    }}
                    selected={false}
                    onPress={() => {
                      updateScreenLocation({...tracker, group: category.id});
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
                <DrawerLabel>{_.name}</DrawerLabel>
              </>
            </DrawerItemContainer>
          );
        })}
        <Button
          onPress={() => {
            Linking.openURL('https://fms-ecsafrica.com/privacy-policy-2/');
          }}>
          <PolicyText>Privacy policy</PolicyText>
        </Button>
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
  color: ${(props) => props.color || '#737373'};
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

const PolicyText = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: ${(props) => props.size || 14}px;
  color: ${(props) => props.color || '#1e96dc'};
  text-decoration: underline;
  width: 100%;
  text-align: center;
`;

const Button = styled.TouchableOpacity``;
