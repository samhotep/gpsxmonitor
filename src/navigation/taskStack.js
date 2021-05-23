import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TaskScreen from '../screens/taskScreen';
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
    </Stack.Navigator>
  );
}

function LogoTitle(props) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchString, setSearchString] = useState('');

  return (
    <Container>
      {/* <Title search={showSearch}>Tasks</Title> */}
      <SearchInput
        value={searchString}
        onChangeText={(text) => setSearchString(text)}
        placeholder="Search..."
        placeholderTextColor="#8bc9ed"
      />
      <IconsContainer>
        <HeaderIcon
          size={18}
          margin={8}
          source={require('../assets/search.png')}
          onPress={(event) => {
            setShowSearch(true);
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

const Title = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 20px;
  color: #ffffff;
  font-weight: bold;
`;

const SearchInput = styled.TextInput`
  font-family: 'Roboto-Regular';
  font-size: 20px;
  text-align: left;
  color: #ffffff;
`;
