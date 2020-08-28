import { ProfileModel } from '@/models/ProfileModel';
import { PaginationContainer } from '@/models/PaginationContainer';
import axios from '../axios';

export class ProfilesService {
    public async getAllProfiles(): Promise<ProfileModel[]> {
        return (await axios('api/profiles/', {
            params: {
                format: 'json',
            },
        })).data;
    }

    public async getProfile(profileNumber: number): Promise<ProfileModel> {
        return (await axios('api/profiles/' + profileNumber, {
            params: {
                format: 'json',
            },
        })).data;
    }

    public async getProfilesByPage(pageNumber: number, pageSize: number): Promise<PaginationContainer<ProfileModel>> {
        const data = (await axios('api/profiles/', {
            params: {
                format: 'json',
                offset: (pageNumber - 1) * pageSize,
                limit: pageSize,
            },
        })).data as PaginationContainer<ProfileModel>;

        return data;
    }

}
