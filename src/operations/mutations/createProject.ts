export const createProjectMutation = /* GraphQL */ `
  mutation createProject(
    $teamId: String!,
    $name: String,
    $isPublic: Boolean,
    $defaultEnvironmentName: String,
    $description: String
    ) 
        {
            projectCreate(
                input:{ 
                    name: $name, 
                    teamId: $teamId, 
                    isPublic: $isPublic, 
                    defaultEnvironmentName: $defaultEnvironmentName, 
                    description: $description 
                }
            )
            {
                id
                baseEnvironmentId
                subscriptionType
                subscriptionPlanLimit
                teamId
                name
                members {
                name
                id
                email
                avatar
                role
                }
                isPublic
                isTempProject
                expiredAt
                createdAt
            }
        }
`;
