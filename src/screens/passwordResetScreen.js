import React, {useState} from 'react';
import {StatusBar, ToastAndroid} from 'react-native';
import Captcha from '../components/captcha/captcha';
import Input from '../components/inputs/input';
import GenericButton from '../components/buttons/genericButton';
import styled from 'styled-components/native';

export default function PasswordResetScreen({navigation}) {
  const [email, setEmail] = useState();
  const [captchaValue, setCaptchaValue] = useState();
  const [verify, setVerify] = useState();

  const goToScreen = (screen) => {
    navigation.navigate(screen);
  };

  const validate = () => {
    if (
      !/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(email)
    ) {
      ToastAndroid.show(
        'Please correct your email address',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else if (verify === '') {
      ToastAndroid.show(
        'Please enter the verification code',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else if (captchaValue !== verify) {
      ToastAndroid.show(
        'Wrong verification code',
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
        goToScreen('Login');
      }, 1000);
    }
  };

  return (
    <Container>
      <StatusBar backgroundColor="#4788c7" />
      <FormContainer>
        <Text color="#000000" size={18}>
          Enter your email to reset your password
        </Text>
        <Input
          placeholder="Email"
          width={300}
          font={18}
          color="#c5c5c5"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <Captcha
          length={6}
          width="180"
          height="130"
          getValue={setCaptchaValue}
        />
        <Input
          placeholder="Text from image above"
          width={300}
          font={18}
          color="#c5c5c5"
          margin={10}
          value={verify}
          onChangeText={(text) => {
            setVerify(text);
          }}
        />
        <GenericButton
          title="Submit"
          onPress={() => validate()}
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

const ImageContainer = styled.Image`
  width: 180px;
  height: 130px;
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
