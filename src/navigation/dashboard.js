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
    </Drawer.Navigator>
  );
}
// Emitter for navigating to login on hash expiry
function CustomDrawerContent({navigation}) {
  const [clicked, setClicked] = useState(false);
  const [username, setUsername] = useState('');
  const [userID, setUserID] = useState(0);
  const [trackerStates, setTrackerStates] = useState([]);
  const [trackersList, setTrackersList] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    let groups = [];
    let _trackers = [];
    API.getGroups()
      .then((result) => {
        groups = result;
        return API.getTrackers();
      })
      .then((trackers) => {
        setTrackersList(trackers);
        _trackers = trackers;
        // Get detailed state info for each tracker
        return API.getStates(Utils.getIDList(trackers));
      })
      .then((result) => {
        setTrackerStates(result.states);
        setData(Utils.createCategories(groups, _trackers));
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
                      ];
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
