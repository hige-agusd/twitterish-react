import { NormalizedCacheObject } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import gql from "graphql-tag";

import { Mutation, TweetCreateInput } from "./DefinitionTypes";
import { graphQLClient } from "./graphQLClient";
import { NewTweet } from "./graphql/dist/NewTweet";

const mutation = gql`
    ${NewTweet}
`;

export function newTweet(
    variables: TweetCreateInput,
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
