import { injectable, inject } from 'tsyringe';

import IDoctorsRepository from '../repositories/IDoctorsRepository';
import Doctor from '../infra/typeorm/entities/Doctor';

interface IRequest {
  name?: string;
  crm?: number;
  telephone?: string;
  cell_phone?: string;
  postcode?: string;
}

@injectable()
class ListAllDoctorsService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute({
    name,
    crm,
    telephone,
    cell_phone,
    postcode,
  }: IRequest): Promise<Doctor[]> {
    const doctors = await this.doctorsRepository.all({
      name,
      crm,
      telephone,
      cell_phone,
      postcode,
    });

    return doctors;
  }
}

export default ListAllDoctorsService;
