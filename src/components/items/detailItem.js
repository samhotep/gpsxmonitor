import * as React from 'react';
import styled from 'styled-components';

export default function DetailItem(props) {
  return (
    <Container>
      <RowContainer>
        <Text size={19} color={'#000000'}>
          {props.title}
        </Text>
        <Button onPress={props.onPress}>
          <ImageContainer
            source={require('../../assets/more.png')}
            size={20}
            noMargin
          />
        </Button>
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
              <IdentityColor color={_.status.color} />
              <Text size={14}>{_.status.text}</Text>
            </DetailContainer>
          );
        }
      })}
      {props.time ? (
        <RowContainer>
          <Text> </Text>
          <Text size={14}>{props.time}</Text>
        </RowContainer>
      ) : null}
    </Container>
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
  width: 100%;
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

const IdentityColor = styled.View`
  align-items: flex-start;
  justify-content: center;
  background-color: ${(props) => props.color || '#4788c7'};
  border-radius: 15px;
  border: 1px #ffffff;
  width: 18px;
  height: 18px;
  margin: 0px 13px 0px 3px;
`;

const Text = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: ${(props) => props.size || 16}px;
  color: ${(props) => props.color || '#808080'};
`;
