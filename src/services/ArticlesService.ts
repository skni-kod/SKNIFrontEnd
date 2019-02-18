import { ArticleModel } from '@/models/ArticleModel';
import { PaginationContainer } from '@/models/PaginationContainer';

export class ArticlesService {
    private axios = require('axios');

    public async getAllArticles(): Promise<ArticleModel[]> {
        return (await this.axios('http://localhost:8000/articles/?format=json')).data;
    }

    public async getArticles(pageNumber: number, pageSize: number): Promise<PaginationContainer<ArticleModel>> {
        return (await this.axios('http://localhost:8000/articles/?format=json&' +
            '&offset=' + (pageNumber - 1) * pageSize +
            '&limit=' + pageSize)).data;
    }

    public async getArticlesWithTag(tag: string, pageNumber: number, pageSize: number): Promise<PaginationContainer<ArticleModel>> {
        return (await this.axios('http://localhost:8000/articles/?tag=1' +
            '&format=json&' +
            '&offset=' + (pageNumber - 1) * pageSize +
            '&limit=' + pageSize)).data;
    }

    public async getArticle(id: number): Promise<ArticleModel> {
        return (await this.axios('http://localhost:8000/articles/' + id + '?format=json')).data;
    }
}
