import React, { useState } from 'react';
import styled from "styled-components";
import ChatList from '../components/pages/ChatList';
import Topbar from '../components/layout/Topbar';
import BottomBar from '../components/layout/BottomBar';

const ChatListPage = () => {
    const [totalUnreadCount, setTotalUnreadCount] = useState(0);

    return (
        <Wrapper>
            <Topbar title="채팅 목록"/>
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