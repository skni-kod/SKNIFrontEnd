import { TagModel } from '@/models/TagModel';
import { ArticleTagsModel } from '@/models/ArticleTagsModel';
import { createAuthHeader } from "../helpers/auth";

export class TagsService {
    private axios = require('axios');

    public async getAllTags(): Promise<TagModel[]> {
        return (await this.axios('http://localhost:8000/tags/')).data;
    }

    public async removeArticleTag(articleTagId: number) : Promise<void> {
        const header = createAuthHeader();
        if (header !== undefined) {
            await this.axios('http://localhost:8000/article_tags/' + articleTagId, {
                params: {
                    format: 'json',
                },
                method: 'delete',
                headers: {
                    'Authorization': header.Authorization
                }
            });
        }
    }

    public async addArticleTag(articleId: number, tagId: number) : Promise<void> {
        const header = createAuthHeader();
        if (header !== undefined) {
            await this.axios.post('http://localhost:8000/article_tags/', {
                article: articleId,
                tag: tagId,
                params: {
                    format: 'json',
                }},
                { headers: {
                    'Authorization': header.Authorization
                }
            });
        }
    }
}
