import React, {useEffect, useState} from 'react';
import Separator from '../separators/separator';
import styled from 'styled-components';

export default function AssigneeItem(props) {
  const [selected, setSelected] = useState(false);

  useState(() => {
    //   SET ACCORDING TO PROP
    setSelected(true);
  }, []);
  return (
    <Highlight
      activeOpacity={0.6}
      underlayColor="#b5dbf1"
      onPress={() => {
        console.log('pressed');
      }}>
      <Container>
        <RowContainer>
          <ImageContainer source={require('../../assets/chip.png')} size={30} />
          <Text>{props.tracker.label}</Text>
          {selected && (
            <ImageContainer
              source={require('../../assets//tick_assignee.png')}
              size={30}
            />
          )}
        </RowContainer>
        <Separator nomargin={true} />
      </Container>
    </Highlight>
  );
}

const Highlight = styled.TouchableHighlight`
  border-radius: 3px;
`;

const Container = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const RowContainer = styled.View`
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
  margin: 10px;
`;

const Text = styled.Text`
  flex: 1;
  text-align: left;
  flex-wrap: wrap;
  font-size: 22px;
  color: ${(props) => (props.selected ? '#ffffff' : '#202020')};
`;
