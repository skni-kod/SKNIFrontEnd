import { CommentModel } from '@/models/CommentModel';
import { AxiosResponse } from 'axios';
import beAxios from '../axios';
import store from '../store';

export class CommentsService {
    public async getComments(body: object): Promise<CommentModel[]> {
        return (await beAxios('api/comments/', body)).data;
    }

    public async addComments(body: object): Promise<AxiosResponse> {
        return (await beAxios.post('api/comments/', body, {
            headers: {
                Authorization: 'Bearer ' + store.getters.token,
            },
        })).data;
    }
}
