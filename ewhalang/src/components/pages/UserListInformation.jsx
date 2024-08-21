import React from 'react';
import styled from 'styled-components';
import UserImage from '../shared/UserImage';
import UserCoreInformation from '../shared/UserCoreInformation';
import UserRequiredInformation from '../shared/UserRequiredInformation';
import { useNavigate } from 'react-router-dom';

const UserListInformation = ({ user }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/users/${user.id}`);
  }
  return (
      <UserListItem onClick={handleClick}>
        <UserImage profilePicture={user.profileImg} alt={user.nickname} width={65} height={65} />
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
    height: 169px;
    border: 0.5px solid var(--grey3);
    border-radius: 10px;
    box-sizing: border-box;
    cursor: pointer;
  `;
  
  export default UserListInformation;