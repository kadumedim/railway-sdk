import { GraphQLClient } from "graphql-request";
import type {
  CreateApiTokenMutation,
  CreateProjectMutation,
  CreateProjectMutationVariables,
  CreateServiceMutation,
  CreateServiceMutationVariables,
  DeleteApiTokenMutation,
  DeleteProjectMutation,
  GetMeQuery,
  GetProjectQuery,
  GetProjectsQuery,
} from "./generated/graphql";
import { account, project, service } from "./modules";

export interface RoundHouseConfig {
  endpoint?: string;
  accessToken?: string;
}

class Account {
  constructor(private client: GraphQLClient) {}

  async getMe() {
    const { me } = await this.client.request<GetMeQuery>(account.getMeQuery);
    return me;
  }

  async createApiToken(name: string, teamId: string | null = null) {
    const result = await this.client.request<CreateApiTokenMutation>(
      account.createApiTokenMutation,
      { name, teamId },
    );
    return result.apiTokenCreate;
  }

  async deleteApiToken(id: string) {
    const result = await this.client.request<DeleteApiTokenMutation>(
      account.deleteApiTokenMutation,
      { id },
    );
    return result.apiTokenDelete;
  }
}

class Project {
  constructor(private client: GraphQLClient) {}

  async getProjects() {
    const result = await this.client.request<GetProjectsQuery>(
      project.getProjectsQuery,
    );
    return result.projects?.edges;
  }

  async getProject(id: string) {
    const result = await this.client.request<GetProjectQuery>(
      project.getProjectQuery,
      {
        id,
      },
    );
    return result.project;
  }

  async createProject(projectData: CreateProjectMutationVariables) {
    const result = await this.client.request<CreateProjectMutation>(
      project.createProjectMutation,
      projectData,
    );
    return result.projectCreate;
  }

  async deleteProject(id: string) {
    const result = await this.client.request<DeleteProjectMutation>(
      project.deleteProjectMutation,
      { id },
    );
    return result.projectDelete;
  }
}

class Service {
  constructor(private client: GraphQLClient) {}

  async getServices(projectId: string) {
    const result = await this.client.request<GetProjectQuery>(
      service.getServicesQuery,
      {
        projectId,
      },
    );
    return result.project?.services?.edges;
  }

  async createService(serviceData: CreateServiceMutationVariables) {
    const result = await this.client.request<CreateServiceMutation>(
      service.createServiceMutation,
      serviceData,
    );
    return result.serviceCreate;
  }
}

export class Roundhouse {
  private client: GraphQLClient;
  private config: RoundHouseConfig;

  public readonly account: Account;
  public readonly project: Project;
  public readonly service: Service;

  constructor(config: RoundHouseConfig) {
    this.config = config;

    this.client = new GraphQLClient(
      config.endpoint || "https://backboard.railway.com/graphql/v2",
      {
        headers: { Authorization: `Bearer ${this.config.accessToken}` },
      },
    );

    // Initialize modules
    this.account = new Account(this.client);
    this.project = new Project(this.client);
    this.service = new Service(this.client);
  }
}
