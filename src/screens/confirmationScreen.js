import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import styled from 'styled-components';

// TODO Pass the location as a state prop, or as an event emitter
export default function ConfirmationScreen({route, navigation}) {
  const service = route.params;
  const periods = {
    1: {name: 'Day', time: '1 day'},
    2: {name: 'Month', time: '30 days'},
  };
  useEffect(() => {
    console.log(route.params);
  });
  return (
    <Container>
      <StatusBar backgroundColor="#007aa6" />
      <Title>Confirm your purchase</Title>
      <TextRow>
        <Text>Name:</Text>
        <Text weight="bold" align="right">
          {service.name.charAt(0).toUpperCase()}
          {service.name.slice(1)}
        </Text>
      </TextRow>
      <TextRow>
        <Text>Amount:</Text>
        <Text weight="bold" align="right">
          Ugx{' '}
          {service.pricing.amount
            .toFixed(1)
            .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
        </Text>
      </TextRow>
      <TextRow>
        <Text>Duration:</Text>
        <Text>{periods[service.pricing.periodic].time}</Text>
      </TextRow>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 20px;
  background-color: #ffffff;
`;

const Title = styled.Text`
  font-size: 42px;
  font-family: 'Roboto-Regular';
  color: #000000;
  text-align: left;
  margin: 10px;
`;

const TextContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: red;
`;

const TextRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
  padding: 10px;
  width: 100%;
`;

const Text = styled.Text`
  font-size: ${(props) => props.size || 24}px;
  color: ${(props) => props.color || '#000000'};
  font-family: 'Roboto-Regular';
  font-weight: ${(props) => props.weight || 'normal'};
  text-align: ${(props) => props.align || 'left'};
`;
