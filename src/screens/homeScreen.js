import React, {useEffect, useState, useRef} from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  StyleSheet,
  StatusBar,
  View,
  Text,
  Image,
} from 'react-native';
import MapView, {Animated, AnimatedRegion, Marker} from 'react-native-maps';
import HomeItem from '../components/items/homeItem';

const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);

// TODO Pass the location as a state prop, or as an event emitter
export default function HomeScreen({navigation}) {
  const [currentTracker, setCurrentTracker] = useState();
  const [currentMarker, setCurrentMarker] = useState({
    latitude: 2.6031808853,
    longitude: 31.9491958618,
  });
  const [latDelta, setLatDelta] = useState(0.05);
  const [longDelta, setLongDelta] = useState(0.05);
  const renderDelay = 2000;
  /**
   * Supported Map Types
   * - standard: standard road map (default)
   * - none: no map Note Not available on MapKit
   * - satellite: satellite view
   * - hybrid: satellite view with roads and points of interest overlayed
   * - terrain: topographic view
   */
  const [type, setType] = useState('standard');
  const mapRef = useRef();
  const markerRef = useRef();
  const [location, setLocation] = useState(
    new AnimatedRegion({
      latitude: 2.6031808853,
      longitude: 31.9491958618,
      latitudeDelta: 3,
      longitudeDelta: 0.5,
    }),
  );

  useEffect(() => {
    // Listener for location update events
    const eventListener = eventEmitter.addListener(
      'event.trackerEvent',
      (trackerData) => {
        console.log(trackerData);
        setCurrentTracker(trackerData);
        setLocation(
          new AnimatedRegion({
            latitude: trackerData.gps.location.lat,
            longitude: trackerData.gps.location.lng,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }),
        );
        setCurrentMarker({
          latitude: trackerData.gps.location.lat,
          longitude: trackerData.gps.location.lng,
        });
        mapRef.current.animateToRegion(
          {
            latitude: trackerData.gps.location.lat,
            longitude: trackerData.gps.location.lng,
            latitudeDelta: latDelta,
            longitudeDelta: longDelta,
          },
          renderDelay,
        );
        // TODO Might be useful somewhere -> Animate Marker
        // markerRef.current.animateMarkerToCoordinate(
        //   {
        //     latitude: trackerData.gps.location.lat,
        //     longitude: trackerData.gps.location.lng,
        //   },
        //   1000,
        // );
      },
    );
    return () => {
      eventListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#007aa6" />
      <Animated
        ref={mapRef}
        style={styles.map}
        initialRegion={location}
        mapType={type}>
        <Marker.Animated ref={markerRef} coordinate={currentMarker}>
          <View style={styles.marker}>
            <Text style={styles.text}>
              {currentTracker ? currentTracker.label : ''}
            </Text>
            <Image style={styles.icon} source={require('../assets/map.png')} />
          </View>
        </Marker.Animated>
      </Animated>
      {currentTracker ? (
        <HomeItem
          label={currentTracker.label}
          signal={currentTracker.gps.signal_level}
          time={currentTracker.gps.updated}
          movement={currentTracker.movement_status}
          onPress={() =>
            mapRef.current.animateToRegion(
              {
                latitude: currentTracker.gps.location.lat,
                longitude: currentTracker.gps.location.lng,
                latitudeDelta: latDelta,
                longitudeDelta: longDelta,
              },
              renderDelay,
            )
          }
        />
      ) : null}
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
  marker: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    backgroundColor: '#007aa6',
    color: '#ffffff',
    padding: 1,
  },
  icon: {
    height: 28,
    width: 28,
  },
});
