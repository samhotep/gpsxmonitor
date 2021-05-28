import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

export default function AssigneeItem(props) {
  const [selected, setSelected] = useState(false);

  useState(() => {
    //   SET ACCORDING TO PROP
    setSelected(true);
  }, []);
  return (
    <Highlight onPress={props.onPress}>
      <ImageContainer source={require('../../assets/chip.png')} />
      <Container>
        <Text>{props.text}</Text>
      </Container>
    </Highlight>
  );
}

const Highlight = styled.TouchableHighlight``;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => (props.selected ? '#4788c7' : '#ffffff')};
  width: 100%;
  padding: 10px;
`;

const ImageContainer = styled.Image`
  height: ${(props) => props.size || 24}px;
  width: ${(props) => props.size || 24}px;
`;

const Text = styled.Text`
  flex: 1;
  text-align: left;
  flex-wrap: wrap;
  font-size: 14px;
  color: ${(props) => (props.selected ? '#ffffff' : '#202020')};
`;
