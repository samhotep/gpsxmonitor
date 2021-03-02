import React from 'react';
import styled from 'styled-components';
import HeaderIcon from '../headers/headerIcon';

export default function HeaderTitle(props) {
  return (
    <HeaderContainer>
      <HeaderIcon size={20} source={props.source} onPress={props.onPress} />
      <ItemLabel color="#ffffff">{props.label}</ItemLabel>
      <ExtrasContainer>{props.extras}</ExtrasContainer>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 50px;
  width: 100%;
  background-color: #1e96dc;
`;

const ItemLabel = styled.Text`
  font-size: ${(props) => props.size || 20}px;
  color: ${(props) => props.color || '#4788c7'};
  font-family: 'Roboto-Regular';
  padding: ${(props) => props.padding || 0}px;
  margin: ${(props) => props.margin || 5}px;
`;

const ExtrasContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 50px;
  width: 100%;
  background-color: #1e96dc;
`;
