import styled from 'styled-components';
import { shade } from 'polished';

export const HeaderContainer = styled.div`
  width: 100%;
  height: 150px;
  background-color: #33c3c3;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeaderText = styled.h1`
  padding: 20px 0 0;
  size: 48px;
  color: #e8e8e8;
`;

export const HeaderLinkContainer = styled.div`
  width: 340px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderLinkButton = styled.button`
  background: #3333c3;
  width: 160px;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #e8e8e8;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;
  &:hover {
    background: ${shade(0.2, '#3333c3')};
  }
`;
