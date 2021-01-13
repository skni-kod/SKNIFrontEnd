import { ProjectModel } from '@/models/ProjectModel';
import { PaginationContainer } from '@/models/PaginationContainer';
import axios from '../axios';
import store from '../store';

export class ProjectsService {
    private readMoreGuard = '---readmore---';

    public async getAllProjects(): Promise<ProjectModel[]> {
        return (await axios('api/projects/', {
            params: {
                format: 'json',
            },
        })).data;
    }

    public async getProject(projectNumber: number, removeReadMore: boolean = true): Promise<ProjectModel> {
        const project = (await axios('api/projects/' + projectNumber, {
            params: {
                format: 'json',
            },
        })).data;

        if (removeReadMore) {
            const readMoreIndex = project.text.indexOf(this.readMoreGuard);
            if (readMoreIndex !== -1) {
                project.text = project.text.replace(this.readMoreGuard, '');
            }
        }

        return project;
    }

    public async getProjectsByPage(pageNumber: number, pageSize: number): Promise<PaginationContainer<ProjectModel>> {
        const data = (await axios('api/projects/', {
            params: {
                format: 'json',
                offset: (pageNumber - 1) * pageSize,
                limit: pageSize,
            },
        })).data as PaginationContainer<ProjectModel>;
        return data;
    }

    public async editProject(id: number, data: object): Promise<any> {
        const edit = await axios.patch('api/projects/' + id + '/', data, {
            headers: {
                Authorization: 'Bearer ' + store.getters.token,
            },
        });

        return edit;
    }

    public async addProject(data: object): Promise<any> {
        const save = await axios.post('api/projects/', data, {
            headers: {
                Authorization: 'Bearer ' + store.getters.token,
            },
        });

        return save;
    }

}
