import React, {useState, useEffect} from 'react';
import {useWindowDimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CheckBox from '@react-native-community/checkbox';
import AuthStack from './authStack';
import Dashboard from './dashboard';
import HeaderIcon from '../components/headers/headerIcon';
import styled from 'styled-components';
import Storage from '../storage/storage';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

function SettingsDrawer({route, navigation}) {
  const window = useWindowDimensions();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerPosition="right"
      drawerStyle={{
        backgroundColor: '#ffffff',
        width: window.width,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Auth"
        component={AuthStack}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  const navigation = useNavigation();
  const [sortObjects, setSortObjects] = useState(false);
  const [sortValue, setSortValue] = useState('disabled');
  const [labelsEnabled, setLabelsEnabled] = useState(false);
  const [inputURL, setInputURL] = useState('');

  const toggleSortObjects = () => {
    if (sortObjects) {
      setSortValue('disabled');
    } else {
      setSortValue('enabled');
    }
    setSortObjects(!sortObjects);
  };

  // Check to see if there is an API server URL, if not, then set the default
  useEffect(() => {
    Storage.getURL().then((url) => {
      if (url === '') {
        Storage.setURL('https://hosting.fms-ecsinternational.com/api/');
      } else {
        setInputURL(url);
      }
    });
  }, []);
  return (
    <DrawerContainer>
      <DrawerHeaderContainer>
        <HeaderIcon
          size={20}
          source={require('../assets/back.png')}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <ItemLabel color="#ffffff">Settings</ItemLabel>
      </DrawerHeaderContainer>
      <HeaderItem
        label="Notification settings"
        item={
          <Button>
            <ItemLabel color="#202020" size={18} margin={5}>
              Notifications
            </ItemLabel>
          </Button>
        }
      />
      <HeaderItem
        label="Map Settings"
        item={
          <InputRowContainer>
            <InputContainer>
              <ItemLabel color="#202020" size={18}>
                Object Labels
              </ItemLabel>
              <ItemLabel color="#acacac" size={16}>
                Object labels displayed on map
              </ItemLabel>
            </InputContainer>
            <CheckBox
              disabled={false}
              value={labelsEnabled}
              onValueChange={() =>
                labelsEnabled ? setLabelsEnabled(false) : setLabelsEnabled(true)
              }
              tintColors={{true: '#1e96dc', false: '#1e96dc'}}
            />
          </InputRowContainer>
        }
      />
      <HeaderItem
        label="Sorting settings"
        item={
          <Button onPress={toggleSortObjects}>
            <InputContainer>
              <ItemLabel color="#202020" size={18}>
                Sort objects
              </ItemLabel>
              <ItemLabel color="#acacac" size={16}>
                {sortValue}
              </ItemLabel>
            </InputContainer>
          </Button>
        }
      />
      <HeaderItem
        label="Advanced settings"
        item={
          <InputContainer>
            <ItemLabel color="#202020" size={18}>
              API server URL
            </ItemLabel>
            <FormInput
              placeholder="https://hosting.fms-ecsinternational.com/api/"
              size={16}
              value={inputURL}
              onChangeText={(value) => {
                let tempURL = value;
                if (value.substr(value.length - 1) !== '/') {
                  tempURL.concat('/');
                }
                // If value is not specified, then leave the field blank, and save the default url to storage
                if (value !== '') {
                  setInputURL(tempURL);
                } else {
                  tempURL = 'https://hosting.fms-ecsinternational.com/api/';
                }
                Storage.setURL(tempURL);
              }}
            />
          </InputContainer>
        }
      />
    </DrawerContainer>
  );
}

function HeaderItem(props) {
  return (
    <ItemContainer>
      <ItemLabel size={16} margin={5}>
        {props.label}
      </ItemLabel>
      {props.item}
    </ItemContainer>
  );
}

export default function MainStack() {
  const [loggedIn, setLoggedIn] = useState();
  // Check if the user is logged in, if they are, redirect to the home page
  useEffect(() => {
    Storage.getUserToken().then((token) => {
      if (token !== '') {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  });
  return (
    <Stack.Navigator initialRouteName="Main">
      {loggedIn === false ? (
        <Stack.Screen
          name="Main"
          component={SettingsDrawer}
          options={{headerShown: false}}
        />
      ) : (
        <Stack.Screen
          name="Main"
          component={Dashboard}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
}

const DrawerContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ItemContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px;
  width: 100%;
`;

const ItemLabel = styled.Text`
  font-size: ${(props) => props.size || 20}px;
  color: ${(props) => props.color || '#4788c7'};
  font-family: 'Roboto-Regular';
  padding: ${(props) => props.padding || 0}px;
  margin: ${(props) => props.margin || 0}px;
  width: 100%;
`;

const DrawerHeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 44px;
  width: 100%;
  background-color: #1e96dc;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
`;

const FormInput = styled.TextInput`
  font-size: ${(props) => props.size || 22}px;
  color: #333333;
  width: 100%;
  text-align: left;
  padding: 0px;
`;

const InputContainer = styled.View`
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  margin: 5px;
`;

const InputRowContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: 0 20px 0 20px;
`;
