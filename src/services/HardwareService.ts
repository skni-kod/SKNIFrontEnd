import { HardwareModel } from '@/models/HardwareModel';
import { PaginationContainer } from '@/models/PaginationContainer';
import beAxios from '@/axios';
import store from '../store';

export class HardwareService {
  public async getAllHardware(): Promise<HardwareModel[]> {
    return (
      await beAxios('api/hardwares/', {
        params: {
          format: 'json',
        },
      })
    ).data;
  }
  public async getHardware(id: string): Promise<HardwareModel> {
    return (
      await beAxios('api/hardwares/' + id, {
        params: {
          format: 'json',
        },
        headers: {
          Authorization: 'Bearer ' + store.getters.token,
        },
      })
    ).data;
  }

  // tslint:disable-next-line:max-line-length
  public async getHardwareByPage(
    pageNumber: number,
    pageSize: number,
    fullText: boolean,
  ): Promise<PaginationContainer<HardwareModel>> {
    const data = (
      await beAxios('api/hardwares/', {
        params: {
          format: 'json',
          offset: (pageNumber - 1) * pageSize,
          limit: pageSize,
        },
        headers: {
          Authorization: 'Bearer ' + store.getters.token,
        },
      })
    ).data;

    // if (!fullText) {
    //    this.cutTextAfterReadMore(data.results);
    // }
    return data;
  }
  public async addHardware(data: object): Promise<any> {
    const save = await beAxios.post('api/hardwares/', data, {
      headers: {
        Authorization: 'Bearer ' + store.getters.token,
      },
    });

    return save;
  }

  public async editHardware(id: number, data: object): Promise<any> {
    const edit = await beAxios.patch('api/hardwares/' + id + '/', data, {
      headers: {
        Authorization: 'Bearer ' + store.getters.token,
      },
    });

    return edit;
  }

  public async deleteHardware(id: number): Promise<any> {
    const del = await beAxios.delete('api/hardwares/' + id + '/', {
      headers: {
        Authorization: 'Bearer ' + store.getters.token,
      },
    });

    return del;
  }
}
