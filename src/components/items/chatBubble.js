import React from 'react';
import styled from 'styled-components';

export default function ChatBubble(props) {
  return (
    <Container outgoing={props.outgoing}>
      <BubbleContainer outgoing={props.outgoing}>
        {props.outgoing ? (
          <>
            <Text outgoing={true}>{props.text}</Text>
            <BubbleCorner source={require('../../assets/sent_triangle.png')} />
          </>
        ) : (
          <>
            <BubbleCorner
              source={require('../../assets/received_triangle.png')}
            />
            <Text>{props.text}</Text>
          </>
        )}
      </BubbleContainer>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  align-items: ${(props) => (props.outgoing ? 'flex-end' : 'flex-start')};
  justify-content: center;
  width: 100%;
  padding: 5px;
`;

const BubbleContainer = styled.View`
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
