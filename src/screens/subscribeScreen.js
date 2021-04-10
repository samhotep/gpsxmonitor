import React, {useEffect, useState} from 'react';
import {StatusBar, ToastAndroid} from 'react-native';
import SubscriptionInput from '../components/inputs/subscriptionInput';
import {useFocusEffect} from '@react-navigation/native';
import styled from 'styled-components';
import API from '../api/api';

// TODO Pass the location as a state prop, or as an event emitter
export default function SubscribeScreen({navigation}) {
  const [selectedService, setSelectedService] = useState({});
  const [selectables, setSelectables] = useState([false, false, false]);

  const periods = {
    1: {name: 'Day', time: '1 day'},
    2: {name: 'Month', time: '30 days'},
  };

  const subs = [
    {
      serviceId: 'e26303f32d0e4b16890bbf44de8f257c',
      name: 'tracking',
      shortName: 'tracking_monthly',
      createdOn: '2021-03-19T11:15:53',
      pricingId: '52f26819996a4f85ae894e3768e4b43a',
      pricing: {
        pricingId: '52f26819996a4f85ae894e3768e4b43a',
        periodic: 2,
        amount: 10000.0,
        createOn: '2021-03-19T11:15:20',
      },
    },
    {
      serviceId: 'e26303f32d0e4b16890bbf44de8f257c',
      name: 'tracking',
      shortName: 'tracking_monthly',
      createdOn: '2021-03-19T11:15:53',
      pricingId: '52f26819996a4f85ae894e3768e4b43a',
      pricing: {
        pricingId: '52f26819996a4f85ae894e3768e4b43a',
        periodic: 2,
        amount: 10000.0,
        createOn: '2021-03-19T11:15:20',
      },
    },
    {
      serviceId: 'e26303f32d0e4b16890bbf44de8f257c',
      name: 'tracking',
      shortName: 'tracking_monthly',
      createdOn: '2021-03-19T11:15:53',
      pricingId: '52f26819996a4f85ae894e3768e4b43a',
      pricing: {
        pricingId: '52f26819996a4f85ae894e3768e4b43a',
        periodic: 2,
        amount: 10000.0,
        createOn: '2021-03-19T11:15:20',
      },
    },
  ];

  const chooseService = (id) => {
    let vals = [];
    for (var i = 1; i <= subs.length; i++) {
      vals.push(false);
    }
    vals[id] = true;
    setSelectables(vals);
  };

  useEffect(() => {
    let vals = [];
    for (var i = 1; i <= subs.length; i++) {
      vals.push(false);
    }
    setSelectables(vals);
  }, []);

  useFocusEffect(() => {
    API.createUser()
      .then((result) => {
        API.authenticateBilling()
          .then((response) => {
            if (response !== 200) {
              ToastAndroid.show(
                'Network request failed',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
            }
          })
          .catch((error) => {
            console.log(error);
            ToastAndroid.show(
              'Network request failed',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          });
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(
          'Network request failed',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
  });

  return (
    <Container>
      <StatusBar backgroundColor="#007aa6" />
      <Title>Subscribe for unlimited access</Title>
      <ImageContainer
        source={require('../assets/explore.png')}
        resizeMode="cover"
      />
      <SubscriptionList>
        {subs.map((_, i) => {
          return (
            <SubscriptionInput
              name={_.name}
              price={_.pricing.amount}
              period={periods[_.pricing.periodic]}
              value={selectables[i]}
              onPress={() => chooseService(i)}
            />
          );
        })}
      </SubscriptionList>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 10px;
  background-color: #ffffff;
`;

const Title = styled.Text`
  font-size: 42px;
  font-family: 'Roboto-Regular';
  color: #000000;
  text-align: left;
  margin: 10px;
`;

const ImageContainer = styled.Image`
  height: 200px;
  width: 200px;
  margin: 20px;
`;

const SubscriptionList = styled.ScrollView``;
