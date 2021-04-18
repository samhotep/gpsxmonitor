import React, {useEffect, useState} from 'react';
import {StatusBar, ToastAndroid} from 'react-native';
import styled from 'styled-components/native';
import Input from '../components/inputs/input';
import GenericButton from '../components/buttons/genericButton';
import FloatingLoader from '../components/loaders/floatingLoader';
import API from '../api/api';
import Storage from '../storage/storage';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState();

  const validateLogin = () => {
    if (
      !/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(email)
    ) {
      ToastAndroid.show(
        'Please correct your email address',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else if (password === '') {
      ToastAndroid.show(
        'Please enter a password',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      setLoading(true);
      doAuth(email, password);
    }
  };

  const doAuth = (id, key) => {
    API.authenticateUser(id, key)
      .then((result) => {
        if (result === true) {
          API.getUserInfo();
          return Storage.setUserEmail(id);
        } else {
          ToastAndroid.show(result, ToastAndroid.SHORT, ToastAndroid.CENTER);
          throw result;
        }
      })
      .then(() => {
        return API.authenticateBilling();
      })
      .then((result) => {
        if (result === 200) {
          if (result.isSubscriptionValid === true) {
            navigation.reset({index: 0, routes: [{name: 'Dashboard'}]});
          } else {
            navigation.navigate('Billing');
          }
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.CENTER);
      });
  };

  return (
    <Container>
      <StatusBar backgroundColor="#007aa6" />
      <ImageContainer
        source={require('../assets/icon.png')}
        resizeMode="contain"
      />
      <FormContainer>
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
        <Input
          placeholder="Password"
          width={300}
          font={18}
          hidden={true}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <RowContainer width="300px">
          <Button onPress={() => navigation.navigate('Reset')}>
            <Text color="#c5c5c5" margin={5}>
              Forgot Password?
            </Text>
          </Button>
        </RowContainer>
        <GenericButton
          title="Log in"
          onPress={() => {
            validateLogin();
          }}
          color="#ffffff"
          bgcolor="#4788c7"
          width={300}
        />
        <Button
          onPress={() => {
            setLoading(true);
            doAuth('test@fms-ecsafrica.com', 'pass123');
          }}>
          <Text padding={10} margin={10} size={18}>
            Demo
          </Text>
        </Button>
      </FormContainer>
      {loading ? <FloatingLoader /> : null}
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  background-color: #ffffff;
  align-items: center;
  justify-content: space-evenly;
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
`;

const Button = styled.TouchableOpacity``;

const Text = styled.Text`
  font-size: ${(props) => props.size || 16}px;
  color: ${(props) => props.color || '#4788c7'};
  font-family: 'Roboto-Regular';
  padding: ${(props) => props.padding || 0}px;
  margin: ${(props) => props.margin || 0}px;
`;

let x = {
  apiKey: null,
  daysLeft: '',
  email: 'sam.olwe@gmail.com',
  id: '9938bd729ac640b2a88d0b0f97903695',
  isSubscriptionValid: false,
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk5MzhiZDcyOWFjNjQwYjJhODhkMGIwZjk3OTAzNjk1IiwiZW1haWwiOiJzYW0ub2x3ZUBnbWFpbC5jb20iLCJuYmYiOjE2MTg2ODU3MDQsImV4cCI6MTYxODY4NjMwNCwiaWF0IjoxNjE4Njg1NzA0LCJpc3MiOiJodHRwOi8vY2VudGF0ZWNoLTAwMS1zaXRlMy5pdGVtcHVybC5jb20iLCJhdWQiOiJodHRwOi8vY2VudGF0ZWNoLTAwMS1zaXRlMy5pdGVtcHVybC5jb20ifQ.hTMSR4R4TPkRip0DucNyGrBkWOtQHhlLq0_kCRTeUcQ',
  typeOfSubscription: '',
};
