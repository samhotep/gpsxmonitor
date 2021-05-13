import * as React from 'react';
import styled from 'styled-components';

export default function EventItem(props) {
  return (
    <Container>
      <RowContainer>
        <ImageContainer source={require('../../assets/track.png')} />
      </RowContainer>
      <RowContainer>
        <Text selected={props.selected}>{props.text}</Text>
      </RowContainer>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
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
  height: ${(props) => props.size || 24}px;
  width: ${(props) => props.size || 24}px;
`;

const Text = styled.Text`
  flex: 1;
  text-align: left;
  flex-wrap: wrap;
  font-size: 14px;
  color: ${(props) => (props.selected ? '#ffffff' : '#202020')};
`;
