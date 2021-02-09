import React, {useEffect, useState} from 'react';
import {StatusBar, ToastAndroid} from 'react-native';
import styled from 'styled-components/native';
import Input from '../components/inputs/input';
import GenericButton from '../components/buttons/genericButton';

export default function PasswordResetScreen({navigation}) {
  const [email, setEmail] = useState();

  const goToScreen = (screen) => {
    navigation.navigate(screen);
  };

  const validateEmail = () => {
    if (
      !/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(email)
    ) {
      ToastAndroid.show(
        'Please correct your email address',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      setTimeout(() => {
        ToastAndroid.show(
          'Password reset request submitted',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        goToScreen('Dashboard');
      }, 1000);
    }
  };

  return (
    <Container>
      <StatusBar backgroundColor="#4788c7" />
      <FormContainer>
        <Input
          placeholder="Email"
          width={300}
          color="#c5c5c5"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <ImageContainer
          source={require('../assets/captcha.png')}
          resizeMode="contain"
        />
        <Input
          placeholder="Text from image above"
          width={300}
          color="#c5c5c5"
          margin={20}
        />
        <GenericButton
          title="Submit"
          onPress={() => validateEmail()}
          color="#ffffff"
          bgcolor="#4788c7"
          width={300}
        />
      </FormContainer>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  background-color: #ffffff;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: ${(props) => props.width || 'auto'};
`;

const ImageContainer = styled.Image`
  width: 180px;
  height: 180px;
  margin: 5px;
`;

const FormContainer = styled.View`
  flex-direction: column;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  padding: 100px 0px 100px 0px;
`;

const Button = styled.TouchableOpacity``;

const Text = styled.Text`
  font-size: ${(props) => props.size || 16}px;
  color: ${(props) => props.color || '#4788c7'};
  font-family: 'Roboto-Regular';
  padding: ${(props) => props.padding || 0}px;
  margin: ${(props) => props.margin || 0}px;
`;
