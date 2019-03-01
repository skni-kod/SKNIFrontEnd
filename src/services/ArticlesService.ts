import { ArticleModel } from '@/models/ArticleModel';
import { PaginationContainer } from '@/models/PaginationContainer';
import { createAuthHeader } from "../helpers/auth";

export class ArticlesService {
    private axios = require('axios');
    private readMoreGuard = '---readmore---';

    public async getAllArticles(): Promise<ArticleModel[]> {
        return (await this.axios('http://localhost:8000/articles/', {
            params: {
                format: 'json',
            },
        })).data;
    }

    // tslint:disable-next-line:max-line-length
    public async getArticles(pageNumber: number, pageSize: number, fullText: boolean): Promise<PaginationContainer<ArticleModel>> {
        const data = (await this.axios('http://localhost:8000/articles/', {
            params: {
                format: 'json',
                offset: (pageNumber - 1) * pageSize,
                limit: pageSize,
            },
        })).data as PaginationContainer<ArticleModel>;

        if (!fullText) {
            this.cutTextAfterReadMore(data.results);
        }

        return data;
    }

    // tslint:disable-next-line:max-line-length
    public async getArticlesWithTag(tag: string, pageNumber: number, pageSize: number, fullText: boolean): Promise<PaginationContainer<ArticleModel>> {
        const data = (await this.axios('http://localhost:8000/articles/', {
            params: {
                tagname: tag,
                format: 'json',
                offset: (pageNumber - 1) * pageSize,
                limit: pageSize,
            },
        })).data as PaginationContainer<ArticleModel>;

        if (!fullText) {
            this.cutTextAfterReadMore(data.results);
        }

        return data;
    }

    public async getArticle(id: number): Promise<ArticleModel> {
        const article = (await this.axios('http://localhost:8000/articles/' + id, {
            params: {
                format: 'json',
            },
        })).data as ArticleModel;

        const readMoreIndex = article.text.indexOf(this.readMoreGuard);
        if (readMoreIndex !== -1) {
            article.text = article.text.replace(this.readMoreGuard, '');
        }

        return article;
    }

    public async createArticle(article: ArticleModel): Promise<ArticleModel> {
        const header = createAuthHeader();
        if (header !== undefined) {
            return (await this.axios.post('http://localhost:8000/articles/', {
                title: article.title,
                text: article.text,
                creation_date: article.creation_date,
                publication_date: article.publication_date,
                alias: article.alias,
                creator: article.creator.id,
                params: {
                    format: 'json',
                }},
                { headers: {
                    'Authorization': header.Authorization
                }
            })).data;
        }

        throw new Error('Not logged in');
    }

    public async updateArticle(article: ArticleModel): Promise<ArticleModel> {
        const header = createAuthHeader();
        if (header !== undefined) {
            return (await this.axios.put('http://localhost:8000/articles/' + article.id + '/', {
                title: article.title,
                text: article.text,
                creation_date: article.creation_date,
                publication_date: article.publication_date,
                alias: article.alias,
                creator: article.creator.id,
                params: {
                    format: 'json',
                }},
                { headers: {
                    'Authorization': header.Authorization
                }
            })).data;
        }

        throw new Error('Not logged in');
    }

    public generateAliasForTitle(title: string) {
        if (title === undefined) {
            return '';
        }

        return title.trim().toLowerCase().replace(/ /g, '-');
    }

    private cutTextAfterReadMore(articles: ArticleModel[]) {
        for (const article of articles) {
            const readMoreIndex = article.text.indexOf(this.readMoreGuard);
            if (readMoreIndex !== -1) {
                article.text = article.text.slice(0, readMoreIndex);
                article.readMore = true;
            }
        }
    }
}
