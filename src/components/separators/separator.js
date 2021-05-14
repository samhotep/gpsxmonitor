import styled from 'styled-components/native';

const Separator = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 1px;
  width: 100%;
  ${(props) => (props.nomargin ? null : 'margin: 5px;')}
  background-color: #d3d3d3;
`;

export default Separator;
