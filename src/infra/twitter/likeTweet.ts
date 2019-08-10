import { NormalizedCacheObject } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import gql from "graphql-tag";

import { Mutation, TweetLikeInput } from "./DefinitionTypes";
import { graphQLClient } from "./graphQLClient";
import { LikeTweet } from "./graphql/dist/LikeTweet";

const mutation = gql`
    ${LikeTweet}
`;

export function likeTweet(
    variables: TweetLikeInput,
    client: ApolloClient<NormalizedCacheObject> = graphQLClient
): Promise<any> {
    return client
        .mutate<Mutation>({
            mutation,
            variables
        })
        .then(json => {
            if (!(json.data && json.data.tweet)) {
                throw new Error(`Failed to get tweets.`);
            }
            return json.data.tweet;
            // return mapTo(json.data.tweet);
        });
}
