import React, {useRef, useEffect, useState} from 'react';
import styled from 'styled-components/native';

export default function RadioInput(props) {
  return (
    <Container
      onPress={props.onPress}
      color={props.color}
      margin={props.margin}
      size={props.size}
      noBorder={props.noBorder}>
      {props.selected ? <Inner color={props.color} /> : null}
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  border-radius: 30px;
  height: ${(props) => props.size || 24}px;
  width: ${(props) => props.size || 24}px;
  margin: ${(props) => props.margin || 5}px;
  padding: 4px;
  border: 2px ${(props) => props.color || '#000000'};
`;

const Inner = styled.View`
  border-radius: 10px;
  background-color: ${(props) => props.color || '#000000'};
  height: 100%;
`;
