import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Utils from '../../utils/utils';

// TODO Animate the list
export default function HomeItem(props) {
  const [signalIcon, setSignalIcon] = useState();
  const [timeStatus, setTimeStatus] = useState('since today');

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

  useEffect(() => {
    getSignalIcon();
    setTimeStatus(Utils.getTimeDifference(props.time));
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
            {props.label}
          </Text>
        </RowContainer>
        <RowContainer>
          <Text size={14} color="#b9b9b9">
            Signal: {props.signal}%
          </Text>
        </RowContainer>
      </ColumnContainer>
      <ColumnContainer>
        <RowContainer>
          <Text size={14} color="#b9b9b9">
            {timeStatus} min. ago
          </Text>
        </RowContainer>
        <RowContainer>
          <Text size={14}>{props.movement}</Text>
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
  margin: 5px;
`;

const ColumnContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.Image`
  width: ${(props) => props.size || 24}px;
  height: ${(props) => props.size || 24}px;
  margin: 5px;
`;

const Text = styled.Text.attrs({
  numberOfLines: 1,
})`
  text-align: left;
  font-size: ${(props) => props.size || 18}px;
  color: ${(props) => props.color || '#636261'};
  width: ${(props) => props.width || 220}px;
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
