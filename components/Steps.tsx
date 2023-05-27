import React, { ReactNode } from 'react';
import styled from 'styled-components';

type StepProps = {
  label: string;
  active: boolean;
  key: number;
  onClick: () => void;
};

type StepsProps = {
  children: ReactNode;
};

type StepItemProps = {
  active: boolean;
}

const StepsWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const StepItem = styled.div<StepItemProps>`
  flex: 1;
  color: #ffffff;
  background-color: ${(props) => (props.active ? '#36AFF9' : '#D0D5DD')};
  height: 38px;
  line-height: 38px;
  padding-left: 16px;
  font-size: 18px;
  font-weight: 700;
`;

const Step: React.FC<StepProps> = (props) => {
  const { label, active, key } = props;
  return (
    <StepItem
      active={active}
      key={key}
    >
      {label}
    </StepItem>
  );
};

const Steps: React.FC<StepsProps> = (props) => {
  const { children } = props;
  return (
    <StepsWrapper>
      {children}
    </StepsWrapper>
  );
};

export { Steps, Step}; 