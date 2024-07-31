import React from 'react';
import styled from 'styled-components';

const UserImage = ({ profilePicture, alt }) => {
  return <ProfileImage src={profilePicture} alt={alt} />;
};

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  text-align: center;
`;

export default UserImage;