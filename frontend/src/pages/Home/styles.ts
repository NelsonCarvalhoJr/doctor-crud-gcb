import styled from 'styled-components';
import { shade } from 'polished';

export const HomeContainer = styled.div`
  width: 100%;
  padding: 20px 10px;
  background-color: #e8e8e8;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HomeTitle = styled.h2`
  size: 24px;
  color: #333;
`;

export const DoctorsTable = styled.table`
  border: 1px solid #333;
`;

export const DoctorsTableHead = styled.thead`
  background-color: #333;
  color: #e8e8e8;
  text-align: center;
  td {
    padding: 0 15px;
  }
`;

export const DoctorsTableBody = styled.tbody`
  color: #333;
  text-align: center;
  td {
    padding: 0 15px;
    border: 1px solid #333;
  }
`;

export const DoctorsTableFoot = styled.tfoot`
  background-color: #333;
  color: #e8e8e8;
  text-align: left;
  td {
    padding: 0 15px;
  }
`;

export const FilterContainer = styled.div`
  background: #333;
  width: 100%;
  padding: 5px 20px;
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const FilterContent = styled.div`
  background: #333;
  width: 100%;
  padding: 10px 10px;

  input {
    width: 100%;
    height: 30px;
    border-radius: 10px;
    padding: 5px;
    background: #e8e8e8;
    border: 0;
    color: #333;
    &::placeholder {
      color: #666360;
    }
  }

  button {
    background: #3333c3;
    width: 100%;
    height: 30px;
    border-radius: 10px;
    border: 0;
    padding: 0 16px;
    color: #e8e8e8;
    font-weight: 500;
    transition: background-color 0.2s;
    &:hover {
      background: ${shade(0.2, '#3333c3')};
    }
  }
`;
