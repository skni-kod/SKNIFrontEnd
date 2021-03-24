import { CommentModel } from '@/models/CommentModel';
import { AxiosResponse } from 'axios';
import beAxios from '../axios';
import store from '../store';

export class CommentsService {
  public async deleteComment(id: number): Promise<AxiosResponse> {
    return await beAxios.delete('api/comments/' + id + '/', {
      headers: {
        Authorization: 'Bearer ' + store.getters.token,
      },
    });
  }

  public async editComment(id: number, body: object): Promise<AxiosResponse> {
    return await beAxios.put('api/comments/' + id + '/', body, {
      headers: {
        Authorization: 'Bearer ' + store.getters.token,
      },
    });
  }

  public async getComments(body: object): Promise<CommentModel[]> {
    return (await beAxios('api/comments/', body)).data;
  }

  public async addComment(body: object): Promise<AxiosResponse> {
    return await beAxios.post('api/comments/', body, {
      headers: {
        Authorization: 'Bearer ' + store.getters.token,
      },
    });
  }
}
