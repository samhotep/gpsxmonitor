import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import API from '../../api/api';
import Utils from '../../utils/utils';

// TODO Animate the list
// TODO Show time in days, mins, hours
export default function HomeItem(props) {
  const [signalIcon, setSignalIcon] = useState();
  const [timeStatus, setTimeStatus] = useState('0');
  const [movementIcon, setMovementIcon] = useState(
    require('../../assets/moving.png'),
  );
  const [movementStatus, setMovementStatus] = useState('0');

  const getSignalIcon = () => {
    if (props.signal >= 75) {
      setSignalIcon(require('../../assets/signal/strong.png'));
    } else if (props.signal >= 50 && props.signal < 75) {
      setSignalIcon(require('../../assets/signal/good.png'));
    } else if (props.signal >= 25 && props.signal < 50) {
      setSignalIcon(require('../../assets/signal/low.png'));
    } else if (props.signal < 25) {
      setSignalIcon(require('../../assets/signal/poor.png'));
    }
  };

  const getMovementIcon = () => {
    if (props.movement === 'moving') {
      setMovementIcon(require('../../assets/moving.png'));
    } else if (props.movement === 'parked') {
      setMovementIcon(require('../../assets/parked.png'));
    } else if (props.movement === 'stopped') {
      setMovementIcon(require('../../assets/stop.png'));
    }
  };

  useEffect(() => {
    getMovementIcon();
    getSignalIcon();
    setMovementStatus(
      Utils.getTimeDifference(props.tracker.actual_track_update),
    );
    setTimeStatus(Utils.getTimeDifference(props.tracker.gps.updated));
  }, [props]);

  return (
    <Container onPress={props.onPress} selected={props.selected}>
      <ColumnContainer>
        <ImageContainer source={require('../../assets/arrow.png')} size={24} />
        <ImageContainer source={signalIcon} resizeMode="contain" size={16} />
      </ColumnContainer>
      <ColumnContainer>
        <RowContainer>
          <Text selected={props.selected} color="#202020">
            {props.tracker.label}
          </Text>
        </RowContainer>
        <RowContainer>
          <Text size={14} color="#b9b9b9" width={100}>
            Signal: {props.tracker.gps.signal_level}%
          </Text>
          <ImageContainer source={movementIcon} size={24} margin={1} />
          <TimeLabel size={12}>
            {props.tracker.movement_status.charAt(0).toUpperCase() +
              props.tracker.movement_status.slice(1)}{' '}
            for {movementStatus}
          </TimeLabel>
        </RowContainer>
      </ColumnContainer>
      <ColumnContainer>
        <RowContainer>
          <Text size={14} width={100} color="#b9b9b9">
            {timeStatus} ago
          </Text>
        </RowContainer>
      </ColumnContainer>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  width: 100%;
  padding: 10px;
  position: absolute;
  top: 0px;
  elevation: 2;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: ${(props) => props.margin || 5}px;
`;

const ColumnContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const ImageContainer = styled.Image`
  width: ${(props) => props.size || 24}px;
  height: ${(props) => props.size || 24}px;
  margin: ${(props) => props.margin || 5}px;
`;

const Text = styled.Text.attrs({
  numberOfLines: 1,
})`
  text-align: left;
  font-size: ${(props) => props.size || 18}px;
  color: ${(props) => props.color || '#636261'};
  width: ${(props) => props.width || 220}px;
`;

const TimeLabel = styled.Text`
  text-align: left;
  font-size: ${(props) => props.size || 18}px;
  color: #636261;
  width: ${(props) => props.width || 100}px;
`;

let v = {
  actual_track_update: '2020-11-16 12:46:58',
  additional: {
    external_power_state: {updated: '2021-03-06 17:51:42', value: '1'},
    gps_antenna_state: {updated: '2021-03-06 17:51:42', value: '1'},
    gsm_damp_state: {updated: '2021-03-06 17:51:42', value: '0'},
  },
  battery_level: 100,
  battery_update: '2021-03-06 17:51:42',
  connection_status: 'active',
  gps: {
    alt: 616,
    heading: 0,
    location: {lat: 3.569007635116577, lng: 32.07025909423828},
    signal_level: 100,
    speed: 0,
    updated: '2021-03-06 17:51:42',
  },
  gsm: {
    network_name: 'MTN',
    roaming: null,
    signal_level: 54,
    updated: '2021-03-06 17:51:42',
  },
  inputs: [true, false, false, false, false],
  inputs_update: '2021-03-06 17:51:42',
  label: '2010093 - URA ELEGU GENSET',
  last_update: '2021-03-06 17:52:21',
  movement_status: 'parked',
  outputs: [false, false, false],
  outputs_update: '2021-03-06 17:51:42',
  source_id: 992,
};
