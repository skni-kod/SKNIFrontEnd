import {SectionModel} from '@/models/SectionModel';
import { API_MAIN_URL_BASE } from '@/parameters';

export class SectionsService {
    private axios = require('axios');

    public async getAllSections(): Promise<SectionModel[]> {
        return (await this.axios(API_MAIN_URL_BASE + '/section/')).data;
    }
}
