import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Range, getTrackBackground } from 'react-range';
import Popup from './Popup';
import { LongButton, ButtonType } from '../common/LongButton';

const RangePopup = ({ 
  isOpen, 
  onClose, 
  title,
  minValue,
  maxValue,
  step,
  formatLabel,
  formatDisplayItem,
  onApply,
  fullScreen,
  birthdateRange
}) => {
  const [values, setValues] = React.useState([birthdateRange.start, birthdateRange.end]);

  useEffect(() => {
    setValues([birthdateRange.start, birthdateRange.end]);
  }, [birthdateRange]);

  const handleApply = () => {
    onApply(values[0], values[1]);
    onClose();
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} title={title} fullScreen={fullScreen}>
      <RangeWrapper>
        <Range
          values={values}
          step={step}
          min={minValue}
          max={maxValue}
          onChange={(values) => setValues(values)}
          renderTrack={({ props, children }) => (
            <Track {...props}>
              <TrackBackground
                style={{
                  background: getTrackBackground({
                    values,
                    colors: ['#D9D9D9', 'var(--sub1)', '#D9D9D9'],
                    min: minValue,
                    max: maxValue
                  })
                }}
              />
              {children}
            </Track>
          )}
          renderThumb={({ props }) => (
            <Thumb {...props}>
              <InnerThumb />
            </Thumb>
          )}
        />
        <RangeLabels>
          <span>{formatLabel(values[0])}</span>
          <span>{formatLabel(values[1])}</span>
        </RangeLabels>
      </RangeWrapper>
      <ItemDisplay>
        {Array.from({length: (Math.max(...values) - Math.min(...values)) / step + 1}, (_, i) => Math.max(...values) - i * step).map(value => (
          <Item key={value}>{formatDisplayItem(value)}</Item>
        ))}
      </ItemDisplay>
      <ButtonWrapper>
        <LongButton type={ButtonType.GREEN} onClick={handleApply}>
          선택 완료
        </LongButton>
      </ButtonWrapper>
    </Popup>
  );
};

const RangeWrapper = styled.div`
  margin-bottom: 20px;
  padding: 30px;
`;

const Track = styled.div`
  height: 36px;
  display: flex;
  width: 100%;
`;

const TrackBackground = styled.div`
  height: 5px;
  width: 100%;
  border-radius: 4px;
  align-self: center;
`;

const Thumb = styled.div`
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background-color: var(--sub1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerThumb = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background-color: white;
`;

const RangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const ItemDisplay = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 70px;
`;

const Item = styled.div`
  background-color: var(--sub3);
  color: var(--sub1);
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  width: calc(100% - 48px);
  bottom: 0;
  background-color: white;
  padding: 20px 0;
`;

export default RangePopup;
