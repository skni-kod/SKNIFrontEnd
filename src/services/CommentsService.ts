import { CommentModel } from '@/models/CommentModel';
import { API_MAIN_URL_BASE } from '@/parameters';

export class CommentsService {
    private axios = require('axios');

    public async getCommentsForArticle(articleId: number): Promise<CommentModel[]> {
        return (await this.axios(API_MAIN_URL_BASE + '/comments/', {
            params: {
                format: 'json',
                article: articleId,
            },
        })).data;
    }
}
