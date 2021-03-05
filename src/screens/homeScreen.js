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
  const [location, setLocation] = useState({
    latitude: 2.6031808853,
    longitude: 31.9491958618,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const updateLocation = (newCoordinates) => {
    setLocation(newCoordinates);
  };

  useEffect(() => {
    // Listener for location update events
    const eventListener = eventEmitter.addListener(
      'event.trackerEvent',
      (coordinates) => {
        updateLocation(coordinates);
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
