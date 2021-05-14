import React from 'react';
import styled from 'styled-components/native';

export default function ClearButton(props) {
  return (
    <Container
      onPress={props.onPress}
      width={props.width}
      bgcolor={props.bgcolor}>
      <ImageContainer source={require('../../assets/clear.png')} />
      <Title color={props.color}>Clear</Title>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 5px;
  width: 100%;
  background-color: ${(props) => props.bgcolor || '#ffffff'};
`;

const ImageContainer = styled.Image`
  width: ${(props) => props.size || 28}px;
  height: ${(props) => props.size || 28}px;
  margin: ${(props) => props.margin || 10}px;
`;

const Title = styled.Text`
  font-size: 14px;
  font-family: 'Roboto-Regular';
  color: ${(props) => props.color || '#737373'};
`;
