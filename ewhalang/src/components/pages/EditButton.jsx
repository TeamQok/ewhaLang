import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import editIcon from '../../assets/editProfile.svg'; // 연필 아이콘 경로

const EditButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 70px;
  height: 24px;
  cursor: pointer;
`;

const EditIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;

const EditText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: var(--sub1);
`;

const EditButton = () => {
  const { t } = useTranslation();

  return (
    <EditButtonWrapper>
      <EditIcon src={editIcon} alt={t('common.edit')} />
      <EditText>{t('common.edit')}</EditText>
    </EditButtonWrapper>
  );
};

export default EditButton;