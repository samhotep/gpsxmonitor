import React, {useEffect, useState} from 'react';
import {StatusBar, ToastAndroid} from 'react-native';
import styled from 'styled-components';
import DrawerLoader from '../components/loaders/drawerLoader';
import MessageItem from '../components/items/employeeItem';
import API from '../api/api';

export default function MessageScreen({route, navigation}) {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Load from chat endpoint
    API.getEmployees()
      .then((employeeList) => {
        let sortedlist = employeeList.sort((a, b) => {
          return a.first_name[0] > b.first_name[0];
        });
        setEmployees(sortedlist);
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
