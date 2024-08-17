import styled from "styled-components";

const InputBox = ({ title, placeholder, onChange, type }) => {
  return (
    <>
      <Title>{title}</Title>

      <Input placeholder={placeholder} onChange={onChange} type={type} />
    </>
  );
};

export default InputBox;

const Title = styled.div`
  color: var(--Black, #000);

  /* Subsubtitle_16_SB */
  font-family: var(--korean);
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
  margin-bottom: 8px;
`;

const Input = styled.input`
  border-radius: 10px;
  border: 1px solid var(--Grey-3, #b8b8b8);
  background: var(--White, #fff);
  width: 100%;
  height: 40px;
  padding: 8px 13px;
  box-sizing: border-box;
  outline: none;
  &::placeholder {
    color: var(--grey3);
    font-size: 14px;
    font-family: var(--korean);
  }
`;
