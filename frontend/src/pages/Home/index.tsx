import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';

import api from '../../services/api';

import {
  HomeContainer,
  HomeTitle,
  DoctorsTable,
  DoctorsTableHead,
  DoctorsTableBody,
  DoctorsTableFoot,
} from './styles';

interface IDoctor {
  id: number;
  name: string;
  crm: number;
  telephone: string;
  cell_phone: string;
  postcode: string;
  doctors_specialities: Array<{
    speciality: {
      name: string;
    };
  }>;
}

const Home: React.FC = () => {
  const [doctors, setDoctors] = useState<IDoctor[]>([] as IDoctor[]);

  useEffect(() => {
    api.get<IDoctor[]>(`/doctors`).then(response => {
      const doctorsData = response.data;

      if (doctorsData) {
        setDoctors(doctorsData);
      }
    });
  }, []);

  async function handleDeleteDoctor(id: number): Promise<void> {
    await api.delete(`/doctors/${id}`);

    const updatedDoctors = doctors.filter(doctor => doctor.id === id);

    setDoctors(updatedDoctors);
  }

  return (
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
              <th>Especialidades</th>
              <th>Ações</th>
            </tr>
          </DoctorsTableHead>

          <DoctorsTableBody>
            {doctors &&
              doctors.map(doctor => (
                <tr key={doctor.id}>
                  <td>{doctor.id}</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.crm}</td>
                  <td>{doctor.telephone}</td>
                  <td>{doctor.cell_phone}</td>
                  <td>{doctor.postcode}</td>
                  <td>
                    {doctor.doctors_specialities.map(
                      doctorSpeciality =>
                        `${doctorSpeciality.speciality.name} | `,
                    )}
                  </td>
                  <td>
                    <Link to={`update/${doctor.id}`}>Editar</Link> |{' '}
                    <a href="" onClick={() => handleDeleteDoctor(doctor.id)}>
                      Excluir
                    </a>
                  </td>
                </tr>
              ))}
          </DoctorsTableBody>

          <DoctorsTableFoot>
            <tr>
              <td>Total</td>
              <td colSpan={7}>{doctors ? doctors.length : 0}</td>
            </tr>
          </DoctorsTableFoot>
        </DoctorsTable>
      </HomeContainer>
    </>
  );
};

export default Home;
