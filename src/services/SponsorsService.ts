import beAxios from '@/axios';
import store from '../store';
import { SponsorModel } from '@/models/SponsorModel';

export class SponsorsService {
    public async getSponsors(): Promise<SponsorModel[]> {
        return (
            await beAxios('api/sponsors/')
        ).data;
    }

    public async deleteSponsor(sponsor: SponsorModel) {
        const del = await beAxios.delete('api/sponsors/' + sponsor.id + '/',
          {
              headers: {
              Authorization: 'Bearer ' + store.getters.token,
          },
        });
    }
}