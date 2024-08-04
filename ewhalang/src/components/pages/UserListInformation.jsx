import React from 'react';
import styled from 'styled-components';
import UserImage from '../shared/UserImage';
import UserCoreInformation from '../shared/UserCoreInformation';
import UserRequiredInformation from '../shared/UserRequiredInformation';

const UserListInformation = ({ user }) => {
    return (
      <UserListItem>
        <UserImage profilePicture={user.profilePicture} alt={user.nickname} width={65} height={65} />
        <UserCoreInformation nickname={user.nickname} country={user.country} layout="list" />
        <UserRequiredInformation
          gender={user.gender}
          birthdate={user.birthdate}
          major={user.major}
          languages={user.languages}
          layout="list"
        />
      </UserListItem>
    );
  };
  
  const UserListItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 10px;
    min-width: 168px;
    min-height: 169px;
    border: 0.5px solid var(--grey3);
    border-radius: 10px;
    box-sizing: border-box;
  `;
  
  export default UserListInformation;