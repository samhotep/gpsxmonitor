import * as React from 'react';
import styled from 'styled-components';

export default function DrawerLoader() {
  const size = 50;

  return (
    <Container size={size}>
      <Loader size={70} color="#4788c7" />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  background-color: transparent;
`;

const Loader = styled.ActivityIndicator``;
