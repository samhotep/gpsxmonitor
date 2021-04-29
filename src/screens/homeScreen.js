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
import styled from 'styled-components';
import HomeItem from '../components/items/homeItem';
import HomeButton from '../components/buttons/homeButton';
import HomeModal from '../components/modals/homeModal';
import HeaderIcon from '../components/headers/headerIcon';
import RadioInput from '../components/inputs/radioInput';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);

// TODO Pass the location as a state prop, or as an event emitter
export default function HomeScreen({navigation}) {
  const window = useWindowDimensions();
  const [currentTracker, setCurrentTracker] = useState();
  const [currentMarker, setCurrentMarker] = useState({
    latitude: 0.347596,
    longitude: 32.58252,
  });
  const [latDelta, setLatDelta] = useState(0.05);
  const [longDelta, setLongDelta] = useState(0.05);
  /**
   * Supported Map Types
   * - standard: standard road map (default)
   * - none: no map Note Not available on MapKit
   * - satellite: satellite view
   * - hybrid: satellite view with roads and points of interest overlayed
   * - terrain: topographic view
   */
  const [type, setType] = useState('standard');
  const [location, setLocation] = useState(
    new AnimatedRegion({
      latitude: 0.347596,
      longitude: 32.58252,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    }),
  );
  const [globeClicked, setGlobeClicked] = useState(false);
  const [arrowClicked, setArrowClicked] = useState(false);
  const [radioValue, setRadioValue] = useState(Array(4).fill(false));
  const mapRef = useRef();
  const markerRef = useRef();
  const mapTypes = ['standard', 'satellite', 'hybrid', 'terrain'];

  const renderDelay = 2000;
  const updateMapType = (index) => {
    setType(mapTypes[index]);
    let newRadio = Array(4).fill(false);
    newRadio[index] = true;
    setRadioValue(newRadio);
  };

  useEffect(() => {
    // Listener for location update events
    const eventListener = eventEmitter.addListener(
      'event.trackerEvent',
      (trackerData) => {
        setCurrentTracker(trackerData);
        setLocation(
          new AnimatedRegion({
            latitude: trackerData.gps.location.lat,
            longitude: trackerData.gps.location.lng,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
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
          tracker={currentTracker}
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
      <HomeModal
        clicked={globeClicked}
        height={180}
        width={170}
        bottom={150}
        left={68}
        inject={
          <ModalContainer>
            <RadioLabel color="#bebebe">Map Type:</RadioLabel>
            {mapTypes.map((_, i) => {
              return (
                <RadioContainer key={i}>
                  <RadioLabel>
                    {_.charAt(0).toUpperCase() + _.slice(1)}
                  </RadioLabel>
                  <RadioInput
                    key={i}
                    color="#1e96dc"
                    selected={radioValue[i]}
                    onPress={() => updateMapType(i)}
                  />
                </RadioContainer>
              );
            })}
          </ModalContainer>
        }
      />
      <HomeModal
        clicked={arrowClicked}
        height={250}
        width={150}
        bottom={90}
        left={68}
        inject={<HeaderIcon source={require('../assets/arrow.png')} />}
      />
      <HomeButton
        source={require('../assets/globe.png')}
        bottom={90}
        onPress={() => setGlobeClicked(!globeClicked)}
      />
      <HomeButton
        source={require('../assets/arrow.png')}
        onPress={() => setArrowClicked(!arrowClicked)}
      />
      <HomeButton
        source={require('../assets/zoomin.png')}
        bottom={90}
        left={window.width - 58}
        onPress={() => {
          let newLat = latDelta / Math.sqrt(10);
          let newLong = longDelta / Math.sqrt(10);
          mapRef.current.animateToRegion(
            {
              latitude: currentMarker.latitude,
              longitude: currentMarker.longitude,
              latitudeDelta: newLat,
              longitudeDelta: newLong,
            },
            500,
          );
          setLatDelta(newLat);
          setLongDelta(newLong);
        }}
      />
      <HomeButton
        source={require('../assets/zoomout.png')}
        left={window.width - 58}
        onPress={() => {
          let newLat = latDelta * Math.sqrt(10);
          let newLong = longDelta * Math.sqrt(10);
          mapRef.current.animateToRegion(
            {
              latitude: currentMarker.latitude,
              longitude: currentMarker.longitude,
              latitudeDelta: newLat,
              longitudeDelta: newLong,
            },
            500,
          );
          setLatDelta(newLat);
          setLongDelta(newLong);
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
  marker: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    backgroundColor: '#007aa6',
    color: '#ffffff',
    padding: 2,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 2,
    fontSize: 10,
  },
  icon: {
    height: 28,
    width: 28,
  },
});

const ModalContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const RadioContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 140px;
`;

const RadioLabel = styled.Text`
  font-size: 18px;
  color: ${(props) => props.color || '#202020'};
`;
