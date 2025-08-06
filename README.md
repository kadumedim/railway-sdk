# Railway SDK

A community-maintained type-safe wrapper for interacting with Railway's GraphQL API.

## Installation

```bash
npm install railway-sdk
# or
yarn add railway-sdk
# or
bun add railway-sdk
```

## Quick Start

```typescript
import { RailwaySDK } from 'railway-sdk';

const sdk = new RailwaySDK({
  // This can be either your team token or your personal token
  accessToken: 'your-railway-access-token'
});

// Get current user and available workspaces
// (this function doesn't work if your access token is a team token!)
const me = await sdk.account.getMe();

// Access workspace IDs from the response
const workspaces = me.teams.edges.map(edge => edge.node);
console.log('Available workspaces:', workspaces.map(w => ({ id: w.id, name: w.name })));

// Use a workspace ID for operations that require it
const newProject = await sdk.project.createProject({
  teamId: workspaces[0].id, // Use the workspace ID here
  name: 'My New Project'
});

// Get services for a project
const services = await sdk.service.getServices(projectId);

// Create a volume for persistent storage
const volume = await sdk.volume.createVolume({
  projectId: newProject.id,
  mountPath: '/data',
  serviceId: services[0].node.id,
  environmentId: 'production'
});

console.log('Created volume:', volume.name);
```

## API Reference

### Account Operations
- `sdk.account.getMe()` - Get current user profile
- `sdk.account.createApiToken(name, teamId?)` - Create API token
- `sdk.account.deleteApiToken(id)` - Delete API token

### Project Operations
- `sdk.project.getProjects()` - Get all projects
- `sdk.project.getProject(id)` - Get specific project
- `sdk.project.createProject(data)` - Create new project
- `sdk.project.deleteProject(id)` - Delete project

### Service Operations
- `sdk.service.getServices(projectId)` - Get services for project
- `sdk.service.createService(data)` - Create new service
- `sdk.service.getServiceLogs()` - Get service logs (coming soon)

### Volume Operations
- `sdk.volume.createVolume(data)` - Create new volume
- `sdk.volume.deleteVolume(volumeId)` - Delete volume

## Configuration

```typescript
const sdk = new RailwaySDK({
  accessToken: 'your-token', // Required
  endpoint: 'https://backboard.railway.com/graphql/v2' // Optional, defaults to Railway's endpoint
});
```

## Workspace Requirements

Many destructive and constructive operations (like creating projects, services...) require a workspace ID. You can obtain your workspace IDs by calling `sdk.account.getMe()`, which returns a list of all workspaces (teams) you have access to.

## Development

```bash
# Install dependencies
bun install

# Build the package
bun run build

# Run linting
bun run lint

# Generate GraphQL types
bun run codegen
```

## Coming Soon™

- **Response normalization**: Flatten the GraphQL response structure to remove the `edges` and `nodes` wrapper objects. Instead of `me.teams.edges.map(edge => edge.node)`, you'll be able to work directly with `me.teams`.

- **Better type system**: Improve the type definitions to provide more specific, developer-friendly types instead of relying solely on the auto-generated GraphQL query types from codegen.

- **Subscriptions**: Real-time updates on Railway resources like deployments, events, and log streaming.

## License

MIT
