import styled from 'styled-components';

export const HomeContainer = styled.div`
  width: 100%;
  background-color: #e8e8e8;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HomeTitle = styled.h2`
  padding: 20px 0 0;
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
