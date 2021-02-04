import styled from 'styled-components';

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

export const HeaderLinkContent = styled.div`
  width: 180px;
  padding: 0 5px;
`;
