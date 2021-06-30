import { TagModel } from '@/models/TagModel';
import beAxios from '@/axios';

export class TagsService {
    public async getAllTags(): Promise<TagModel[]> {
        return (await beAxios('api/tags/')).data;
    }
}
