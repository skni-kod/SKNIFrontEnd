import { ArticleModel } from '@/models/ArticleModel';
import { PaginationContainer } from '@/models/PaginationContainer';
import axios from '../axios';
import store from '../store';
import router from '../router';

// tslint:disable:object-literal-shorthand

export class ArticlesService {
    private readMoreGuard = '---readmore---';

    public async getAllArticles(): Promise<ArticleModel[]> {
        return (await axios('api/articles/', {
            params: {
                format: 'json',
            },
        })).data;
    }

    // tslint:disable-next-line:max-line-length
    public async getArticles(pageNumber: number, pageSize: number, fullText: boolean): Promise<PaginationContainer<ArticleModel>> {
        const data = (await axios('api/articles/', {
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
        const data = (await axios('api/articles/', {
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

    public async getArticle(id: number, removeReadMore: boolean = true): Promise<ArticleModel> {
        const article = (await axios('api/articles/' + id, {
            params: {
                format: 'json',
            },
        })).data as ArticleModel;

        if (removeReadMore) {
            const readMoreIndex = article.text.indexOf(this.readMoreGuard);
            if (readMoreIndex !== -1) {
                article.text = article.text.replace(this.readMoreGuard, '');
            }
        }

        return article;
    }

    public async editArticle(id: number, title: string, alias: string, text: string, returnPath: string) {
        const edit = await axios.patch('api/articles/' + id + '/', {
            title: title,
            alias: alias,
            text: text,
        }, {
            headers: {
                Authorization: 'Bearer ' + store.getters.token,
            },
        }).then((res: any) => {
            if (res.status === 200) {
                store.dispatch('setSnackbarState', {
                    state: true,
                    msg: 'Artykuł został zaktualizowany',
                    color: 'success',
                    timeout: 7500,
                });
                router.replace({ path: returnPath });
            } else {
                store.dispatch('setSnackbarState', {
                    state: true,
                    msg: 'Błąd poczas edycji artykułu!',
                    color: 'error',
                    timeout: 7500,
                });
            }
        }).catch((err) => {
            store.dispatch('setSnackbarState', {
                state: true,
                msg: 'Błąd poczas edycji artykułu!',
                color: 'error',
                timeout: 7500,
            });
        });
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
