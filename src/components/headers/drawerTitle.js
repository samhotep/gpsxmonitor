import React, {useRef} from 'react';
import {useHeaderHeight} from '@react-navigation/stack';
import styled from 'styled-components';
import HeaderIcon from '../headers/headerIcon';

export default function HeaderTitle(props) {
  let headerHeight = useHeaderHeight();
  let searchRef = useRef();
  return (
    <HeaderContainer height={headerHeight}>
      <ItemsContainer>
        <HeaderIcon
          size={20}
          source={require('../../assets/back.png')}
          onPress={() => props.navigation.goBack()}
        />
        <SearchInput
          ref={searchRef}
          value={props.searchString || 'Objects'}
          onChangeText={props.onChangeText}
          editable={props.showSearch}
          placeholder="Search..."
          placeholderTextColor="#8bc9ed"
        />
      </ItemsContainer>
      <ItemsContainer>
        <HeaderIcon
          size={20}
          source={
            props.showSearch
              ? require('../../assets/close.png')
              : require('../../assets/search.png')
          }
          onPress={props.resetSearch}
        />
      </ItemsContainer>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: ${(props) => props.height || 56}px;
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

const SearchInput = styled.TextInput`
  font-family: 'Roboto-Regular';
  font-size: 20px;
  text-align: left;
  color: #ffffff;
  font-weight: ${(props) => (props.editable ? 'normal' : 'bold')};
`;

const ItemsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
