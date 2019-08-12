export const GetUsers = `
query GetUsers {
  getUsers {
    ...User
  }
}

fragment User on User {
  id
  twitterId
  joinedAt
  iconUrl
}

`;
