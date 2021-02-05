import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isErrored?: boolean;
}

export const InputContainer = styled.div<ContainerProps>`
  background: #e8e8e8;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #333;
  color: #333;
  & + div {
    margin-top: 8px;
  }
  ${props =>
    props.isErrored &&
    css`
      border: 2px solid #c53030;
    `}
  ${props =>
    props.isFocused &&
    css`
      border: 2px solid #3333c3;
    `}
  select {
    width: 100%;
    flex: 1;
    background: transparent;
    border: 0;
    color: #333;
    &::placeholder {
      color: #666360;
    }
  }
`;

export const Error = styled.span`
  color: #c53030;
`;
