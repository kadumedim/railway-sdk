export const createServiceMutation = /* GraphQL */ `
  mutation createService(
    $projectId: String!,
    $name: String,
    $icon: String,
    $environmentId: String,
    $branch: String,
    $image: String,
    $repo: String,
    ) 
        {
            serviceCreate(
                input:{ 
                    projectId: $projectId, 
                    name: $name, 
                    icon: $icon, 
                    environmentId: $environmentId, 
                    branch: $branch,
                    source : {
                        image: $image,
                        repo: $repo,
                    }
                }
            )
            {
                createdAt
                featureFlags
                icon
                id
                name
                projectId
            }
        }
`;
