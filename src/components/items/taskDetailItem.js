import React from 'react';
import styled from 'styled-components';
import Separator from '../separators/separator';

export default function TaskDetailItem(props) {
  return (
    <RowContainer>
      <ImageContainer source={props.front_icon} />
      <DetailContainer>
        {props.header ? <Text size={props.size}>{props.header}</Text> : null}
        {props.detail ? <Text color={props.color}>{props.detail}</Text> : null}
        <Separator />
      </DetailContainer>
      {props.back_icon && (
        <Button onPress={props.onPress}>
          <ImageContainer source={props.back_icon} />
        </Button>
      )}
    </RowContainer>
  );
}

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;

const DetailContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px;
`;

const Text = styled.Text`
  font-size: ${(props) => props.size || 18}px;
  color: ${(props) => props.color || '#000000'};
  font-family: 'Roboto-Regular';
  font-weight: ${(props) => props.weight || 'normal'};
  text-align: ${(props) => props.align || 'left'};
  margin: ${(props) => props.margin || 5}px;
`;

const ImageContainer = styled.Image`
  height: ${(props) => props.size || 24}px;
  width: ${(props) => props.size || 24}px;
  margin: 10px;
`;

const Button = styled.TouchableOpacity``;
