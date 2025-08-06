export const getMeQuery = /* GraphQL */ `
  query getMe {
    me {
      name
      isConductor
      agreedFairUse
      avatar
      banReason
      createdAt
      email
      featureFlags
      flags
      has2FA
      id
      isAdmin
      isVerified
      lastLogin
      profile {
        bio
        isPublic
        website
      }
      teams {
        edges {
          node {
            id
            name
            preferredRegion
            updatedAt
            createdAt
            avatar
            adoptionLevel
          }
        }
      }
    }
  }
`;
