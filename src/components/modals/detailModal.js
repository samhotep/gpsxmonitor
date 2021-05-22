import React from 'react';
import styled from 'styled-components';

export default function DetailModal(props) {
  return (
    !props.clicked || (
      <Container
        top={props.top}
        right={props.right}
        height={props.height}
        width={props.width}>
        {props.inject}
      </Container>
    )
  );
}

const Container = styled.View`
  position: absolute;
  background-color: #ffffff;
  border-radius: 3px;
  height: ${(props) => props.height || 150}px;
  width: ${(props) => props.width || 100}px;
  elevation: 50;
  top: ${(props) => props.top || 30}px;
  right: ${(props) => props.right || 10}px;
`;
