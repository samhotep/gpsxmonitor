/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StatusBar, ToastAndroid} from 'react-native';
import Separator from '../components/separators/separator';
import styled from 'styled-components';
import DrawerLoader from '../components/loaders/drawerLoader';
import VerticalSeparator from '../components/separators/verticalSeparator';
import DetailModal from '../components/modals/detailModal';
import RadioInput from '../components/inputs/radioInput';
import TaskItem from '../components/items/taskItem';
import Storage from '../storage/storage';
import Utils from '../utils/utils';

export default function TaskScreen({route, navigation}) {
  const [loading, setLoading] = useState(true);
  let timeItems = ['Yesterday', 'Today', 'Tomorrow', 'Week', 'Month'];
  let radioItems = ['With any status', 'Finished', 'Unfinished'];
  const [selectedTime, setSelectedTime] = useState(1);
  const [selectedButton, setSelectedButton] = useState(
    Array(radioItems.length).fill(false),
  );
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [tasks, setTasks] = useState([]);

  let tests = [
    {
      arrival_date: null,
      creation_date: '2020-04-07 13:19:01',
      description: 'Visiting URA',
      external_id: null,
      from: '2020-04-07 00:00:00',
      id: 1,
      label: 'Visiting URA',
      location: {
        address: 'Kampala, Central Region, Uganda, P.O. BOX 4365',
        lat: 0.33036264,
        lng: 32.63800979,
        radius: 50,
      },
      max_delay: 0,
      min_arrival_duration: 0,
      min_stay_duration: 0,
      origin: 'manual',
      status: 'unassigned',
      status_change_date: null,
      stay_duration: 0,
      to: '2020-04-07 23:59:59',
      tracker_id: 6079,
      type: 'task',
      user_id: 1,
    },
    {
      arrival_date: null,
      creation_date: '2020-04-17 08:40:00',
      description: 'Delivery Parcels in Kampala',
      external_id: '45156',
      form: {
        created: '2020-04-17 08:40:00',
        description: '',
        fields: [Array],
        id: 7,
        label: 'Delivery Note',
        submit_in_zone: false,
        submit_location: [Object],
        submitted: null,
        task_id: 10,
        template_id: 5,
        values: null,
      },
      from: '2020-04-17 00:00:00',
      id: 10,
      label: 'Delivering parcels',
      location: {
        address: 'Kampala Road, Kampala, Uganda',
        lat: 0.3133012,
        lng: 32.5809105,
        radius: 150,
      },
      max_delay: 0,
      min_arrival_duration: 0,
      min_stay_duration: 0,
      origin: 'manual',
      status: 'unassigned',
      status_change_date: null,
      stay_duration: 0,
      to: '2020-04-18 23:59:59',
      tracker_id: 6080,
      type: 'task',
      user_id: 1,
    },
    {
      arrival_date: null,
      creation_date: '2020-04-17 08:53:33',
      description: '',
      external_id: null,
      form: {
        created: '2020-04-17 08:53:33',
        description: '',
        fields: [Array],
        id: 8,
        label: 'New form',
        submit_in_zone: false,
        submit_location: [Object],
        submitted: null,
        task_id: 11,
        template_id: null,
        values: null,
      },
      from: '2020-04-17 00:00:00',
      id: 11,
      label: 'Power Reconnection',
      location: {
        address: 'Kampala, Uganda',
        lat: 0.3475964,
        lng: 32.5825197,
        radius: 150,
      },
      max_delay: 0,
      min_arrival_duration: 0,
      min_stay_duration: 0,
      origin: 'manual',
      status: 'unassigned',
      status_change_date: null,
      stay_duration: 0,
      to: '2020-04-17 23:59:59',
      tracker_id: 6079,
      type: 'task',
      user_id: 1,
    },
  ];

  const updateRadioButtons = (i) => {
    let status = Array(radioItems.length).fill(false);
    status[i] = true;
    setSelectedButton(status);
  };

  useEffect(() => {
    let defaultStatus = selectedButton;
    defaultStatus[0] = true;
    setSelectedButton(defaultStatus);
    Storage.getAllTasks()
      .then((storedTasks) => {
        // return Utils.addTrackerData(JSON.parse(storedTasks));
        return Utils.addTrackerData(tests);
      })
      .then((taskList) => {
        setAllTasks(taskList);
        setTasks(taskList);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
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
    <Container
      onPress={() => {
        setShowTimeModal(false);
        setShowStatusModal(false);
      }}>
      <FilterContainer>
        <TimeContainer
          onPress={() => {
            setShowTimeModal(true);
            setShowStatusModal(false);
          }}>
          <Text size={16}>{timeItems[selectedTime]}</Text>
          <ImageContainer source={require('../assets/down.png')} />
        </TimeContainer>
        <VerticalSeparator />
        <TimeContainer
          onPress={() => {
            setShowStatusModal(true);
            setShowTimeModal(false);
          }}>
          <Text size={16} />
          <ImageContainer source={require('../assets/filter_grey.png')} />
        </TimeContainer>
      </FilterContainer>
      <ContentContainer
        contentContainerStyle={{
          justifyContent: 'space-between',
        }}>
        <StatusBar backgroundColor="#007aa6" />
        {tasks.map((task, i) => {
          return <TaskItem group={task} navigation={navigation} />;
        })}
      </ContentContainer>
      <DetailModal
        clicked={showTimeModal}
        height={220}
        width={150}
        top={0}
        right={200}
        inject={
          <ModalContainer>
            {timeItems.map((_, i) => {
              return (
                <OptionContainer
                  onPress={() => {
                    setSelectedTime(i);
                    setShowTimeModal(false);
                  }}>
                  <Text size={16}>{_}</Text>
                </OptionContainer>
              );
            })}
          </ModalContainer>
        }
      />
      <DetailModal
        clicked={showStatusModal}
        height={220}
        width={200}
        top={0}
        right={0}
        inject={
          <ModalContainer>
            <Text size={16} color="#808080" margin={10}>
              Show:
            </Text>
            {radioItems.map((_, i) => {
              return (
                <OptionContainer
                  onPress={() => {
                    updateRadioButtons(i);
                    setShowStatusModal(false);
                  }}>
                  <Text size={16} color="#808080" margin={10}>
                    {_}
                  </Text>
                  <RadioContainer>
                    <RadioInput
                      color="#1e96dc"
                      selected={selectedButton[i]}
                      onPress={() => {
                        updateRadioButtons(i);
                        setShowStatusModal(false);
                      }}
                    />
                  </RadioContainer>
                </OptionContainer>
              );
            })}
          </ModalContainer>
        }
      />
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

const FilterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  width: 100%;
  height: 50px;
  padding: 4px;
  elevation: 3;
`;

const TimeContainer = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px 5px 10px;
`;

const OptionContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 5px;
`;

const Text = styled.Text`
  font-size: ${(props) => props.size || 18}px;
  color: ${(props) => props.color || '#000000'};
  font-family: 'Roboto-Regular';
  font-weight: ${(props) => props.weight || 'normal'};
  text-align: ${(props) => props.align || 'left'};
  margin: ${(props) => props.margin || 5}px;
`;

const ImageContainer = styled.Image`
  height: ${(props) => props.size || 24}px;
  width: ${(props) => props.size || 24}px;
`;

const ModalContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 5px;
`;

const RadioContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: ${(props) => props.size || 28}px;
  height: ${(props) => props.size || 28}px;
  margin: ${(props) => props.margin || 10}px;
`;
