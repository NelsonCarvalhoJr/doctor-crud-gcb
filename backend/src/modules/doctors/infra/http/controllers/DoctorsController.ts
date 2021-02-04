import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllDoctorsService from '@modules/doctors/services/ListAllDoctorsService';
import ShowDoctorService from '@modules/doctors/services/ShowDoctorService';
import CreateDoctorService from '@modules/doctors/services/CreateDoctorService';
import UpdateDoctorService from '@modules/doctors/services/UpdateDoctorService';
import DeleteDoctorService from '@modules/doctors/services/DeleteDoctorService';

class DoctorsController {
  async all(request: Request, response: Response): Promise<Response> {
    const { name, crm, telephone, cell_phone, postcode } = request.query;

    const listAllDoctors = container.resolve(ListAllDoctorsService);

    const doctors = await listAllDoctors.execute({
      name: name as string,
      crm: Number(crm),
      telephone: telephone as string,
      cell_phone: cell_phone as string,
      postcode: postcode as string,
    });

    return response.json(doctors);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showDoctor = container.resolve(ShowDoctorService);

    const doctor = await showDoctor.execute({
      id: Number(id),
    });

    return response.json(doctor);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      crm,
      telephone,
      cell_phone,
      postcode,
      specialities,
    } = request.body;

    const createDoctor = container.resolve(CreateDoctorService);

    const doctor = await createDoctor.execute({
      name,
      crm: Number(crm),
      telephone,
      cell_phone,
      postcode,
      specialities: specialities as number[],
    });

    return response.json(doctor);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name, crm, telephone, cell_phone, postcode } = request.body;

    const updateDoctor = container.resolve(UpdateDoctorService);

    const doctor = await updateDoctor.execute({
      id: Number(id),
      name,
      crm: Number(crm),
      telephone,
      cell_phone,
      postcode,
    });

    return response.json(doctor);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteDoctor = container.resolve(DeleteDoctorService);

    await deleteDoctor.execute({
      id: Number(id),
    });

    return response.status(204).send();
  }
}

export default DoctorsController;
