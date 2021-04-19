import React, {useEffect, useState} from 'react';
import {StatusBar, ToastAndroid} from 'react-native';
import SubscriptionInput from '../components/inputs/subscriptionInput';
import BillingButton from '../components/buttons/billingButton';
import FloatingLoader from '../components/loaders/floatingLoader';
import styled from 'styled-components';
import API from '../api/api';
import ErrorBox from '../components/alerts/errorBox';

// TODO Pass the location as a state prop, or as an event emitter
export default function SubscribeScreen({navigation}) {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState({});
  const [selectables, setSelectables] = useState([false, false, false]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const periods = {
    0: {name: 'Day', time: '1 day'},
    1: {name: 'Week', time: '7 days'},
    2: {name: 'Month', time: '30 days'},
    3: {name: 'Year', time: '1 year'},
  };

  const _updateSelectables = (serviceList) => {
    let vals = [];
    for (var i = 1; i <= serviceList.length; i++) {
      vals.push(false);
    }
    setSelectables(vals);
    return vals;
  };

  const loadServices = () => {
    setError(false);
    setLoading(true);
    API.getServices()
      .then((result) => {
        if (result.message === 'Unauthorized') {
          API.authenticateBilling();
          throw 'Unable to authenticate';
        } else {
          _updateSelectables(result.services);
          setServices(result.services);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        ToastAndroid.show(err, ToastAndroid.SHORT, ToastAndroid.CENTER);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadServices();
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
      ) : error ? (
        <ErrorBox text="Unable to load services" onPress={loadServices} />
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
                  onPress={() => {
                    _updateSelectables(services);
                    setSelectedService(services[i]);
                  }}
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
  font-size: 38px;
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
