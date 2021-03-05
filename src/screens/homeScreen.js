import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import {useWindowDimensions} from 'react-native';
import MapView from 'react-native-maps';

const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);

// TODO Pass the location as a state prop, or as an event emitter
export default function HomeScreen({navigation}) {
  const window = useWindowDimensions();
  const [currentTracker, setCurrentTracker] = useState();
  const [location, setLocation] = useState({
    latitude: 2.6031808853,
    longitude: 31.9491958618,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const updateLocation = (newCoordinates) => {
    console.log('New Location Received');
    setLocation(newCoordinates);
  };

  useEffect(() => {
    // Listener for location update events
    const eventListener = eventEmitter.addListener(
      'event.trackerEvent',
      (trackerData) => {
        setCurrentTracker(trackerData);
        updateLocation({
          latitude: trackerData.gps.location.lat,
          longitude: trackerData.gps.location.lng,
          latitudeDelta: 0.1,
          longitudeDelta: 0.05,
        });
      },
    );
    return () => {
      eventListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4788c7" />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 2.6031808853,
          longitude: 31.9491958618,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={location}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

let p = {
  actual_track_update: '2020-08-31 20:18:40',
  additional: {
    external_power_state: {updated: '2021-03-05 15:58:40', value: '1'},
    gps_antenna_state: {updated: '2021-03-05 15:58:40', value: '1'},
    gsm_damp_state: {updated: '2021-03-05 15:58:40', value: '0'},
  },
  battery_level: 0,
  battery_update: '2021-03-05 15:58:40',
  connection_status: 'active',
  gps: {
    alt: 1119,
    heading: 0,
    location: {lat: 2.238262891769409, lng: 32.89451217651367},
    signal_level: 100,
    speed: 0,
    updated: '2021-03-05 15:58:40',
  },
  gsm: {
    network_name: 'MTN',
    roaming: null,
    signal_level: 100,
    updated: '2021-03-05 15:58:40',
  },
  inputs: [false, false, false, false, false],
  inputs_update: '2021-03-05 15:58:40',
  last_update: '2021-03-05 15:59:35',
  movement_status: 'parked',
  outputs: [false, false, false],
  outputs_update: '2021-03-05 15:58:40',
  source_id: 991,
};
