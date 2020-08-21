import { ProjectModel } from '@/models/ProjectModel';
import { PaginationContainer } from '@/models/PaginationContainer';
import axios from '../axios';

export class ProjectsService {
    public async getAllProjects(): Promise<ProjectModel[]> {
        return (await axios('api/project/', {
            params: {
                format: 'json',
            },
        })).data;
    }

    public async getProject(projectNumber: number): Promise<ProjectModel> {
        return (await axios('api/project/' + projectNumber, {
            params: {
                format: 'json',
            },
        })).data;
    }

    public async getProjectsByPage(pageNumber: number, pageSize: number): Promise<PaginationContainer<ProjectModel>> {
        const data = (await axios('api/project/', {
            params: {
                format: 'json',
                offset: (pageNumber - 1) * pageSize,
                limit: pageSize,
            },
        })).data as PaginationContainer<ProjectModel>;
        return data;
    }

}
