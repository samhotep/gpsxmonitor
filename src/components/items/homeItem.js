/* eslint-disable react-hooks/exhaustive-deps */
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
  const [updateSwitch, setUpdateSwitch] = useState(true);

  const loadCurrentTrackerData = () => {
    API.getTrackerState(props.tracker.id).then((result) => {
      getMovementIcon(result.movement_status);
      getSignalIcon(result.gps.signal_level);
      setMovementStatus(Utils.getTimeDifference(result.actual_track_update));
      setTimeStatus(Utils.getTimeDifference(result.last_update));
    });
  };

  const getSignalIcon = (signal_level) => {
    if (signal_level > 75) {
      setSignalIcon(require('../../assets/signal/strong.png'));
    } else if (signal_level <= 75 && signal_level > 50) {
      setSignalIcon(require('../../assets/signal/good.png'));
    } else if (signal_level <= 50 && signal_level > 25) {
      setSignalIcon(require('../../assets/signal/low.png'));
    } else if (signal_level <= 25) {
      setSignalIcon(require('../../assets/signal/poor.png'));
    }
  };

  const getMovementIcon = (movement_status) => {
    if (movement_status === 'moving') {
      setMovementIcon(require('../../assets/moving.png'));
    } else if (movement_status === 'parked') {
      setMovementIcon(require('../../assets/parked.png'));
    } else if (movement_status === 'stopped') {
      setMovementIcon(require('../../assets/stop.png'));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      loadCurrentTrackerData();
      setUpdateSwitch(!updateSwitch);
    }, 5000);
  }, [updateSwitch]);

  return (
    <Container onPress={props.onPress} selected={props.selected}>
      <RowContainer>
        <InnerContainer>
          <ImageContainer
            source={require('../../assets/arrow.png')}
            size={24}
          />
          <Text selected={props.selected} color="#202020">
            {props.tracker.label}
          </Text>
        </InnerContainer>
        <TimeLabel size={14} width={100} color="#b9b9b9">
          {timeStatus ? `${timeStatus} ago` : null}
        </TimeLabel>
      </RowContainer>
      <RowContainer>
        <InnerContainer>
          <ImageContainer
            source={signalIcon}
            resizeMode="contain"
            size={16}
            margin={10}
          />
          <Text size={14} color="#b9b9b9" width={100}>
            Signal: {props.tracker.gps.signal_level}%
          </Text>
        </InnerContainer>
        <InnerContainer>
          <ImageContainer source={movementIcon} size={24} margin={1} />
          <TimeLabel size={12} width={150}>
            {props.tracker.movement_status.charAt(0).toUpperCase() +
              props.tracker.movement_status.slice(1)}{' '}
            for {movementStatus}
          </TimeLabel>
        </InnerContainer>
      </RowContainer>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  width: 100%;
  padding: 5px;
  position: absolute;
  top: 0px;
  elevation: 2;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: ${(props) => props.margin || 5}px;
  width: 100%;
`;

const InnerContainer = styled.View`
  flex-direction: row;
  align-items: center;
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
  color: ${(props) => props.color || '#636261'};
  width: ${(props) => props.width || 100}px;
`;
