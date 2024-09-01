import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const UserRequiredInformation = ({ gender, birthdate, major, languages, layout = 'detail' }) => {
  const { t } = useTranslation();

  const formatLanguages = (languages) => {
    return languages.map(lang => ({ language: t(`language.${lang.language}`), level: lang.proficiency }));
  };

  const requiredInfo = [
    { label: t('userInfo.gender'), value: t(`gender.${gender}`) },
    { label: t('userInfo.birth'), value: birthdate },
    { label: t('userInfo.major'), value: major },
    { label: t('userInfo.languages'), value: formatLanguages(languages), isLanguage: true },
  ];

  const nonLanguageInfo = requiredInfo.filter(info => !info.isLanguage);
  const languageInfo = requiredInfo.filter(info => info.isLanguage);

  return (
    <InformationSection layout={layout}>
      <NonLanguageWrapper layout={layout}>
        {nonLanguageInfo.map((info, index) => (
          <InfoItemWrapper key={index} layout={layout}>
            {index > 0 && layout === 'list' && <Separator>|</Separator>}
            <InfoItem label={info.label} value={info.value} layout={layout} />
          </InfoItemWrapper>
        ))}
      </NonLanguageWrapper>
      <LanguageWrapper layout={layout}>
        {languageInfo.map((info, index) => (
          <InfoItemWrapper key={index} layout={layout}>
            <InfoItem label={info.label} value={info.value} layout={layout} isLanguage />
          </InfoItemWrapper>
        ))}
      </LanguageWrapper>
    </InformationSection>
  );
};

const InfoItem = ({ label, value, layout, isLanguage }) => {
  if (layout === 'list' && isLanguage) {
    return (
      <LanguageList>
        {value.map((lang, index) => (
          <LanguageTag key={index} level={lang.level}>
            {lang.language}
          </LanguageTag>
        ))}
      </LanguageList>
    );
  }

  return (
    <Item layout={layout} isLanguage={isLanguage}>
      {layout === 'detail' && <Label>{label}</Label>}
      {isLanguage ? (
        <LanguageValue layout={layout}>
          {value.map((lang, index) => (
            <div key={index}>{`${lang.language}: ${lang.level}`}</div>
          ))}
        </LanguageValue>
      ) : (
        <Value layout={layout}>{value}</Value>
      )}
    </Item>
  );
};

const InformationSection = styled.div`
  margin: ${({ layout }) => (layout === 'list' ? '0' : '0 24px 20px')};
  display: ${({ layout }) => (layout === 'list' ? 'block' : 'flex')};
  flex-wrap: wrap;
  gap: ${({ layout }) => (layout === 'list' ? '5px' : '0')};
  align-items: flex-start;
  justify-content: ${({ layout }) => (layout === 'list' ? 'center' : 'space-between')};
  flex-direction: ${({ layout }) => (layout === 'list' ? '' : 'column')};
`;

const NonLanguageWrapper = styled.div`
  display: ${({ layout }) => (layout === 'list' ? 'flex' : 'block')};
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`;

const LanguageWrapper = styled.div`
  display: ${({ layout }) => (layout === 'list' ? 'flex' : 'block')};
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 5px;
  width: 100%;
`;

const InfoItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Item = styled.div`
  display: flex;
  justify-content: ${({ layout }) => layout === 'list' ? 'flex-start' : 'space-between'};
  align-items: ${({ layout, isLanguage }) => 
    layout === 'list' ? 'center' : (isLanguage ? 'flex-start' : 'center')
  };
  margin-bottom: ${({ layout, isLanguage }) => (layout === 'list' ? '0' : (isLanguage? '0' : '16px'))};
  min-height: 24px;
  width: 100%;
`;

const Label = styled.span`
  font-weight: 600;
  flex-shrink: 0;
  text-align: ${({ layout }) => layout === 'list' ? 'left' : 'left'};
`;

const Value = styled.span`
  color: ${({ layout }) => (layout === 'list' ? 'var(--grey2)' : 'var(--grey1)')};
  text-align: ${({ layout }) => layout === 'list' ? 'left' : 'right'};
  font-size: ${({ layout }) => (layout === 'list' ? '11px' : 'inherit')};
  ${({ layout }) => layout !== 'list' && 'margin-left: auto;'}
`;

const LanguageValue = styled(Value)`
  color: var(--sub1);
  white-space: pre-line;

  & > div {
    margin-top: 8px;
    text-align: ${({ layout }) => layout === 'list' ? 'left' : 'right'};

    &:first-child {
      margin-top: 0;
    }
  }
`;

const LanguageList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  width: 100%;
`;

const LanguageTag = styled.span`
  display: inline-block;
  height: 21px;
  border-radius: 5px;
  background-color: ${({ level }) => {
    switch (level) {
      case '원어민 (Native)':
        return '#40C79A';
      case '상급 (Advanced)':
        return '#86E8C7';
      case '중급 (Intermediate)':
        return 'var(--sub2)';
      default:
        return 'var(--sub3)';
    }
  }};
  color: var(--main);
  padding: 0 4px;
  line-height: 21px;
  white-space: nowrap;
  font-size: 11px;
`;

const Separator = styled.span`
  color: var(--grey3);
  font-size: 11px;
  margin: 0 0.25em;
`;

export default UserRequiredInformation;