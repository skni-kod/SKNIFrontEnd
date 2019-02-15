import {HardwareModel} from '@/models/HardwareModel';

export class HardwaresService {
    private axios = require('axios');

    public async getAllHardware(): Promise<HardwareModel[]> {
        return (await this.axios('http://localhost:8000/hardwares/')).data;
    }
}
