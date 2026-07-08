import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const UserImage = ({ profilePicture, alt, width = 120, height = 120, onClick }) => {
  return <ProfileImage src={profilePicture} alt={alt} width={width} height={height} onClick={onClick} />;
};

const ProfileImage = styled.img`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  border-radius: 50%;
  overflow-x: hidden;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
`;

UserImage.propTypes = {
  profilePicture: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  onClick: PropTypes.func,
};

export default UserImage;