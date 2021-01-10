import { UserModel } from '@/models/UserModel';
/* tslint:disable */
export class CommentModel {
    public id!: number;
    public text!: string;
    public creation_date!: Date;
    public article_id!: number;
    public user!: UserModel;
}
