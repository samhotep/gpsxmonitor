import React, {useState, useEffect} from 'react';
import Separator from '../separators/separator';
import styled from 'styled-components';

export default function TrackItem(props) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [difference, setDifference] = useState(new Date(Date.now()));

  const formatDate = (date) => {
    return `${date.toLocaleTimeString([], {
      year: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })}`.slice(0, -3);
  };

  useEffect(() => {
    let start = new Date(props.track.start_date.replace(/-+/g, '/'));
    let end = new Date(props.track.end_date.replace(/-+/g, '/'));
    let diff = new Date(end.getTime() - start.getTime());
    setStartDate(formatDate(start));
    setEndDate(formatDate(end));
    setDifference(diff);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Container onPress={props.onPress}>
        <ImageContainer source={require('../../assets/track.png')} />
        <ColumnContainer>
          <RowContainer>
            <BoldText bold>{startDate}</BoldText>
            <Text>{props.track.start_address}</Text>
          </RowContainer>
          <RowContainer>
            <BoldText bold>{endDate}</BoldText>
            <Text>{props.track.end_address}</Text>
          </RowContainer>
          <DetailsContainer>
            <Text>{`${props.track.length} km`}</Text>
            <Text>{`${difference.getHours()} h ${difference.getMinutes()} m`}</Text>
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
  height: ${(props) => props.size || 48}px;
  width: ${(props) => props.size || 36}px;
`;

const DetailsContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 90%;
`;

const Text = styled.Text.attrs({
  numberOfLines: 2,
})`
  text-align: left;
  flex-wrap: wrap;
  font-size: 12px;
  color: ${(props) => (props.selected ? '#ffffff' : '#9a9a9a')};
  width: 80%;
`;

const BoldText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => props.color || '#737373'};
  margin-right: 5px;
`;
