import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FilterButton from "./FilterButton";
import SelectionPopup from "./SelectionPopup";
import BulletSelectionPopup from "./BulletSelectionPopup";
import RangePopup from "./RangePopup";
import Popup from "./Popup";
import filterIcon from "../../assets/filter.svg";
import arrowDownIcon from "../../assets/filterArrowDown.svg";
import arrowRightIcon from "../../assets/filterArrowRight.svg";
import resetIcon from "../../assets/reset.svg";
import { LongButton } from "../common/LongButton";
import { useTranslation } from "react-i18next";

const languages = [
  '한국어', '영어', '일본어', '중국어', '프랑스어', '스페인어',
  '독일어', '이탈리아어', '러시아어', '포르투갈어', '아랍어',
  '힌디어', '베트남어', '태국어', '터키어', '폴란드어',
  '네덜란드어', '스웨덴어', '그리스어', '체코어', '헝가리어',
  '핀란드어', '덴마크어', '노르웨이어', '히브리어'
];

const countries = [
  '대한민국', '미국', '일본', '중국', '프랑스', '스페인',
  '영국', '독일', '이탈리아', '캐나다', '호주', '인도',
  '브라질', '멕시코', '남아프리카 공화국', '러시아', '네덜란드',
  '스웨덴', '스위스', '벨기에', '오스트리아'
];

