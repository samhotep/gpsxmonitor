import React, {useEffect, useState} from 'react';
import {NativeEventEmitter, NativeModules, ToastAndroid} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import CheckBox from '@react-native-community/checkbox';
import SettingsScreen from '../screens/settingsScreen';
import HomeStack from '../navigation/homeStack';
import Separator from '../components/separators/separator';
import styled from 'styled-components';
import TrackItem from '../components/items/trackItem';
import RadioInput from '../components/inputs/radioInput';
import GenericButton from '../components/buttons/genericButton';
import API from '../api/api';
import Storage from '../storage/storage';
import Utils from '../utils/utils';
import ClearButton from '../components/buttons/clearButton';
import DrawerLoader from '../components/loaders/drawerLoader';
import EventItem from '../components/items/eventItem';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);

export default function ProductStack({route, navigation}) {
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      headerMode="screen"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerPosition="right">
      <Stack.Screen
        name="HomeScreen"
        component={HomeStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerShown: false,
          headerStyle: {
            backgroundColor: '#1e96dc',
          },
          headerTitleStyle: {
            color: '#ffffff',
          },
        }}
      />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  const [detail, setDetail] = useState('');
  let radioItems = [
    'Today',
    'Yesterday',
    'Week',
    'Current month',
    'Last month',
  ];
  const [timeSelection, setTimeSelection] = useState('Today');
  const [radioSelection, setRadioSelection] = useState(
    Array(radioItems.length).fill(false),
  );
  let checkItems = [
    'Split with parkings',
    'Show LBS',
    'Clustered',
    'Smart filter',
  ];
  const [checkSelection, setCheckSelection] = useState(
    Array(checkItems.length).fill(true),
  );
  const [customPeriodSelected, setCustomPeriodSelected] = useState(false);
  const [settingsSelected, setSettingsSelected] = useState(false);
  const [timeRange, setTimeRange] = useState({});
  const [currentTracker, setCurrentTracker] = useState();
  const [detailsLoaded, setDetailsLoaded] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [rawTracks, setRawTracks] = useState([]);
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateFrom, setDateFrom] = useState(new Date(Date.now()));
  const [dateTo, setDateTo] = useState(new Date(Date.now()));
  const [isDatePickerToVisible, setDatePickerToVisibility] = useState(false);
  const [isDatePickerFromVisible, setDatePickerFromVisibility] = useState(
    false,
  );

  const showDatePicker = (picker) => {
    if (picker === 1) {
      setDatePickerFromVisibility(true);
    } else if (picker === 2) {
      setDatePickerToVisibility(true);
    }
  };

  const hideDatePicker = (picker) => {
    if (picker === 1) {
      setDatePickerFromVisibility(false);
    } else if (picker === 2) {
      setDatePickerToVisibility(false);
    }
  };

  const handleConfirm = (date, picker) => {
    if (picker === 1) {
      setDateFrom(date);
    } else if (picker === 2) {
      setDateTo(date);
    }
    hideDatePicker(picker);
  };

  const initTimeSettings = () => {
    let timeSettings = {};
    let now = new Date(Date.now());
    let offset = now.getTimezoneOffset() / 60;
    now.setHours(now.getHours() + offset * -1);
    // From beginning of day till now
    let today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
    );
    timeSettings.Today = {
      from: today.toISOString(),
      to: now.toISOString(),
    };
    // From beginning to end of yesterday
    let yesterdayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1,
      offset * -1,
      0,
      0,
    );
    let yesterdayEnd = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      offset * -1 - 1,
      59,
      59,
    );
    timeSettings.Yesterday = {
      from: yesterdayStart.toISOString(),
      to: yesterdayEnd.toISOString(),
    };
    // From Beginning of this week to now
    let lastWeek = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 7,
      offset * -1,
      0,
      0,
    );
    timeSettings.Week = {
      from: lastWeek.toISOString(),
      to: now.toISOString(),
    };
    // From Beginning of this month to now
    let monthDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
      offset * -1,
      0,
      0,
    );
    timeSettings['Current month'] = {
      from: monthDate.toISOString(),
      to: now.toISOString(),
    };
    // From Beginning to end of last month
    let lastMonthStart = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1,
      offset * -1,
      0,
      0,
    );
    let lastMonthEnd = new Date(
      now.getFullYear(),
      now.getMonth(),
      0,
      offset * -1,
      59,
      59,
    );
    timeSettings['Last month'] = {
      from: lastMonthStart.toISOString(),
      to: lastMonthEnd.toISOString(),
    };
    setTimeRange(timeSettings);
  };

  const updateRadioButtons = (index) => {
    let newRadio = Array(radioItems.length).fill(false);
    newRadio[index] = true;
    setCustomPeriodSelected(false);
    setRadioSelection(newRadio);
    setTimeSelection(radioItems[index]);
  };

  const updateCheckButtons = (index) => {
    let newChecks = [...checkSelection];
    newChecks[index] = !newChecks[index];
    setCheckSelection(newChecks);
  };

  const countTracks = (trackList) => {
    let totalDistance = 0;
    let totalTime = 0;
    trackList.map((_, i) => {
      let start = new Date(_.start_date.replace(/-+/g, '/'));
      let end = new Date(_.end_date.replace(/-+/g, '/'));
      totalTime += end.getTime() - start.getTime();
      totalDistance += _.length;
    });
    totalTime = new Date(totalTime);
    return [trackList.length, totalDistance, totalTime];
  };

  const showItems = () => {
    setLoading(true);
    // TODO Fix time calculation bug
    if (detail.screen === 'Tracks') {
      let from;
      let to;
      if (customPeriodSelected) {
        from = dateFrom.toISOString().replace('T', ' ').substr(0, 19);
        to = dateTo.toISOString().replace('T', ' ').substr(0, 19);
      } else {
        from = timeRange[timeSelection].from.replace('T', ' ').substr(0, 19);
        to = timeRange[timeSelection].to.replace('T', ' ').substr(0, 19);
      }
      API.getTracks(
        currentTracker.id,
        from,
        to,
        checkSelection[0],
        checkSelection[1],
        checkSelection[2],
        checkSelection[3],
      )
        .then((trackList) => {
          setTracks(Utils.sortIntoDateGroups(trackList));
          setRawTracks(countTracks(trackList));
          if (trackList.length > 0) {
            setDetailsLoaded(true);
          } else {
            ToastAndroid.show(
              'No tracks in the specified period',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    } else if (detail.screen === 'Events') {
      API.getEvents(
        currentTracker.id,
        timeRange[timeSelection].from.replace('T', ' ').substr(0, 19),
        timeRange[timeSelection].to.replace('T', ' ').substr(0, 19),
      )
        .then((eventList) => {
          setEvents(Utils.sortIntoDateGroups(eventList, 'Events'));
          setDetailsLoaded(true);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  };

  const showNotifications = () => {};

  useEffect(() => {
    if (detail.screen === 'Notifications') {
      API.getNotifications()
        .then((result) => {
          setNotifications(result);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      initializeObjects();
      Storage.getCurrentTracker().then((tracker) => {
        setCurrentTracker(JSON.parse(tracker));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detail]);

  const initializeObjects = () => {
    setTracks([]);
    setEvents([]);
    setDetailsLoaded(false);
    initTimeSettings();
    updateRadioButtons(0);
  };

  useEffect(() => {
    // Listener for location update events in dashboard
    const eventListener = eventEmitter.addListener(
      'event.homeEvent',
      (event) => {
        setDetail(event);
        initializeObjects();
      },
    );
    return () => {
      eventListener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      // eslint-disable-next-line react-native/no-inline-styles
      contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
      {detail.screen === 'Events' && !detailsLoaded ? (
        <HeaderContainer>
          <ImageContainer
            resizeMode="contain"
            source={require('../assets/map_alert_grey.png')}
          />
          <Title>{detail.screen} for the period:</Title>
        </HeaderContainer>
      ) : null}
      {detail.screen === 'Tracks' && !detailsLoaded ? (
        <>
          <HeaderContainer>
            <ImageContainer
              resizeMode="contain"
              source={require('../assets/route_grey.png')}
            />
            <Title>{detail.screen} for the period:</Title>
          </HeaderContainer>
        </>
      ) : null}
      {detail.screen === 'Notifications' ? (
        <HeaderContainer>
          <ImageContainer resizeMode="contain" source={detail.icon} />
          <Title>{detail.screen} for the period:</Title>
        </HeaderContainer>
      ) : null}
      {detail.screen !== 'Notifications' && !detailsLoaded ? (
        <>
          <Separator />
          {radioItems.map((_, i) => {
            return (
              <RadioHeaderContainer
                onPress={() => {
                  updateRadioButtons(i);
                }}>
                <RadioContainer>
                  <RadioInput
                    color="#1e96dc"
                    selected={radioSelection[i]}
                    onPress={() => {
                      updateRadioButtons(i);
                    }}
                  />
                </RadioContainer>
                <Title size={14}>{_}</Title>
              </RadioHeaderContainer>
            );
          })}
          <RadioHeaderContainer
            onPress={() => {
              updateRadioButtons(10);
              setCustomPeriodSelected(!customPeriodSelected);
            }}>
            <RadioContainer>
              <RadioInput
                color="#1e96dc"
                selected={customPeriodSelected}
                onPress={() => {
                  updateRadioButtons(10);
                  setCustomPeriodSelected(!customPeriodSelected);
                }}
              />
            </RadioContainer>
            <Title size={14}>Custom period</Title>
          </RadioHeaderContainer>
          {customPeriodSelected ? (
            <DatePickerContainer>
              <RadioContainer>
                <ImageContainer
                  resizeMode="stretch"
                  size={50}
                  source={require('../assets/bracket.png')}
                />
              </RadioContainer>
              <DatePickerCol>
                <Button onPress={() => showDatePicker(1)}>
                  <DatePickerTitle size={14}>
                    {`${dateFrom
                      .toLocaleString('default', {
                        weekday: 'short',
                        month: 'short',
                      })
                      .substr(
                        4,
                        6,
                      )}, ${dateFrom.getFullYear()} ${dateFrom.toLocaleTimeString(
                      'en-US',
                      {
                        hour: 'numeric',
                        hour12: true,
                      },
                    )}`}
                  </DatePickerTitle>
                </Button>
                <Button onPress={() => showDatePicker(2)}>
                  <DatePickerTitle size={14}>
                    {`${dateTo
                      .toLocaleString('default', {
                        weekday: 'short',
                        month: 'short',
                      })
                      .substr(
                        4,
                        6,
                      )}, ${dateTo.getFullYear()} ${dateTo.toLocaleTimeString(
                      [],
                      {
                        hour: '2-digit',
                        minute: '2-digit',
                      },
                    )}`}
                  </DatePickerTitle>
                </Button>
              </DatePickerCol>
            </DatePickerContainer>
          ) : null}
          {detail.screen === 'Tracks' && (
            <>
              <RadioHeaderContainer
                onPress={() => {
                  setSettingsSelected(!settingsSelected);
                }}>
                <RadioContainer>
                  <ImageContainer
                    source={
                      settingsSelected
                        ? require('../assets/expand_less.png')
                        : require('../assets/expand_more.png')
                    }
                    resizeMode="cover"
                  />
                </RadioContainer>
                <Title size={14}>Settings</Title>
              </RadioHeaderContainer>
              {settingsSelected &&
                checkItems.map((_, i) => {
                  return (
                    <RadioHeaderContainer
                      onPress={() => {
                        updateCheckButtons(i);
                      }}>
                      <RadioContainer>
                        <CheckBox
                          disabled={false}
                          value={checkSelection[i]}
                          onValueChange={(newValue) => {
                            updateCheckButtons(i);
                          }}
                          tintColors={{true: '#1e96dc', false: '#1e96dc'}}
                        />
                      </RadioContainer>
                      <Title size={14}>{_}</Title>
                    </RadioHeaderContainer>
                  );
                })}
            </>
          )}

          <GenericButton title="SHOW" onPress={showItems} />
          <Separator />
          {loading ? <DrawerLoader /> : null}
        </>
      ) : null}
      {detailsLoaded && detail.screen === 'Tracks' ? (
        <>
          <ClearButton onPress={() => setDetailsLoaded(false)} />
          {Object.keys(tracks).map((key) => {
            let label = new Date(key);
            return (
              <>
                <DateLabel>{`${label.getDate()}.${
                  label.getMonth() + 1
                }.${label.getFullYear()}`}</DateLabel>
                {tracks[key].map((_, i) => {
                  return <TrackItem track={_} />;
                })}
              </>
            );
          })}
          <TotalContainer>
            <TotalText>Total: {rawTracks[0]} tracks</TotalText>
            <TotalContainerRow>
              <TotalContainerItem>
                <TotalImageContainer
                  source={require('../assets/route_total.png')}
                />
                <TotalText>{rawTracks[1].toFixed(1)} km</TotalText>
              </TotalContainerItem>
              <TotalContainerItem>
                <TotalImageContainer
                  source={require('../assets/time_grey.png')}
                />
                <TotalText>{`${rawTracks[2].getHours()} h ${rawTracks[2].getMinutes()} m`}</TotalText>
              </TotalContainerItem>
            </TotalContainerRow>
          </TotalContainer>
        </>
      ) : null}
      {detailsLoaded && detail.screen === 'Events' ? (
        <>
          <ClearButton onPress={() => setDetailsLoaded(false)} />
          {Object.keys(events).map((key) => {
            return (
              <>
                <DateLabel>{key.replace(/-/g, '.')}</DateLabel>
                {events[key].map((_, i) => {
                  return <EventItem event={_} />;
                })}
              </>
            );
          })}
        </>
      ) : null}
      <DateTimePickerModal
        isVisible={isDatePickerFromVisible}
        mode="datetime"
        onConfirm={(date) => handleConfirm(date, 1)}
        onCancel={() => hideDatePicker(1)}
      />
      <DateTimePickerModal
        isVisible={isDatePickerToVisible}
        mode="datetime"
        onConfirm={(date) => handleConfirm(date, 2)}
        onCancel={() => hideDatePicker(2)}
      />
    </Container>
  );
}

const Container = styled.ScrollView`
  flex-direction: column;
  background-color: transparent;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const ImageContainer = styled.Image`
  width: ${(props) => props.size || 28}px;
  height: ${(props) => props.size || 28}px;
  margin: ${(props) => props.margin || 10}px;
`;

const RadioHeaderContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const RadioContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: ${(props) => props.size || 28}px;
  height: ${(props) => props.size || 28}px;
  margin: ${(props) => props.margin || 10}px;
`;

const Title = styled.Text`
  flex: 5;
  font-family: 'Roboto-Regular';
  font-size: ${(props) => props.size || 18}px;
  color: ${(props) => props.color || '#202020'};
  margin: 5px;
`;

const DateLabel = styled.Text`
  width: 100%;
  font-family: 'Roboto-Regular';
  font-size: ${(props) => props.size || 14}px;
  font-weight: bold;
  color: #737373;
  border: 1px #d3d3d3;
  padding: 5px 5px 5px 15px;
  background-color: #e0e0e0;
`;

const TotalContainer = styled.View`
  flex-direction: column;
  background-color: #e0e0e0;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 5px;
`;

const TotalContainerRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TotalContainerItem = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TotalText = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: ${(props) => props.size || 14}px;
  color: ${(props) => props.color || '#8c8c8c'};
  font-weight: 700;
`;

const TotalImageContainer = styled.Image`
  width: ${(props) => props.size || 28}px;
  height: ${(props) => props.size || 28}px;
  margin: 5px;
`;

const DatePickerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const DatePickerCol = styled.View`
  flex: 5;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const DatePickerTitle = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: ${(props) => props.size || 18}px;
  color: ${(props) => props.color || '#1e96dc'};
  text-decoration: underline;
`;

const Button = styled.TouchableOpacity`
  flex: 5;
`;
