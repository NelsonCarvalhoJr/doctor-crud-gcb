import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../componets/Header';

import {
  HomeContainer,
  HomeTitle,
  DoctorsTable,
  DoctorsTableHead,
  DoctorsTableBody,
  DoctorsTableFoot,
} from './styles';

const Home: React.FC = () => (
  <>
    <Header title="Home" />
    <HomeContainer>
      <HomeTitle>Listagem de Médicos</HomeTitle>

      <DoctorsTable>
        <DoctorsTableHead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CRM</th>
            <th>Telefone</th>
            <th>Celular</th>
            <th>CEP</th>
            <th>Ações</th>
          </tr>
        </DoctorsTableHead>

        <DoctorsTableBody>
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>12.345.67</td>
            <td>(12) 3456-7890</td>
            <td>(12) 93456-7890</td>
            <td>12345-678</td>
            <td>
              <Link to="update/1">Editar</Link> | <a href="">Excluir</a>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>John Doe</td>
            <td>12.345.67</td>
            <td>(12) 3456-7890</td>
            <td>(12) 93456-7890</td>
            <td>12345-678</td>
            <td>
              <Link to="update/2">Editar</Link> | <a href="">Excluir</a>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>John Doe</td>
            <td>12.345.67</td>
            <td>(12) 3456-7890</td>
            <td>(12) 93456-7890</td>
            <td>12345-678</td>
            <td>
              <Link to="update/3">Editar</Link> | <a href="">Excluir</a>
            </td>
          </tr>
        </DoctorsTableBody>

        <DoctorsTableFoot>
          <tr>
            <td>Total</td>
            <td colSpan={6}>3</td>
          </tr>
        </DoctorsTableFoot>
      </DoctorsTable>
    </HomeContainer>
  </>
);

export default Home;
