import { TagModel } from '@/models/TagModel';
import beAxios from '@/axios';
import store from '../store';
import { AxiosResponse } from 'axios';

export class TagsService {
  public async getAllTags(): Promise<AxiosResponse> {
    return await beAxios('api/tags/');
  }

  public async addTag(name: string): Promise<AxiosResponse> {
    const save = await beAxios.post(
      'api/tags/',
      { name },
      {
        headers: {
          Authorization: 'Bearer ' + store.getters.token,
        },
      },
    );

    return save;
  }

  public async deleteTag(id: number): Promise<AxiosResponse> {
    const del = await beAxios.delete('api/tags/' + id + '/', {
      headers: {
        Authorization: 'Bearer ' + store.getters.token,
      },
    });

    return del;
  }
}
