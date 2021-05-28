/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StatusBar, ToastAndroid} from 'react-native';
import AssigneeItem from '../components/items/assigneeItem';
import styled from 'styled-components';
import DrawerLoader from '../components/loaders/drawerLoader';
import Storage from '../storage/storage';

export default function AssigneeScreen({route, navigation}) {
  let {task, tracker} = route.params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(task);
    console.log(tracker);
    setLoading(false);
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
        <AssigneeItem tracker={tracker} />
      </ContentContainer>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  height: 100%;
`;

const ContentContainer = styled.ScrollView`
  flex-direction: column;
  width: 100%;
  padding: 10px;
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
