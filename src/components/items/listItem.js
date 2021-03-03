import * as React from 'react';
import styled from 'styled-components';

export default function ListItem(props) {
  return (
    <Container>
      <Text>{props.text}</Text>
      <IdentityColor color={props.color} />
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  width: 100%;
  padding: 10px;
`;

const IdentityColor = styled.View`
  align-items: flex-start;
  justify-content: center;
  background-color: ${(props) => props.color || '#4788c7'};
  border-radius: 15px;
  width: 8px;
  padding: 7px;
  margin-right: 5px;
`;

const Text = styled.Text`
  text-align: center;
  color: #202020;
  padding: 5px;
`;
