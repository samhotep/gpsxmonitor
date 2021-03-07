import React from 'react';
import styled from 'styled-components';

export default function HomeModal(props) {
  return (
    !props.clicked || (
      <Button
        onPress={props.onPress}
        bottom={props.bottom}
        left={props.left}
        height={props.height}
        width={props.width}>
        {props.inject}
      </Button>
    )
  );
}

const Button = styled.View`
  position: absolute;
  background-color: #ffffff;
  border-radius: 3px;
  height: ${(props) => props.height || 150}px;
  width: ${(props) => props.width || 100}px;
  elevation: 3;
  bottom: ${(props) => props.bottom || 30}px;
  left: ${(props) => props.left || 10}px;
`;
