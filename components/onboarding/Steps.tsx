import React, { ReactNode } from 'react';
import styled from 'styled-components';

type StepProps = {
  label: string;
  active: boolean;
  index: number;
  onClick: () => void;
};

type StepsProps = {
  children: ReactNode;
};

const StepsWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const StepItem = styled.div<{ $active: boolean; $first: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  position: relative;
  padding: 18px;
  padding-left: ${({ $first }) => ($first ? '18px' : '45px')};
  background: ${({ $active }) =>
    $active ? 'linear-gradient(90deg, #2782dc, #14c8c8)' : '#E8F3FF'};
  color: white;
  height: 72px;
  user-select: none;

  & > .square-before {
    content: '';
    position: absolute;
    top: 18px;
    left: -19px;
    background: white;
    z-index: 1;
  }

  & > .square-before:after {
    content: '';
    position: absolute;
    width: 72px;
    height: 36px;
    background: white;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    transform: rotate(90deg);
  }

  & > .square-after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    right: 19px;
    top: 18px;
    z-index: 2;
  }

  & > .square-after:after {
    content: '';
    position: absolute;
    width: 72px;
    height: 36px;
    background: ${({ $active }) =>
      $active ? 'linear-gradient(0deg, #14c8c8, #10dcc3)' : '#E8F3FF'};
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    transform: rotate(90deg);
  }

  & > .step-number {
    font-size: 37px;
    line-height: 24px;
    color: ${({ $active }) => ($active ? '#FFFFFF' : '#297CDE')};
  }

  & > .step-label {
    font-size: 20px;
    line-height: 20px;
    width: 100%;
    text-align: center;
    color: ${({ $active }) => ($active ? '#FFFFFF' : '#2A78DF')};
  }
`;

//
const Step: React.FC<StepProps> = ({ label, active, index }) => {
  return (
    <StepItem $active={active} $first={index === 1}>
      {index !== 0 && <div className={'square-before'}></div>}
      <div className={'step-label'}>{label}</div>
      {index !== 2 && <div className={'square-after'}></div>}
    </StepItem>
  );
};

//
const Steps: React.FC<StepsProps> = (props) => {
  const { children } = props;
  return <StepsWrapper>{children}</StepsWrapper>;
};

//
export { Steps, Step };
