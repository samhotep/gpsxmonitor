import * as React from 'react';
import Separator from '../separators/separator';
import styled from 'styled-components';

export default function EventItem(props) {
  let start = new Date(props.track.start_date.replace(/-+/g, '/'));
  let end = new Date(props.track.end_date.replace(/-+/g, '/'));
  let difference = new Date(end.getTime() - start.getTime());
  console.log(difference.getTime());
  return (
    <>
      <Container>
        <ImageContainer source={require('../../assets/track.png')} />
        <ColumnContainer>
          <RowContainer>
            <BoldText
              bold>{`${start.getHours()}:${start.getMinutes()} `}</BoldText>
            <Text>{props.track.start_address}</Text>
          </RowContainer>
          <RowContainer>
            <BoldText bold>{`${end.getHours()}:${end.getMinutes()} `}</BoldText>
            <Text>{props.track.end_address}</Text>
          </RowContainer>
          <DetailsContainer>
            <Text>{`${props.track.length} km`}</Text>
            <Text>{`${difference.getHours()} h ${difference.getMinutes()} m`}</Text>
          </DetailsContainer>
        </ColumnContainer>
      </Container>
      <Separator />
    </>
  );
}

const Container = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: #ffffff;
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
  height: ${(props) => props.size || 56}px;
  width: ${(props) => props.size || 36}px;
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
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
  color: ${(props) => (props.selected ? '#ffffff' : '#202020')};
  width: 80%;
`;

const BoldText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => props.color || '#737373'};
`;
