import beAxios from '@/axios';
import store from '../store';
import { SponsorModel } from '@/models/SponsorModel';
import { AxiosResponse } from 'axios';

export class SponsorsService {
  public getSponsor(id: string): Promise<AxiosResponse<SponsorModel>> {
    return beAxios.get('api/sponsors/' + id + '/');
  }

  public async getSponsors(): Promise<AxiosResponse<SponsorModel[]>> {
    return (await beAxios.get('api/sponsors/'));
  }

  public addSponsor(name: string, url: string, logo: File ): Promise<AxiosResponse> {
    const data = new FormData();
    data.append('name', name);
    data.append('logo', logo);
    data.append('url', url);

    return (
      beAxios.post('api/sponsors/', data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + store.getters.token,
          },
        },
      )
    );
  }

  public modifySponsor(model: SponsorModel, newLogo?: File) {
    const data = new FormData();
    data.append('name', model.name);
    data.append('url', model.url);

    if (newLogo) {
      data.append('logo', newLogo);
    }

    return (
      beAxios.patch('api/sponsors/' + model.id + '/', data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + store.getters.token,
          },
        },
      )
    );
  }

  public deleteSponsor(sponsor: SponsorModel): Promise<AxiosResponse> {
    return beAxios.delete('api/sponsors/' + sponsor.id + '/',
      {
        headers: {
          Authorization: 'Bearer ' + store.getters.token,
        },
      });
  }
}
