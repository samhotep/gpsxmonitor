import React from 'react';
import styled from 'styled-components/native';

export default function BillingButton(props) {
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
  border-radius: 4px;
  padding: 12px;
  width: ${(props) => props.width || 300}px;
  margin: 10px;
  background-color: ${(props) => props.bgcolor || '#1e96dc'};
  elevation: 5;
`;

const Title = styled.Text`
  font-size: 18px;
  font-family: 'Roboto-Regular';
  color: ${(props) => props.color || '#ffffff'};
`;
