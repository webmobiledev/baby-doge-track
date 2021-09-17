import styled from 'styled-components';

const AutoRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => (props.gap || 30)}px;
  align-items: ${(props) => (props.center ? 'center' : 'initial')};
  
  
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export default AutoRow;