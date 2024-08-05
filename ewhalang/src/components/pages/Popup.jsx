import React from 'react';
import styled from 'styled-components';
import closeIcon from '../../assets/closeIcon.svg';

const Popup = ({ isOpen, onClose, title, children, fullScreen }) => (
  <PopupWrapper isOpen={isOpen}>
    <PopupContent isOpen={isOpen} fullScreen={fullScreen}>
      <PopupHeader>
        <Title>{title}</Title>
        <CloseButton onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </CloseButton>
      </PopupHeader>
      <PopupBody>
      {children}
      </PopupBody>
    </PopupContent>
  </PopupWrapper>
);

const PopupWrapper = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const PopupContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 1;
  padding: 20px;
  border-radius: ${props => props.fullScreen ? '0' : '20px 20px 0 0'};
  max-height: ${props => props.fullScreen ? '100%' : '90%'};
  display: flex;
  flex-direction: column;
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(100%)'};
  transition: transform 0.3s ease-out;
`;

const PopupHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 44px;
  background-color: white;
  z-index: 10;
`;

const PopupBody = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const Title = styled.p`
  margin: 0;
  font-size: 18px;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  
  img {
    width: 24px;
    height: 24px;
  }
`;

export default Popup;
