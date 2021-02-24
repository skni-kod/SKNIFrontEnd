import { SectionModel } from '@/models/SectionModel';
import beAxios from '../axios';

export class SectionsService {
    public async getAllSections(): Promise<SectionModel[]> {
        return (await beAxios('api/section/')).data;
    }
}
