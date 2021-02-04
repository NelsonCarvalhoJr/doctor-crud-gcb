import React, { FormEvent } from 'react';

import Header from '../components/Header';

import { UpdateDoctorContainer, UpdateDoctorTitle } from './styles';

import Input from '../components/Input';
import MultiSelect from '../components/MultiSelect';
import Button from '../components/Button';

const UpdateDoctor: React.FC = () => {
  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    console.log('mandou');
  }

  return (
    <>
      <Header title="Atualizar Médico" />

      <UpdateDoctorContainer>
        <UpdateDoctorTitle>Atualizar um médico</UpdateDoctorTitle>

        <form onSubmit={handleSubmit}>
          <Input name="name" type="text" placeholder="Nome" />

          <Input name="crm" type="text" placeholder="CRM" mask="99.999.99" />

          <Input
            name="telephone"
            type="text"
            placeholder="Telefone"
            mask="(99) 9999-9999"
          />

          <Input
            name="cell_phone"
            type="text"
            placeholder="Celular"
            mask="(99) 99999-9999"
          />

          <Input
            name="postcode"
            type="text"
            placeholder="CEP"
            mask="99999-999"
          />

          <MultiSelect
            name="specialities"
            options={[
              { label: 'Speciality 1', value: 1 },
              { label: 'Speciality 2', value: 2 },
              { label: 'Speciality 3', value: 3 },
              { label: 'Speciality 4', value: 4 },
            ]}
          />

          <Button type="submit">Cadastrar</Button>
        </form>
      </UpdateDoctorContainer>
    </>
  );
};

export default UpdateDoctor;
