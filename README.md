# Railway Roundhouse

A type-safe wrapper for interacting with Railway's GraphQL API.

## Installation

```bash
npm install railway-roundhouse
# or
yarn add railway-roundhouse
# or
bun add railway-roundhouse
```

## Quick Start

```typescript
import { Roundhouse } from 'railway-roundhouse';

const roundhouse = new Roundhouse({
  // This can be either your team token or your personal token
  accessToken: 'your-railway-access-token'
});

// Get current user and available workspaces
const me = await roundhouse.account.getMe();

// Access workspace IDs from the response
const workspaces = me.teams.edges.map(edge => edge.node);
console.log('Available workspaces:', workspaces.map(w => ({ id: w.id, name: w.name })));

// Use a workspace ID for operations that require it
const newProject = await roundhouse.project.createProject({
  teamId: workspaces[0].id, // Use the workspace ID here
  name: 'My New Project'
});

// Get services for a project
const services = await roundhouse.service.getServices(projectId);
```

## API Reference

### Account Operations
- `roundhouse.account.getMe()` - Get current user profile
- `roundhouse.account.createApiToken(name, teamId?)` - Create API token
- `roundhouse.account.deleteApiToken(id)` - Delete API token

### Project Operations
- `roundhouse.project.getProjects()` - Get all projects
- `roundhouse.project.getProject(id)` - Get specific project
- `roundhouse.project.createProject(data)` - Create new project
- `roundhouse.project.deleteProject(id)` - Delete project

### Service Operations
- `roundhouse.service.getServices(projectId)` - Get services for project
- `roundhouse.service.createService(data)` - Create new service
- `roundhouse.service.getServiceLogs()` - Get service logs (coming soon)

## Configuration

```typescript
const roundhouse = new Roundhouse({
  accessToken: 'your-token', // Required
  endpoint: 'https://backboard.railway.com/graphql/v2' // Optional, defaults to Railway's endpoint
});
```

## Workspace Requirements

Many destructive and constructive operations (like creating projects, services, or API tokens) require a workspace ID. You can obtain your workspace IDs by calling `roundhouse.account.getMe()`, which returns a list of all workspaces (teams) you have access to.

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

## License

MIT

## Coming Soon™

- **Response normalization**: Flatten the GraphQL response structure to remove the `edges` and `nodes` wrapper objects. Instead of `me.teams.edges.map(edge => edge.node)`, you'll be able to work directly with `me.teams`.

- **Better type system**: Improve the type definitions to provide more specific, developer-friendly types instead of relying solely on the auto-generated GraphQL query types from codegen.

