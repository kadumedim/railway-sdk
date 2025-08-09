import type {
  CreateApiTokenMutation,
  CreateProjectMutation,
  CreateProjectMutationVariables,
  CreateServiceMutation,
  CreateServiceMutationVariables,
  CreateVolumeMutation,
  CreateVolumeMutationVariables,
  DeleteApiTokenMutation,
  DeleteProjectMutation,
  DeleteVolumeMutation,
  GetMeQuery,
  GetProjectQuery,
  GetProjectsQuery,
} from "./generated/graphql";
import { account, project, service, volume } from "./modules";

export interface SDKConfig {
  endpoint?: string;
  accessToken?: string;
  headers?: Record<string, string>;
}

export class GraphQLClient {
  private endpoint: string;
  private headers: Record<string, string>;

  constructor(endpoint: string, config?: SDKConfig) {
    this.endpoint = endpoint;
    this.headers = {
      Authorization: `Bearer ${config?.accessToken}`,
      "Content-Type": "application/json",
    };
  }

  async request<T = unknown>(
    query: string,
    variables?: Record<string, unknown>,
  ): Promise<T> {
    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`❌ Request failed! status: ${response.status}`);
    }

    const result = (await response.json()) as { data: T; errors?: Array<{ message: string }> };

    if (result.errors && result.errors.length > 0) {
      throw new Error(
        `❌ GraphQL error: ${result.errors.map((e) => e.message).join(", ")}`,
      );
    }

    if (!result.data) {
      console.error(JSON.stringify(result, null, 2));
      throw new Error("❌ GraphQL response missing data!");
    }

    return result.data;
  }
}

class Volume {
  constructor(private client: GraphQLClient) {}

  async createVolume(volumeData: CreateVolumeMutationVariables) {
    const result = await this.client.request<CreateVolumeMutation>(
      volume.createVolumeMutation,
      volumeData,
    );
    return result.volumeCreate;
  }

  async deleteVolume(volumeId: string) {
    const result = await this.client.request<DeleteVolumeMutation>(
      volume.deleteVolumeMutation,
      { volumeId },
    );
    return result.volumeDelete;
  }
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

export class RailwaySDK {
  private client: GraphQLClient;
  private config: SDKConfig;

  public readonly account: Account;
  public readonly project: Project;
  public readonly service: Service;
  public readonly volume: Volume;

  constructor(config: SDKConfig) {
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
    this.volume = new Volume(this.client);
  }
}
