import React, {useEffect, useState} from 'react';
import {StatusBar, ToastAndroid} from 'react-native';
import Separator from '../components/separators/separator';
import styled from 'styled-components';
import FloatingLoader from '../components/loaders/floatingLoader';
import API from '../api/api';

export default function SuccessScreen({route, navigation}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setLoading(true);
  }, []);

  return (
    <Container>
      <StatusBar backgroundColor="#007aa6" />
      <StatusContainer>
        <ImageContainer source={require('../assets/timer.png')} size={36} />
      </StatusContainer>
      <Separator />
      <Text size={16}>TASKS!</Text>
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
