import beAxios from '@/axios';
import store from '../store';
import { SponsorModel } from '@/models/SponsorModel';
import { AxiosResponse } from 'axios';

export class SponsorsService {
  public async getSponsors(): Promise<SponsorModel[]> {
    return (
      await beAxios('api/sponsors/')
    ).data;
  }

  public async addSponsor(name: string, url: string, logo: File ): Promise<AxiosResponse> {
    const data = new FormData();
    data.append('name', name);
    data.append('logo', logo);
    data.append('url', url);

    return (
      await beAxios.post('api/sponsors/', data,
        {
          headers: {
            Authorization: 'Bearer ' + store.getters.token,
          },
        },
      )
      );
  }

  public async deleteSponsor(sponsor: SponsorModel): Promise<AxiosResponse> {
    const del = await beAxios.delete('api/sponsors/' + sponsor.id + '/',
      {
        headers: {
          Authorization: 'Bearer ' + store.getters.token,
        },
      });

    return del;
  }
}