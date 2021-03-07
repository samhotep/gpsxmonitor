import React from 'react';
import styled from 'styled-components';

export default function HomeButton(props) {
  return (
    <Button onPress={props.onPress} bottom={props.bottom} left={props.left}>
      <ImageContainer
        source={props.source}
        size={props.size}
        margin={props.margin}
      />
    </Button>
  );
}

const ImageContainer = styled.Image`
  width: ${(props) => props.size || 28}px;
  height: ${(props) => props.size || 28}px;
  margin: ${(props) => props.margin || 10}px;
`;

const Button = styled.TouchableOpacity`
  position: absolute;
  background-color: #ffffff;
  border-radius: 3px;
  elevation: 3;
  bottom: ${(props) => props.bottom || 30}px;
  left: ${(props) => props.left || 10}px;
`;
