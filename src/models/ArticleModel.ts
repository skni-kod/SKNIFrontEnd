import { CreatorModel } from "@/models/CreatorModel"

export class ArticleModel {
    public id?: number;
    public title?: string;
    public text?: string;
    public creation_date?: Date;
    public publication_date?: Date;
    public creator?: CreatorModel;
}
