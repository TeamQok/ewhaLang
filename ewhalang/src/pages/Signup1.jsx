import Topbar from "../components/layout/Topbar";
import * as S from "./Signup1.style";
import InputBox from "../components/common/InputBox";
import { LongButton, ButtonType } from "../components/common/LongButton";
import { useNavigate } from "react-router-dom";

const Signup1 = () => {
  const navigate = useNavigate();

  const goNext = () => {
    navigate("/signup2");
  };

  return (
    <>
      <Topbar title={"회원가입"} right={"x"} left={"back"} />
      <S.Wrapper>
        <InputBox title={"이메일"} placeholder={"이메일을 입력해주세요."} />
        <S.Info>* 학교 이메일로 가입해주세요.</S.Info>

        <InputBox title={"비밀번호"} placeholder={"비밀번호를 입력해주세요."} />
        <S.Info>
          * 영문, 숫자, 특수문자 조합
          <br />* 최소 6자에서 최대 20자
        </S.Info>

        <InputBox
          title={"비밀번호 확인"}
          placeholder={"입력한 비밀번호를 확인해주세요."}
        />
        <S.Info>* 알맞은 비밀번호입니다.</S.Info>
        <S.Container>
          <LongButton type={ButtonType.GREEN} onClick={goNext}>
            다음
          </LongButton>
        </S.Container>
      </S.Wrapper>
    </>
  );
};

export default Signup1;
