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
import {Animated, AnimatedRegion, Marker} from 'react-native-maps';
import CheckBox from '@react-native-community/checkbox';
import styled from 'styled-components';
import HomeItem from '../components/items/homeItem';
import HomeButton from '../components/buttons/homeButton';
import HomeModal from '../components/modals/homeModal';
import RadioInput from '../components/inputs/radioInput';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import API from '../api/api';

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
  const [type, setType] = useState('standard');
  const [globeClicked, setGlobeClicked] = useState(false);
  const [arrowClicked, setArrowClicked] = useState(false);
  const [trackersStates, setTrackersStates] = useState({});
  const [trackersList, setTrackersList] = useState([]);
  const [mapType, setMapType] = useState(Array(4).fill(false));
  const [trackerSelection, setTrackerSelection] = useState(
    Array(3).fill(false),
  );
  const [showTrackers, setShowTrackers] = useState('Selected');
  const [followObject, setFollowObject] = useState(false);
  const mapRef = useRef();
  const markerRef = useRef();
  const mapTypes = ['standard', 'satellite', 'hybrid', 'terrain'];
  const trackerSelections = ['All', 'Selected', 'Group'];
  let intervalID = 0;

  const renderDelay = 1500;
  const updateRadioButtons = (index, list, radioCallback, itemCallback) => {
    itemCallback(list[index]);
    let newRadio = Array(list.length).fill(false);
    newRadio[index] = true;
    radioCallback(newRadio);
  };

  const updateTracker = (data) => {
    console.log(data);
    if (data) {
      setCurrentTracker(data);
      setCurrentMarker({
        latitude: data.gps.location.lat,
        longitude: data.gps.location.lng,
      });
      if (followObject) {
        mapRef.current.animateToRegion(
          {
            latitude: data.gps.location.lat,
            longitude: data.gps.location.lng,
            latitudeDelta: latDelta,
            longitudeDelta: longDelta,
          },
          renderDelay,
        );
      }
    }
    // TODO Might be useful somewhere -> Animate Marker
    // markerRef.current.animateMarkerToCoordinate(
    //   {
    //     latitude: trackerData.gps.location.lat,
    //     longitude: trackerData.gps.location.lng,
    //   },
    //   1000,
    // );
  };

  useEffect(() => {
    // Listener for location update events in dashboard
    const eventListener = eventEmitter.addListener(
      'event.trackerEvent',
      (trackerData) => {
        clearInterval(intervalID);
        setTrackersList(trackerData.trackers);
        setTrackersStates(trackerData.states);
        updateTracker(trackerData.data);
        mapRef.current.animateToRegion(
          {
            latitude: trackerData.data.gps.location.lat,
            longitude: trackerData.data.gps.location.lng,
            latitudeDelta: latDelta,
            longitudeDelta: longDelta,
          },
          renderDelay,
        );
        /**
         * Break linter convention, since setInterval is created anew for each successive render
         */
        // eslint-disable-next-line react-hooks/exhaustive-deps
        intervalID = setInterval(() => {
          API.getTrackerState(trackerData.data.id).then((result) => {
            const newData = Object.assign(trackerData.data, result);
            updateTracker(newData);
          });
        }, 3000);
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
        initialRegion={
          new AnimatedRegion({
            latitude: 0.347596,
            longitude: 32.58252,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          })
        }
        mapType={type}>
        {showTrackers === 'Selected' ? (
          <Marker.Animated ref={markerRef} coordinate={currentMarker}>
            <View style={styles.marker}>
              <Text style={styles.text}>
                {currentTracker ? currentTracker.label : ''}
              </Text>
              <Image
                style={styles.icon}
                source={require('../assets/map.png')}
              />
            </View>
          </Marker.Animated>
        ) : null}
        {showTrackers === 'All' ? (
          <>
            {trackersList.map((_, i) => {
              return (
                <Marker
                  key={_.id}
                  coordinate={{
                    latitude: trackersStates[_.id].gps.location.lat,
                    longitude: trackersStates[_.id].gps.location.lng,
                  }}>
                  <View style={styles.marker}>
                    <Text style={styles.text}>{_.label}</Text>
                    <Image
                      style={styles.icon}
                      source={require('../assets/map.png')}
                    />
                  </View>
                </Marker>
              );
            })}
          </>
        ) : null}
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
        clicked={arrowClicked}
        height={180}
        width={190}
        bottom={150}
        left={68}
        inject={
          <ModalContainer>
            <RadioLabel color="#bebebe">Show Trackers:</RadioLabel>
            {trackerSelections.map((_, i) => {
              return (
                <RadioContainer key={i}>
                  <RadioLabel>
                    {_.charAt(0).toUpperCase() + _.slice(1)}
                  </RadioLabel>
                  <RadioInput
                    key={i}
                    color="#1e96dc"
                    selected={trackerSelection[i]}
                    onPress={() =>
                      updateRadioButtons(
                        i,
                        trackerSelections,
                        setTrackerSelection,
                        setShowTrackers,
                      )
                    }
                  />
                </RadioContainer>
              );
            })}
            <RadioContainer>
              <RadioLabel>Follow the Object:</RadioLabel>
              <CheckBox
                disabled={false}
                value={followObject}
                onValueChange={(newValue) => setFollowObject(newValue)}
                tintColors={{true: '#1e96dc', false: '#1e96dc'}}
              />
            </RadioContainer>
          </ModalContainer>
        }
      />
      <HomeModal
        clicked={globeClicked}
        height={180}
        width={170}
        bottom={90}
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
                    selected={mapType[i]}
                    onPress={() =>
                      updateRadioButtons(i, mapTypes, setMapType, setType)
                    }
                  />
                </RadioContainer>
              );
            })}
          </ModalContainer>
        }
      />
      <HomeButton
        source={require('../assets/arrow.png')}
        bottom={90}
        onPress={() => {
          setArrowClicked(!arrowClicked);
          setGlobeClicked(false);
        }}
      />
      <HomeButton
        source={require('../assets/globe.png')}
        onPress={() => {
          setGlobeClicked(!globeClicked);
          setArrowClicked(false);
        }}
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
  align-items: flex-start;
  justify-content: center;
  padding: 10px;
`;

const RadioContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const RadioLabel = styled.Text`
  font-size: 16px;
  color: ${(props) => props.color || '#202020'};
`;
