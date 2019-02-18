import { CommentModel } from '@/models/CommentModel';

export class CommentsService {
    private axios = require('axios');

    public async getCommentsForArticle(articleId: number): Promise<CommentModel[]> {
        return (await this.axios('http://localhost:8000/comments/', {
            params: {
                format: 'json',
                article: articleId,
            },
        })).data;
    }
}
