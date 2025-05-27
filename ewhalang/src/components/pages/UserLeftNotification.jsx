import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const NotificationWrapper = styled.div`
  text-align: center;
  margin: 10px 0;
  color: #888;
  font-size: 0.9em;
`;

const UserLeftNotification = () => {
  const { t } = useTranslation();

  return (
    <NotificationWrapper>
      {t("messages.userLeftNotification")}
    </NotificationWrapper>
  );
};

export default UserLeftNotification;
