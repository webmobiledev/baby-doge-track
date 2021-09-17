import React from 'react';
import styled from 'styled-components';

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${(props) => (props.marginTop ? props.marginTop + 'px' : '15px')};
  margin-bottom: 15px;
  .title {
    font-size: 15px;
    color: #707171;
    width: ${(props) => (props.width ? props.width + 'px' : '100%')}
  }
  
  .value {
    font-weight: bold;
    font-size: ${(props) => (props.color ? props.size : '23px')};
    color: ${(props) => (props.color ? props.color : 'black')};
    margin-top: ${(props) => (props.marginTop ? '0' : '10px')};
  }
`;
const Info = (props) => {
  const {title, value, color, size, width, marginTop} = props;
  return (
    <InfoWrapper color={color} size={size} width={width} marginTop={marginTop}>
      <div className='title'>{title}</div>
      {React.isValidElement(value) ? (
        value
      ) : (
        <div className='value'>{value}</div>
      )}
    </InfoWrapper>
  )
};

export default Info;