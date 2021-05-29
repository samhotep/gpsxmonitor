import React, {useEffect, useState} from 'react';
import {StatusBar, ToastAndroid} from 'react-native';
import AssigneeItem from '../components/items/assigneeItem';
import styled from 'styled-components';
import DrawerLoader from '../components/loaders/drawerLoader';
import Storage from '../storage/storage';
import API from '../api/api';

export default function AssigneeScreen({route, navigation}) {
  let {task, tracker} = route.params;
  const [loading, setLoading] = useState(true);
  const [trackers, setTrackers] = useState([]);

  const handleAssigneeSelection = (selectedTracker) => {
    let allTasks = [];
    Storage.getAllTasks()
      .then((res) => {
        allTasks = JSON.parse(res);
        allTasks.map((_, i) => {
          if (_.id === task.id) {
            _.tracker_id = selectedTracker.id;
          }
        });
        return API.assignTask(task.id, selectedTracker.id);
      })
      .then((result) => {
        if (result.success === true) {
          Storage.setAllTasks(allTasks);
        } else {
          ToastAndroid.show(
            result.status.description,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadTrackers = () => {
    setLoading(true);
    Storage.getAllTrackers().then((res) => {
      let allTrackers = JSON.parse(res);
      setTrackers(allTrackers);
      setLoading(false);
      if (allTrackers === []) {
        ToastAndroid.show(
          'No available Assignees',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
    });
  };

  useEffect(() => {
    loadTrackers();
  }, []);

  if (loading) {
    return (
      <Container>
        <DrawerLoader />
      </Container>
    );
  }

  return (
    <Container>
      <StatusBar backgroundColor="#007aa6" />
      <ContentContainer>
        <AssigneeItem
          tracker={{label: 'Unassigned'}}
          onPress={() => handleAssigneeSelection({id: null})}
          selected={tracker.id === null}
          navigation={navigation}
        />
        {trackers.map((_, i) => {
          return (
            <AssigneeItem
              tracker={_}
              onPress={handleAssigneeSelection}
              selected={tracker.id === _.id}
              navigation={navigation}
            />
          );
        })}
      </ContentContainer>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  flex: 1;
`;

const ContentContainer = styled.ScrollView`
  flex-direction: column;
  width: 100%;
  padding: 10px;
`;
