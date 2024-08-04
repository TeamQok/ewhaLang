import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FilterButton from "./FilterButton";
import SelectionPopup from "./SelectionPopup";
import BulletSelectionPopup from "./BulletSelectionPopup";
import RangePopup from "./RangePopup";
import Popup from "./Popup";
import filterIcon from "../../assets/filter.svg";
import arrowDownIcon from "../../assets/filterArrowDown.svg";

const languages = [
  "한국어",
  "영어",
  "일본어",
  "중국어",
  "프랑스어",
  "스페인어",
  "독일어",
  "이탈리아어",
  "러시아어",
  "포르투갈어",
  "아랍어",
  "힌디어",
  "베트남어",
  "태국어",
  "터키어",
  "폴란드어",
  "네덜란드어",
  "스웨덴어",
  "그리스어",
  "체코어",
  "헝가리어",
  "핀란드어",
  "덴마크어",
  "노르웨이어",
  "히브리어",
];

const countries = [
  "대한민국",
  "미국",
  "일본",
  "중국",
  "프랑스",
  "스페인",
  "영국",
  "독일",
  "이탈리아",
  "캐나다",
  "호주",
  "인도",
  "브라질",
  "멕시코",
  "남아프리카 공화국",
  "러시아",
  "네덜란드",
  "스웨덴",
  "스위스",
  "벨기에",
  "오스트리아",
];

const genderOptions = ["전체", "여성", "남성"];

const FilterComponent = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [isFullScreenFilterOpen, setIsFullScreenFilterOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedGender, setSelectedGender] = useState("전체");
  const [isAllLanguagesSelected, setIsAllLanguagesSelected] = useState(false);
  const [isAllCountriesSelected, setIsAllCountriesSelected] = useState(false);
  const [countrySearchTerm, setCountrySearchTerm] = useState("");
  const [birthYearRange, setBirthYearRange] = useState({
    start: 1996,
    end: 2005,
  });

  useEffect(() => {
    setIsAllLanguagesSelected(selectedLanguages.length === languages.length);
  }, [selectedLanguages]);

  useEffect(() => {
    setIsAllCountriesSelected(selectedCountries.length === countries.length);
  }, [selectedCountries]);

  useEffect(() => {
    if (activeFilter !== null || isFullScreenFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeFilter, isFullScreenFilterOpen]);

  const openFilter = (filter) => {
    setActiveFilter(filter);
  };

  const closeFilter = () => {
    setActiveFilter(null);
  };

  const openFullScreenFilter = () => {
    setIsFullScreenFilterOpen(true);
  };

  const closeFullScreenFilter = () => {
    setIsFullScreenFilterOpen(false);
  };

  const toggleLanguage = (language) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((lang) => lang !== language)
        : [...prev, language]
    );
  };

  const toggleCountry = (country) => {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  };

  const toggleAllLanguages = () => {
    if (isAllLanguagesSelected) {
      setSelectedLanguages([]);
    } else {
      setSelectedLanguages([...languages]);
    }
  };

  const toggleAllCountries = () => {
    if (isAllCountriesSelected) {
      setSelectedCountries([]);
    } else {
      setSelectedCountries([...countries]);
    }
  };

  const toggleGender = (gender) => {
    setSelectedGender(gender);
  };

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(countrySearchTerm.toLowerCase())
  );

  const handleBirthYearRangeChange = (start, end) => {
    setBirthYearRange({ start, end });
  };

  return (
    <>
      <FilterWrapper>
        <FilterButton
          text="필터"
          icon={filterIcon}
          onClick={openFullScreenFilter}
        />
        <FilterButton
          text="언어"
          icon={arrowDownIcon}
          onClick={() => openFilter("언어")}
        />
        <FilterButton
          text="국적"
          icon={arrowDownIcon}
          onClick={() => openFilter("국적")}
        />
        <FilterButton
          text="성별"
          icon={arrowDownIcon}
          onClick={() => openFilter("성별")}
        />
        <FilterButton
          text="출생년도"
          icon={arrowDownIcon}
          onClick={() => openFilter("출생년도")}
        />
      </FilterWrapper>
      <SelectionPopup
        isOpen={activeFilter === "언어"}
        onClose={closeFilter}
        title="언어 선택"
        items={languages}
        selectedItems={selectedLanguages}
        toggleItem={toggleLanguage}
        toggleAllItems={toggleAllLanguages}
        isAllSelected={isAllLanguagesSelected}
        showSearch={false}
      />
      <SelectionPopup
        isOpen={activeFilter === "국적"}
        onClose={closeFilter}
        title="국적 선택"
        items={filteredCountries}
        selectedItems={selectedCountries}
        toggleItem={toggleCountry}
        toggleAllItems={toggleAllCountries}
        isAllSelected={isAllCountriesSelected}
        searchTerm={countrySearchTerm}
        setSearchTerm={setCountrySearchTerm}
        showSearch={true}
      />
      <BulletSelectionPopup
        isOpen={activeFilter === "성별"}
        onClose={closeFilter}
        title="성별 선택"
        options={genderOptions}
        selectedOption={selectedGender}
        toggleOption={toggleGender}
      />
      <RangePopup
        isOpen={activeFilter === "출생년도"}
        onClose={closeFilter}
        title="출생년도 선택"
        initialStart={birthYearRange.start}
        initialEnd={birthYearRange.end}
        minValue={1996}
        maxValue={2005}
        step={1}
        formatLabel={(year) => `${year}년생`}
        formatDisplayItem={(year) => `${year.toString().slice(2)}년생`}
        onApply={handleBirthYearRangeChange}
      />
      <Popup
        isOpen={isFullScreenFilterOpen}
        onClose={closeFullScreenFilter}
        title="전체 필터 설정"
        fullScreen={true}
      >
        {/* 전체 필터 설정 내용 */}
        <FilterButton
          text="언어"
          icon={arrowDownIcon}
          onClick={() => openFilter("언어")}
        />
        <FilterButton
          text="국적"
          icon={arrowDownIcon}
          onClick={() => openFilter("국적")}
        />
        <FilterButton
          text="성별"
          icon={arrowDownIcon}
          onClick={() => openFilter("성별")}
        />
        <FilterButton
          text="출생년도"
          icon={arrowDownIcon}
          onClick={() => openFilter("출생년도")}
        />
      </Popup>
    </>
  );
};

const FilterWrapper = styled.div`
  padding: 10px 20px 16px 20px;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
  display: flex;
`;

export default FilterComponent;
