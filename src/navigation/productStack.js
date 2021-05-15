import React, {useEffect, useState} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
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

function CustomDrawerContent() {
  const [detail, setDetail] = useState('');
  let radioItems = [
    'Today',
    'Yesterday',
    'Week',
    'Current month',
    'Last month',
    'Custom period',
  ];
  const [radioSelection, setRadioSelection] = useState(
    Array(radioItems.length).fill(false),
  );
  const [timeSelection, setTimeSelection] = useState('Today');
  const [timeRange, setTimeRange] = useState({});
  const [currentTracker, setCurrentTracker] = useState();
  const [detailsLoaded, setDetailsLoaded] = useState(false);
  const [testT, setTestT] = useState({});
  const [tracks, setTracks] = useState([]);
  const [rawTracks, setRawTracks] = useState([]);
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const createDate = () => {
    let event = new Date(Date.now());
    let offset = event.getTimezoneOffset() / 60;
    event.setHours(offset * -1, 0, 0);
    return event;
  };

  const initTimeSettings = () => {
    let timeSettings = {};
    // From beginning of day till now
    let toDate = createDate();
    timeSettings.Today = {from: toDate, to: new Date(Date.now())};
    // From beginning to end of yesterday
    timeSettings.Yesterday = {
      from: new Date(createDate().setDate(toDate.getDate() - 1)),
      to: toDate,
    };
    // From Beginning of this week to today
    timeSettings.Week = {
      from: new Date(createDate().setDate(toDate.getDate() - 7)),
      to: toDate,
    };
    // From Beginning of this month to today
    let monthDate = new Date(createDate().setDate(1));
    timeSettings['Current month'] = {from: monthDate, to: toDate};
    // From Beginning to end of last month
    let lastMonthDate = new Date(createDate().setDate(1));
    timeSettings['Last month'] = {
      from: lastMonthDate.setMonth(monthDate.getMonth() - 1),
      to: monthDate,
    };
    setTimeRange(timeSettings);
  };

  const updateRadioButtons = (index) => {
    let newRadio = Array(radioItems.length).fill(false);
    newRadio[index] = true;
    setRadioSelection(newRadio);
    setTimeSelection(radioItems[index]);
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
    // detail.screen
    if (detail.screen === 'Tracks') {
      API.getTracks(
        currentTracker.id,
        timeRange[timeSelection].from
          .toISOString()
          .replace('T', ' ')
          .substr(0, 19),
        timeRange[timeSelection].to
          .toISOString()
          .replace('T', ' ')
          .substr(0, 19),
      )
        .then((trackList) => {
          setTracks(trackList);
          // TODO TEMP DATA
          let testlist = [
            {
              id: 123456,
              start_date: '2020-09-23 03:39:44',
              start_address: '1255 6th Ave, New York, NY 10020, USA',
              max_speed: 62,
              end_date: '2020-09-23 06:39:44',
              end_address: '888 5th Ave, New York, NY 10021, USA',
              length: 5.5,
              points: 327,
              avg_speed: 49,
              event_count: 3,
              norm_fuel_consumed: 1.07,
              type: 'regular',
              gsm_lbs: false,
            },
            {
              id: 123456,
              start_date: '2020-10-24 03:39:44',
              start_address: '1255 6th Ave, New York, NY 10020, USA',
              max_speed: 62,
              end_date: '2020-10-24 06:39:44',
              end_address: '888 5th Ave, New York, NY 10021, USA',
              length: 5.5,
              points: 327,
              avg_speed: 49,
              event_count: 3,
              norm_fuel_consumed: 1.07,
              type: 'regular',
              gsm_lbs: false,
            },
            {
              id: 123456,
              start_date: '2020-09-23 03:39:44',
              start_address: '1255 6th Ave, New York, NY 10020, USA',
              max_speed: 62,
              end_date: '2020-09-23 06:39:44',
              end_address: '888 5th Ave, New York, NY 10021, USA',
              length: 5.5,
              points: 327,
              avg_speed: 49,
              event_count: 3,
              norm_fuel_consumed: 1.07,
              type: 'regular',
              gsm_lbs: false,
            },
          ];
          setTracks(Utils.sortIntoDateGroups(testlist));
          setRawTracks(countTracks(testlist));
          setDetailsLoaded(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (detail.screen === 'Events') {
      API.getEvents(
        currentTracker.id,
        timeRange[timeSelection].from
          .toISOString()
          .replace('T', ' ')
          .substr(0, 19),
        timeRange[timeSelection].to
          .toISOString()
          .replace('T', ' ')
          .substr(0, 19),
      )
        .then((eventList) => {
          setEvents(eventList);
        })
        .catch((error) => {
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
              <HeaderContainer>
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
              </HeaderContainer>
            );
          })}
          <GenericButton title="SHOW" onPress={showItems} />
          <Separator />
        </>
      ) : null}
      {detailsLoaded ? (
        <>
          <ClearButton onPress={() => setDetailsLoaded(false)} />
          {Object.keys(tracks).map((key) => {
            return (
              <>
                <DateLabel>{key.replace(/-/g, '.')}</DateLabel>
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
                <TotalText>{rawTracks[1]} km</TotalText>
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
  flex: 1;
  width: ${(props) => props.size || 28}px;
  height: ${(props) => props.size || 28}px;
  margin: ${(props) => props.margin || 10}px;
`;

const RadioContainer = styled.View`
  flex: 1;
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
