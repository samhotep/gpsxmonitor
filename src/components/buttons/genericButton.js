import React from 'react';
import styled from 'styled-components/native';

export default function GenericButton(props) {
  return (
    <Container
      onPress={props.onPress}
      width={props.width}
      bgcolor={props.bgcolor}>
      <Title color={props.color}>{props.title}</Title>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  padding: 10px;
  width: ${(props) => props.width || 240}px;
  margin: 10px;
  background-color: ${(props) => props.bgcolor || '#1e96dc'};
  elevation: 5;
`;

const Title = styled.Text`
  font-size: 14px;
  font-family: 'Roboto-Regular';
  color: ${(props) => props.color || '#ffffff'};
`;
