/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef} from 'react';
import {
  Image,
  NativeEventEmitter,
  NativeModules,
  StyleSheet,
  StatusBar,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {Animated, AnimatedRegion, Marker, Polyline} from 'react-native-maps';
import CheckBox from '@react-native-community/checkbox';
import styled from 'styled-components';
import HomeItem from '../components/items/homeItem';
import HomeButton from '../components/buttons/homeButton';
import HomeModal from '../components/modals/homeModal';
import RadioInput from '../components/inputs/radioInput';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import API from '../api/api';
import Storage from '../storage/storage';
import Utils from '../utils/utils';

const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);

export default function HomeScreen({navigation}) {
  const window = useWindowDimensions();
  const [trackerEventData, setTrackerEventData] = useState();
  const [currentMarker, setCurrentMarker] = useState({
    latitude: 0.347596,
    longitude: 32.58252,
  });
  const [latDelta, setLatDelta] = useState(0.05);
  const [longDelta, setLongDelta] = useState(0.05);
  const [type, setType] = useState('standard');
  const [globeClicked, setGlobeClicked] = useState(false);
  const [arrowClicked, setArrowClicked] = useState(false);
  const [mapType, setMapType] = useState(Array(4).fill(false));
  const [trackerSelection, setTrackerSelection] = useState(
    Array(3).fill(false),
  );
  const [showTrackers, setShowTrackers] = useState('Selected');
  const [followObject, setFollowObject] = useState(true);
  const mapRef = useRef();
  const markerRef = useRef();
  const mapTypes = ['standard', 'satellite', 'hybrid', 'terrain'];
  const trackerSelections = ['All', 'Selected', 'Group'];
  const [intervalID, setIntervalID] = useState(0);
  const renderDelay = 1000;
  const [mapRoute, setMapRoute] = useState([]);
  const [showLabels, setShowLabels] = useState(true);

  const updateRadioButtons = (index, list, radioCallback, itemCallback) => {
    itemCallback(list[index]);
    let newRadio = Array(list.length).fill(false);
    newRadio[index] = true;
    radioCallback(newRadio);
  };

  const updateTracker = () => {
    if (trackerEventData) {
      setCurrentMarker({
        latitude: trackerEventData.data.gps.location.lat,
        longitude: trackerEventData.data.gps.location.lng,
      });
      try {
        mapRef.current.animateToRegion(
          {
            latitude: trackerEventData.data.gps.location.lat,
            longitude: trackerEventData.data.gps.location.lng,
            latitudeDelta: latDelta,
            longitudeDelta: longDelta,
          },
          renderDelay,
        );
      } catch (error) {}
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

  const createInterval = () => {
    clearInterval(intervalID);
    if (trackerEventData) {
      let inter = setInterval(() => {
        API.getTrackerState(trackerEventData.data.id).then((result) => {
          const newData = Object.assign(trackerEventData.data, result);
          updateTracker(newData);
        });
      }, 3000);
      setIntervalID(inter);
    }
  };

  const getAddressPoints = (route) => {
    let start;
    let end;
    API.getLocation(route.start)
      .then((locations) => {
        start = locations[0];
        return API.getLocation(route.end);
      })
      .then((locations) => {
        end = locations[0];
        return API.getRoute(start, end);
      })
      .then((routelist) => {
        setMapRoute(Utils.renameLocationKeys(routelist));
        mapRef.current.animateToRegion(
          {
            latitude: routelist[routelist.length - 1].lat,
            longitude: routelist[routelist.length - 1].lng,
            latitudeDelta: latDelta,
            longitudeDelta: longDelta,
          },
          500,
        );
      })
      .catch((error) => {
        ToastAndroid.show(
          error.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
  };

  useEffect(() => {
    let maps = [...mapType];
    let selection = [...trackerSelection];
    maps[0] = true;
    selection[1] = true;
    setMapType(maps);
    setTrackerSelection(selection);
    try {
      Storage.getMarkerSettings()
        .then((stored) => {
          let settings = JSON.parse(stored);
          if (settings) {
            setFollowObject(settings.followObject);
            setTrackerSelection(settings.selections);
          }
          return Storage.getSettings();
        })
        .then((res) => {
          let settings = JSON.parse(res);
          if (settings) {
            setShowLabels(settings.labels);
          }
        });
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
  }, []);

  useEffect(() => {
    // Listener for location update events in dashboard
    const eventListener = eventEmitter.addListener(
      'event.trackerEvent',
      (trackerData) => {
        if (trackerData) {
          setMapRoute([]);
          setTrackerEventData(trackerData);
        }
      },
    );
    return () => {
      eventListener.remove();
    };
  }, []);

  useEffect(() => {
    updateTracker();
    if (followObject) {
      createInterval();
    }
  }, [trackerEventData, latDelta, longDelta, followObject]);

  useEffect(() => {
    // Listener for track drawer events
    const eventListener = eventEmitter.addListener(
      'event.routeEvent',
      (routeEvent) => {
        getAddressPoints(routeEvent);
      },
    );
    return () => {
      eventListener.remove();
    };
  }, []);

  useEffect(() => {
    // Listener for task drawer events
    const eventListener = eventEmitter.addListener(
      'event.taskEvent',
      (taskEvent) => {
        API.getRoute(taskEvent.start, taskEvent.end)
          .then((routelist) => {
            setMapRoute(Utils.renameLocationKeys(routelist));
            mapRef.current.animateToRegion(
              {
                latitude: routelist[routelist.length - 1].lat,
                longitude: routelist[routelist.length - 1].lng,
                latitudeDelta: latDelta,
                longitudeDelta: longDelta,
              },
              500,
            );
          })
          .catch((error) => {
            ToastAndroid.show(
              error.message,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          });
      },
    );
    return () => {
      eventListener.remove();
    };
  }, []);

  useEffect(() => {
    // Listener for event drawer events
    const eventListener = eventEmitter.addListener(
      'event.trackerlistEvent',
      (tracker) => {
        clearInterval(intervalID);
        API.getTrackerState(tracker.id)
          .then((state) => {
            mapRef.current.animateToRegion(
              {
                latitude: state.gps.location.lat,
                longitude: state.gps.location.lng,
                latitudeDelta: latDelta,
                longitudeDelta: longDelta,
              },
              renderDelay,
            );
          })
          .catch((error) =>
            ToastAndroid.show(
              error.message,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            ),
          );
      },
    );
    return () => {
      eventListener.remove();
    };
  }, []);

  useEffect(() => {
    Storage.setMarkerSettings({
      selections: trackerSelection,
      followObject: followObject,
    });
  }, [followObject, trackerSelection]);

  useEffect(() => {
    clearInterval(intervalID);
  }, [mapRoute]);

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
        mapType={type}
        onPress={() => {
          setGlobeClicked(false);
          setArrowClicked(false);
        }}>
        {/* TODO Set default selection type */}
        {showTrackers === 'Selected' ? (
          <Marker.Animated ref={markerRef} coordinate={currentMarker}>
            <View style={styles.marker}>
              {showLabels && (
                <Text style={styles.text}>
                  {trackerEventData ? trackerEventData.data.label : ''}
                </Text>
              )}
              <Image
                style={styles.icon}
                source={require('../assets/map.png')}
              />
            </View>
          </Marker.Animated>
        ) : null}
        {showTrackers === 'All' ? (
          <>
            {trackerEventData.trackers.map((_, i) => {
              return (
                <Marker
                  key={_.id}
                  coordinate={{
                    latitude: trackerEventData.states[_.id].gps.location.lat,
                    longitude: trackerEventData.states[_.id].gps.location.lng,
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
        {showTrackers === 'Group' ? (
          <>
            {trackerEventData.trackers.map((_, i) => {
              if (_.group_id === trackerEventData.data.group_id) {
                return (
                  <Marker
                    key={_.id}
                    coordinate={{
                      latitude: trackerEventData.states[_.id].gps.location.lat,
                      longitude: trackerEventData.states[_.id].gps.location.lng,
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
              }
            })}
          </>
        ) : null}
        {mapRoute.length > 0 ? (
          <Marker.Animated coordinate={mapRoute[0]}>
            <View style={styles.marker}>
              <Image
                style={styles.icon}
                source={require('../assets/marker_start.png')}
              />
            </View>
          </Marker.Animated>
        ) : null}
        {mapRoute.length > 0 ? (
          <Marker.Animated coordinate={mapRoute[mapRoute.length - 1]}>
            <View style={styles.marker}>
              <Image
                style={styles.icon}
                source={require('../assets/marker_end.png')}
              />
            </View>
          </Marker.Animated>
        ) : null}
        <Polyline
          coordinates={mapRoute}
          strokeColor="#1e96dc"
          strokeWidth={2}
        />
      </Animated>
      {trackerEventData ? (
        <HomeItem
          tracker={trackerEventData.data}
          onPress={() =>
            mapRef.current.animateToRegion(
              {
                latitude: trackerEventData.data.gps.location.lat,
                longitude: trackerEventData.data.gps.location.lng,
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
                <RadioContainer
                  key={i}
                  onPress={() => {
                    updateRadioButtons(
                      i,
                      trackerSelections,
                      setTrackerSelection,
                      setShowTrackers,
                    );
                  }}>
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
                onValueChange={(newValue) => {
                  setFollowObject(newValue);
                  Storage.setMarkerSettings({
                    selections: trackerSelection,
                    followObject: newValue,
                  });
                  clearInterval(intervalID);
                }}
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
          // TODO save default map type and load default
          <ModalContainer>
            <RadioLabel color="#bebebe">Map Type:</RadioLabel>
            {mapTypes.map((_, i) => {
              return (
                <RadioContainer
                  key={i}
                  onPress={() =>
                    updateRadioButtons(i, mapTypes, setMapType, setType)
                  }>
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

const RadioContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const RadioLabel = styled.Text`
  font-size: 16px;
  color: ${(props) => props.color || '#202020'};
`;
