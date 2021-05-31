import React from 'react';
import styled from 'styled-components';

export default function ChatBubble(props) {
  let messageDate = new Date(props.time.replace(/-+/g, '/'));
  let hours = messageDate.getHours();
  let minutes = messageDate.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  let time = hours >= 12 ? `${hours}:${minutes} PM` : `${hours}:${minutes} AM`;
  let dateString = `${messageDate.toDateString().slice(4, 10)}, ${time}`;
  return (
    <Container>
      {props.outgoing ? (
        <BubbleContainer outgoing={props.outgoing}>
          <TimeText>{dateString}</TimeText>
          <MessageContainer outgoing={props.outgoing}>
            <Text outgoing={true}>{props.text}</Text>
            <BubbleCorner source={require('../../assets/sent_triangle.png')} />
          </MessageContainer>
        </BubbleContainer>
      ) : (
        <BubbleContainer outgoing={props.outgoing}>
          <MessageContainer outgoing={props.outgoing}>
            <BubbleCorner
              source={require('../../assets/received_triangle.png')}
            />
            <Text>{props.text}</Text>
          </MessageContainer>
          <TimeText>{dateString}</TimeText>
        </BubbleContainer>
      )}
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 5px;
`;

const BubbleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const MessageContainer = styled.View`
  flex-direction: row;
  align-items: ${(props) => (props.outgoing ? 'flex-end' : 'flex-start')};
  justify-content: center;
`;

const BubbleCorner = styled.Image`
  height: 12px;
  width: 12px;
`;

const Text = styled.Text`
  padding: 10px 10px 15px 10px;
  text-align: left;
  flex-wrap: wrap;
  ${(props) =>
    props.outgoing
      ? 'border-top-left-radius: 5px;'
      : 'border-bottom-right-radius: 5px;'}
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  font-size: ${(props) => props.size || 14}px;
  color: ${(props) => (props.outgoing ? '#000000' : '#ffffff')};
  background-color: ${(props) => (props.outgoing ? '#a8caec' : '#66bb6a')};
`;

const TimeText = styled.Text`
  font-size: 12px;
  color: #585858;
`;
