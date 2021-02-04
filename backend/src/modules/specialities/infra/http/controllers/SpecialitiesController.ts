import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllSpecialitiesService from '@modules/specialities/services/ListAllSpecialitiesService';

class SpecialitiesController {
  async all(request: Request, response: Response): Promise<Response> {
    const listAllSpecialities = container.resolve(ListAllSpecialitiesService);

    const specialities = await listAllSpecialities.execute();

    return response.json(specialities);
  }
}

export default SpecialitiesController;
