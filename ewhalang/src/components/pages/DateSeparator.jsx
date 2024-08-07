import React from 'react';
import styled from 'styled-components';

const DateWrapper = styled.div`
  width: 148px;
  height: 24px;
  background-color: var(--grey5);
  color: var(--grey1);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px auto;
  font-size: 12px;
`;

const DateSeparator = ({ date }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };

  return <DateWrapper>{formatDate(date)}</DateWrapper>;
};

export default DateSeparator;
