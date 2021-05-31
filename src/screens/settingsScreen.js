/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components';
import CheckBox from '@react-native-community/checkbox';
import RadioInput from '../components/inputs/radioInput';
import HeaderTitle from '../components/headers/headerTitle';
import Storage from '../storage/storage';

export default function SettingsScreen(props) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [labelsEnabled, setLabelsEnabled] = useState(false);
  const [sortValue, setSortValue] = useState('disabled');
  let sortItems = ['disabled', 'by status', 'alphabetically'];
  const [inputURL, setInputURL] = useState('');
  const [radioButtons, setRadioButtons] = useState(
    Array(sortItems.length).fill(false),
  );

  const updateRadioButtons = (index) => {
    setSortValue(sortItems[index]);
    let newRadio = Array(sortItems.length).fill(false);
    newRadio[index] = true;
    setRadioButtons(newRadio);
    setTimeout(() => {
      setModalVisible(false);
    }, 100);
  };

  const updateSettings = () => {
    let selected = radioButtons.findIndex((button) => button === true);
    Storage.setSettings({
      labels: labelsEnabled,
      sort: sortItems[selected],
    });
  };

  const headerItems = [
    {
      label: 'Notification settings',
      item: (
        <Button onPress={() => Linking.openSettings('notifications')}>
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
            onValueChange={(value) => {
              setLabelsEnabled(value);
            }}
            tintColors={{true: '#1e96dc', false: '#1e96dc'}}
          />
        </InputRowContainer>
      ),
    },
    {
      label: 'Sorting settings',
      item: (
        <Button
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
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

  useEffect(() => {
    updateSettings();
  }, [radioButtons, labelsEnabled]);

  useEffect(() => {
    let options = [...radioButtons];
    Storage.getSettings().then((res) => {
      let settings = JSON.parse(res);
      if (settings === null) {
        options[0] = true;
        Storage.setSettings({
          labels: true,
          sort: 'disabled',
        });
      } else {
        setLabelsEnabled(settings.labels);
        options[sortItems.findIndex((item) => item === settings.sort)] = true;
      }
      setRadioButtons(options);
    });
  }, []);

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
      <SupportModal
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <CenteredContainer>
          <ModalBody>
            <Text size={20} color="#000000" weight="bold">
              Sort Objects
            </Text>
            {sortItems.map((_, i) => {
              return (
                <ModalRowContainer
                  onPress={() => {
                    updateRadioButtons(i);
                  }}
                  android_ripple={{
                    color: '#b5dbf1',
                  }}>
                  <RadioInput
                    color="#1e96dc"
                    selected={radioButtons[i]}
                    onPress={() => {
                      updateRadioButtons(i);
                    }}
                  />
                  <Text size={20} color="#000000">
                    {_}
                  </Text>
                </ModalRowContainer>
              );
            })}
            <ButtonContainer>
              <ModalButton onPress={() => setModalVisible(false)}>
                <Text color="#1e96dc" weight="bold">
                  CANCEL
                </Text>
              </ModalButton>
            </ButtonContainer>
          </ModalBody>
        </CenteredContainer>
      </SupportModal>
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

const SupportModal = styled.Modal``;

const CenteredContainer = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalBody = styled.View`
  flex-direction: column;
  align-items: flex-start;
  height: 260px;
  width: 300px;
  padding: 10px;
  background-color: #ffffff;
  elevation: 20;
`;

const Text = styled.Text`
  text-align: left;
  line-height: ${(props) => props.size || 14}px;
  flex-wrap: wrap;
  font-weight: ${(props) => props.weight || 'normal'};
  font-size: ${(props) => props.size || 14}px;
  color: ${(props) => (props.color ? props.color : '#808080')};
  margin: ${(props) => props.margin || 15}px;
`;

const ModalButton = styled.TouchableOpacity``;

const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

const ModalRowContainer = styled.Pressable`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;
