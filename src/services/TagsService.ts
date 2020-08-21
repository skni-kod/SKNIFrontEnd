import { TagModel } from '@/models/TagModel';
import axios from '../axios';

export class TagsService {
    public async getAllTags(): Promise<TagModel[]> {
        return (await axios('api/tags/')).data;
    }
}
