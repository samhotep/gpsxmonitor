/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StatusBar, ToastAndroid, Linking} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import styled from 'styled-components';
import DrawerLoader from '../components/loaders/drawerLoader';
import DetailItem from '../components/items/detailItem';
import Storage from '../storage/storage';
import API from '../api/api';
import Utils from '../utils/utils';
import lists from '../components/lists/lists';

// TODO Fix date bug

export default function DetailsScreen({route, navigation}) {
  const [loading, setLoading] = useState(true);
  const [itemList, setItemList] = useState([]);
  const [tapped, setTapped] = useState(false);

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
    let {icon, text} = Utils.getMovementComponents(state, false);
    let modal = {
      item: (
        <ModalContainer>
          <ModalButton
            onPress={() => {
              Clipboard.setString(
                `${state.gps.location.lat.toFixed(
                  4,
                )}, ${state.gps.location.lng.toFixed(4)}`,
              );
              setTapped(!tapped);
              ToastAndroid.show(
                'Coordinates copied to clipboard',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
            }}>
            <Text width={200} color="#000000">
              Copy coordinates
            </Text>
          </ModalButton>
          <ModalButton
            onPress={() => {
              Linking.openURL(
                `https://www.google.com/maps/dir/?api=1&destination=${state.gps.location.lat},${state.gps.location.lng}`,
              );
            }}>
            <Text width={200} color="#000000">
              Show on map
            </Text>
          </ModalButton>
        </ModalContainer>
      ),
      height: 100,
      width: 200,
    };
    return constructObject(
      'Location',
      state.gps.updated,
      [
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
              image: icon,
              text: text,
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
      ],
      false,
      modal,
    );
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
        text: `Board voltage: ${
          readings.inputs === undefined ? null : readings.inputs[0].value
        } V`,
      },
    ]);
  };

  const constructInputsObject = (inputs) => {
    let serializedInputs = [];
    let matchedInputs = [];
    inputs.inputs.map((_, i) => {
      for (var j = 0; j < inputs.states.length; j++) {
        if (inputs.states[j].input_number === i + 1) {
          matchedInputs[i] = {
            type: 'image',
            image:
              lists.inputTypes[inputs.states[j].type][inputs.states[j].status],
            text: `${inputs.states[j].name}: ${
              inputs.states[j].status ? 'active' : 'inactive'
            }`,
          };
          break;
        } else {
          matchedInputs[i] = null;
        }
      }
    });
    matchedInputs.map((_, i) => {
      if (_ !== null) {
        serializedInputs.push(_);
      } else {
        serializedInputs.push({
          type: 'component',
          status: {
            color: inputs.inputs[i] ? '#66c011' : '#626160',
            size: 18,
            text: `Input #${i + 1}: ${
              inputs.inputs[i] ? 'active' : 'inactive'
            }`,
            number: i + 1,
          },
        });
      }
    });
    return constructObject('Inputs', inputs.update_time, serializedInputs);
  };

  const constructOutputsObject = (state, tracker_id) => {
    let serializedOutputs = [];
    state.outputs.map((_, i) => {
      serializedOutputs.push({
        type: 'switch',
        status: {
          color: _ ? '#66c011' : '#626160',
          value: _,
          size: 18,
          text: `Output #${i + 1}: ${_ ? 'active' : 'inactive'}`,
          number: i + 1,
          tracker_id: tracker_id,
        },
      });
    });
    return constructObject('Outputs', state.last_update, serializedOutputs);
  };

  const constructTasksObject = (state, tasks, user) => {
    let username = user.success
      ? `${user.value.first_name} ${user.value.last_name}`
      : 'Anonymous';
    let numberOfTasks = 0;
    let taskDuration = 0;
    let taskDelay = 0;
    let assignedTasks = 0;
    let doneTasks = 0;
    let failedTasks = 0;
    let delayedTasks = 0;
    tasks.map((_, i) => {
      if (_.status !== 'unassigned') {
        numberOfTasks += 1;
      }
      if (_.status === 'assigned') {
        assignedTasks += 1;
        let diff = new Date(
          Date.parse(_.to.replace(/-+/g, '/')) -
            Date.parse(_.from.replace(/-+/g, '/')),
        );
        taskDuration += diff.getTime();
      } else if (_.status === 'done') {
        doneTasks += 1;
      } else if (_.status === 'failed') {
        failedTasks += 1;
      } else if (_.status === 'delayed') {
        delayedTasks += 1;
        let diff = new Date(Date.now() - Date.parse(_.to.replace(/-+/g, '/')));
        taskDelay += diff.getTime();
      }
    });
    let modal = {
      item: (
        <ModalContainer>
          <ModalButton
            onPress={() =>
              navigation.navigate('Tasks', {screen: 'TaskScreen'})
            }>
            <Text width={200} color="#000000">
              Task list
            </Text>
          </ModalButton>
        </ModalContainer>
      ),
      height: 50,
      width: 200,
    };
    return constructObject(
      'Tasks',
      state.last_update,
      [
        {
          type: 'image',
          image: require('../assets/user.png'),
          text: username,
        },
        {
          type: 'component',
          status: {
            color: '#2196f3',
            size: 18,
            text: `Assigned: ${assignedTasks}`,
            radius: true,
          },
        },
        {
          type: 'component',
          status: {
            color: '#4caf50',
            size: 18,
            text: `Completed: ${doneTasks}`,
            radius: true,
          },
        },
        {
          type: 'component',
          status: {
            color: '#f44336',
            size: 18,
            text: `Failed: ${failedTasks}`,
            radius: true,
          },
        },
        {
          type: 'component',
          status: {
            color: '#ffb300',
            size: 18,
            text: `Delayed: ${delayedTasks}`,
            radius: true,
          },
        },
        {
          type: 'text',
          text: `Total tasks: ${numberOfTasks}`,
        },
        {
          type: 'text',
          text: `Tasks duration time: ${
            Utils.getTime(taskDuration) === '0'
              ? '0 h 0 min'
              : Utils.getTime(taskDuration)
          }`,
        },
        {
          type: 'text',
          text: `Delayed time: ${
            Utils.getTime(taskDelay) === '0'
              ? '0 h 0 min'
              : Utils.getTime(taskDelay)
          }`,
        },
      ],
      false,
      modal,
    );
  };

  const constructCounterObjects = (state, counter) => {
    let modal = null;
    let type = lists.counterTypes[counter.type];
    if (type.title === 'Odometer') {
      modal = {
        height: 50,
        width: 200,
      };
    }
    return constructObject(
      type.title,
      counter.update_time,
      [
        {
          type: 'counter',
          value: counter.value,
          states: type,
        },
        {
          type: 'text',
          text: type.text,
        },
      ],
      false,
      modal,
    );
  };

  const constructObject = (
    title,
    time,
    details,
    millis = false,
    modal = null,
  ) => {
    let trackerObject = {};
    trackerObject.details = [];
    trackerObject.title = title;
    trackerObject.modal = modal;
    trackerObject.time = millis
      ? Utils.getTime(time)
      : Utils.getTimeDifference(time);
    details.map((_, i) => {
      trackerObject.details.push(_);
    });
    return trackerObject;
  };

  useEffect(() => {
    let details = [];
    let tracker;
    let trackerState;
    let trackerModel;
    let lastGPSPoint;
    let trackerReadings;
    let trackerCounters;
    let trackerInputs;
    let trackerTasks;
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
        return API.getTasks();
      })
      .then((tasks) => {
        trackerTasks = tasks;
        return API.getUser(tasks[0].user_id);
      })
      .then((user) => {
        details.push(constructModelObject(tracker, trackerModel, trackerState));
        details.push(constructLocationObject(trackerState, lastGPSPoint));
        trackerState.gsm
          ? details.push(constructGSMObject(trackerState))
          : null;
        details.push(constructPowerObject(trackerState, trackerReadings));
        details.push(constructInputsObject(trackerInputs));
        details.push(constructOutputsObject(trackerState, tracker.id));
        details.push(constructTasksObject(trackerState, trackerTasks, user));
        trackerCounters.map((_, i) => {
          details.push(constructCounterObjects(trackerState, _));
        });
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
          {itemList.map((_, i) => {
            return (
              <DetailItem
                key={i}
                title={_.title}
                time={_.time}
                details={_.details}
                modal={_.modal}
                onPress={() => setTapped(!tapped)}
                clicked={tapped}
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
  width: 100%;
  flex: 1;
  background-color: #e7f1f7;
`;

const StatusContainer = styled.ScrollView`
  flex-direction: column;
  width: 100%;
`;

const ModalContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px;
`;

const ModalButton = styled.TouchableOpacity``;

const Text = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: ${(props) => props.size || 16}px;
  color: ${(props) => props.color || '#626160'};
  flex-wrap: wrap;
  ${(props) => (props.width ? `width: ${props.width}px;` : '')}
  margin: 5px 5px 15px 5px;
`;
