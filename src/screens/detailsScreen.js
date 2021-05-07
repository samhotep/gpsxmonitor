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
    return constructObject(tracker.label, null, [
      {
        type: 'image',
        image: require('../assets/chip.png'),
        text: `Model: ${model.name}`,
      },
      {
        type: 'image',
        image: require('../assets/hash.png'),
        text: `ID: ${tracker.source.device_id.replace(/\d{4}(?=.)/g, '$& ')}`,
      },
      {
        type: 'component',
        status: lists.statusColors[state.connection_status],
      },
    ]);
  };

  const constructLocationObject = (state, gpsPoint) => {
    return constructObject('Location', state.gps.updated, [
      {
        type: 'image',
        image: Utils.getSignalIcon(state.gps.signal_level),
        text: `Signal: ${state.gps.signal_level} %`,
      },
      {
        type: 'image',
        image: require('../assets/location.png'),
        text: `Latitude: ${gpsPoint.lat.toFixed(
          5,
        )} Longitude: ${gpsPoint.lng.toFixed(5)}`,
      },
      gpsPoint.speed > 0
        ? {
            type: 'image',
            image: require('../assets/speed.png'),
            text: `Speed: ${gpsPoint.speed} km/h`,
          }
        : {
            type: 'image',
            image: Utils.getMovementIcon(state.movement_status),
            text: `Parked for ${Utils.getTimeDifference(
              state.actual_track_update,
              false,
            )}`,
          },
      {
        type: 'image',
        image: require('../assets/compass.png'),
        text: `Direction: ${Utils.getDirection(gpsPoint.heading)}`,
      },
      {
        type: 'image',
        image: require('../assets/address.png'),
        text: `${gpsPoint.address}`,
      },
    ]);
  };

  const constructGSMObject = (state) => {
    return constructObject('GSM', state.gsm.updated, [
      {
        type: 'image',
        image: Utils.getSignalIcon(state.gsm.signal_level),
        text: `Signal: ${state.gsm.signal_level} %`,
      },
      {
        type: 'image',
        image: require('../assets/antenna.png'),
        text: `Operator: ${state.gsm.network_name}`,
      },
    ]);
  };

  const constructPowerObject = (state, readings) => {
    return constructObject('Power Supply', readings.update_time, [
      {
        type: 'image',
        image: Utils.getBatteryIcon(state.battery_level),
        text: `Battery level: ${state.battery_level} %`,
      },
      {
        type: 'image',
        image: require('../assets/car_battery.png'),
        text: `Board voltage: ${readings.inputs[0].value} V`,
      },
    ]);
  };

  const constructInputsObject = (inputs) => {
    let inputObject = {};
    inputObject.details = [];
  };

  const constructObject = (title, time, details) => {
    let trackerObject = {};
    trackerObject.details = [];
    trackerObject.title = title;
    trackerObject.time = Utils.getTimeDifference(time);
    details.map((_, i) => {
      trackerObject.details.push(_);
    });
    return trackerObject;
  };

  // For Odometer and engine hours
  const constructCounterObjects = (counters) => {};

  useEffect(() => {
    let details = [];
    let tracker;
    let trackerState;
    let trackerModel;
    let lastGPSPoint;
    let trackerReadings;
    let trackerCounters;
    let trackerInputs;
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
        trackerReadings = readings;
        return API.getCounters(tracker.id);
      })
      .then((counters) => {
        trackerCounters = counters;
        return API.getInputs(tracker.id);
      })
      .then((inputs) => {
        trackerInputs = inputs;
        details.push(constructModelObject(tracker, trackerModel, trackerState));
        details.push(constructLocationObject(trackerState, lastGPSPoint));
        trackerState.gsm
          ? details.push(constructGSMObject(trackerState))
          : null;
        details.push(constructPowerObject(trackerState, trackerReadings));
        constructInputsObject(inputs);
        // details.push(constructCounterObjects(counters));
        setItemList(details);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
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
