import React, { useState } from 'react';
import styled from "styled-components";
import ChatList from '../components/pages/ChatList';
import Topbar from '../components/layout/Topbar';
import BottomBar from '../components/layout/BottomBar';
import { useTranslation } from 'react-i18next';

const ChatListPage = () => {
    const [totalUnreadCount, setTotalUnreadCount] = useState(0);
    const { t } = useTranslation();

    return (
        <Wrapper>
            <Topbar title={t("pageTitles.chatting")}/>
            <ChatList setTotalUnreadCount={setTotalUnreadCount} />
            <BottomBar isOnChat={true} unreadCount={totalUnreadCount} />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    font-weight: 600;
    overflow: hidden;
`

export default ChatListPage;