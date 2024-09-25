import styled from "styled-components";
import chatGrey from "../../assets/chatGrey.svg";
import mypageGrey from "../../assets/mypageGrey.svg";
import userGrey from "../../assets/userGrey.svg";
import { useNavigate } from "react-router-dom";
import chatGrayEn from "../../assets/chatGrayEn.svg";
import chatGreenEn from "../../assets/chatGreenEn.svg";
import mypageGrayEn from "../../assets/mypageGrayEn.svg";
import mypageGreenEn from "../../assets/mypageGreenEn.svg";
import userGrayEn from "../../assets/userGrayEn.svg";
import userGreenEn from "../../assets/userGreenEn.svg";
import mypageGreen from "../../assets/mypageGreen.svg";
import chatGreen from "../../assets/chatGreen.svg";
import userGreen from "../../assets/userGreen.svg";
import { useState, useEffect } from "react";
import { getUnreadCount } from "../common/UnreadCountManager";
import { onSnapshot, collection, query, where, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firestore, auth } from "../../firebase";

const BottomBar = ({ isOnFriend, isOnChat, isOnMypage }) => {
  const navigate = useNavigate();
  const [friend, setFriend] = useState(false);
  const [mypage, setMypage] = useState(false);
  const [chat, setChat] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [lang, setLang] = useState("");

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
    const q = query(chatsRef, where("participantsId", "array-contains", user.uid));

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

          console.log("User's usingLanguage:", usingLanguage);
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
        {lang === "ko" ? (
          <>
            {/* 한국어 버전 */}
            <Item onClick={goFriends}>
              {friend || isOnFriend ? (
                <img src={userGreen} />
              ) : (
                <img src={userGrey} />
              )}
            </Item>
            <Item onClick={goChat}>
              {chat || isOnChat ? (
                <img src={chatGreen} />
              ) : (
                <img src={chatGrey} />
              )}
              {unreadCount > 0 && <UnreadBadge>{unreadCount}</UnreadBadge>}
            </Item>
            <Item onClick={goMypage}>
              {mypage || isOnMypage ? (
                <img src={mypageGreen} />
              ) : (
                <img src={mypageGrey} />
              )}
            </Item>
          </>
        ) : (
          <>
            {/* 영어 버전 */}
            <Item onClick={goFriends}>
              {friend || isOnFriend ? (
                <img src={userGreenEn} />
              ) : (
                <img src={userGrayEn} />
              )}
            </Item>
            <Item onClick={goChat}>
              {chat || isOnChat ? (
                <img src={chatGreenEn} />
              ) : (
                <img src={chatGrayEn} />
              )}
              {unreadCount > 0 && <UnreadBadge>{unreadCount}</UnreadBadge>}
            </Item>
            <Item onClick={goMypage}>
              {mypage || isOnMypage ? (
                <img src={mypageGreenEn} />
              ) : (
                <img src={mypageGrayEn} />
              )}
            </Item>
          </>
        )}
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
