import React, { useState, useRef, useEffect, forwardRef } from "react";
import styled from "styled-components";
import sendIcon from "../../assets/sendMessage.svg";

const InputArea = forwardRef(({ onSendMessage, disabled, placeholder, onFocus, onBlur }, ref) => {
  const [inputText, setInputText] = useState("");
  const [containerHeight, setContainerHeight] = useState(40);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (ref) {
      ref.current = inputRef.current;
    }
  }, [ref]);

  const handleSend = () => {
    if (inputText.trim() && !disabled) {
      onSendMessage(inputText);
      setInputText("");
      setContainerHeight(40);
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.height = `${containerHeight}px`;
    }
  }, [containerHeight]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    inputRef.current.style.height = "40px";
    const newHeight = Math.min(inputRef.current.scrollHeight, 120);
    inputRef.current.style.height = `${newHeight}px`;
    setContainerHeight(newHeight + 5);
  };

  const handleFocus = () => {
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    if (onBlur) onBlur();
  };

  return (
    <InputAreaContainer>
      <InputContainer ref={containerRef}>
        <Input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={handleInputChange}
          disabled={disabled}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <SendButton onClick={handleSend}>
          <img src={sendIcon} alt="Send" width="24" height="24" />
        </SendButton>
      </InputContainer>
    </InputAreaContainer>
  );
});

export default InputArea;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--grey5);
  border-radius: 24px;
  padding: 5px;
  box-sizing: border-box; /* 패딩과 박스 크기 계산 */
  /* 텍스트 영역의 높이에 맞춰 동적으로 커질 수 있도록 설정 */
  transition: height 0.2s ease;
`;

const Input = styled.textarea`
  width: 88vw;
  border: none;
  border-radius: 24px;
  padding-left: 13px;
  padding-bottom: 10px;
  padding-top: 2px;
  outline: none;
  background-color: transparent;
  font-size: 16px;
  resize: none;

  display: flex;
  flex-direction: row;
  justify-content: center;

  overflow-y: auto; /* 스크롤 활성화 */
  max-height: 120px; /* 5줄 높이 */
  line-height: 24px; /* 줄 높이 */
  width: 100%; /* 부모 컨테이너 너비에 맞추기 */
  min-height: 30px; /* 최소 높이 */
  box-sizing: border-box;

  &::placeholder {
    font-size: 12px;
    color: #999;
  }
`;

const SendButton = styled.button`
  width: 44px;
  height: auto;
  background: none;
  border: none;
  cursor: pointer;
`;

const InputAreaContainer = styled.div`
  padding: 7px 24px;
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  width: 100%;
  background-color: white; /* 배경색 설정 */
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  min-height: 40px; /* 최소 높이 */
`;
