import React, {useState, useEffect} from 'react';
import Separator from '../separators/separator';
import styled from 'styled-components';
import Storage from '../../storage/storage';

export default function EventItem(props) {
  const [statusDate, setStatusDate] = useState('');
  const [trackerLabel, setTrackerLabel] = useState('');

  useEffect(() => {
    let date = new Date(props.event.status_change_date.replace(/-+/g, '/'));
    setStatusDate(
      `${date.toLocaleDateString([], {
        year: '2-digit',
        day: '2-digit',
        hour: '2-digit',
      })} ${date.toLocaleTimeString([], {
        year: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })}`,
    );

    Storage.getAllTrackers()
      .then((trackers) => {
        JSON.parse(trackers).map((_, i) => {
          if (_.id === props.event.tracker_id) {
            setTrackerLabel(_.label);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container onPress={props.onPress}>
        <ImageContainer source={require('../../assets/bell_blue.png')} />
        <ColumnContainer>
          <Text color="#737373">
            {trackerLabel}: task: "{props.event.label}"{' '}
            {props.event.status.toUpperCase()}
          </Text>
          <Text align="right" size={12}>
            {statusDate.slice(0, -3)}
          </Text>
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
`;

const ColumnContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const ImageContainer = styled.Image`
  height: ${(props) => props.size || 15}px;
  width: ${(props) => props.size || 15}px;
  margin: 5px;
`;

const Text = styled.Text`
  text-align: ${(props) => props.align || 'left'};
  flex-wrap: wrap;
  font-size: ${(props) => props.size || 14}px;
  color: ${(props) => props.color || '#a8a8a8'};
  width: 250px;
  padding: 2px;
`;
