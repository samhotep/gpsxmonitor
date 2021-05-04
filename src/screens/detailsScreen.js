import React, {useEffect, useState} from 'react';
import {StatusBar, ToastAndroid} from 'react-native';
import styled from 'styled-components';
import Separator from '../components/separators/separator';
import DrawerLoader from '../components/loaders/drawerLoader';
import Storage from '../storage/storage';
import API from '../api/api';

// TODO Pass the location as a state prop, or as an event emitter
export default function DetailsScreen({route, navigation}) {
  const [loading, setLoading] = useState(true);

  // if (loading) {
  //   return (
  //     <Container>
  //       <DrawerLoader />
  //     </Container>
  //   );
  // }

  return (
    <Container>
      <StatusBar backgroundColor="#007aa6" />
      <StatusContainer
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <Text>DETAILS!!</Text>
      </StatusContainer>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #e7f1f7;
`;

const StatusContainer = styled.ScrollView`
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

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
