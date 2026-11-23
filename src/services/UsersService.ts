import beAxios from '@/axios';
import store from '../store';

function auth() {
  return { headers: { Authorization: 'Bearer ' + store.getters.token } };
}

export class UsersService {
  public async getAll(): Promise<any[]> {
    return (await beAxios.get('api/users/', auth())).data;
  }

  public async update(id: number, data: object): Promise<any> {
    return (await beAxios.patch('api/users/' + id + '/', data, auth())).data;
  }

  public async remove(id: number): Promise<void> {
    await beAxios.delete('api/users/' + id + '/', auth());
  }
}
