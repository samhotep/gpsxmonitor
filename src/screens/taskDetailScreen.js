import React, {useEffect, useState} from 'react';
import {
  Alert,
  StatusBar,
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import styled from 'styled-components';
import DrawerLoader from '../components/loaders/drawerLoader';
import DetailItem from '../components/items/detailItem';

const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);

export default function TaskDetailScreen({route, navigation}) {
  let {task, tracker} = route.params;
  const [loading, setLoading] = useState(true);
  let fromDate = new Date(task.from.replace(/-+/g, '/'));
  let toDate = new Date(task.to.replace(/-+/g, '/'));
  let highAccuracy = true;
  let forceLocation = true;
  let locationDialog = true;

  const details = [
    {
      label: task.label,
      detail: task.status,
      color: '#4788c7',
      size: 22,
      front_icon: require('../assets/circle.png'),
    },
    {
      detail: tracker.label,
      color: '#000000',
      size: 22,
      front_icon: require('../assets/user_assignee.png'),
    },
    {
      label: task.location.address,
      color: '#000000',
      size: 14,
      front_icon: require('../assets/pin.png'),
      back_icon: require('../assets/directions.png'),
      onPress: () => getLocation(),
    },
    {
      label: `${fromDate.toLocaleDateString()} ${fromDate
        .toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
        .slice(0, -3)} - ${toDate.toLocaleDateString()} ${toDate
        .toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
        .slice(0, -3)}`,
      color: '#000000',
      size: 14,
      front_icon: require('../assets/calendar.png'),
    },
    {
      label: task.description,
      color: '#000000',
      size: 14,
      front_icon: require('../assets/clipboard.png'),
    },
  ];

  const hasLocationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        sendRouteEvent(
          {lat: task.location.lat, lng: task.location.lng},
          {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        );
      },
      (error) => {
        Alert.alert(`Code ${error.code}`, error.message);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: highAccuracy,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: forceLocation,
        showLocationDialog: locationDialog,
      },
    );
  };

  const sendRouteEvent = (start, end) => {
    eventEmitter.emit('event.taskEvent', {
      start: start,
      end: end,
    });
    setTimeout(() => {
      navigation.navigate('HomeScreen');
    }, 100);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Container>
        <StatusBar backgroundColor="#007aa6" />
        <DrawerLoader />
      </Container>
    );
  }

  return (
    <Container>
      {details.map((detail, i) => {
        return (
          <DetailItem
            header={detail.label}
            detail={detail.detail}
            color={detail.color}
            size={detail.size}
            front_icon={detail.front_icon}
            back_icon={detail.back_icon}
            onPress={detail.onPress}
          />
        );
      })}
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #ffffff;
  height: 100%;
`;
