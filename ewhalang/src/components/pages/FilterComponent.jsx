import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FilterButton from './FilterButton';
import Popup from './Popup';
import filterIcon from '../../assets/filter.svg';
import arrowDownIcon from '../../assets/filterArrowDown.svg';
import { LongButton, ButtonType } from '../common/LongButton';

const SelectIcon = ({ isSelected }) => (
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.3327 4L5.99935 11.3333L2.66602 8" stroke={isSelected ? "var(--sub1)" : "var(--grey1)"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  );

const AllSelectIcon = ({ isSelected }) => (
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.24935 10.0003L8.74935 12.5003L13.7493 7.50033M18.3327 10.0003C18.3327 14.6027 14.6017 18.3337 9.99935 18.3337C5.39698 18.3337 1.66602 14.6027 1.66602 10.0003C1.66602 5.39795 5.39698 1.66699 9.99935 1.66699C14.6017 1.66699 18.3327 5.39795 18.3327 10.0003Z" stroke={isSelected ? "var(--sub1)" : "var(--grey1)"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  );

const languages = ['한국어', '영어', '일본어', '중국어', '프랑스어', '스페인어'];

const FilterComponent = () => {
    const [activeFilter, setActiveFilter] = useState(null);
    const [isFullScreenFilterOpen, setIsFullScreenFilterOpen] = useState(false);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);

    useEffect(() => {
        setIsAllSelected(selectedLanguages.length === languages.length);
    }, [selectedLanguages]);
  
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
        setSelectedLanguages(prev => 
            prev.includes(language) 
                ? prev.filter(lang => lang !== language)
                : [...prev, language]
        );
    };
    const toggleAllLanguages = () => {
        if (isAllSelected) {
            setSelectedLanguages([]);
        } else {
            setSelectedLanguages([...languages]);
        }
    };
  
    return (
        <>
        <FilterWrapper>
            <FilterButton text="필터" icon={filterIcon} onClick={openFullScreenFilter} />
            <FilterButton text="언어" icon={arrowDownIcon} onClick={() => openFilter('언어')} />
            <FilterButton text="국적" icon={arrowDownIcon} onClick={() => openFilter('국적')} />
            <FilterButton text="성별" icon={arrowDownIcon} onClick={() => openFilter('성별')} />
            <FilterButton text="출생년도" icon={arrowDownIcon} onClick={() => openFilter('출생년도')} />
        </FilterWrapper>
        <Popup
                isOpen={activeFilter === '언어'}
                onClose={closeFilter}
                title="언어 선택"
                fullScreen={false}
            >
                <AllSelectWrapper onClick={toggleAllLanguages} isSelected={isAllSelected}>
                    <SelectIconWrapper>
                        <AllSelectIcon isSelected={isAllSelected}/>
                    </SelectIconWrapper>
                    <span>{isAllSelected ? "전체 선택 해제" : "전체 선택"}</span>
                </AllSelectWrapper>
                <LanguageList>
                    {languages.map((language) => (
                        <LanguageItem key={language} onClick={() => toggleLanguage(language)} isSelected={selectedLanguages.includes(language)}>
                        <SelectIconWrapper>
                            <SelectIcon isSelected={selectedLanguages.includes(language)}/>
                        </SelectIconWrapper>
                            <span>{language}</span>
                        </LanguageItem>
                    ))}
                </LanguageList>
                <ButtonWrapper>
                    <LongButton type={ButtonType.GREEN} onClick={closeFilter}>
                        선택 완료
                    </LongButton>
                </ButtonWrapper>
            </Popup>
  
        <Popup
          isOpen={isFullScreenFilterOpen}
          onClose={closeFullScreenFilter}
          title="전체 필터 설정"
          fullScreen={true}
        >
          {/* 전체 필터 설정 내용 */}
          <FilterButton text="언어" icon={arrowDownIcon} onClick={() => openFilter('언어')} />
          <FilterButton text="국적" icon={arrowDownIcon} onClick={() => openFilter('국적')} />
          <FilterButton text="성별" icon={arrowDownIcon} onClick={() => openFilter('성별')} />
          <FilterButton text="출생년도" icon={arrowDownIcon} onClick={() => openFilter('출생년도')} />
        </Popup>
        </>
    );
  };

const FilterWrapper = styled.div`
  padding: 10px 20px;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
  display: flex;
`;

const AllSelectWrapper = styled.div`
    display: flex;
    align-items: center;
    color: var(--grey1);
    margin: 20px 0;
    cursor: pointer;
    color: ${props => props.isSelected ? 'var(--sub1)' : 'var(--grey1)'};


    img {
        width: 20px;
        height: 20px;
        margin-right: 8px;
    }
`;

const LanguageList = styled.div`
    margin-bottom: 20px;
`;

const LanguageItem = styled.div`
    display: flex;
    align-items: center;
    height: 48px;
    cursor: pointer;
    color: ${props => props.isSelected ? 'var(--sub1)' : 'var(--grey1)'};
    background-color: ${props => props.isSelected ? 'var(--sub3)' : ''};
    &:not(:last-child) {
        border-bottom: 1px solid var(--grey4);
    }
`;

const ButtonWrapper = styled.div`
    position: sticky;
    bottom: 0;
    background-color: white;
    padding: 20px 0;
`;

const SelectIconWrapper = styled.div`
    width: 20px;
    height: 20px;
    margin-left: 24px;
    margin-right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default FilterComponent;