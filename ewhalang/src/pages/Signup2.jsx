import UserInform from "../components/pages/UserInform";
import styled from "styled-components";

const Signup2 = () => {
  return (
    <Wrapper>
      <UserInform isEdit={false} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 48px;
`;

export default Signup2;
