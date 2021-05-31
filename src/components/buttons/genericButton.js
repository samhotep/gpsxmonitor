import React from 'react';
import styled from 'styled-components/native';

export default function GenericButton(props) {
  return (
    <Container
      onPress={props.onPress}
      android_ripple={{
        color: '#b5dbf1',
      }}
      width={props.width}
      bgcolor={props.bgcolor}>
      <Title size={props.size} color={props.color}>
        {props.title}
      </Title>
    </Container>
  );
}

const Container = styled.Pressable`
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  width: ${(props) => props.width || 240}px;
  padding: ${(props) => props.padding || 10}px;
  margin: ${(props) => props.margin || 10}px;
  background-color: ${(props) => props.bgcolor || '#1e96dc'};
  elevation: 5;
`;

const Title = styled.Text`
  font-size: ${(props) => props.size || 14}px;
  font-family: 'Roboto-Regular';
  color: ${(props) => props.color || '#ffffff'};
`;
