import * as React from 'react';
import {useWindowDimensions} from 'react-native';
import styled from 'styled-components';

export default function DrawerLoader() {
  const window = useWindowDimensions();
  const size = 50;
  const depth = 100;

  return (
    <Container size={size}>
      <Loader size={90} color="#4788c7" />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  background-color: #ffffff;
`;

const Loader = styled.ActivityIndicator``;
