import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AddSpecialitiesService from '@modules/doctors/services/AddSpecialitiesService';
import RemoveSpecialitiesService from '@modules/doctors/services/RemoveSpecialitiesService';

class DoctorsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { speciality_ids } = request.body;

    const addSpecialities = container.resolve(AddSpecialitiesService);

    const doctor = await addSpecialities.execute({
      doctor_id: Number(id),
      speciality_ids: speciality_ids as number[],
    });

    return response.json(doctor);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { speciality_ids } = request.body;

    const removeSpecialities = container.resolve(RemoveSpecialitiesService);

    const doctor = await removeSpecialities.execute({
      doctor_id: Number(id),
      speciality_ids: speciality_ids as number[],
    });

    return response.json(doctor);
  }
}

export default DoctorsController;
