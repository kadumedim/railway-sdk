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

/**
 * @internal
 * Internal GraphQL client for making requests to Railway's API
 */
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

  /**
   * Makes a GraphQL request to the configured endpoint
   * @param query - The GraphQL query string
   * @param variables - Optional variables for the GraphQL query
   * @returns Promise resolving to the query result data
   */
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

    const result = (await response.json()) as {
      data: T;
      errors?: Array<{ message: string }>;
    };

    if (result.errors && result.errors.length > 0) {
      throw new Error(
        `❌ GraphQL error: ${result.errors.map((e) => e.message).join(", ")}`,
      );
    }

    if (!result.data) {
      throw new Error(
        `❌ GraphQL response missing data! ${JSON.stringify(result, null, 2)}`,
      );
    }

    return result.data;
  }
}

class Volume {
  constructor(private client: GraphQLClient) {}

  /**
   * Creates a new volume in a Railway project
   * @param volumeData - Volume creation parameters
   * @returns Promise resolving to the created volume data
   */
  async createVolume(volumeData: CreateVolumeMutationVariables) {
    const result = await this.client.request<CreateVolumeMutation>(
      volume.createVolumeMutation,
      volumeData,
    );
    return result.volumeCreate;
  }

  /**
   * Deletes a volume from a Railway project
   * @param volumeId - The ID of the volume to delete
   * @returns Promise resolving to the deletion result
   */
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

  /**
   * Retrieves the current user's account information
   * @returns Promise resolving to the current user's data
   */
  async getMe() {
    const { me } = await this.client.request<GetMeQuery>(account.getMeQuery);
    return me;
  }

  /**
   * Creates a new API token
   * @param name - The name for the API token
   * @param teamId - Optional team ID to associate the token with
   * @returns Promise resolving to the created API token data
   */
  async createApiToken(name: string, teamId: string | null = null) {
    const result = await this.client.request<CreateApiTokenMutation>(
      account.createApiTokenMutation,
      { name, teamId },
    );
    return result.apiTokenCreate;
  }

  /**
   * Deletes an API token
   * @param id - The ID of the API token to delete
   * @returns Promise resolving to the deletion result
   */
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

  /**
   * Retrieves all projects associated with the current token
   * @returns Promise resolving to an array of project edges
   */
  async getProjects() {
    const result = await this.client.request<GetProjectsQuery>(
      project.getProjectsQuery,
    );
    return result.projects?.edges;
  }

  /**
   * Retrieves a specific project by ID
   * @param id - The project ID
   * @returns Promise resolving to the project data
   */
  async getProject(id: string) {
    const result = await this.client.request<GetProjectQuery>(
      project.getProjectQuery,
      {
        id,
      },
    );
    return result.project;
  }

  /**
   * Creates a new project
   * @param projectData - Project creation parameters
   * @returns Promise resolving to the created project data
   */
  async createProject(projectData: CreateProjectMutationVariables) {
    const result = await this.client.request<CreateProjectMutation>(
      project.createProjectMutation,
      projectData,
    );
    return result.projectCreate;
  }

  /**
   * Deletes a project
   * @param id - The ID of the project to delete
   * @returns Promise resolving to the deletion result
   */
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

  /**
   * Retrieves all services for a specific project
   * @param projectId - The project ID to get services for
   * @returns Promise resolving to an array of service edges
   */
  async getServices(projectId: string) {
    const result = await this.client.request<GetProjectQuery>(
      service.getServicesQuery,
      {
        projectId,
      },
    );
    return result.project?.services?.edges;
  }

  /**
   * Creates a new service in a project
   * @param serviceData - Service creation parameters
   * @returns Promise resolving to the created service data
   */
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
      { accessToken: this.config.accessToken },
    );

    // Initialize modules
    this.account = new Account(this.client);
    this.project = new Project(this.client);
    this.service = new Service(this.client);
    this.volume = new Volume(this.client);
  }
}
