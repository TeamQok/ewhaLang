import React from 'react';
import styled from "styled-components";
import ChatList from '../components/pages/ChatList';
import Topbar from '../components/layout/Topbar';
import BottomBar from '../components/layout/BottomBar';
const ChatListPage = () => {
    return (
        <Wrapper>
            <Topbar title="채팅 목록"/>
            <ChatList/>
            <BottomBar isOnChat={true}/>
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