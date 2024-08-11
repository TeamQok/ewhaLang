import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UserListInformation from "../components/pages/UserListInformation";
import users from "../_mock/userMockData";
import Topbar from "../components/layout/Topbar";
import BottomBar from "../components/layout/BottomBar";
import FilterComponent from "../components/pages/FilterComponent";
import LanguageLevelInfo from "../components/pages/LanguageLevelInfo";

const UserListPage = () => {
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [filterCriteria, setFilterCriteria] = useState({
    languages: [],
    countries: [],
    gender: "전체",
    birthdateRange: { start: 1996, end: 2005 },
  });

  useEffect(() => {
    const filtered = users.filter((user) => {
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
  }, [filterCriteria]);

  const handleFilterChange = (newFilterCriteria) => {
    setFilterCriteria((prevCriteria) => ({
      ...prevCriteria,
      ...newFilterCriteria,
    }));
  };

  return (
    <Wrapper>
      <Topbar title={"이화랑 친구 찾기"} />
      <FilterComponent
        onFilterChange={handleFilterChange}
        initialFilterCriteria={filterCriteria}
      />
      <LanguageLevelInfo />

      <ContentsWrapper>
        {filteredUsers.map((user, index) => (
          <UserListInformation key={index} user={user} />
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
