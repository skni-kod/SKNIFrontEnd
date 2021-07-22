import beAxios from '@/axios';
import store from '@/store';
import { AxiosResponse } from 'axios';

export class GalleryService {
  public async upload(file: File, progress: any): Promise<AxiosResponse> {
    const formData = new FormData();
    formData.append('image', file);
    const save = beAxios.post('api/gallery/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + store.getters.token, // tslint:disable-line
      },
      onUploadProgress: progress,
    });

    return save;
  }

  public async deleteImage(id: number): Promise<AxiosResponse> {
    const del = await beAxios.delete('api/gallery/' + id + '/', {
      headers: {
        Authorization: 'Bearer ' + store.getters.token,
      },
    });

    return del;
  }
}
