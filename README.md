# Railway Roundhouse

Official Railway Roundhouse SDK for Node.js and TypeScript. A modern, type-safe SDK for interacting with Railway's GraphQL API.

## Installation

```bash
npm install @railway/roundhouse
# or
yarn add @railway/roundhouse
# or
bun add @railway/roundhouse
```

## Quick Start

```typescript
import { Roundhouse } from '@railway/roundhouse';

const roundhouse = new Roundhouse({
  accessToken: 'your-railway-access-token'
});

// Get current user
const me = await roundhouse.account.getMe();

// Get all projects
const projects = await roundhouse.project.getProjects();

// Create a new project
const newProject = await roundhouse.project.createProject({
  teamId: "my-workspace-id",
  name: 'My Awesome Project'
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

