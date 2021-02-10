import React from 'react';
import styled from 'styled-components/native';

export default function Input(props) {
  return (
    <Container bgcolor={props.bgcolor} margin={props.margin}>
      <FormInput
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        secureTextEntry={props.hidden}
        autoCompleteType={props.autoCompleteType}
        keyboardType={props.keyboardType}
        blurOnSubmit={true}
        clearTextOnFocus={true}
        editable={props.editable}
        width={props.width}
        maxLength={props.maxLength}
        onChangeText={props.onChangeText}
        value={props.value}
        font={props.font}
      />
    </Container>
  );
}

const FormInput = styled.TextInput`
  font-size: ${(props) => props.font || 20}px;
  color: #333333;
  width: ${(props) => props.width || 260}px;
  text-align: left;
  padding: 5px;
`;

const Container = styled.View`
  border-radius: 4px;
  background-color: ${(props) => props.bgcolor || 'transparent'};
  display: ${(props) => (props.hidden ? 'none' : 'flex')};
  padding: 0px;
  margin: ${(props) => props.margin || 10}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #c5c5c5;
`;
