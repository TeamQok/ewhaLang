import UserInform from "../components/pages/UserInform";
import styled from "styled-components";

const EditMypage = () => {
  return (
    <Wrapper>
      <UserInform isEdit={true} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 48px;
`

export default EditMypage;
