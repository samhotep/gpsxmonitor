/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {StatusBar, ToastAndroid} from 'react-native';
import styled from 'styled-components';
import DrawerLoader from '../components/loaders/drawerLoader';
import GenericButton from '../components/buttons/genericButton';
import LogoTitle from '../components/headers/logoTitle';
import API from '../api/api';
import Storage from '../storage/storage';

export default function MessageScreen({route, navigation}) {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [label, setLabel] = useState('');
  const viewRef = useRef();
  let {employee} = route.params;

  useEffect(() => {
    let newLabel = '';
    employee.first_name.split(' ').map((_, i) => {
      console.log(_);
      if (i !== 0) {
        newLabel += ' ';
      }
      newLabel += _.charAt(0).toUpperCase() + _.slice(1).toLowerCase();
    });
    setLabel(newLabel);
    Storage.getTrackerMessages()
      .then((res) => {
        setMessages(JSON.parse(res));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        ToastAndroid.show(
          error.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
  }, []);

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
      <LogoTitle title={label} navigation={navigation} showSearch={false} />
      <ContentContainer
        ref={viewRef}
        contentContainerStyle={{
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
        onContentSizeChange={() =>
          viewRef.current.scrollToEnd({animated: true})
        }>
        <GenericButton width={100} />
      </ContentContainer>
    </Container>
  );
}

const Container = styled.Pressable`
  flex: 1;
  flex-direction: column;
  height: 100%;
`;

const ContentContainer = styled.ScrollView`
  flex-direction: column;
  width: 100%;
`;
