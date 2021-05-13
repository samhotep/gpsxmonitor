import * as React from 'react';
import styled from 'styled-components';

export default function EventItem(props) {
  return (
    <Container>
      <RowContainer>
        <ImageContainer source={require('../../assets/track.png')} />
      </RowContainer>
      <RowContainer>
        <Text>{props.track.start_address}</Text>
      </RowContainer>
    </Container>
  );
}

// {
//     id: 123456,
//     start_date: '2020-09-23 03:39:44',
//     start_address: '1255 6th Ave, New York, NY 10020, USA',
//     max_speed: 62,
//     end_date: '2020-09-23 06:39:44',
//     end_address: '888 5th Ave, New York, NY 10021, USA',
//     length: 5.5,
//     points: 327,
//     avg_speed: 49,
//     event_count: 3,
//     norm_fuel_consumed: 1.07,
//     type: 'regular',
//     gsm_lbs: false,
//   },

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  width: 100%;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  width: 100%;
`;

const ImageContainer = styled.Image`
  height: ${(props) => props.size || 48}px;
  width: ${(props) => props.size || 48}px;
`;

const Text = styled.Text`
  flex: 1;
  text-align: left;
  flex-wrap: wrap;
  font-size: 14px;
  color: ${(props) => (props.selected ? '#ffffff' : '#202020')};
`;
