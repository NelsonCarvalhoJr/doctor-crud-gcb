import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import * as Yup from 'yup';

import { CreateDoctorContainer, CreateDoctorTitle, Form } from './styles';

import Header from '../../components/Header';
import Input from '../../components/Input';
import MultiSelect from '../../components/MultiSelect';
import Button from '../../components/Button';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

interface ISpeciality {
  id: number;
  name: string;
}

interface IAddressData {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

interface ISpecialitiesOptions {
  label: string;
  value: string;
}

interface IErrorsFormat {
  name?: string;
  crm?: string;
  telephone?: string;
  cell_phone?: string;
  postcode?: string;
  specialities?: string;
}

const CreateDoctor: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    crm: '',
    telephone: '',
    cell_phone: '',
    postcode: '',
    specialities: [] as string[],
  });

  const [errorsInFormData, setErrorsInFormData] = useState({
    name: '',
    crm: '',
    telephone: '',
    cell_phone: '',
    postcode: '',
    specialities: '',
  });

  const [addressData, setAddressData] = useState({
    address_1: '',
    address_2: '',
    city: '',
    uf: '',
  });

  const [specialitiesOptions, setSpecialitiesOptions] = useState<
    ISpecialitiesOptions[]
  >();

  const history = useHistory();

  useEffect(() => {
    api.get<ISpeciality[]>('/specialities').then(response => {
      const formattedSpecialities = response.data.map(speciality => ({
        label: speciality.name,
        value: (speciality.id as unknown) as string,
      }));

      setSpecialitiesOptions(formattedSpecialities);
    });
  }, []);

  useEffect(() => {
    setAddressData({
      address_1: '',
      address_2: '',
      city: '',
      uf: '',
    });

    if (formData.postcode && formData.postcode.indexOf('_') === -1) {
      axios
        .get<IAddressData>(
          `https://viacep.com.br/ws/${formData.postcode
            .split('-')
            .join('')}/json/`,
        )
        .then(response => {
          if (!response.data.uf) {
            alert('Endereço não encontrado');

            setFormData({ ...formData, postcode: '' });
          }

          const { logradouro, bairro, localidade, uf } = response.data;

          setAddressData({
            address_1: logradouro,
            address_2: bairro,
            city: localidade,
            uf,
          });
        });
    }
  }, [formData]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  function handleSelectSpeciality(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;

    if (formData.specialities.indexOf(value) < 0) {
      setFormData({
        ...formData,
        specialities: [...formData.specialities, value],
      });
    } else {
      const newSpecialities = formData.specialities
        .filter(specialityValue => specialityValue !== value)
        .map(specialityValue => specialityValue as string);

      setFormData({
        ...formData,
        specialities: newSpecialities,
      });
    }
  }

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();

    try {
      setErrorsInFormData({
        name: '',
        crm: '',
        telephone: '',
        cell_phone: '',
        postcode: '',
        specialities: '',
      });

      const schema = Yup.object().shape({
        name: Yup.string()
          .max(120, 'Nome deve ter no máximo 120 caracteres')
          .required('Nome é obrigatório'),
        crm: Yup.string().required('CRM é obrigatório'),
        telephone: Yup.string().required('Telefone é obrigatório'),
        cell_phone: Yup.string().required('Celular é obrigatório'),
        postcode: Yup.string().required('CEP é obrigatório'),
        specialities: Yup.array()
          .min(2, 'É necessário selecionar pelo menos duas especialidades')
          .required('Especialidade é obrigatório'),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      await api.post('/doctors', {
        ...formData,
        crm: Number(formData.crm.split('.').join('')),
      });

      history.push('/');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err) as IErrorsFormat;

        setErrorsInFormData({ ...errorsInFormData, ...errors });
      } else {
        alert(err.message);
      }
    }
  }

  return (
    <>
      <Header title="Cadastrar Médico" />

      <CreateDoctorContainer>
        <CreateDoctorTitle>Cadastrar um médico</CreateDoctorTitle>

        <Form onSubmit={handleSubmit}>
          <Input
            name="name"
            type="text"
            placeholder="Nome"
            value={formData.name}
            onChange={handleInputChange}
            error={errorsInFormData.name}
          />

          <Input
            name="crm"
            type="text"
            placeholder="CRM"
            mask="99.999.99"
            value={formData.crm}
            onChange={handleInputChange}
            error={errorsInFormData.crm}
          />

          <Input
            name="telephone"
            type="text"
            placeholder="Telefone"
            mask="(99) 9999-9999"
            value={formData.telephone}
            onChange={handleInputChange}
            error={errorsInFormData.telephone}
          />

          <Input
            name="cell_phone"
            type="text"
            placeholder="Celular"
            mask="(99) 99999-9999"
            value={formData.cell_phone}
            onChange={handleInputChange}
            error={errorsInFormData.cell_phone}
          />

          <Input
            name="postcode"
            type="text"
            placeholder="CEP"
            mask="99999-999"
            value={formData.postcode}
            onChange={handleInputChange}
            error={errorsInFormData.postcode}
          />

          <Input
            name="address_1"
            type="text"
            placeholder="Logradouro"
            readOnly
            value={addressData.address_1}
          />

          <Input
            name="address_2"
            type="text"
            placeholder="Bairro"
            readOnly
            value={addressData.address_2}
          />

          <Input
            name="city"
            type="text"
            placeholder="Cidade"
            readOnly
            value={addressData.city}
          />

          <Input
            name="uf"
            type="text"
            placeholder="UF"
            readOnly
            value={addressData.uf}
          />

          <MultiSelect
            name="specialities"
            options={
              specialitiesOptions || [
                { label: 'Nenhuma especialidade encontrada', value: '-1' },
              ]
            }
            value={formData.specialities}
            onChange={handleSelectSpeciality}
            error={errorsInFormData.specialities}
          />

          <Button type="submit">Cadastrar</Button>
        </Form>
      </CreateDoctorContainer>
    </>
  );
};

export default CreateDoctor;
