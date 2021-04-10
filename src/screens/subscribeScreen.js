import React, {useEffect, useState} from 'react';
import {StatusBar, ToastAndroid} from 'react-native';
import SubscriptionInput from '../components/inputs/subscriptionInput';
import BillingButton from '../components/buttons/billingButton';
import FloatingLoader from '../components/loaders/floatingLoader';
import styled from 'styled-components';
import API from '../api/api';

// TODO Pass the location as a state prop, or as an event emitter
export default function SubscribeScreen({navigation}) {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState({});
  const [selectables, setSelectables] = useState([false, false, false]);
  const [loading, setLoading] = useState(true);

  const periods = {
    1: {name: 'Day', time: '1 day'},
    2: {name: 'Month', time: '30 days'},
  };

  const chooseService = (id) => {
    let vals = [];
    for (var i = 1; i <= services.length; i++) {
      vals.push(false);
    }
    vals[id] = true;
    setSelectables(vals);
    setSelectedService(services[id]);
  };

  useEffect(() => {
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
            } else {
              API.getServices().then((result) => {
                if (result.message !== 'Unauthorized') {
                  let vals = [];
                  for (var i = 1; i <= result.services.length; i++) {
                    vals.push(false);
                  }
                  setSelectables(vals);
                  setServices(result.services);
                }
                setLoading(false);
              });
            }
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
  }, []);

  return (
    <Container>
      <StatusBar backgroundColor="#007aa6" />
      <Title>Subscribe for unlimited access</Title>
      <ImageContainer
        source={require('../assets/explore.png')}
        resizeMode="cover"
      />
      {loading ? (
        <FloatingLoader />
      ) : (
        <>
          <SubscriptionList>
            {services.map((_, i) => {
              return (
                <SubscriptionInput
                  key={_.serviceId}
                  name={_.name}
                  price={_.pricing.amount}
                  period={periods[_.pricing.periodic]}
                  value={selectables[i]}
                  onPress={() => chooseService(i)}
                />
              );
            })}
          </SubscriptionList>
          <BillingButton
            title="Continue"
            onPress={() => {
              if (Object.keys(selectedService).length === 0) {
                ToastAndroid.show(
                  'Please select a service',
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER,
                );
              } else {
                navigation.navigate('Confirmation', selectedService);
              }
            }}
          />
        </>
      )}
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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

const ImageContainer = styled.Image`
  height: 150px;
  width: 150px;
  margin: 10px;
`;

const SubscriptionList = styled.ScrollView``;
