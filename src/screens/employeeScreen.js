/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StatusBar, ToastAndroid} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import styled from 'styled-components';
import DrawerLoader from '../components/loaders/drawerLoader';
import EmployeeItem from '../components/items/employeeItem';
import LogoTitle from '../components/headers/logoTitle';
import API from '../api/api';
import Storage from '../storage/storage';
import Fuse from 'fuse.js';

export default function EmployeeScreen({route, navigation}) {
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [allEmployees, setAllEmployees] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [chats, setChats] = useState([]);
  const isFocused = useIsFocused();

  const options = {
    includeScore: true,
    threshold: 0.4,
    keys: ['first_name'],
  };

  const fuse = new Fuse(allEmployees, options);

  let test = [
    {
      id: 1,
      submit_time: '2021-05-30 09:02:24',
      update_time: null,
      text: 'Hello',
      type: 'INCOMING',
      status: 'DELIVERED',
      employee_id: 3484,
    },
    {
      id: 2,
      submit_time: '2021-05-30 09:04:24',
      update_time: null,
      text: 'Hi, How are you',
      type: 'OUTGOING',
      status: 'DELIVERED',
      employee_id: 3484,
    },
    {
      id: 3,
      submit_time: '2021-05-30 09:04:29',
      update_time: null,
      text: 'Whats up?',
      type: 'OUTGOING',
      status: 'PENDING',
      employee_id: 3484,
    },
  ];

  const filterBySearch = () => {
    let searchResults = [];
    const result = fuse.search(searchString);
    result.map((res, i) => {
      searchResults.push(res.item);
    });
    if (searchString === '') {
      setEmployees(allEmployees);
    } else {
      setEmployees(searchResults);
    }
  };

  const loadObjects = () => {
    let chats = [];
    Storage.getCurrentTracker()
      .then((res) => {
        let tracker = JSON.parse(res);
        return API.getChats(tracker.id);
      })
      .then((chatlist) => {
        // TODO Enable chats from endpoint
        // chats = chatlist;
        // setChats(chatlist);
        // Storage.setTrackerMessages(chatlist);
        // if (chatlist === 400) {
        //   throw {message: 'No objects available for chat'};
        // }
        chats = test;
        setChats(test);
        Storage.setTrackerMessages(chats);
        return Storage.getAllEmployees();
      })
      .then((employeeList) => {
        let sortedlist = [];
        JSON.parse(employeeList).map((employee, i) => {
          if (chats.find((chat) => chat.employee_id === employee.id)) {
            sortedlist.push(employee);
          }
        });
        sortedlist = sortedlist.sort((a, b) => {
          return a.first_name[0] > b.first_name[0];
        });
        setEmployees(sortedlist);
        setAllEmployees(sortedlist);
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
  };

  useEffect(() => {
    filterBySearch();
  }, [searchString]);

  useEffect(() => {
    loadObjects();
  }, [isFocused]);

  if (loading) {
    return (
      <Container>
        <StatusBar backgroundColor="#007aa6" />
        <LogoTitle title="Employees" />
        <DrawerLoader />
      </Container>
    );
  }

  return (
    <Container>
      <LogoTitle
        title="Messages"
        navigation={navigation}
        searchString={searchString}
        setSearchString={setSearchString}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />
      <ContentContainer
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        {chats === 400 ? (
          <Text margin={300}>No objects available for chat</Text>
        ) : (
          employees.map((employee, i) => {
            return (
              <EmployeeItem
                employee={employee}
                onPress={() =>
                  navigation.navigate('MessageScreen', {employee: employee})
                }
              />
            );
          })
        )}
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
  background-color: #ffffff;
`;

const Text = styled.Text`
  text-align: left;
  line-height: ${(props) => props.size || 14}px;
  flex-wrap: wrap;
  font-size: ${(props) => props.size || 14}px;
  color: ${(props) => (props.color ? props.color : '#808080')};
  margin-top: ${(props) => props.margin || 14}px;
`;
