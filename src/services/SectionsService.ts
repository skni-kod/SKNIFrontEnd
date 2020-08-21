import { SectionModel } from '@/models/SectionModel';
import axios from '../axios';

export class SectionsService {
    public async getAllSections(): Promise<SectionModel[]> {
        return (await axios('api/section/')).data;
    }
}
