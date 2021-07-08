import beAxios from '@/axios';
import store from '../store';
import { AxiosResponse } from 'axios';
import { SectionModel } from '@/models/SectionModel';

export class SectionsService {
  private readMoreGuard = '---readmore---';

  public async getAllSections(
    fullText: boolean = false,
  ): Promise<AxiosResponse> {
    const data = await beAxios('api/section/');

    if (!fullText) {
      this.cutTextAfterReadMore(data.data);
    }

    return data;
  }

  public async getSection(
    id: number,
    removeReadMore: boolean = true,
  ): Promise<AxiosResponse> {
    const data = await beAxios('api/section/' + id);

    if (removeReadMore) {
      const readMoreIndex = data.data.description.indexOf(this.readMoreGuard);
      if (readMoreIndex !== -1) {
        data.data.description = data.data.description.replace(
          this.readMoreGuard,
          '',
        );
      }
    }

    return data;
  }

  public async editSection(id: number, data: object): Promise<any> {
    const edit = await beAxios.patch('api/section/' + id + '/', data, {
      headers: {
        Authorization: 'Bearer ' + store.getters.token,
      },
    });

    return edit;
  }

  public async addSection(data: object): Promise<any> {
    const save = await beAxios.post('api/section/', data, {
      headers: {
        Authorization: 'Bearer ' + store.getters.token,
      },
    });

    return save;
  }

  public async deleteSection(id: number): Promise<any> {
    const edit = await beAxios.delete('api/section/' + id + '/', {
      headers: {
        Authorization: 'Bearer ' + store.getters.token,
      },
    });

    return edit;
  }

  private cutTextAfterReadMore(sections: SectionModel[]) {
    for (const section of sections) {
      const readMoreIndex = section.description.indexOf(this.readMoreGuard);
      if (readMoreIndex !== -1) {
        section.description = section.description.slice(0, readMoreIndex);
        section.readMore = true;
      }
    }
  }
}
