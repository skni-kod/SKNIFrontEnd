import { FooterModel } from '@/models/FooterModel';
import beAxios from '@/axios';
import store from '../store';

export class FooterService {
    public async getLinks(): Promise<FooterModel[]> {
        return (
            await beAxios('api/footer_links/', {
                params: {
                    format: 'json',
                },
            })
        ).data;
    }
    public async addLink(data: object): Promise<FooterModel[]> {
        return (
            await beAxios.post('api/footer_links/', data, {
                headers: {
                    Authorization: 'Bearer ' + store.getters.token,
                },
            })
        ).data;
    }

    public async editLink(id: number, data: object): Promise<any> {
        const edit = await beAxios.patch('api/footer_links/' + id + '/', data, {
            headers: {
                Authorization: 'Bearer ' + store.getters.token,
            },
        });

        return edit;
    }

    public async deleteLink(id: number): Promise<any> {
        const del = await beAxios.delete('api/footer_links/' + id + '/', {
            headers: {
                Authorization: 'Bearer ' + store.getters.token,
            },
        });

        return del;
    }

}
