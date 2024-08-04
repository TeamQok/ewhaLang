import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const UserImage = ({ profilePicture, alt, width = 120, height = 120 }) => {
  return <ProfileImage src={profilePicture} alt={alt} width={width} height={height} />;
};

const ProfileImage = styled.img`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  border-radius: 50%;
  overflow-x: hidden;
`;

UserImage.propTypes = {
  profilePicture: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default UserImage;