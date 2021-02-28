import { SectionModel } from '@/models/SectionModel';
import beAxios from '../axios';
import store from '../store';

export class SectionsService {
    public async getAllSections(): Promise<SectionModel[]> {
        return (await beAxios('api/section/')).data;
    }
    public async getSection(id:number): Promise<SectionModel[]> {
        return (await beAxios('api/section/'+id)).data;
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
}
