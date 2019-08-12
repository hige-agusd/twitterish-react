export const GetUser = `
query GetUser($twitterId: String! ) {
  getUser(twitterId: $twitterId) {
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
