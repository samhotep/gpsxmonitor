import * as React from 'react';
import {useWindowDimensions} from 'react-native';
import styled from 'styled-components';

export default function FloatingLoader() {
  const window = useWindowDimensions();
  const adHeight = window.height / 2 - 100;
  const adWidth = window.width / 2 - 45;

  return (
    <Container>
      <Loader size="large" color="#b4004e" />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  background-color: #ffffff;
  elevation: 10;
  position: absolute;
  left: 45%;
  top: 75%;
  padding: 5px;
`;

const Loader = styled.ActivityIndicator`
  align-self: center;
`;
