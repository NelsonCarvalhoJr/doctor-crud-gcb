interface ICreateDoctorDTO {
  name: string;
  crm: number;
  telephone: string;
  cell_phone: string;
  postcode: string;
  doctors_specialities: Array<{
    speciality_id: number;
  }>;
}

export default ICreateDoctorDTO;
