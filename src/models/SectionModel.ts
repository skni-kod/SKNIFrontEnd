import { GalleryModelImage } from '@/models/GalleryModelImage';

export class SectionModel {
  public id!: number;
  public name!: string;
  public description!: string;
  public isVisible!: boolean;
  public icon!: string;
  public gallery!: GalleryModelImage[];
}
