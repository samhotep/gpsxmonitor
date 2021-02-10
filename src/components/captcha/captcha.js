import React, {useState, useEffect} from 'react';
import Svg, {Path, Defs, G, Text, TextPath, TSpan} from 'react-native-svg';
import styled from 'styled-components';

export default function Captcha(props) {
  const [path, setPath] = useState('M 10 100 q 90 -75 180 0');
  const [captchaArray, setCaptchaArray] = useState([]);

  const getCode = () => {
    getCharacters();
    getPath();
  };

  const getCharacters = () => {
    let result = '';
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (var i = 0; i < props.length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    props.getValue(result);
    setCaptchaArray([...result]);
  };

  const getPath = () => {
    let pos = getPosition(10, 20, 40, 80);
    let curve = getPosition(0, 30, 0, 120);
    let tempPath = `M ${pos[0]} ${pos[1]} q ${curve[0]} ${curve[1]} 180 0`;
    setPath(tempPath);
  };

  const getPosition = (xmin, xmax, ymin, ymax) => {
    return [
      (Math.floor(Math.random() * (xmax - xmin)) + xmin).toString(),
      (Math.floor(Math.random() * (ymax - ymin)) + xmin).toString(),
    ];
  };

  const getColor = () => {
    var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  };

  const getSize = () => {
    return Math.floor(Math.random() * 40).toString();
  };

  const getWeight = () => {
    if (Math.floor(Math.random() * 10) > 5) {
      return 'bold';
    } else {
      return 'normal';
    }
  };

  useEffect(() => {
    getCode();
  }, []);

  return (
    <Container onPress={getCode}>
      <Svg height="130" width="180">
        <Defs>
          <Path id="path" d={path} />
        </Defs>
        <G y="20">
          <Text fill="grey" fontSize={50}>
            <TextPath href="#path">
              {captchaArray.map((item, index) => {
                return item;
              })}
            </TextPath>
          </Text>
        </G>
      </Svg>
    </Container>
  );
}

// Future randomization implementation
function Single(props) {
  return (
    <Text
      fill={props.fill}
      stroke={props.stroke}
      fontSize={props.size}
      fontWeight={props.weight}
      x={props.y}
      y={props.x}
      textAnchor="middle">
      {props.char}
    </Text>
  );
}

const Container = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #e2e2e2;
`;
