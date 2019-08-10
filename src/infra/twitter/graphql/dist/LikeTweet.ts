export const LikeTweet = `
mutation likeTweet($tweetId:  ID!) {
  likeTweet(input: {tweet: { tweetId: $tweetId}}) {
    like {
      id
    }
  }
}
`;

/* fragment Tweet on Tweet {
  id
  body
  tweetedAt
  retweetCount
  likeCount
  creatorId
  creator {
    ...User
  }
}

fragment RetweetConnection on RetweetConnection {
  edges {
    node {
      ...Retweet
    }
  }
  pageInfo {
    ...PageInfo
  }
}

fragment LikeTweetConnection on LikeTweetConnection {
  edges {
    node {
      ...LikeTweet
    }
  }
  pageInfo {
    ...PageInfo
  }
}

fragment User on User {
  id
  twitterId
  joinedAt
  iconUrl
}

fragment Retweet on Retweet {
  id
  userId
  tweetId
  retweetedAt
}

fragment PageInfo on PageInfo {
  endCursor
  hasNextPage
  hasPreviousPage
  startCursor
}

fragment LikeTweet on LikeTweet {
  id
  userId
  tweetId
  likedAt
} */

