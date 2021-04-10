import React, {useEffect, useState} from 'react';
import {StatusBar, ToastAndroid} from 'react-native';
import styled from 'styled-components';
import BillingButton from '../components/buttons/billingButton';
import Input from '../components/inputs/input';
import FloatingLoader from '../components/loaders/floatingLoader';
import API from '../api/api';

// TODO Pass the location as a state prop, or as an event emitter
export default function ConfirmationScreen({route, navigation}) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const service = route.params;
  const periods = {
    1: {name: 'Day', time: '1 day'},
    2: {name: 'Month', time: '30 days'},
  };

  const submitRequest = () => {
    if (!/^07(7|8|0|5)\d{7}$/.test(phoneNumber)) {
      ToastAndroid.show(
        'Please correct your phone number',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      setLoading(true);
      API.subscribe(phoneNumber, service.serviceId)
        .then((result) => {
          let x = {
            code: 0,
            data: {
              amount: 10000,
              ceatedOn: '2021-04-10T02:57:37.2847008Z',
              errorMessage: null,
              errorMessageCode: null,
              productId: 'e26303f32d0e4b16890bbf44de8f257c',
              recipientNumber: '256785016759',
              service: null,
              serviceId: null,
              status: 'OK',
              statusCode: '1',
              statusMessage: null,
              transactionId: '6bcece127b52471692ec6e49a3768625',
              transactionReference:
                'NqBVuOMrW1PYrgdLDqIA5LbsHKf7bE8apOUfOCz96t0pzq2CxZfmco621fkRl499c3c8950bbbba686c3fe385ddff2abb66',
              transactionStatus: 'PENDING',
              updatedBy: null,
              updatedOn: '0001-01-01T00:00:00',
              user: {
                apiKey: null,
                createdOn: '2021-04-09T23:56:30',
                email: 'test@fms-ecsafrica.com',
                userId: 'b33802f8d1fc4ff4921bca9833a69dd8',
              },
              userId: 'b33802f8d1fc4ff4921bca9833a69dd8',
              validateTillDate: '0001-01-01T00:00:00',
            },
            message: 'Transaction recorded',
          };
          console.log(result);
          if (result.code === -1) {
            ToastAndroid.show(
              result.message,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          } else if (result.code === 0) {
            navigation.navigate('Success', result.data);
          } else {
            ToastAndroid.show(
              result.message,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          ToastAndroid.show(
            'Network request failed',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    console.log(route.params);
  });

  return (
    <Container>
      <StatusBar backgroundColor="#007aa6" />
      <Title>Confirm your purchase</Title>
      <TextRow>
        <Text>Name:</Text>
        <Text weight="bold" align="right">
          {service.name.charAt(0).toUpperCase()}
          {service.name.slice(1)}
        </Text>
      </TextRow>
      <TextRow>
        <Text>Amount:</Text>
        <Text weight="bold" align="right">
          Ugx{' '}
          {service.pricing.amount
            .toFixed(1)
            .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
        </Text>
      </TextRow>
      <TextRow>
        <Text>Duration:</Text>
        <Text>{periods[service.pricing.periodic].time}</Text>
      </TextRow>
      <TextRow>
        <ImageContainer
          source={require('../assets/mtn.png')}
          resizeMode="contain"
          width={150}
        />
        <ImageContainer source={require('../assets/airtel.png')} />
      </TextRow>
      <TextRow>
        <Text size={14} color="#808080">
          Pay for your subscription using the supported mobile platforms. You
          will receive a message on your mobile device, please read it and
          follow the prompts to complete the transaction.
        </Text>
      </TextRow>
      <Input
        width={300}
        placeholder="Phone Number"
        keyboardType="numeric"
        onChangeText={(text) => {
          setPhoneNumber(text);
        }}
      />
      <BillingButton title="Confirm" onPress={submitRequest} />
      {loading ? <FloatingLoader /> : null}
    </Container>
  );
}

const Container = styled.ScrollView`
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 20px;
  background-color: #ffffff;
`;

const Title = styled.Text`
  font-size: 42px;
  font-family: 'Roboto-Regular';
  color: #000000;
  text-align: left;
  margin: 10px;
`;

const TextRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
  padding: 10px;
  width: 100%;
`;

const Text = styled.Text`
  font-size: ${(props) => props.size || 18}px;
  color: ${(props) => props.color || '#000000'};
  font-family: 'Roboto-Regular';
  font-weight: ${(props) => props.weight || 'normal'};
  text-align: ${(props) => props.align || 'left'};
`;

const ImageContainer = styled.Image`
  height: ${(props) => props.height || 100}px;
  width: ${(props) => props.width || 100}px;
`;
