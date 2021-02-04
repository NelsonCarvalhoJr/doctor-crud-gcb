import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

import * as Yup from 'yup';

import { UpdateDoctorContainer, UpdateDoctorTitle } from './styles';

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

interface IDoctor {
  name: string;
  crm: number;
  telephone: string;
  cell_phone: string;
  postcode: string;
  doctors_specialities: Array<{
    speciality: {
      id: number;
    };
  }>;
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

const UpdateDoctor: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState({
    name: '',
    crm: '',
    telephone: '',
    cell_phone: '',
    postcode: '',
    specialities: [] as string[],
  });

  const [currentSpecialities, setCurrentSpecialities] = useState<string[]>([]);

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
    api.get<IDoctor>(`/doctors/${id}`).then(response => {
      const doctorData = response.data;

      if (doctorData) {
        setFormData({
          name: doctorData.name,
          crm: (doctorData.crm as unknown) as string,
          telephone: doctorData.telephone,
          cell_phone: doctorData.cell_phone,
          postcode: doctorData.postcode,
          specialities: doctorData.doctors_specialities.map(
            doctorSpeciality =>
              (doctorSpeciality.speciality.id as unknown) as string,
          ),
        });

        setCurrentSpecialities(
          doctorData.doctors_specialities.map(
            doctorSpeciality =>
              (doctorSpeciality.speciality.id as unknown) as string,
          ),
        );
      }
    });
  }, [id]);

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
        .filter(specialityValue => Number(specialityValue) !== Number(value))
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

      const updateData = {
        name: formData.name,
        crm: formData.crm,
        telephone: formData.telephone,
        cell_phone: formData.cell_phone,
        postcode: formData.postcode,
      };

      await api.put(`/doctors/${id}`, {
        ...updateData,
        crm: isNaN(Number(updateData.crm))
          ? Number(updateData.crm.split('.').join(''))
          : updateData.crm,
      });

      const removedSpeciality = currentSpecialities.filter(
        speciality =>
          formData.specialities.findIndex(
            findSpeciality => findSpeciality === speciality,
          ) < 0,
      );

      const addedSpeciality = formData.specialities.filter(
        speciality =>
          currentSpecialities.findIndex(
            findSpeciality => findSpeciality === speciality,
          ) < 0,
      );

      if (addedSpeciality.length) {
        await api.put(`/doctors/${id}/add`, {
          speciality_ids: addedSpeciality,
        });
      }

      if (removedSpeciality.length) {
        await api.put(`/doctors/${id}/remove`, {
          speciality_ids: removedSpeciality,
        });
      }

      history.replace('/', null);
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
      <Header title="Editar Médico" />

      <UpdateDoctorContainer>
        <UpdateDoctorTitle>Editar um médico</UpdateDoctorTitle>

        <form onSubmit={handleSubmit}>
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

          <Button type="submit">Editar</Button>
        </form>
      </UpdateDoctorContainer>
    </>
  );
};

export default UpdateDoctor;
