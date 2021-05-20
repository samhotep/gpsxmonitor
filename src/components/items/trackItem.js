import React, {useState, useEffect} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';
import Separator from '../separators/separator';
import styled from 'styled-components';
import Utils from '../../utils/utils';
import API from '../../api/api';

const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);

export default function TrackItem(props) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [difference, setDifference] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');

  const formatDate = (date) => {
    return `${date.toLocaleTimeString([], {
      year: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })}`.slice(0, -3);
  };

  const showTrackPolygon = () => {
    eventEmitter.emit('event.trackPolygonEvent', {
      track: props.track,
      start: startLocation,
      end: endLocation,
    });
    props.navigation.toggleDrawer();
  };

  const getDates = () => {
    let start = new Date(props.track.start_date.replace(/-+/g, '/'));
    let end = new Date(props.track.end_date.replace(/-+/g, '/'));
    setStartDate(formatDate(start));
    setEndDate(formatDate(end));
    let {hours, minutes} = Utils.getHoursAndMinutes(start, end);
    setDifference(`${hours} h ${minutes} m`);
  };

  const getAddressPoints = () => {
    API.getLocation(props.track.start_address)
      .then((locations) => {
        setStartLocation(locations[0]);
        return API.getLocation(props.track.end_address);
      })
      .then((locations) => {
        setEndLocation(locations[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDates();
    getAddressPoints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Container onPress={showTrackPolygon}>
        <ImageContainer source={require('../../assets/track.png')} />
        <ColumnContainer>
          <RowContainer>
            <BoldText bold>{startDate}</BoldText>
            <Text>{props.track.start_address}</Text>
          </RowContainer>
          <RowContainer>
            <BoldText bold>{endDate}</BoldText>
            <Text>{props.track.end_address}</Text>
          </RowContainer>
          <DetailsContainer>
            <Text>{`${props.track.length} km`}</Text>
            <Text>{difference}</Text>
          </DetailsContainer>
        </ColumnContainer>
      </Container>
      <Separator nomargin />
    </>
  );
}

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: #ffffff;
  padding: 5px;
  width: 100%;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ColumnContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 90%;
`;

const ImageContainer = styled.Image`
  height: ${(props) => props.size || 48}px;
  width: ${(props) => props.size || 36}px;
`;

const DetailsContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 90%;
`;

const Text = styled.Text.attrs({
  numberOfLines: 2,
})`
  text-align: left;
  flex-wrap: wrap;
  font-size: 12px;
  color: ${(props) => (props.selected ? '#ffffff' : '#9a9a9a')};
  width: 80%;
`;

const BoldText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => props.color || '#737373'};
  margin-right: 5px;
`;
