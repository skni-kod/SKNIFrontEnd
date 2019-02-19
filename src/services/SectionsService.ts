import {SectionModel} from '@/models/SectionModel';

export class SectionsService {
    private axios = require('axios');

    public async getAllSections(): Promise<SectionModel[]> {
        return (await this.axios('http://localhost:8000/section/')).data;
    }
}
