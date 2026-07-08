import styled from "styled-components";
import chatGray from "../../assets/chatGray.svg";
import mypageGray from "../../assets/mypageGray.svg";
import { useNavigate } from "react-router-dom";
import userGray from "../../assets/userGray.svg";
import mypageGreen from "../../assets/mypageGreen.svg";
import chatGreen from "../../assets/chatGreen.svg";
import userGreen from "../../assets/userGreen.svg";
import { useState, useEffect } from "react";
import { getUnreadCount } from "../common/UnreadCountManager";
import {
  onSnapshot,
  collection,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firestore, auth } from "../../firebase";
import { useTranslation } from "react-i18next";

const BottomBar = ({ isOnFriend, isOnChat, isOnMypage }) => {
  const navigate = useNavigate();
  const [friend, setFriend] = useState(false);
  const [mypage, setMypage] = useState(false);
  const [chat, setChat] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [lang, setLang] = useState("");

  const { i18n, t } = useTranslation();

  const goFriends = () => {
    navigate("/users");
    setFriend(true);
    setMypage(false);
    setChat(false);
  };

  const goChat = () => {
    navigate("/chats");
    setChat(true);
    setFriend(false);
    setMypage(false);
  };

  const goMypage = () => {
    navigate("/mypage");
    setMypage(true);
    setChat(false);
    setFriend(false);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setUnreadCount(getUnreadCount());
    };

    // 초기 unreadCount 설정
    setUnreadCount(getUnreadCount());

    // 로컬 스토리지 변경 이벤트 리스너 추가
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const chatsRef = collection(firestore, "chats");
    const q = query(
      chatsRef,
      where("participantsId", "array-contains", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let count = 0;
      snapshot.docs.forEach((doc) => {
        const chatData = doc.data();
        count += chatData.unreadCounts[user.uid] || 0;
      });
      setUnreadCount(count);
    });

    return () => unsubscribe();
  }, []);

  const fetchUserLanguage = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const docRef = doc(firestore, "users", user.uid); // Firestore에서 사용자 문서 참조
        const docSnap = await getDoc(docRef); // 문서 가져오기

        if (docSnap.exists()) {
          const userData = docSnap.data();
          const usingLanguage = userData?.usingLanguage; // usingLanguage 값 가져오기

          // console.log("User's usingLanguage:", usingLanguage);
          setLang(usingLanguage);
          return usingLanguage; // 가져온 값을 반환
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("로그인 된 사용자 없음.");
      }
    } catch (error) {
      console.error("Error fetching user's usingLanguage:", error);
    }
  };

  useEffect(() => {
    if (lang) {
      // lang이 변경될 때만 하단바를 업데이트
      fetchUserLanguage();
    }
  }, [lang]);

  // 로컬 스토리지에서 초기 언어 설정 가져오기
  useEffect(() => {
    const storedLang = localStorage.getItem("usingLanguage");
    if (storedLang) {
      setLang(storedLang);
    } else {
      // 로컬 스토리지에 값이 없으면 Firestore에서 가져오기
      fetchUserLanguage();
    }
  }, []);

  return (
    <>
      <Wrapper>
        <Item onClick={goFriends}>
          {friend || isOnFriend ? (
            <ImgWrp>
              <img src={userGreen} />
              <Text>{t("bottomBar.친구목록")}</Text>
            </ImgWrp>
          ) : (
            <ImgWrp>
              <img src={userGray} />
              <Text2>{t("bottomBar.친구목록")}</Text2>
            </ImgWrp>
          )}
        </Item>

        <Item onClick={goChat}>
          {chat || isOnChat ? (
            <ImgWrp>
              <img src={chatGreen} />
              <Text>{t("bottomBar.채팅목록")}</Text>
            </ImgWrp>
          ) : (
            <ImgWrp>
              <img src={chatGray} />
              <Text2>{t("bottomBar.채팅목록")}</Text2>
            </ImgWrp>
          )}
          {unreadCount > 0 && <UnreadBadge>{unreadCount}</UnreadBadge>}
        </Item>
        <Item onClick={goMypage}>
          {mypage || isOnMypage ? (
            <ImgWrp>
              <img src={mypageGreen} />
              <Text>{t("bottomBar.마이페이지")}</Text>
            </ImgWrp>
          ) : (
            <ImgWrp>
              <img src={mypageGray} />
              <Text2>{t("bottomBar.마이페이지")}</Text2>
            </ImgWrp>
          )}
        </Item>
      </Wrapper>
    </>
  );
};

export default BottomBar;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  position: fixed;
  bottom: 0;
  padding-bottom: 30px;
  border-top: 0.5px solid var(--Grey-3, #b8b8b8);
  background: var(--White, #fff);
  background-color: white;
`;

const Item = styled.div`
  margin-left: 35px;
  margin-right: 35px;
  position: relative;
`;

const UnreadBadge = styled.div`
  position: absolute;
  top: 3px;
  right: 0px;
  background-color: var(--main);
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: bold;
`;

const ImgWrp = styled.div`
  margin-top: 0.72rem;
`;

const Text = styled.div`
  text-align: center;
  color: var(--Sub-1, #33936d);

  font-family: var(--korean);
  font-size: 0.7rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Text2 = styled.div`
  text-align: center;
  color: var(--Grey-1, #7f7f7f);

  font-family: var(--korean);
  font-size: 0.7rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
