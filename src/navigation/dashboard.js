/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {createDrawerNavigator, useIsDrawerOpen} from '@react-navigation/drawer';
import {
  Alert,
  Linking,
  NativeEventEmitter,
  NativeModules,
  ToastAndroid,
} from 'react-native';
import styled from 'styled-components/native';
import ProductStack from './productStack';
import BillingStack from './billingStack';
import TaskStack from './taskStack';
import MessageStack from './messageStack';
import CategoryItem from '../components/items/categoryItem';
import DrawerTitle from '../components/headers/drawerTitle';
import ListItem from '../components/items/listItem';
import FilterItem from '../components/items/filterItem';
import DetailModal from '../components/modals/detailModal';
import DrawerLoader from '../components/loaders/drawerLoader';
import Utils from '../utils/utils';
import lists from '../components/lists/lists';
import Storage from '../storage/storage';
import Separator from '../components/separators/separator';
import API from '../api/api';
import Fuse from 'fuse.js';

const Drawer = createDrawerNavigator();

const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);

export default function Dashboard({route, navigation}) {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={ProductStack} />
      <Drawer.Screen name="Billing" component={BillingStack} />
      <Drawer.Screen name="Tasks" component={TaskStack} />
      <Drawer.Screen name="Messages" component={MessageStack} />
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
  const [originalTrackersList, setOriginalTrackersList] = useState([]);
  const [trackerGroups, setTrackerGroups] = useState([]);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [supportString, setSupportString] = useState('');
  const [loading, setLoading] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterOptions, setFilterOptions] = useState(
    Array(Object.keys(lists.statusColors).length + 1).fill(true),
  );
  const isDrawerOpen = useIsDrawerOpen();

  const textOptions = {
    includeScore: true,
    threshold: 0.3,
    keys: ['label'],
  };

  const checkOptions = {
    includeScore: true,
    useExtendedSearch: true,
    threshold: 0.2,
    keys: ['connection_status'],
  };

  const textFuse = new Fuse(originalTrackersList, textOptions);

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

  let testemployees = [
    {
      department_id: null,
      driver_license_cats: '',
      driver_license_number: '',
      driver_license_valid_till: null,
      email: '',
      first_name: 'UNKNOWN DRIVER',
      hardware_key: '00001ACB4A9',
      id: 3471,
      last_name: '',
      middle_name: '',
      personnel_number: '',
      phone: '',
      tracker_id: null,
    },
    {
      department_id: null,
      driver_license_cats: '',
      driver_license_number: '',
      driver_license_valid_till: null,
      email: '',
      first_name: 'UNKNOWN DRIVER 2  ',
      hardware_key: '00001B77482A',
      id: 3474,
      last_name: '',
      middle_name: '',
      personnel_number: '',
      phone: '',
      tracker_id: null,
    },
    {
      department_id: null,
      driver_license_cats: '',
      driver_license_number: '',
      driver_license_valid_till: null,
      email: '',
      first_name: 'BARONGO OSCAR',
      hardware_key: '000018712582',
      id: 3475,
      last_name: '',
      middle_name: '',
      personnel_number: '',
      phone: '',
      tracker_id: null,
    },
    {
      department_id: null,
      driver_license_cats: '',
      driver_license_number: '',
      driver_license_valid_till: null,
      email: '',
      first_name: 'UNKNOWN DRIVER 3  ',
      hardware_key: '000017299E8',
      id: 3476,
      last_name: '',
      middle_name: '',
      personnel_number: '',
      phone: '',
      tracker_id: null,
    },
    {
      department_id: null,
      driver_license_cats: '',
      driver_license_number: '',
      driver_license_valid_till: null,
      email: '',
      first_name: 'Munabi Robert    ',
      hardware_key: '7FF0000FFC00',
      id: 3477,
      last_name: '',
      middle_name: '',
      personnel_number: '',
      phone: '',
      tracker_id: null,
    },
    {
      department_id: null,
      driver_license_cats: '',
      driver_license_number: '',
      driver_license_valid_till: null,
      email: '',
      first_name: 'Nagimesi Andrew   ',
      hardware_key: '000001B09A53',
      id: 3478,
      last_name: '',
      middle_name: '',
      personnel_number: '',
      phone: '',
      tracker_id: null,
    },
    {
      department_id: null,
      driver_license_cats: '',
      driver_license_number: '',
      driver_license_valid_till: null,
      email: '',
      first_name: 'KENNETH NIMWESIGE',
      hardware_key: '000017C005C',
      id: 3479,
      last_name: '',
      middle_name: '',
      personnel_number: '',
      phone: '',
      tracker_id: null,
    },
    {
      department_id: null,
      driver_license_cats: '',
      driver_license_number: '',
      driver_license_valid_till: null,
      email: '',
      first_name: 'MUGENYI ERIA',
      hardware_key: '0000114CC5C',
      id: 3483,
      last_name: '',
      middle_name: '',
      personnel_number: '',
      phone: '',
      tracker_id: null,
    },
    {
      department_id: null,
      driver_license_cats: '',
      driver_license_number: '',
      driver_license_valid_till: null,
      email: '',
      first_name: 'KAWEESA JAMES  ',
      hardware_key: '00001B774D32',
      id: 3484,
      last_name: '',
      middle_name: '',
      personnel_number: '',
      phone: '',
      tracker_id: null,
    },
    {
      department_id: null,
      driver_license_cats: '',
      driver_license_number: '',
      driver_license_valid_till: null,
      email: '',
      first_name: 'KASIM KASANA',
      hardware_key: '0000193D1410',
      id: 3485,
      last_name: '',
      middle_name: '',
      personnel_number: '',
      phone: '',
      tracker_id: null,
    },
    {
      department_id: null,
      driver_license_cats: '',
      driver_license_number: '',
      driver_license_valid_till: null,
      email: '',
      first_name: 'KAWEESI DERRICK',
      hardware_key: '00001B77BB2C',
      id: 3486,
      last_name: '',
      middle_name: '',
      personnel_number: '',
      phone: '',
      tracker_id: null,
    },
  ];

  const drawerItems = [
    {
      name: 'Chat messages',
      source: require('../assets/chat.png'),
      onPress: () => {
        navigation.navigate('Messages');
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
        setModalVisible(true);
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

  const filterByCheckBox = (id, value) => {
    let newfilter = [...filterOptions];
    if (id === 0) {
      if (value) {
        newfilter = Array(filterOptions.length).fill(true);
      } else {
        newfilter = Array(filterOptions.length).fill(false);
      }
    } else {
      newfilter[0] = false;
      newfilter[id] = value;
    }
    setFilterOptions(newfilter);

    let options = Object.keys(lists.statusColors);
    let optionFilter = [...newfilter];
    optionFilter.shift(0);
    optionFilter.map((_, i) => {
      if (_ === false) {
        options.splice(i, 1, null);
      }
    });
    options = options.filter((option) => {
      return option !== null;
    });
    let optionString = '';
    options.map((_, i) => {
      if (i === 0) {
        optionString += _;
      } else {
        optionString += ` | ${_}`;
      }
    });
    if (id === 0) {
      setTrackersList(originalTrackersList);
    } else {
      const checkFuse = new Fuse(
        Utils.trackerStatesToList(trackerStates),
        checkOptions,
      );

      let searchResults = [];
      const result = checkFuse.search(optionString);
      result.map((res, i) => {
        originalTrackersList.map((tracker, j) => {
          if (res.item.id === `${tracker.id}`) {
            searchResults.push(tracker);
          }
        });
      });
      setTrackersList(searchResults);
    }
    setFilterModalVisible(false);
  };

  const filterBySearch = () => {
    let searchResults = [];
    const result = textFuse.search(searchString);
    result.map((res, i) => {
      searchResults.push(res.item);
    });
    if (searchString === '') {
      setTrackersList(originalTrackersList);
    } else {
      setTrackersList(searchResults);
    }
  };

  const sendSupportEmail = () => {
    API.sendEmail(supportString)
      .then(() => {
        setModalVisible(false);
      })
      .catch((error) => {
        setModalVisible(false);
        ToastAndroid.show(
          error.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
  };

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

  const loadEssential = () => {
    // TODO Load tasks & employees from endpoint
    setLoading(true);
    API.getUserInfo()
      .then((result) => {
        setUsername(result.user_info.title);
        setUserID(result.user_info.id);
        return API.getGroups();
      })
      .then((groups) => {
        setTrackerGroups(groups);
        return API.getTrackers();
      })
      .then((trackers) => {
        Storage.setAllTrackers(trackers);
        setTrackersList(trackers);
        setOriginalTrackersList(trackers);
        return API.getStates(Utils.getIDList(trackers));
      })
      .then((result) => {
        setTrackerStates(result.states);
        return API.getTasks();
      })
      .then((taskList) => {
        // Storage.setAllTasks(taskList);
        Storage.setAllTasks(tests);
        return API.getEmployees();
      })
      .then((employeeList) => {
        // Storage.setAllEmployees(employeeList);
        Storage.setAllEmployees(testemployees);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        ToastAndroid.show(
          error.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
  };

  const createObjects = () => {
    let composite = Utils.createCategories(trackerGroups, trackersList);
    setData(composite);
  };

  useEffect(() => {
    filterBySearch();
  }, [searchString]);

  useEffect(() => {
    createObjects();
  }, [trackersList]);

  useEffect(() => {
    // Load objects on first render
    loadEssential();
  }, []);

  useEffect(() => {
    // Update only after 3 min delay
    Storage.getLastDate().then((date) => {
      if ((Date.now() - date > 120000 && isDrawerOpen) || date === null) {
        loadEssential();
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
          setSearchString(text);
        }}
        onFilter={() => {
          setFilterModalVisible(!filterModalVisible);
          setSearchString('');
          setShowSearch(false);
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
              android_ripple={{
                color: '#b5dbf1',
              }}
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
      <SupportModal
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <CenteredContainer>
          <ModalBody>
            <Text size={20} color="#000000" weight="bold">
              Support
            </Text>
            <Text size={16}>
              You can send message to tech support and receive the answer on
              email
            </Text>
            <SupportInput
              multiline
              size={16}
              placeholder="Type your question here"
              onChangeText={(text) => setSupportString(text)}
            />
            <ButtonContainer>
              <ModalButton onPress={() => setModalVisible(false)}>
                <Text color="#1e96dc" weight="bold">
                  CANCEL
                </Text>
              </ModalButton>
              <ModalButton onPress={sendSupportEmail}>
                <Text color="#1e96dc" weight="bold">
                  SEND
                </Text>
              </ModalButton>
            </ButtonContainer>
          </ModalBody>
        </CenteredContainer>
      </SupportModal>
      <DetailModal
        clicked={filterModalVisible}
        height={280}
        width={260}
        top={56}
        right={0}
        inject={
          <ModalContainer>
            <FilterItem
              text="All"
              value={filterOptions[0]}
              onValueChange={(value) => filterByCheckBox(0, value)}
            />
            <Separator />
            {Object.keys(lists.statusColors).map((_, i) => {
              return (
                <FilterItem
                  text={lists.statusColors[_].text}
                  color={lists.statusColors[_].color}
                  value={filterOptions[i + 1]}
                  onValueChange={(value) => filterByCheckBox(i + 1, value)}
                />
              );
            })}
          </ModalContainer>
        }
      />
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

const CategoryContainer = styled.View`
  flex-direction: column;
  width: 100%;
`;

const DrawerItemContainer = styled.Pressable`
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

const SupportModal = styled.Modal``;

const CenteredContainer = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalBody = styled.View`
  flex-direction: column;
  align-items: flex-start;
  height: 290px;
  width: 300px;
  padding: 10px;
  background-color: #ffffff;
  elevation: 20;
`;

const Text = styled.Text`
  text-align: left;
  line-height: ${(props) => props.size || 14}px;
  flex-wrap: wrap;
  font-weight: ${(props) => props.weight || 'normal'};
  font-size: ${(props) => props.size || 14}px;
  color: ${(props) => (props.color ? props.color : '#808080')};
  margin: ${(props) => props.margin || 15}px;
`;

const SupportInput = styled.TextInput.attrs({
  textAlignVertical: 'top',
})`
  flex-wrap: wrap;
  text-align: left;
  font-size: ${(props) => props.size || 14}px;
  color: ${(props) => (props.color ? props.color : '#808080')};
  border-radius: 1px;
  elevation: 1;
  width: 100%;
  height: 100px;
`;

const ModalButton = styled.TouchableOpacity``;

const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

const ModalContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 5px;
`;
