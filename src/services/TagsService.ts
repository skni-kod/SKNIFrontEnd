import { TagModel } from "@/models/TagModel"

export class TagsService {
    private axios = require('axios');

    public async getAllTags(): Promise<TagModel[]> {
        return (await this.axios('http://localhost:8000/tags/?format=json')).data;
    }

    public async getTagForArticle(articleId: number): Promise<TagModel[]> {
        return (await this.axios('http://localhost:8000/tags/?format=json')).data;
    }
}