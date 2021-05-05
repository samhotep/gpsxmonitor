import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components';
import CheckBox from '@react-native-community/checkbox';
import HeaderTitle from '../components/headers/headerTitle';
import Storage from '../storage/storage';

export default function SettingsScreen(props) {
  const navigation = useNavigation();
  const [sortObjects, setSortObjects] = useState(false);
  const [sortValue, setSortValue] = useState('disabled');
  const [labelsEnabled, setLabelsEnabled] = useState(false);
  const [inputURL, setInputURL] = useState('');

  const headerItems = [
    {
      label: 'Notification settings',
      item: (
        <Button>
          <ItemLabel color="#202020" size={18} margin={5}>
            Notifications
          </ItemLabel>
        </Button>
      ),
    },
    {
      label: 'Map Settings',
      item: (
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
      ),
    },
    {
      label: 'Sorting settings',
      item: (
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
      ),
    },
    {
      label: 'Advanced settings',
      item: (
        <InputContainer>
          <ItemLabel color="#202020" size={18}>
            API server URL
          </ItemLabel>
          <FormInput
            placeholder="https://hosting.fms-ecsinternational.com/api/"
            size={16}
            value={inputURL}
            onChangeText={(value) => {
              setInputURL(value);
              Storage.setURL(value);
            }}
          />
        </InputContainer>
      ),
    },
  ];

  const toggleSortObjects = () => {
    if (sortObjects) {
      setSortValue('disabled');
    } else {
      setSortValue('enabled');
    }
    setSortObjects(!sortObjects);
  };

  return (
    <DrawerContainer>
      <HeaderTitle
        source={require('../assets/back.png')}
        onPress={() => {
          navigation.goBack();
        }}
        label="Settings"
      />
      {headerItems.map((_, i) => {
        return <HeaderItem key={_.label} label={_.label} item={_.item} />;
      })}
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

const DrawerContainer = styled.ScrollView`
  flex-direction: column;
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
