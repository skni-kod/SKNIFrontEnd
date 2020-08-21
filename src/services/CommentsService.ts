import { CommentModel } from '@/models/CommentModel';
import axios from '../axios';

export class CommentsService {
    public async getCommentsForArticle(articleId: number): Promise<CommentModel[]> {
        return (await axios('api/comments/', {
            params: {
                format: 'json',
                article: articleId,
            },
        })).data;
    }
}
