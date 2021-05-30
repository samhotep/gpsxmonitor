import React from 'react';
import Separator from '../separators/separator';
import styled from 'styled-components';

export default function EmployeeItem(props) {
  return (
    <Container onPress={props.onPress}>
      <RowContainer>
        <ImageContainer source={require('../../assets/user.png')} />
        <TextContainer>
          <Text size={18}>{props.employee.first_name}</Text>
          <Text size={16}>{props.employee.phone}</Text>
        </TextContainer>
      </RowContainer>
      <Separator nomargin={true} />
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: #ffffff;
  width: 100%;
`;

const RowContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: ${(props) => props.color || '#ffffff'};
`;

const TextContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const ImageContainer = styled.Image`
  height: ${(props) => props.size || 32}px;
  width: ${(props) => props.size || 32}px;
  margin: 20px;
`;

const Text = styled.Text`
  flex: 1;
  text-align: left;
  flex-wrap: wrap;
  font-size: ${(props) => props.size || 14}px;
  color: ${(props) => (props.selected ? '#ffffff' : '#202020')};
  margin: 5px;
`;
