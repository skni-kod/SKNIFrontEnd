import beAxios from '@/axios';
import store from '../store';

export interface HistoryEntry {
  year: number;
  title: string;
  text: string;
}

export interface SiteSettings {
  registration_open: boolean;
  announcement_enabled: boolean;
  announcement_text: string;
  history: HistoryEntry[];
}

export class SiteSettingsService {
  public async get(): Promise<SiteSettings> {
    return (await beAxios.get('api/site_settings/')).data;
  }

  public async update(data: Partial<SiteSettings>): Promise<SiteSettings> {
    return (
      await beAxios.patch('api/site_settings/', data, {
        headers: { Authorization: 'Bearer ' + store.getters.token },
      })
    ).data;
  }
}
