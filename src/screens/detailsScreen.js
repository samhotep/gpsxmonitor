import React, {useEffect, useState} from 'react';
import {StatusBar, ToastAndroid} from 'react-native';
import styled from 'styled-components';
import DrawerLoader from '../components/loaders/drawerLoader';
import DetailItem from '../components/items/detailItem';
import Storage from '../storage/storage';
import API from '../api/api';
import Utils from '../utils/utils';
import lists from '../components/lists/lists';

// TODO Pass the location as a state prop, or as an event emitter
export default function DetailsScreen({route, navigation}) {
  const [loading, setLoading] = useState(true);
  const [itemList, setItemList] = useState([]);

  const constructModelObject = (tracker, model, state) => {
    let modelObject = {};
    modelObject.details = [];
    modelObject.title = tracker.label;
    modelObject.details.push({
      type: 'image',
      image: require('../assets/chip.png'),
      text: `Model: ${model.name}`,
    });
    modelObject.details.push({
      type: 'image',
      image: require('../assets/hash.png'),
      text: `ID: ${tracker.source.device_id.replace(/\d{4}(?=.)/g, '$& ')}`,
    });
    modelObject.details.push({
      type: 'component',
      status: lists.statusColors[state.connection_status],
    });
    return modelObject;
  };

  const constructLocationObject = (state, gpsPoint) => {
    let locationObject = {};
    locationObject.details = [];
    locationObject.title = 'Location';
    locationObject.time = Utils.getTimeDifference(state.gps.updated);
    locationObject.details.push({
      type: 'image',
      image: Utils.getSignalIcon(state.gps.signal_level),
      text: `Signal: ${state.gps.signal_level} %`,
    });
    locationObject.details.push({
      type: 'image',
      image: require('../assets/location.png'),
      text: `Latitude: ${gpsPoint.lat.toFixed(
        5,
      )} Longitude: ${gpsPoint.lng.toFixed(5)}`,
    });
    gpsPoint.speed > 0
      ? locationObject.details.push({
          type: 'image',
          image: require('../assets/speed.png'),
          text: `Speed: ${gpsPoint.speed} km/h`,
        })
      : locationObject.details.push({
          type: 'image',
          image: Utils.getMovementIcon(state.movement_status),
          text: `Parked for ${Utils.getTimeDifference(
            state.actual_track_update,
            false,
          )}`,
        });
    locationObject.details.push({
      type: 'image',
      image: require('../assets/compass.png'),
      text: `Direction: ${Utils.getDirection(gpsPoint.heading)}`,
    });
    locationObject.details.push({
      type: 'image',
      image: require('../assets/address.png'),
      text: `${gpsPoint.address}`,
    });
    return locationObject;
  };

  const constructPowerObject = (state) => {
    let locationObject = {};
    locationObject.details = [];
    locationObject.title = 'PowerSupply';
    locationObject.time = Utils.getTimeDifference(state.gps.updated);
    locationObject.details.push({
      type: 'image',
      image: Utils.getSignalIcon(state.gps.signal_level),
      text: `Signal: ${state.gps.signal_level} %`,
    });
    return locationObject;
  };

  useEffect(() => {
    let details = [];
    let tracker;
    let trackerState;
    let trackerModel;
    let lastGPSPoint;
    let readings;
    Storage.getCurrentTracker()
      .then((result) => {
        tracker = JSON.parse(result);
        return API.getTrackerState(JSON.parse(result).id);
      })
      .then((result) => {
        trackerState = result;
        return API.listModel(tracker.source.model);
      })
      .then((model) => {
        trackerModel = model[0];
        return API.getTrackerLocation(tracker.id);
      })
      .then((gpsPoint) => {
        lastGPSPoint = gpsPoint;
        return API.getAddress({lat: gpsPoint.lat, lng: gpsPoint.lng});
      })
      .then((address) => {
        lastGPSPoint = {...lastGPSPoint, address: address};
        return API.getReadings(tracker.id);
      })
      .then((readings) => {
        readings = readings;
        details.push(constructModelObject(tracker, trackerModel, trackerState));
        details.push(constructLocationObject(trackerState, lastGPSPoint));
        setItemList(details);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(
          error.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
  }, []);

  return (
    <Container>
      <StatusBar backgroundColor="#007aa6" />
      {loading ? (
        <Container>
          <DrawerLoader />
        </Container>
      ) : (
        <StatusContainer
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          {/* TODO Show modal when clicked */}
          {itemList.map((_, i) => {
            return (
              <DetailItem
                key={i}
                title={_.title}
                time={_.time}
                details={_.details}
              />
            );
          })}
        </StatusContainer>
      )}
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #e7f1f7;
`;

const StatusContainer = styled.ScrollView`
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
