import React from 'react';
import styled from 'styled-components';
import HeaderIcon from '../headers/headerIcon';

export default function HeaderTitle(props) {
  return (
    <HeaderContainer>
      <ItemsContainer>
        <HeaderIcon size={20} source={props.source} onPress={props.onPress} />
        <ItemLabel color="#ffffff">{props.label}</ItemLabel>
      </ItemsContainer>
      <ItemsContainer>{props.extras}</ItemsContainer>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  width: 100%;
  background-color: #1e96dc;
`;

const ItemLabel = styled.Text`
  font-size: ${(props) => props.size || 20}px;
  color: ${(props) => props.color || '#4788c7'};
  font-family: 'Roboto-Regular';
  font-weight: bold;
  padding: ${(props) => props.padding || 0}px;
  margin: ${(props) => props.margin || 5}px;
`;

const ItemsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
