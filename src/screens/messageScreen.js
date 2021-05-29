import React, {useEffect, useState} from 'react';
import {StatusBar, ToastAndroid} from 'react-native';
import styled from 'styled-components';
import GenericButton from '../components/buttons/genericButton';
import DrawerLoader from '../components/loaders/drawerLoader';
import MessageItem from '../components/items/messageItem';
import API from '../api/api';

export default function MessageScreen({route, navigation}) {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [employees, setEmployees] = useState([]);

  let tests = [
    {
      id: 1,
      submit_time: '2021-05-30 09:02:24',
      update_time: null,
      text: 'Hello',
      type: 'INCOMING',
      status: 'DELIVERED',
      employee_id: 123456,
    },
    {
      id: 2,
      submit_time: '2021-05-30 09:04:24',
      update_time: null,
      text: 'Hi, How are you',
      type: 'OUTGOING',
      status: 'DELIVERED',
      employee_id: 123456,
    },
    {
      id: 3,
      submit_time: '2021-05-30 09:04:29',
      update_time: null,
      text: 'Whats up?',
      type: 'OUTGOING',
      status: 'PENDING',
      employee_id: 123456,
    },
  ];

  useEffect(() => {
    // Load from chat endpoint
    API.getEmployees()
      .then((employeeList) => {
        let sortedlist = employeeList.sort((a, b) => {
          return a.first_name[0] > b.first_name[0];
        });
        setEmployees(sortedlist);
      })
      .catch((error) => {
        ToastAndroid.show(
          error.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
    setMessages(tests);
    setLoading(false);
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
      <ContentContainer>
        {employees.map((employee, i) => {
          return <MessageItem employee={employee} i={i} />;
        })}
      </ContentContainer>
    </Container>
  );
}

const Container = styled.Pressable`
  flex-direction: column;
  background-color: #ffffff;
  flex: 1;
`;

const ContentContainer = styled.ScrollView`
  flex-direction: column;
  width: 100%;
`;
