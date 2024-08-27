import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

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
  const { i18n } = useTranslation();

  const formatDate = (dateString) => {
    // 날짜 문자열을 안전하게 파싱
    const parts = dateString.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // JavaScript의 월은 0부터 시작
    const day = parseInt(parts[2], 10);
    
    const dateObj = new Date(year, month, day);

    if (isNaN(dateObj.getTime())) {
      console.error('Invalid date:', dateString);
      return 'Invalid Date';
    }

    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return dateObj.toLocaleDateString(i18n.language, options);
  };

  return <DateWrapper>{formatDate(date)}</DateWrapper>;
};

export default DateSeparator;