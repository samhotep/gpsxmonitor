import React from 'react';
import Separator from '../separators/separator';
import styled from 'styled-components';

export default function TrackerItem(props) {
  return (
    <>
      <Container
        onPress={props.onPress}
        android_ripple={{
          color: '#b5dbf1',
        }}>
        <ImageContainer source={require('../../assets/chip.png')} />
        <TextContainer>
          <Text size={18}>{props.employee.first_name}</Text>
          {props.employee.phone ? (
            <Text size={16}>{props.employee.phone}</Text>
          ) : null}
        </TextContainer>
      </Container>
      <Separator nomargin={true} />
    </>
  );
}

const Container = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.color || '#ffffff'};
`;

const TextContainer = styled.View`
  flex-grow: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;
const ImageContainer = styled.Image`
  height: ${(props) => props.size || 32}px;
  width: ${(props) => props.size || 32}px;
  margin: 20px;
`;

const Text = styled.Text`
  text-align: left;
  line-height: ${(props) => props.size || 14}px;
  flex-wrap: wrap;
  font-size: ${(props) => props.size || 14}px;
  color: ${(props) => (props.color ? props.color : '#202020')};
  margin: 5px;
`;
