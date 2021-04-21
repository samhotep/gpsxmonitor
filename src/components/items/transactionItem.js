import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import API from '../../api/api';

export default function TransactionItem(props) {
  const [expire, setExpire] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const [buttonText, setButtonText] = useState('show details');
  const [details, setDetails] = useState();

  const loadDetails = () => {
    API.getTransactionStatus(props.id).then((result) => {
      if (result.message === 'Unauthorized') {
        API.authenticateBilling()
          .then((response) => {
            return API.getTransactionStatus(props.id);
          })
          .then((result) => {
            setDetails(result);
          });
      } else {
        setDetails(result);
      }
    });
  };

  useEffect(() => {
    let expiry = new Date(Date.parse('2021-04-19T23:08:51'));
    loadDetails();
    setExpire(expiry.toLocaleDateString());
  }, []);

  return (
    <Container>
      <ItemRow>
        <Text>ID:</Text>
        <Text size={14}>{props.id}</Text>
      </ItemRow>
      <ItemRow>
        <Text>Name:</Text>
        <Text>{props.name}</Text>
      </ItemRow>
      <ItemRow>
        <Text>Amount:</Text>
        <Text>
          {props.amount.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
        </Text>
      </ItemRow>
      {showDetails ? (
        <>
          <ItemRow>
            <Text>Phone Number:</Text>
            <Text>{props.number}</Text>
          </ItemRow>
          <ItemRow>
            <Text>Transaction Result:</Text>
            <Text>{props.transactionResult}</Text>
          </ItemRow>
          {details ? (
            <ItemRow>
              <Text>Subscription Status:</Text>
              <Text>{details.data}</Text>
            </ItemRow>
          ) : null}
          <ItemRow>
            <Text>Valid Till:</Text>
            <Text>{expire}</Text>
          </ItemRow>
        </>
      ) : null}
      <ItemRow>
        <Text />
        <ShowButton
          onPress={() => {
            setShowDetails(!showDetails);
            if (showDetails) {
              setButtonText('show details');
            } else {
              setButtonText('hide details');
            }
          }}>
          <ShowText>{buttonText}</ShowText>
        </ShowButton>
      </ItemRow>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 10px;
  padding: 5px;
  border-radius: 2px;
  background-color: #ffffff;
  elevation: 2;
`;

const TextContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* height: 100%; */
  margin: 10px;
  padding: 5px;
`;

const ItemRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  margin: 5px;
`;

const ShowButton = styled.TouchableOpacity``;

const ShowText = styled.Text`
  font-size: 16px;
  color: #007aa6;
`;

const Text = styled.Text`
  font-size: ${(props) => props.size || 16}px;
  color: ${(props) => props.color || '#000000'};
  font-family: 'Roboto-Regular';
  font-weight: ${(props) => props.weight || 'normal'};
`;

let p = {
  transactionId: '931a92bfa7d9438d98df9f51bb161906',
  userId: '00bf11e088bd4e8a85d34164fee4d003',
  serviceId: 'd24c2abe124d4db69cfa3d407e427358',
  recipientNumber: '256785958670',
  statusMessage: null,
  errorMessage: null,
  transactionStatus: 'SUCCEEDED',
  isActive: true,
  amount: 500.0,
  createdOn: '2021-04-18T22:54:21',
  validateTillDate: '2021-04-19T23:08:51',
  updatedOn: '2021-04-18T23:08:57',
  updatedBy: 'BackgroundWorker',
  service: {
    serviceId: 'd24c2abe124d4db69cfa3d407e427358',
    name: 'tracker daily api test',
    shortName: 'tracker_daily_api_test_daily',
    createdOn: '2021-04-18T22:26:08',
    pricingId: '33c16bd72df142289a6a7ef597a7febd',
    pricing: null,
  },
  user: {
    userId: '00bf11e088bd4e8a85d34164fee4d003',
    email: 'test@fms-ecsafrica.com',
    apiKey:
      'gSFM9+Ef/K4hyW4jubi4viyMIAiwKMpEAjRJ2eruweL3BoN5JTKFewsivXohqI506nm164MN035sLpufuHDCOg==',
    isActive: true,
    createdOn: '2021-04-18T15:20:51',
  },
};
