import * as React from 'react';
import styled from 'styled-components';

export default function CategoryItem(props) {
  return (
    <Container>
      <IdentityColor color={props.color}>
        <Text> </Text>
      </IdentityColor>
      <Text>{props.text}</Text>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: #e0e0e0;
  width: 100%;
`;

const IdentityColor = styled.View`
  align-items: flex-start;
  justify-content: center;
  background-color: ${(props) => props.color || '#4788c7'};
  width: 8px;
  margin-right: 5px;
`;

const Text = styled.Text`
  text-align: left;
  font-weight: bold;
  color: #676767;
`;
