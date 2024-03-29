/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StatusBar, ToastAndroid} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import styled from 'styled-components';
import DrawerLoader from '../components/loaders/drawerLoader';
import VerticalSeparator from '../components/separators/verticalSeparator';
import DetailModal from '../components/modals/detailModal';
import RadioInput from '../components/inputs/radioInput';
import TaskItem from '../components/items/taskItem';
import LogoTitle from '../components/headers/logoTitle';
import Storage from '../storage/storage';
import Utils from '../utils/utils';
import Fuse from 'fuse.js';

export default function TaskScreen({route, navigation}) {
  const [loading, setLoading] = useState(true);
  let timeItems = ['Yesterday', 'Today', 'Tomorrow', 'Week', 'Month'];
  let radioItems = ['With any status', 'Finished', 'Unfinished'];
  const [showSearch, setShowSearch] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [selectedTime, setSelectedTime] = useState(1);
  const [selectedButton, setSelectedButton] = useState(
    Array(radioItems.length).fill(false),
  );
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const isFocused = useIsFocused();

  const options = {
    includeScore: true,
    keys: ['task.description', 'task.label'],
  };

  const fuse = new Fuse(allTasks, options);

  const updateRadioButtons = (i) => {
    let status = Array(radioItems.length).fill(false);
    status[i] = true;
    setSelectedButton(status);
  };

  const loadTasks = () => {
    setLoading(true);
    setTimeout(() => {
      Storage.getAllTasks()
        .then((storedTasks) => {
          return Utils.addTrackerData(JSON.parse(storedTasks));
        })
        .then((taskList) => {
          // TODO Filter by assigned status
          setAllTasks(taskList);
          setTasks(taskList);
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
    }, 10);
  };

  const filterBySearch = () => {
    let searchResults = [];
    const result = fuse.search(searchString);
    result.map((res, i) => {
      searchResults.push(res.item);
    });
    if (searchString === '') {
      setTasks(allTasks);
    } else {
      setTasks(searchResults);
    }
  };

  const filterByDate = () => {
    // Filter by from (starting date)
    let now = new Date(Date.now());
    let offset = now.getTimezoneOffset() / 60;
    let dateValue;
    let filteredTasks = [];
    if (timeItems[selectedTime] === 'Today') {
      dateValue = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        offset * -1,
        0,
        0,
      );
    } else if (timeItems[selectedTime] === 'Yesterday') {
      dateValue = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 1,
        offset * -1,
        0,
        0,
      );
    } else if (timeItems[selectedTime] === 'Tomorrow') {
      dateValue = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        offset * -1,
        0,
        0,
      );
    } else if (timeItems[selectedTime] === 'Week') {
      dateValue = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 7,
        offset * -1,
        0,
        0,
      );
    } else if (timeItems[selectedTime] === 'Month') {
      dateValue = new Date(
        now.getFullYear(),
        now.getMonth(),
        1,
        offset * -1,
        0,
        0,
      );
    }
    allTasks.map((group, i) => {
      let taskDate = new Date(group.task.from.replace(/-+/g, '/'));
      if (taskDate.getDate() >= dateValue.getDate()) {
        filteredTasks.push(group);
      }
    });
    setTasks(filteredTasks);
  };

  const filterByStatus = (value) => {
    // STATUSES "assigned", "done", "failed", "delayed", "arrived". "faulty"
    let statuses;
    let filteredTasks = [];
    if (value === 'Finished') {
      statuses = ['done'];
    } else if (value === 'With any status') {
      statuses = ['assigned', 'done', 'failed', 'delayed', 'arrived', 'faulty'];
    } else if (value === 'Unfinished') {
      statuses = ['assigned', 'delayed', 'arrived', 'faulty'];
    }
    allTasks.map((group, i) => {
      if (statuses.find((status) => status === group.task.status)) {
        filteredTasks.push(group);
      }
    });
    setTasks(filteredTasks);
  };

  useEffect(() => {
    filterBySearch();
  }, [searchString]);

  useEffect(() => {
    filterByStatus(
      radioItems[
        selectedButton.findIndex((value) => {
          return value === true;
        })
      ],
    );
  }, [selectedButton]);

  useEffect(() => {
    filterByDate();
  }, [selectedTime]);

  useEffect(() => {
    let defaultStatus = selectedButton;
    defaultStatus[0] = true;
    setSelectedButton(defaultStatus);
    loadTasks();
  }, []);

  useEffect(() => {
    setShowTimeModal(false);
    setShowStatusModal(false);
  }, [isFocused]);

  if (loading) {
    return (
      <Container>
        <StatusBar backgroundColor="#007aa6" />
        <LogoTitle />
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
      <LogoTitle
        title="Tasks"
        navigation={navigation}
        searchString={searchString}
        setSearchString={setSearchString}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />
      <FilterContainer>
        <TimeContainer
          onPress={() => {
            setShowTimeModal(!showTimeModal);
            setShowStatusModal(false);
          }}>
          <Text size={16}>{timeItems[selectedTime]}</Text>
          <ImageContainer source={require('../assets/down.png')} />
        </TimeContainer>
        <VerticalSeparator />
        <TimeContainer
          onPress={() => {
            setShowStatusModal(!showStatusModal);
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
  flex: 1;
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
