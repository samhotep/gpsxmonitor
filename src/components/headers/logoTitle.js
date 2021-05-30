import React, {useRef} from 'react';
import {useHeaderHeight} from '@react-navigation/stack';
import HeaderIcon from '../headers/headerIcon';
import styled from 'styled-components';

export default function LogoTitle(props) {
  const searchRef = useRef();
  let headerHeight = useHeaderHeight();

  const focusWorkaround = () => {
    setTimeout(() => {
      searchRef.current.focus();
    }, 100);
  };

  return (
    <Container height={headerHeight}>
      <HeaderIcon
        size={22}
        margin={8}
        source={require('../../assets/back.png')}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <SearchInput
        ref={searchRef}
        returnKeyType="search"
        value={props.showSearch ? props.searchString : props.title}
        onChangeText={(text) => props.setSearchString(text)}
        editable={props.showSearch}
        placeholder="Search..."
        placeholderTextColor="#8bc9ed"
      />
      <IconsContainer>
        <HeaderIcon
          size={18}
          margin={8}
          source={
            props.showSearch
              ? require('../../assets/close.png')
              : require('../../assets/search.png')
          }
          onPress={(event) => {
            if (props.showSearch) {
              props.setShowSearch(false);
              props.setSearchString('');
            } else {
              props.setShowSearch(true);
              focusWorkaround();
            }
          }}
        />
      </IconsContainer>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  background-color: transparent;
  align-items: center;
  justify-content: space-between;
  background-color: #1e96dc;
  height: ${(props) => props.height || 56}px;
  padding: 5px;
`;

const IconsContainer = styled.View`
  flex-direction: row;
  background-color: transparent;
  align-items: center;
  justify-content: flex-end;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  margin: 0px 10px 0px 30px;
  font-family: 'Roboto-Regular';
  font-size: 20px;
  text-align: left;
  color: #ffffff;
  font-weight: 700;
`;
