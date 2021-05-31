import * as React from 'react';
import styled from 'styled-components';
import CheckBox from '@react-native-community/checkbox';

export default function FilterItem(props) {
  return (
    <Container onPress={props.onValueChange}>
      <RowContainer>
        <CheckBox
          disabled={props.disabled}
          value={props.value}
          onValueChange={props.onValueChange}
          tintColors={{true: '#1e96dc', false: '#1e96dc'}}
        />
        <Text size={16} color="#808080" margin={5}>
          {props.text}
        </Text>
      </RowContainer>
      <ModalStatusColor color={props.color} />
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ModalStatusColor = styled.View`
  align-items: center;
  justify-content: center;
  height: 14px;
  width: 14px;
  background-color: ${(props) => props.color || '#ffffff'};
  border-radius: 18px;
  margin: 5px;
`;

const Text = styled.Text`
  text-align: left;
  line-height: ${(props) => props.size || 14}px;
  flex-wrap: wrap;
  font-weight: ${(props) => props.weight || 'normal'};
  font-size: ${(props) => props.size || 14}px;
  color: ${(props) => (props.color ? props.color : '#808080')};
  margin: ${(props) => props.margin || 15}px;
`;
