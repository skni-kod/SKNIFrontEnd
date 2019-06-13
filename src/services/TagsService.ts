import { TagModel } from '@/models/TagModel';
import { API_MAIN_URL_BASE } from '@/parameters';

export class TagsService {
    private axios = require('axios');

    public async getAllTags(): Promise<TagModel[]> {
        return (await this.axios(API_MAIN_URL_BASE + '/tags/')).data;
    }
}