const FilterComponent = ({ onFilterChange, initialFilterCriteria }) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [isFullScreenFilterOpen, setIsFullScreenFilterOpen] = useState(false);
  const [isFullScreenSubFilter, setIsFullScreenSubFilter] = useState(false);
  const [currentFilters, setCurrentFilters] = useState(initialFilterCriteria);
  const [appliedFilters, setAppliedFilters] = useState(initialFilterCriteria);
  const { i18n, t } = useTranslation();

  const genderOptions = [t("filters.all"), t('filters.female'), t('filters.male')];


  const [countrySearchTerm, setCountrySearchTerm] = useState('');


  useEffect(() => {
    if (activeFilter !== null || isFullScreenFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeFilter, isFullScreenFilterOpen]);

  useEffect(() => {
    setIsFullScreenSubFilter(isFullScreenFilterOpen);
  }, [isFullScreenFilterOpen]);

  useEffect(() => {
    onFilterChange(appliedFilters);
  }, [appliedFilters]);

  const openFilter = (filter) => {
    setActiveFilter(filter);
    if(!isFullScreenSubFilter){
      setCurrentFilters(appliedFilters);
    }
  };

  const closeFilter = () => {
    setActiveFilter(null);
  };

  const openFullScreenFilter = () => {
    setCurrentFilters(appliedFilters);
    setIsFullScreenFilterOpen(true);
  };

  const closeFullScreenFilter = () => {
    setIsFullScreenFilterOpen(false);
    setCurrentFilters(appliedFilters);
  };

  const toggleLanguage = (language) => {
    setCurrentFilters((prev) => ({
      ...prev,
      languages: prev.languages.includes(language)

        ? prev.languages.filter(lang => lang !== language)
        : [...prev.languages, language]

    }));
  };

  const toggleCountry = (country) => {
    setCurrentFilters(prev => ({
      ...prev,
      countries: prev.countries.includes(country)
        ? prev.countries.filter(c => c !== country)
        : [...prev.countries, country]
    }));
  };

  const toggleGender = (gender) => {
    setCurrentFilters((prev) => ({...prev, gender: gender === prev.gender ? t("filters.all") : gender}));
  };

  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(countrySearchTerm.toLowerCase())
  );

  const getFormattedText = (items) => {
    if (items.length === 0) return null;
    if (items.length === 1) return items[0];
    return t('filters.andMore', { count: items.length - 1, item: items[0] });
  };

  const getCurrentLanguagesText = () => getFormattedText(currentFilters.languages);
  const getCurrentCountriesText = () => getFormattedText(currentFilters.countries);

  const getCurrentGenderText = () =>
    currentFilters.gender !== t('filters.all') ? currentFilters.gender : null;

  const getCurrentBirthdateRangeText = () => {
    const { start, end } = currentFilters.birthdateRange;
    if (start !== 1996 || end !== 2005) {
      return `${start} - ${end}`;
    }
    return null;
  };

  const getAppliedLanguagesText = () => getFormattedText(appliedFilters.languages);
  const getAppliedCountriesText = () => getFormattedText(appliedFilters.countries);

  const getAppliedGenderText = () =>
    appliedFilters.gender !== t("filters.all") ? appliedFilters.gender : null;

  const getAppliedBirthdateRangeText = () => {
    const { start, end } = appliedFilters.birthdateRange;
    if (start !== 1996 || end !== 2005) {
      return `${start} - ${end}`;
    }
    return null;
  };

  const resetFilters = () => {
    const resetFilters = {
      languages: [],
      countries: [],

      gender: t("filters.all"),
      birthdateRange: { start: 1996, end: 2005 },
    };
    setCurrentFilters(resetFilters);
    if (!isFullScreenFilterOpen) {
      setAppliedFilters(resetFilters);
      onFilterChange(resetFilters);
    }
  };

  const handleFilterApply = (filterType, newValue) => {
    setCurrentFilters((prev) => ({ ...prev, [filterType]: newValue }));
    if (!isFullScreenFilterOpen) {
      setAppliedFilters(prev => ({ ...prev, [filterType]: newValue }));
      onFilterChange({ ...appliedFilters, [filterType]: newValue });
    }
    closeFilter();
  };

  const applyFilters = () => {
    setAppliedFilters(currentFilters);
    closeFullScreenFilter();
  };

  return (
    <>
      <FilterWrapper>
        <FilterButton
          icon={filterIcon}
          text={t("filters.filter")}
          onClick={openFullScreenFilter}
        />
        <FilterButton
          icon={arrowDownIcon}
          text={t("filters.lang")}

          onClick={() => openFilter('언어')}

          selectedText={getAppliedLanguagesText()}
        />
        <FilterButton
          icon={arrowDownIcon}
          text={t("filters.country")}
          onClick={() => openFilter('국적')}
          selectedText={getAppliedCountriesText()}
        />
        <FilterButton
          icon={arrowDownIcon}
          text={t("filters.gender")}

          onClick={() => openFilter('성별')}

          selectedText={getAppliedGenderText()}
        />
        <FilterButton
          icon={arrowDownIcon}
          text={t("filters.birthdate")}

          onClick={() => openFilter('출생년도')}

          selectedText={getAppliedBirthdateRangeText()}
        />
      </FilterWrapper>

      <SelectionPopup
        isOpen={activeFilter === '언어'}
        onClose={closeFilter}
        title={t("filters.lang")}
        items={languages}
        selectedItems={currentFilters.languages}
        toggleItem={toggleLanguage}
        onApply={(selectedLanguages) => handleFilterApply('languages', selectedLanguages)}
        onReset={() => setCurrentFilters(prev => ({ ...prev, languages: [] }))}
        fullScreen={isFullScreenSubFilter}
      />

      <SelectionPopup
        isOpen={activeFilter === '국적'}
        onClose={closeFilter}
        title={t("filters.country")}
        items={filteredCountries}
        selectedItems={currentFilters.countries}
        toggleItem={toggleCountry}
        searchTerm={countrySearchTerm}
        setSearchTerm={setCountrySearchTerm}
        showSearch={true}
        onApply={(selectedCountries) => handleFilterApply('countries', selectedCountries)}
        onReset={() => setCurrentFilters(prev => ({ ...prev, countries: [] }))}
        fullScreen={isFullScreenSubFilter}
      />

      <BulletSelectionPopup
        isOpen={activeFilter === '성별'}
        onClose={closeFilter}
        title={t("filters.gender")}
        options={genderOptions}
        selectedOption={currentFilters.gender}
        toggleOption={toggleGender}
        onApply={(selectedGen) => handleFilterApply('gender', selectedGen)}
        fullScreen={isFullScreenSubFilter}
      />

      <RangePopup
        isOpen={activeFilter === '출생년도'}
        onClose={closeFilter}
        title={t("filters.birthdate")}
        minValue={1996}
        maxValue={2005}
        step={1}
        formatLabel={(year) => {
          return i18n.language === 'ko' 
            ? `${year}년생`
            : `${year}`;
        }}
        formatDisplayItem={(year) => {
          return i18n.language === 'ko'
            ? `${year.toString().slice(2)}년생`
            : `${year}`;
        }}
        onApply={(start, end) =>
          handleFilterApply("birthdateRange", { start, end })
        }
        fullScreen={isFullScreenSubFilter}
        birthdateRange={currentFilters.birthdateRange}
      />


      <Popup isOpen={isFullScreenFilterOpen} onClose={closeFullScreenFilter} title={t("pageTitles.filter")} fullScreen={true}>
        <FilterButton
          icon={arrowRightIcon}
          text={t("filters.lang")}
          onClick={() => openFilter('언어')}
          isAllScreen={true}
          selectedText={getCurrentLanguagesText()}
        />
        <FilterButton
          icon={arrowRightIcon}
          text={t("filters.country")}
          onClick={() => openFilter('국적')}
          isAllScreen={true}
          selectedText={getCurrentCountriesText()}
        />
        <FilterButton
          icon={arrowRightIcon}
          text={t("filters.gender")}
          onClick={() => openFilter('성별')}
          isAllScreen={true}
          selectedText={getCurrentGenderText()}
        />
        <FilterButton
          icon={arrowRightIcon}
          text={t("filters.birthdate")}
          onClick={() => openFilter('출생년도')}
          isAllScreen={true}
          selectedText={getCurrentBirthdateRangeText()}
        />
        <AllScreenButtonWrapper>
          <ResetButton onClick={resetFilters}>
            <img src={resetIcon} alt="Reset" />
            <span>{t("filters.reset")}</span>
          </ResetButton>
          <LongButton onClick={applyFilters}>
            {t("filters.apply")}
          </LongButton>
        </AllScreenButtonWrapper>
      </Popup>
    </>
  );
};

const FilterWrapper = styled.div`
  padding: 10px 20px 16px 20px;
  overflow-x: hidden;
  white-space: nowrap;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const ResetButton = styled.button`
  min-width: 45px;
  min-height: 45px;
  border: 0.5px solid var(--grey3);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
  img {
    width: 16px;
    height: 16px;
  }
  span {
    padding-top: 2px;
    font-size: 11px;
    width: 29px;
  }
`;

const AllScreenButtonWrapper = styled.div`
  position: fixed;
  bottom: 32px;
  display: flex;
  width: calc(100vw - 48px);
  gap: 10px;
`;

export default FilterComponent;
