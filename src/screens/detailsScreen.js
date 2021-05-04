import React, {useEffect, useState} from 'react';
import {StatusBar, ToastAndroid} from 'react-native';
import styled from 'styled-components';
import Storage from '../storage/storage';
import Separator from '../components/separators/separator';
import FloatingLoader from '../components/loaders/floatingLoader';
import API from '../api/api';

// TODO Pass the location as a state prop, or as an event emitter
export default function SuccessScreen({route, navigation}) {
  return (
    <Container>
      <StatusBar backgroundColor="#007aa6" />
      <Text>DETAILS!!!</Text>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 10px;
  background-color: #ffffff;
`;

const StatusContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #ffffff;
`;

const TransactionsContainer = styled.ScrollView``;

const Text = styled.Text`
  font-size: ${(props) => props.size || 18}px;
  color: ${(props) => props.color || '#000000'};
  font-family: 'Roboto-Regular';
  font-weight: ${(props) => props.weight || 'normal'};
  text-align: ${(props) => props.align || 'left'};
  margin: 5px;
`;

const ImageContainer = styled.Image`
  height: ${(props) => props.size || 150}px;
  width: ${(props) => props.size || 150}px;
  margin: ${(props) => props.margin || 10}px;
`;
