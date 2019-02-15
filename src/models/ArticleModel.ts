import { CreatorModel } from "@/models/CreatorModel"
import { ArticleTagsModel } from "@/models/ArticleTagsModel"

export class ArticleModel {
    public id?: number;
    public title?: string;
    public text?: string;
    public creation_date?: Date;
    public publication_date?: Date;
    public creator?: CreatorModel;
    public tags!: ArticleTagsModel[];
}
