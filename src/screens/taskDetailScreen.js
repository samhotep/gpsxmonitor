/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StatusBar, ToastAndroid} from 'react-native';
import styled from 'styled-components';
import DrawerLoader from '../components/loaders/drawerLoader';
import DetailItem from '../components/items/detailItem';

export default function TaskDetailScreen({route, navigation}) {
  let {task, tracker} = route.params;
  const [loading, setLoading] = useState(true);
  let fromDate = new Date(task.from.replace(/-+/g, '/'));
  let toDate = new Date(task.to.replace(/-+/g, '/'));

  const details = [
    {
      label: task.label,
      detail: task.status,
      color: '#4788c7',
      size: 22,
      front_icon: require('../assets/circle.png'),
    },
    {
      detail: tracker.label,
      color: '#000000',
      size: 22,
      front_icon: require('../assets/user_assignee.png'),
    },
    {
      label: task.location.address,
      color: '#000000',
      size: 16,
      front_icon: require('../assets/pin.png'),
      back_icon: require('../assets/directions.png'),
    },
    {
      label: `${fromDate.toLocaleDateString()} ${fromDate
        .toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
        .slice(0, -3)} - ${toDate.toLocaleDateString()} ${toDate
        .toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
        .slice(0, -3)}`,
      color: '#000000',
      size: 16,
      front_icon: require('../assets/calendar.png'),
    },
    {
      label: task.description,
      color: '#000000',
      size: 16,
      front_icon: require('../assets/clipboard.png'),
    },
  ];

  useEffect(() => {
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
      {details.map((detail, i) => {
        return (
          <DetailItem
            header={detail.label}
            detail={detail.detail}
            color={detail.color}
            size={detail.size}
            front_icon={detail.front_icon}
            back_icon={detail.back_icon}
          />
        );
      })}
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #ffffff;
  height: 100%;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;

const DetailContainer = styled.TouchableOpacity`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px;
`;

const Text = styled.Text`
  font-size: ${(props) => props.size || 22}px;
  color: ${(props) => props.color || '#000000'};
  font-family: 'Roboto-Regular';
  font-weight: ${(props) => props.weight || 'normal'};
  text-align: ${(props) => props.align || 'left'};
  margin: ${(props) => props.margin || 5}px;
`;

const ImageContainer = styled.Image`
  height: ${(props) => props.size || 24}px;
  width: ${(props) => props.size || 24}px;
  margin: 10px;
`;
