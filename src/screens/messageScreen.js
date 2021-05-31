/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {StatusBar, ToastAndroid} from 'react-native';
import styled from 'styled-components';
import DrawerLoader from '../components/loaders/drawerLoader';
import GenericButton from '../components/buttons/genericButton';
import LogoTitle from '../components/headers/logoTitle';
import ChatBubble from '../components/items/chatBubble';
import API from '../api/api';
import Storage from '../storage/storage';

export default function MessageScreen({route, navigation}) {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [label, setLabel] = useState('');
  const [sendString, setSendString] = useState('');
  const viewRef = useRef();
  let {employee} = route.params;

  useEffect(() => {
    let newLabel = '';
    employee.first_name.split(' ').map((_, i) => {
      if (i !== 0) {
        newLabel += ' ';
      }
      newLabel += _.charAt(0).toUpperCase() + _.slice(1).toLowerCase();
    });
    setLabel(newLabel);
    Storage.getTrackerMessages()
      .then((res) => {
        let employeeMessages = [];
        JSON.parse(res).map((_, i) => {
          if (_.employee_id === employee.id) {
            employeeMessages.push(_);
          }
        });
        setMessages(employeeMessages);
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
        {messages.map((message, i) => {
          return (
            <ChatBubble
              text={message.text}
              outgoing={message.type === 'OUTGOING'}
              time={message.submit_time}
            />
          );
        })}
      </ContentContainer>
      <SendContainer>
        <SendInput
          returnKeyType="send"
          multiline={true}
          onChangeText={(text) => setSendString(text)}
        />
        <GenericButton width={100} title="SEND" />
      </SendContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  height: 100%;
`;

const ContentContainer = styled.ScrollView`
  flex-direction: column;
  padding: 5px;
  width: 100%;
`;

const SendContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const SendInput = styled.TextInput`
  flex-grow: 1;
  font-size: 16px;
  margin: 5px;
  padding: 2px;
  border-bottom-width: 1px;
  border-bottom-color: #808080;
  width: 80px;
`;
