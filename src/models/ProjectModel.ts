import { SectionModel } from './SectionModel';
import { ProfileModel } from './ProfileModel';
import { GalleryModelImage } from '@/models/GalleryModelImage';
/* tslint:disable */
export class ProjectModel {
    public id!: number;
    public title!: string;
    public text!: string;
    public creation_date!: Date;
    public publication_date!: Date;
    public repository_link!: string;
    public gallery!: GalleryModelImage[];
    public creator!: ProfileModel;
    public authors!: ProfileModel[] | number[];
    public section!: SectionModel | number;
    public readMore!: boolean;
}
