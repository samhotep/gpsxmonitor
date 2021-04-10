import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import styled from 'styled-components';

// TODO Pass the location as a state prop, or as an event emitter
export default function ConfirmationScreen({navigation}) {
  return (
    <Container>
      <StatusBar backgroundColor="#007aa6" />
      <Title>Confirm your purchase</Title>
    </Container>
  );
}

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #ffffff;
`;

const Title = styled.Text`
  font-size: 32px;
  font-family: 'Roboto-Regular';
  color: #ffffff;
  text-align: left;
`;
