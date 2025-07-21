export const getMeQuery = /* GraphQL */ `
  query GetMe {
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
    }
  }
`;
