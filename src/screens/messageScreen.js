import React, {useEffect, useState} from 'react';
import {StatusBar, ToastAndroid} from 'react-native';
import styled from 'styled-components';
import DrawerLoader from '../components/loaders/drawerLoader';

export default function MessageScreen({route, navigation}) {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <Container>
        <StatusBar backgroundColor="#007aa6" />
        <DrawerLoader />
      </Container>
    );
  }

  return (
    <Container>
      <ContentContainer></ContentContainer>
    </Container>
  );
}

const Container = styled.Pressable`
  flex-direction: column;
  background-color: #ffffff;
  height: 100%;
`;

const ContentContainer = styled.ScrollView`
  flex-direction: column;
  width: 100%;
`;
