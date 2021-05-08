import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

export default function CounterItem(props) {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    let numberString = String(props.value.toFixed(1));
    let newNumberList = Array(8 - numberString.length).fill(0);
    setNumbers([
      ...newNumberList,
      ...Array.from(numberString.replace('.', ''), Number),
    ]);
  }, []);
  return numbers.map((_, i) => {
    if (i === numbers.length - 1) {
      return (
        <ItemBox color="#9e9e9e" bgcolor="#ffffff">
          {_}
        </ItemBox>
      );
    } else {
      return <ItemBox>{_}</ItemBox>;
    }
  });
}

const ItemBox = styled.Text`
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.bgcolor || '#9e9e9e'};
  color: ${(props) => props.color || '#ffffff'};
  font-family: 'Roboto-Regular';
  text-align: center;
  line-height: 24px;
  font-size: 14px;
  height: 24px;
  width: 22px;
  margin: 0.5px;
  border: 1px #9e9e9e;
`;
