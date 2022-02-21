import { CreatorModel } from '@/models/CreatorModel';
import { TagModel } from '@/models/TagModel';
import { GalleryModelImage } from '@/models/GalleryModelImage';
import { ProfileModel } from './ProfileModel';
/* tslint:disable */
export class ArticleModel {
    public id!: number;
    public title!: string;
    public alias!: string;
    public text!: string;

    // tslint:disable-next-line:variable-name
    public creation_date!: Date;

    // tslint:disable-next-line:variable-name
    public publication_date!: Date;

    public creator!: CreatorModel;
    public authors!: ProfileModel[] | number[];
    public gallery!: GalleryModelImage[];
    public tags!: TagModel[] | number[];

    public group!: string;

    // tslint:disable-next-line:variable-name
    public comments_number!: number;

    public readMore!: boolean;
}
