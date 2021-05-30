/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StatusBar, ToastAndroid} from 'react-native';
import styled from 'styled-components';
import DrawerLoader from '../components/loaders/drawerLoader';
import TrackerItem from '../components/items/trackerItem';
import LogoTitle from '../components/headers/logoTitle';
import Storage from '../storage/storage';
import API from '../api/api';
import Fuse from 'fuse.js';

export default function TrackerChatScreen({route, navigation}) {
  const [loading, setLoading] = useState(true);
  const [trackers, setTrackers] = useState([]);
  const [allTrackers, setAllTrackers] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [unread, setUnread] = useState();

  let testunread = {
    6080: 10,
    6079: 31,
  };

  const options = {
    includeScore: true,
    threshold: 0.2,
    keys: ['label'],
  };

  const fuse = new Fuse(allTrackers, options);

  const filterBySearch = () => {
    let searchResults = [];
    const result = fuse.search(searchString);
    result.map((res, i) => {
      searchResults.push(res.item);
    });
    if (searchString === '') {
      setTrackers(allTrackers);
    } else {
      setTrackers(searchResults);
    }
  };

  useEffect(() => {
    filterBySearch();
  }, [searchString]);

  useEffect(() => {
    // TODO Only show employees who have sent messages
    Storage.getAllTrackers()
      .then((res) => {
        let sortedlist = JSON.parse(res).sort((a, b) => {
          return a.label[0] > b.label[0];
        });
        setTrackers(sortedlist);
        setAllTrackers(sortedlist);
        return API.getUnreadChatCount();
      })
      .then((obj) => {
        // setUnread(obj);
        setUnread(testunread);
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
        <LogoTitle title="Trackers" />
        <DrawerLoader />
      </Container>
    );
  }

  return (
    <Container>
      <LogoTitle
        title="Trackers"
        navigation={navigation}
        searchString={searchString}
        setSearchString={setSearchString}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />
      <ContentContainer>
        {trackers.map((tracker, i) => {
          return (
            <TrackerItem
              tracker={tracker}
              unread={unread[tracker.id]}
              onPress={() =>
                navigation.navigate('EmployeeScreen', {tracker: tracker})
              }
            />
          );
        })}
      </ContentContainer>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  background-color: #ffffff;
  flex: 1;
`;

const ContentContainer = styled.ScrollView`
  flex-direction: column;
  width: 100%;
`;
