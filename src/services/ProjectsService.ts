import { ProjectModel } from '@/models/ProjectModel';
import { PaginationContainer } from '@/models/PaginationContainer';
import beAxios from '@/axios';
import store from '../store';

export class ProjectsService {
  private readMoreGuard = '---readmore---';

  public async getAllProjects(): Promise<ProjectModel[]> {
    return (
      await beAxios('api/projects/', {
        params: {
          format: 'json',
          limit: 0,
        },
      })
    ).data;
  }

  public async getProject(
    projectNumber: number,
    removeReadMore: boolean = true,
  ): Promise<ProjectModel> {
    const project = (
      await beAxios('api/projects/' + projectNumber, {
        params: {
          format: 'json',
        },
      })
    ).data;

    if (removeReadMore) {
      const readMoreIndex = project.text.indexOf(this.readMoreGuard);
      if (readMoreIndex !== -1) {
        project.text = project.text.replace(this.readMoreGuard, '');
      }
    }

    return project;
  }

  public async getProjectsByPage(
    pageNumber: number,
    pageSize: number,
    fullText: boolean,
  ): Promise<PaginationContainer<ProjectModel>> {
    const data = (
      await beAxios('api/projects/', {
        params: {
          format: 'json',
          offset: (pageNumber - 1) * pageSize,
          limit: pageSize,
        },
      })
    ).data as PaginationContainer<ProjectModel>;

    if (!fullText) {
      this.cutTextAfterReadMore(data.results);
    }

    return data;
  }

  public async editProject(id: number, data: object): Promise<any> {
    const edit = await beAxios.patch('api/projects/' + id + '/', data, {
      headers: {
        Authorization: 'Bearer ' + store.getters.token,
      },
    });

    return edit;
  }

  public async addProject(data: object): Promise<any> {
    const save = await beAxios.post('api/projects/', data, {
      headers: {
        Authorization: 'Bearer ' + store.getters.token,
      },
    });

    return save;
  }

  public async deleteProject(id: number): Promise<any> {
    const del = await beAxios.delete('api/projects/' + id + '/', {
      headers: {
        Authorization: 'Bearer ' + store.getters.token,
      },
    });

    return del;
  }

  private cutTextAfterReadMore(projects: ProjectModel[]) {
    for (const project of projects) {
      const readMoreIndex = project.text.indexOf(this.readMoreGuard);
      if (readMoreIndex !== -1) {
        project.text = project.text.slice(0, readMoreIndex);
        project.readMore = true;
      }
    }
  }
}
