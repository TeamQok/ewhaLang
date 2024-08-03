import React from "react";
import styled from "styled-components";
import { ShortButton } from "./ShortButton";
import ButtonType from "./ButtonType";

// 모달 배경 스타일
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1001;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

// 모달 컨테이너 스타일
const ModalContainer = styled.div`
  width: 67vw;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

// 컨텐츠 래퍼 스타일
const ContentWrapper = styled.div`
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center; // 텍스트 자체를 가운데 정렬
  width: 100%;
`;

// 안내 문구 텍스트 스타일
const GuideText = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: ${(props) => (props.showTextInput ? "12px" : "28px")};
`;

// 버튼 컨테이너 스타일
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${(props) => (props.isSingleButton ? "0" : "12px")};
`;

const StyledInput = styled.input`
  width: 46vw;
  height: 130px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
`;

// Modal 컴포넌트
const Modal = ({
  isOpen,
  onClose,
  guideText,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
  isSingleButton = false,
  showTextInput = false,
}) => {
  if (!isOpen) return null;

  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ContentWrapper>
          <GuideText
            showTextInput={showTextInput}
            style={{ whiteSpace: "pre-line" }}
          >
            {guideText}
          </GuideText>
          {showTextInput && <StyledInput type="text" />}
          <ButtonContainer isSingleButton={isSingleButton}>
            <ShortButton type={ButtonType.GREEN} onClick={onConfirm}>
              {confirmText}
            </ShortButton>
            {!isSingleButton && (
              <ShortButton type={ButtonType.SHORT_GREY} onClick={onCancel}>
                {cancelText}
              </ShortButton>
            )}
          </ButtonContainer>
        </ContentWrapper>
      </ModalContainer>
    </ModalBackground>
  );
};

export default Modal;
