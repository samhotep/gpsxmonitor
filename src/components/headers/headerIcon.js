import React from 'react';
import styled from 'styled-components';

export default function HeaderIcon(props) {
  return (
    <Button onPress={props.onPress}>
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
  margin: ${(props) => props.margin || 15}px;
`;

const Button = styled.TouchableOpacity``;
