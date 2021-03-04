import * as React from 'react';
import styled from 'styled-components';

// TODO Animate the list
export default function ListItem(props) {
  return (
    <Highlight onPress={props.onPress}>
      <Container selected={props.selected}>
        <Text selected={props.selected}>{props.text}</Text>
        <IdentityColor color={props.color} />
      </Container>
    </Highlight>
  );
}

const Highlight = styled.TouchableHighlight``;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => (props.selected ? '#4788c7' : '#ffffff')};
  width: 100%;
  padding: 10px;
`;

const IdentityColor = styled.View`
  align-items: flex-start;
  justify-content: center;
  background-color: ${(props) => props.color || '#4788c7'};
  border-radius: 15px;
  border: 1px #ffffff;
  width: 8px;
  padding: 7px;
  margin-right: 5px;
`;

const Text = styled.Text`
  text-align: center;
  color: ${(props) => (props.selected ? '#ffffff' : '#202020')};
  padding: 5px;
`;
