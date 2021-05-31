/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Utils from '../../utils/utils';

export default function HomeItem(props) {
  const [signalIcon, setSignalIcon] = useState();
  const [timeStatus, setTimeStatus] = useState('0');
  const [movementIcon, setMovementIcon] = useState(
    require('../../assets/moving.png'),
  );
  const [movementText, setMovementText] = useState([]);

  const loadCurrentTrackerData = () => {
    setSignalIcon(Utils.getSignalIcon(props.tracker.gps.signal_level));
    setTimeStatus(Utils.getTimeDifference(props.tracker.gps.updated));
    let {icon, text} = Utils.getMovementComponents(props.tracker);
    setMovementIcon(icon);
    setMovementText(text);
  };

  useEffect(() => {
    loadCurrentTrackerData();
  }, [props]);

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
        <Text size={14} width={150} color="#b9b9b9">
          {timeStatus ? `${timeStatus} ago` : 'Now'}
        </Text>
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
          <ImageContainer source={movementIcon} size={24} margin={5} />
          <Text size={12} width={150}>
            {movementText}
          </Text>
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
  padding: ${(props) => props.padding || 1}px;
`;

const Text = styled.Text`
  text-align: left;
  font-size: ${(props) => props.size || 18}px;
  color: ${(props) => props.color || '#636261'};
  flex-wrap: wrap;
  width: ${(props) => (props.width ? props.width + 'px' : 'auto')};
`;
