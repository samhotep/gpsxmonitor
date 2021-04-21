import React, {useEffect, useState} from 'react';
import {StatusBar, ToastAndroid} from 'react-native';
import BillingButton from '../components/buttons/billingButton';
import TransactionItem from '../components/items/transactionItem';
import styled from 'styled-components';
import Storage from '../storage/storage';
import Separator from '../components/separators/separator';
import FloatingLoader from '../components/loaders/floatingLoader';
import API from '../api/api';

// TODO Pass the location as a state prop, or as an event emitter
export default function SuccessScreen({route, navigation}) {
  const [days, setDays] = useState();
  const [email, setEmail] = useState();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Storage.getRemainingDays()
      .then((result) => {
        setDays(JSON.parse(result));
        return Storage.getUserEmail();
      })
      .then((result) => {
        setEmail(JSON.parse(result));
        return API.authenticateBilling();
      })
      .then(() => {
        return API.getTransactions();
      })
      .then((result) => {
        setTransactions(result.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.CENTER);
      });
  }, []);

  return (
    <Container>
      <StatusBar backgroundColor="#007aa6" />
      <StatusContainer>
        <ImageContainer source={require('../assets/timer.png')} size={36} />
        <Text size={14}>{email}</Text>
        <Text size={20}>{days} days</Text>
      </StatusContainer>
      <Separator />
      <Text size={16}>Transaction History</Text>
      <TransactionsContainer>
        {transactions.map((_, i) => {
          return (
            <TransactionItem
              key={_.transactionId}
              id={_.transactionId}
              name={_.service.name}
              amount={_.amount}
              number={_.recipientNumber}
              transactionResult={_.transactionStatus}
              validDate={_.validateTillDate}
            />
          );
        })}
      </TransactionsContainer>
      <BillingButton
        title="Renew Subscription"
        onPress={() => navigation.navigate('Subscribe')}
      />
      {loading ? <FloatingLoader /> : null}
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 10px;
  background-color: #ffffff;
`;

const StatusContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #ffffff;
`;

const TransactionsContainer = styled.ScrollView``;

const Text = styled.Text`
  font-size: ${(props) => props.size || 18}px;
  color: ${(props) => props.color || '#000000'};
  font-family: 'Roboto-Regular';
  font-weight: ${(props) => props.weight || 'normal'};
  text-align: ${(props) => props.align || 'left'};
  margin: 5px;
`;

const ImageContainer = styled.Image`
  height: ${(props) => props.size || 150}px;
  width: ${(props) => props.size || 150}px;
  margin: ${(props) => props.margin || 10}px;
`;
