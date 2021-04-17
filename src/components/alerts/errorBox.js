import React from 'react';
import styled from 'styled-components/native';

export default function ErrorBox(props) {
  return (
    <Container>
      <MessageContainer>
        <ImageContainer source={require('../../assets/warning.png')} />
        <Title color={props.color}>{props.text}</Title>
      </MessageContainer>
      <ReloadButton onPress={props.onPress}>
        <ImageContainer
          source={require('../../assets/refresh.png')}
          size={50}
        />
      </ReloadButton>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border-left-width: 4px;
  border-right-width: 4px;
  border-color: #1e96dc;
  padding: 12px;
  width: ${(props) => props.width || 250}px;
  margin: 10px;
  background-color: ${(props) => props.bgcolor || '#ffffff'};
  elevation: 2;
`;

const MessageContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const Title = styled.Text`
  font-size: 16px;
  font-family: 'Roboto-Regular';
  color: ${(props) => props.color || '#808080'};
`;

const ImageContainer = styled.Image`
  height: ${(props) => props.size || 24}px;
  width: ${(props) => props.size || 24}px;
`;

const ReloadButton = styled.TouchableOpacity`
  padding: 5px;
  margin: 5px;
`;
