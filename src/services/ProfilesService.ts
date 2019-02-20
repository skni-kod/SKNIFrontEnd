import { ProfileModel } from '@/models/ProfileModel';

export class ProfilesService {
    private axios = require('axios');

    public async getAllProfiles(): Promise<ProfileModel[]> {
        return (await this.axios('http://localhost:8000/profiles/', {
            params: {
                format: 'json',
            },
        })).data;
    }

    public async getProfile(profileNumber: number): Promise<ProfileModel> {
        return (await this.axios('http://localhost:8000/profiles/' + profileNumber, {
            params: {
                format: 'json',
            },
        })).data;
    }

}
