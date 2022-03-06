import beAxios from '@/axios';
import store from '../store';
import { SponsorModel } from '@/models/SponsorModel';
import { AxiosResponse } from 'axios';

export class SponsorsService {
  public async getSponsor(id: string): Promise<AxiosResponse<SponsorModel>> {
    return (await beAxios.get('api/sponsors/' + id + '/'));
  }

  public async getSponsors(): Promise<AxiosResponse<SponsorModel[]>> {
    return (await beAxios.get('api/sponsors/'));
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

  public async modifySponsor(model: SponsorModel, newLogo?: File) {
    const data = new FormData();
    data.append('name', model.name);
    data.append('url', model.url);

    if (newLogo) {
      data.append('logo', newLogo);
    }

    return (
      await beAxios.patch('api/sponsors/' + model.id + '/', data,
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
