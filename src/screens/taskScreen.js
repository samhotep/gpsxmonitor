/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StatusBar, ToastAndroid} from 'react-native';
import Separator from '../components/separators/separator';
import styled from 'styled-components';
import DrawerLoader from '../components/loaders/drawerLoader';
import VerticalSeparator from '../components/separators/verticalSeparator';
import API from '../api/api';
import DetailModal from '../components/modals/detailModal';

export default function SuccessScreen({route, navigation}) {
  const [loading, setLoading] = useState(true);
  let timeItems = ['Yesterday', 'Today', 'Tomorrow', 'Week', 'Month'];
  const [selectedTime, setSelectedTime] = useState('Today');
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  useEffect(() => {
    //TODO Mimic API Call
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return (
      <Container>
        <StatusBar backgroundColor="#007aa6" />
        <DrawerLoader />
      </Container>
    );
  }

  return (
    <Container>
      <FilterContainer>
        <TimeContainer onPress={() => setShowTimeModal(true)}>
          <Text size={16}>{selectedTime}</Text>
          <ImageContainer source={require('../assets/down.png')} />
        </TimeContainer>
        <VerticalSeparator />
        <TimeContainer>
          <Text size={16} />
          <ImageContainer source={require('../assets/filter_grey.png')} />
        </TimeContainer>
      </FilterContainer>
      <ContentContainer
        contentContainerStyle={{
          // flex: 1,
          justifyContent: 'space-between',
        }}>
        <StatusBar backgroundColor="#007aa6" />
        <Separator />
        <Text size={20}>TASKS!</Text>
      </ContentContainer>
      <DetailModal
        clicked={showTimeModal}
        height={220}
        width={150}
        top={0}
        right={200}
        inject={
          <ModalContainer>
            {timeItems.map((_, i) => {
              return (
                <OptionContainer
                  onPress={() => {
                    setSelectedTime(_);
                    setShowTimeModal(false);
                  }}>
                  <Text size={16}>{_}</Text>
                </OptionContainer>
              );
            })}
          </ModalContainer>
        }
      />
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  background-color: #ffffff;
  height: 100%;
`;

const ContentContainer = styled.ScrollView`
  flex-direction: column;
  width: 100%;
  padding: 10px;
`;

const FilterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  width: 100%;
  height: 50px;
  padding: 4px;
  elevation: 3;
`;

const TimeContainer = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px 5px 10px;
`;

const OptionContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin: 5px;
`;

const Text = styled.Text`
  font-size: ${(props) => props.size || 18}px;
  color: ${(props) => props.color || '#000000'};
  font-family: 'Roboto-Regular';
  font-weight: ${(props) => props.weight || 'normal'};
  text-align: ${(props) => props.align || 'left'};
  margin: 5px;
`;

const ImageContainer = styled.Image`
  height: ${(props) => props.size || 24}px;
  width: ${(props) => props.size || 24}px;
`;

const ModalContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;
