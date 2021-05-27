import React, {useEffect, useState, useRef} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TaskScreen from '../screens/taskScreen';
import AssigneeScreen from '../screens/assigneeScreen';
import HeaderTitle from '../components/headers/headerTitle';
import HeaderIcon from '../components/headers/headerIcon';
import styled from 'styled-components';

const Stack = createStackNavigator();

export default function TaskStack({route, navigation}) {
  //   const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="TaskScreen" headerMode="screen">
      <Stack.Screen
        name="TaskScreen"
        component={TaskScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#1e96dc',
          },
          headerTitleStyle: {
            color: '#ffffff',
          },
          headerLeft: () => (
            <HeaderTitle
              source={require('../assets/back.png')}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
          headerTitle: (props) => <LogoTitle {...props} />,
        }}
      />
      <Stack.Screen
        name="AssigneeScreen"
        component={AssigneeScreen}
        options={{
          title: 'Select assignee',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#1e96dc',
          },
          headerTitleStyle: {
            color: '#ffffff',
          },
          headerBackImage: () => (
            <ImageContainer source={require('../assets/back.png')} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function LogoTitle(props) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchString, setSearchString] = useState('');
  const searchRef = useRef();

  const focusWorkaround = () => {
    setTimeout(() => {
      searchRef.current.focus();
    }, 100);
  };

  return (
    <Container>
      <SearchInput
        ref={searchRef}
        value={showSearch ? searchString : 'Tasks'}
        onChangeText={(text) => setSearchString(text)}
        editable={showSearch}
        placeholder="Search..."
        placeholderTextColor="#8bc9ed"
      />

      <IconsContainer>
        <HeaderIcon
          size={18}
          margin={8}
          source={
            showSearch
              ? require('../assets/close.png')
              : require('../assets/search.png')
          }
          onPress={(event) => {
            if (showSearch) {
              setShowSearch(false);
              setSearchString('');
            } else {
              setShowSearch(true);
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
`;

const IconsContainer = styled.View`
  flex-direction: row;
  background-color: transparent;
  align-items: center;
  justify-content: flex-end;
`;

const ImageContainer = styled.Image`
  height: ${(props) => props.size || 24}px;
  width: ${(props) => props.size || 24}px;
`;

const SearchInput = styled.TextInput`
  font-family: 'Roboto-Regular';
  font-size: 20px;
  text-align: left;
  color: #ffffff;
  font-weight: ${(props) => (props.editable ? 'normal' : 'bold')};
`;
