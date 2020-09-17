import { SectionModel } from './SectionModel';
import { UserModel } from './UserModel';
/* tslint:disable */
export class ProjectModel {
    public id!: number;
    public title!: string;
    public text!: string;
    public creation_date!: Date;
    public publication_date!: Date;
    public repository_link!: string;
    public creator!: UserModel;
    public authors!: UserModel[];
    public section!: SectionModel;
}
