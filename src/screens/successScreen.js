import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import BillingButton from '../components/buttons/billingButton';
import styled from 'styled-components';

// TODO Pass the location as a state prop, or as an event emitter
export default function SuccessScreen({route, navigation}) {
  const transaction = route.params;

  return (
    <Container>
      <StatusBar backgroundColor="#007aa6" />
      <Title>Purchase successfully placed</Title>
      <Text>Transaction ID:</Text>
      <Text size={17} weight="bold">
        {transaction.data.transactionId}
      </Text>
      <ImageContainer
        source={require('../assets/tick.png')}
        resizeMode="contain"
      />
      <BillingButton
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  justify-content: space-evenly;
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

const Text = styled.Text`
  font-size: ${(props) => props.size || 18}px;
  color: ${(props) => props.color || '#000000'};
  font-family: 'Roboto-Regular';
  font-weight: ${(props) => props.weight || 'normal'};
  text-align: ${(props) => props.align || 'left'};
`;

const ImageContainer = styled.Image`
  height: 150px;
  width: 150px;
  margin: 10px;
`;
