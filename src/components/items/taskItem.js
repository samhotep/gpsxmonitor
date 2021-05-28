import React, {useState, useEffect} from 'react';
import Separator from '../separators/separator';
import styled from 'styled-components';

export default function TaskItem(props) {
  return (
    <Container>
      <Container
        onPress={() =>
          props.navigation.navigate('AssigneeScreen', {
            task: props.group.task,
            tracker: props.group.tracker,
          })
        }>
        <RowContainer color={'#f4f6f4'}>
          <ImageContainer source={require('../../assets/board.png')} />
          <Text>{props.group.tracker.label}</Text>
        </RowContainer>
      </Container>
      <Separator nomargin={true} />
      <Container
        onPress={() =>
          props.navigation.navigate('TaskDetailScreen', {
            task: props.group.task,
            tracker: props.group.tracker,
          })
        }>
        <RowContainer>
          <ImageContainer
            source={require('../../assets/circle.png')}
            size={24}
          />
          <Text size={22}>{props.group.task.label}</Text>
        </RowContainer>
        <RowContainer>
          <ImageContainer
            source={require('../../assets/calendar.png')}
            size={24}
          />
          <Text color="#737373">
            {props.group.task.from} {props.group.task.to}
          </Text>
        </RowContainer>
        <RowContainer>
          <ImageContainer source={require('../../assets/pin.png')} size={24} />
          <Text color="#737373">{props.group.task.location.address}</Text>
        </RowContainer>
      </Container>

      <Separator nomargin={true} />
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  width: 100%;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 20px 0px 20px;
  background-color: ${(props) => props.color || '#ffffff'};
`;

const ImageContainer = styled.Image`
  height: ${(props) => props.size || 32}px;
  width: ${(props) => props.size || 32}px;
`;

const Text = styled.Text`
  flex: 1;
  text-align: left;
  flex-wrap: wrap;
  font-size: ${(props) => props.size || 14}px;
  color: ${(props) => (props.selected ? '#ffffff' : '#202020')};
  margin: 10px;
`;
