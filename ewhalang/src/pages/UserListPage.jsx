import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import UserListInformation from "../components/pages/UserListInformation";
import Topbar from "../components/layout/Topbar";
import BottomBar from "../components/layout/BottomBar";
import FilterComponent from "../components/pages/FilterComponent";
import LanguageLevelInfo from "../components/pages/LanguageLevelInfo";
import { auth, firestore } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const UserListPage = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({
    languages: [],
    countries: [],
    gender: "전체",
    birthdateRange: { start: 1996, end: 2005 },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDocs(collection(firestore, "users"));
        const users = userDoc.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllUsers(users);
        setLoggedUser(users.find(user => user.id === currentUser.uid));
      } else {
        setLoggedUser(null);
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!loggedUser) return;

    const filtered = allUsers.filter((user) => {
      if (user.id === loggedUser.id) return false;

      const languageMatch =
        filterCriteria.languages.length === 0 ||
        filterCriteria.languages.some((lang) =>
          user.languages.some((language) => language.language === lang)
        );

      const countryMatch =
        filterCriteria.countries.length === 0 ||
        filterCriteria.countries.includes(user.country);

      const genderMatch =
        filterCriteria.gender === "전체" ||
        user.gender === filterCriteria.gender;

      const birthYearMatch =
        parseInt(user.birthdate) >= filterCriteria.birthdateRange.start &&
        parseInt(user.birthdate) <= filterCriteria.birthdateRange.end;

      return languageMatch && countryMatch && genderMatch && birthYearMatch;
    });

    setFilteredUsers(filtered);
  }, [filterCriteria, allUsers, loggedUser]);

  const handleFilterChange = (newFilterCriteria) => {
    setFilterCriteria((prevCriteria) => ({
      ...prevCriteria,
      ...newFilterCriteria,
    }));
  };

  if (!loggedUser) {
    return <div>Loading...</div>;
  }

  console.log(filteredUsers);

  return (
    <Wrapper>
      <Topbar title={"이화랑 친구 찾기"} />
      <FilterComponent
        onFilterChange={handleFilterChange}
        initialFilterCriteria={filterCriteria}
      />
      <LanguageLevelInfo />

      <ContentsWrapper>
        {allUsers.map((user) => (
          <UserListInformation key={user.id} user={user} />
        ))}
      </ContentsWrapper>

      <BottomBar isOnFriend={true} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 60px;
`;

const ContentsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, calc((100vw - 57px) / 2));
  gap: 9px;
  padding: 16px 24px;
  flex-grow: 1;
  justify-content: center;
  align-content: flex-start;
  min-height: calc(100vh - 60px);
`;

export default UserListPage;