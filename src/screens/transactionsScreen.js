import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import BillingButton from '../components/buttons/billingButton';
import styled from 'styled-components';

// TODO Pass the location as a state prop, or as an event emitter
export default function SuccessScreen({route, navigation}) {
  return (
    <Container>
      <StatusBar backgroundColor="#007aa6" />
      <Title>Transaction History</Title>
      <TransactionsContainer></TransactionsContainer>
      <BillingButton
        title="Renew Subscription"
        onPress={() => navigation.navigate('Subscribe')}
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
  font-size: 24px;
  font-family: 'Roboto-Regular';
  color: #000000;
  text-align: left;
  margin: 10px;
  width: 100%;
`;

const TransactionsContainer = styled.ScrollView``;

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
