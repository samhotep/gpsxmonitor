import React, {useEffect, useState} from 'react';
import {StatusBar, ToastAndroid} from 'react-native';
import styled from 'styled-components';
import Separator from '../components/separators/separator';
import DrawerLoader from '../components/loaders/drawerLoader';
import DetailItem from '../components/items/detailItem';
import Storage from '../storage/storage';
import API from '../api/api';
import lists from '../components/lists/lists';

// TODO Pass the location as a state prop, or as an event emitter
export default function DetailsScreen({route, navigation}) {
  const [loading, setLoading] = useState(true);
  const [itemList, setItemList] = useState([]);

  const constructModelObject = (tracker, model, state) => {
    let modelObject = {};
    modelObject.details = [];
    modelObject.title = tracker.label;
    modelObject.details[1] = {
      type: 'image',
      image: require('../assets/hash.png'),
      text: `ID: ${tracker.source.device_id.replace(/\d{4}(?=.)/g, '$& ')}`,
    };
    modelObject.details[0] = {
      type: 'image',
      image: require('../assets/chip.png'),
      text: `Model: ${model.name}`,
    };
    modelObject.details[2] = {
      type: 'component',
      status: lists.statusColors[state.connection_status],
    };
    return modelObject;
  };

  const constructLocationObject = (tracker) => {
    const locationObject = {};
    locationObject.details = [];
    locationObject.title = 'Location';
    return API.getTrackerState(tracker.id).then((result) => {
      console.log(result);
      return result;
    });
  };

  useEffect(() => {
    let details = [];
    let tracker;
    let trackerState;
    let trackerModel;
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
        trackerModel = model;
        details.push(constructModelObject(tracker, trackerModel, trackerState));
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

const Text = styled.Text`
  font-size: ${(props) => props.size || 18}px;
  color: ${(props) => props.color || '#000000'};
  font-family: 'Roboto-Regular';
  font-weight: ${(props) => props.weight || 'normal'};
  text-align: ${(props) => props.align || 'left'};
  margin: 5px;
`;

const ImageContainer = styled.Image`
  height: ${(props) => props.size || 150}px;
  width: ${(props) => props.size || 150}px;
  margin: ${(props) => props.margin || 10}px;
`;
