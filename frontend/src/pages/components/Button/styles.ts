import styled from 'styled-components';
import { shade } from 'polished';

export const ButtonContainer = styled.button`
  background: #3333c3;
  width: 100%;
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
