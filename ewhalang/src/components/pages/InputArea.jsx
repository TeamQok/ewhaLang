import React, { useState } from 'react';
import styled from 'styled-components';
import sendIcon from '../../assets/sendMessage.svg'

const InputContainer = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  background-color: var(--grey5);
  border-radius: 24px;
  padding: 5px;
`;

const Input = styled.input`
  width: 88vw;
  height: 40px;
  border: none;
  border-radius: 24px;
  padding: 0 10px;
  outline: none;
  background-color: transparent;
  font-size: 16px;

  &::placeholder{
    font-size: 12px;
    color: #999;
  }
`;

const SendButton = styled.button`
  width: 44px;
  height: 44px;
  background: none;
  border: none;
  cursor: pointer;
`;

const InputArea = ({ onSendMessage, disabled, placeholder }) => {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim() && !disabled) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <InputContainer>
      <Input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
      />
      <SendButton onClick={handleSend}>
        <img src={sendIcon} alt="Send" width="24" height="24" />
      </SendButton>
    </InputContainer>
  );
};

export default InputArea;