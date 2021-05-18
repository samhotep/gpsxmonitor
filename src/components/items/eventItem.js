import * as React from 'react';
import Separator from '../separators/separator';
import styled from 'styled-components';

export default function EventItem(props) {
  return (
    <>
      <Container onPress={props.onPress}>
        <ImageContainer source={require('../../assets/bell_blue.png')} />
        <ColumnContainer>
          <RowContainer>
            <Text>{props.event.location.address}</Text>
          </RowContainer>

          <DetailsContainer>
            <Text>{`${props.event.status_change_date.replace(
              /-+/g,
              '/',
            )}`}</Text>
          </DetailsContainer>
        </ColumnContainer>
      </Container>
      <Separator nomargin />
    </>
  );
}

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: #ffffff;
  padding: 5px;
  width: 100%;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ColumnContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 90%;
`;

const ImageContainer = styled.Image`
  height: ${(props) => props.size || 24}px;
  width: ${(props) => props.size || 24}px;
`;

const DetailsContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 90%;
`;

const Text = styled.Text`
  text-align: left;
  flex-wrap: wrap;
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => (props.selected ? '#ffffff' : '#a8a8a8')};
  width: 80%;
`;

const BoldText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => props.color || '#737373'};
`;
