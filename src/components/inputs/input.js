import React, {forwardRef} from 'react';
import styled from 'styled-components/native';

const Input = forwardRef((props, ref) => (
  <Container
    bgcolor={props.bgcolor}
    margin={props.margin}
    noBorder={props.noBorder}>
    <FormInput
      ref={ref}
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
      selectionColor={props.selectionColor}
      value={props.value}
      font={props.font}
      color={props.color}
    />
  </Container>
));

const FormInput = styled.TextInput`
  font-size: ${(props) => props.font || 20}px;
  color: ${(props) => props.color || '#333333'};
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
  border-bottom-width: ${(props) => (props.noBorder ? 0 : 1)}px;
  border-bottom-color: #c5c5c5;
`;

export default Input;
