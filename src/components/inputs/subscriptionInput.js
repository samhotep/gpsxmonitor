import React from 'react';
import RadioInput from './radioInput';
import styled from 'styled-components/native';

export default function SubscriptionInput(props) {
  return (
    <Container onPress={props.onPress}>
      <RadioInput
        color="#1e96dc"
        selected={props.value}
        onPress={props.onPress}
      />
      <TextContainer>
        <Text weight="bold">
          {props.name.charAt(0).toUpperCase()}
          {props.name.slice(1)}
        </Text>
        <Text>
          Ugx {props.price.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}/
          {props.period.name}
        </Text>
        <Text size={14} color="#808080">
          Billed every {props.period.time}
        </Text>
      </TextContainer>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  height: 90px;
  width: 300px;
  margin: 10px;
  border-radius: 10px;
  border: 2px #1e96dc;
  padding: 10px;
`;

const TextContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  margin: 10px;
`;

const Text = styled.Text`
  font-size: ${(props) => props.size || 16}px;
  color: ${(props) => props.color || '#000000'};
  font-family: 'Roboto-Regular';
  font-weight: ${(props) => props.weight || 'normal'};
`;
