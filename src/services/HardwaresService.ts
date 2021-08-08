import { HardwareModel } from '@/models/HardwareModel';
import { PaginationContainer } from '@/models/PaginationContainer';
import beAxios from '@/axios';

export class HardwaresService {
  public async getAllHardware(): Promise<HardwareModel[]> {
    return (
      await beAxios('api/hardwares/', {
        params: {
          format: 'json',
        },
      })
    ).data;
  }

  public async getHardwareByPage(
    pageNumber: number,
    pageSize: number,
  ): Promise<PaginationContainer<HardwareModel>> {
    const data = (
      await beAxios('api/hardwares/', {
        params: {
          format: 'json',
          offset: (pageNumber - 1) * pageSize,
          limit: pageSize,
        },
      })
    ).data as PaginationContainer<HardwareModel>;

    return data;
  }
}
