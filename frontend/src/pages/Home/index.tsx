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
  FilterContainer,
  FilterContent,
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
  const [name, setName] = useState('');
  const [crm, setCrm] = useState('');
  const [telephone, setTelephone] = useState('');
  const [cell_phone, setCellPhone] = useState('');
  const [postcode, setPostcode] = useState('');

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

  function handleClearFields(): void {
    setName('');
    setCrm('');
    setTelephone('');
    setCellPhone('');
    setPostcode('');
  }

  async function handleFilterData(): Promise<void> {
    const filterData = {
      name,
      telephone,
      cell_phone,
      postcode,
    };

    if (crm) {
      Object.assign(filterData, { crm });
    }

    const response = await api.get<IDoctor[]>(`/doctors`, {
      params: filterData,
    });
    const doctorsData = response.data;

    if (doctorsData) {
      setDoctors(doctorsData);
    } else {
      setDoctors([] as IDoctor[]);
    }
  }

  return (
    <>
      <Header title="Home" />
      <HomeContainer>
        <HomeTitle>Listagem de Médicos</HomeTitle>

        <FilterContainer>
          <FilterContent>
            <input
              name="name"
              type="text"
              placeholder="Nome"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </FilterContent>
          <FilterContent>
            <input
              name="crm"
              type="text"
              placeholder="CRM"
              value={crm}
              onChange={e => setCrm(e.target.value)}
            />
          </FilterContent>
          <FilterContent>
            <input
              name="telephone"
              type="text"
              placeholder="Telefone"
              value={telephone}
              onChange={e => setTelephone(e.target.value)}
            />
          </FilterContent>
          <FilterContent>
            <input
              name="cell_phone"
              type="text"
              placeholder="Celular"
              value={cell_phone}
              onChange={e => setCellPhone(e.target.value)}
            />
          </FilterContent>
          <FilterContent>
            <input
              name="postcode"
              type="text"
              placeholder="CEP"
              value={postcode}
              onChange={e => setPostcode(e.target.value)}
            />
          </FilterContent>
          <FilterContent>
            <button type="button" onClick={handleFilterData}>
              Filtrar
            </button>
          </FilterContent>
          <FilterContent>
            <button type="button" onClick={handleClearFields}>
              Limpar
            </button>
          </FilterContent>
        </FilterContainer>

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
            {doctors.length ? (
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
                        `${doctorSpeciality.speciality.name}${'\n'}`,
                    )}
                  </td>
                  <td>
                    <Link to={`update/${doctor.id}`}>Editar</Link>
                    {'\n'}
                    <a href="" onClick={() => handleDeleteDoctor(doctor.id)}>
                      Excluir
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8}>Nenhum dado encontrado</td>
              </tr>
            )}
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
