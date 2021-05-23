import styled from 'styled-components/native';

const VerticalSeparator = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 1.5px;
  ${(props) => (props.nomargin ? null : 'margin: 3px;')}
  background-color: #d3d3d3;
`;

export default VerticalSeparator;
