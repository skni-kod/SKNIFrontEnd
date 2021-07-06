import beAxios from '@/axios';
import store from '../store';
import { AxiosResponse } from 'axios';

export class SectionsService {
  public async getAllSections(): Promise<AxiosResponse> {
    return await beAxios('api/section/');
  }

  public async getSection(id: number): Promise<AxiosResponse> {
    return await beAxios('api/section/' + id);
  }

  public async editSection(id: number, data: object): Promise<any> {
    const edit = await beAxios.patch('api/section/' + id + '/', data, {
      headers: {
        Authorization: 'Bearer ' + store.getters.token,
      },
    });

    return edit;
  }

  public async addSection(data: object): Promise<any> {
    const save = await beAxios.post('api/section/', data, {
      headers: {
        Authorization: 'Bearer ' + store.getters.token,
      },
    });

    return save;
  }

  public async deleteSection(id: number): Promise<any> {
    const edit = await beAxios.delete('api/section/' + id + '/', {
      headers: {
        Authorization: 'Bearer ' + store.getters.token,
      },
    });

    return edit;
  }
}
