import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import CounterItem from '../items/counterItem';
import styled from 'styled-components';
import API from '../../api/api';
import Utils from '../../utils/utils';
import DetailModal from '../modals/detailModal';

export default function DetailItem(props) {
  const [updateTime, setUpdateTime] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [meter, setMeter] = useState({convert: false, current: 0});

  useEffect(() => {
    setShowModal(false);
  }, [props.clicked]);

  useEffect(() => {
    let temp = props.time ? `${props.time} ago` : 'Now';
    setUpdateTime(temp);
    props.details.map((_, i) => {
      if (_.type === 'counter') {
        setMeter({
          ...meter,
          km: _.value,
          mi: Utils.kmToMiles(_.value),
          current: _.value,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <RowContainer>
        <Text size={19} color={'#000000'}>
          {props.title}
        </Text>
        {props.modal ? (
          <Button
            onPress={() => {
              setShowModal(!showModal);
            }}>
            <ImageContainer
              source={require('../../assets/more.png')}
              size={20}
              noMargin
            />
          </Button>
        ) : null}
      </RowContainer>
      {props.details.map((_, i) => {
        if (_.type === 'image') {
          return (
            <DetailContainer>
              <ImageContainer source={_.image} />
              <Text size={14}>{_.text}</Text>
            </DetailContainer>
          );
        } else if (_.type === 'component') {
          return (
            <DetailContainer>
              <IdentityColor color={_.status.color} radius={_.status.radius}>
                {_.status.number}
              </IdentityColor>
              <Text size={14}>{_.status.text}</Text>
            </DetailContainer>
          );
        } else if (_.type === 'text') {
          return (
            <DetailContainer>
              <Text size={14}>{_.text}</Text>
            </DetailContainer>
          );
        } else if (_.type === 'switch') {
          return (
            <DetailContainer>
              <OutputSwitch status={_.status} />
              <Text size={14}>{_.status.text}</Text>
            </DetailContainer>
          );
        } else if (_.type === 'counter') {
          return (
            <DetailContainer>
              <CounterItem value={meter.current} />
              <Text size={14}> {_.states.unit}</Text>
            </DetailContainer>
          );
        }
      })}
      {props.time ? (
        <RowContainer>
          <Text> </Text>
          <Text size={14} time>
            {updateTime}
          </Text>
        </RowContainer>
      ) : null}
      {props.modal ? (
        props.title === 'Odometer' ? (
          <DetailModal
            clicked={showModal}
            height={props.modal.height}
            width={props.modal.width}
            top={0}
            right={50}
            inject={
              <ModalContainer>
                <ModalButton
                  onPress={() => {
                    if (meter.convert) {
                      setMeter({...meter, convert: false, current: meter.mi});
                    } else {
                      setMeter({...meter, convert: true, current: meter.km});
                    }
                    setShowModal(false);
                  }}>
                  <CounterText width={200} color="#000000">
                    km{' '}
                    <CounterImageContainer
                      source={require('../../assets/convert.png')}
                    />{' '}
                    mi
                  </CounterText>
                </ModalButton>
              </ModalContainer>
            }
          />
        ) : (
          <DetailModal
            clicked={showModal}
            height={props.modal.height}
            width={props.modal.width}
            top={0}
            right={50}
            inject={props.modal.item}
          />
        )
      ) : null}
    </Container>
  );
}

function OutputSwitch(props) {
  const [switchValue, setSwitchValue] = useState();

  const showAlert = (value) => {
    Alert.alert(
      'Command confirmation',
      'Are you sure you want to send control command to the device?',
      [
        {
          text: 'CANCEL',
          onPress: () => console.log('Logout Cancelled'),
          style: 'cancel',
        },
        {
          text: 'SEND',
          onPress: () => {
            API.setOutput(props.status.tracker_id, props.status.number, value)
              .then((result) => {
                setSwitchValue(value);
                console.log(result);
              })
              .catch((error) => {
                console.log(console.log(error));
              });
          },
        },
      ],
      {cancelable: false},
    );
  };

  useEffect(() => {
    setSwitchValue(props.status.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ItemSwitch
      value={switchValue}
      onValueChange={(value) => {
        showAlert(value);
      }}
    />
  );
}

const Container = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: #ffffff;
  border-radius: 2px;
  padding: 15px;
  margin: 10px;
  width: 90%;
  elevation: 3;
`;

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 5px 0px 5px 0px;
`;

const DetailContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 5px 0px 5px 0px;
`;

const ImageContainer = styled.Image`
  height: ${(props) => props.size || 24}px;
  width: ${(props) => props.size || 24}px;
  margin: ${(props) => (props.noMargin ? '0px' : '0px 10px 0px 0px')};
`;

const Button = styled.TouchableOpacity``;

const IdentityColor = styled.Text`
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ffffff;
  font-family: 'Roboto-Regular';
  font-size: 12px;
  background-color: ${(props) => props.color || '#4788c7'};
  border-radius: ${(props) => (props.radius ? 0 : 15)}px;
  border: 1px #ffffff;
  width: ${(props) => props.size || 18}px;
  height: ${(props) => props.size || 18}px;
  margin: 0px 13px 0px 3px;
`;

const Text = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: ${(props) => props.size || 16}px;
  color: ${(props) => props.color || '#626160'};
  flex-wrap: wrap;
  flex: ${(props) => (props.time ? 'none' : 1)};
`;

const ItemSwitch = styled.Switch``;

const ModalButton = styled.TouchableOpacity``;

const CounterImageContainer = styled.Image`
  height: ${(props) => props.size || 18}px;
  width: ${(props) => props.size || 18}px;
`;

const CounterText = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: ${(props) => props.size || 16}px;
  color: ${(props) => props.color || '#626160'};
  flex-wrap: wrap;
  ${(props) => (props.width ? `width: ${props.width}px;` : '')}
  margin: 5px 5px 15px 5px;
`;

const ModalContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px;
`;
