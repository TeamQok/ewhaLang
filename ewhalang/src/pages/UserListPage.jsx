// src/pages/UserListPage.js

import React from 'react';
import styled from 'styled-components';
import UserListInformation from '../components/pages/UserListInformation';
import users from '../_mock/userMockData';
import Topbar from '../components/layout/Topbar';
import BottomBar from '../components/layout/BottomBar';
import FilterComponent from '../components/pages/FilterComponent';

const UserListPage = () => {
  return (
    <Wrapper>
      <Topbar title={"이화랑 친구 찾기"}/>
      <FilterComponent />
      <ContentsWrapper>
        {users.map((user, index) => (
          <UserListInformation key={index} user={user} />
        ))}
      </ContentsWrapper>
      <BottomBar/>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 60px;
`;

const ContentsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, calc((100vw - 49px) / 2));
  gap: 9px;
  padding: 20px;
  flex-grow: 1;
`;

export default UserListPage;