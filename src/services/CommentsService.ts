import { CommentModel } from '@/models/CommentModel';
import { AxiosResponse } from 'axios';
import axios from '../axios';
import store from '../store';

export class CommentsService {
    public async getComment(id: number): Promise<CommentModel[]> {
        return (await axios('api/comments/'+id+'/')).data;
    }
    public async getComments(body: object): Promise<CommentModel[]> {
        return (await axios('api/comments/',body)).data;
    }

    public async addComments(body: object): Promise<AxiosResponse> {
        return (await axios.post('api/comments/', body, {
            headers: {
                Authorization: 'Bearer ' + store.getters.token,
            },
        })).data;
    }
}
