import { NormalizedCacheObject } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import gql from "graphql-tag";

import { GetTweetQuery, GetTweetQueryVariables } from "./DefinitionTypes";
import { graphQLClient } from "./graphQLClient";
import { mapTo } from "./mapping/tweet";
import { GetTweet } from "./graphql/dist/GetTweet";

const query = gql`
    ${GetTweet}
`;

export function getTweet(
    variables: GetTweetQueryVariables,
    client: ApolloClient<NormalizedCacheObject> = graphQLClient
): Promise<any> {
    return client
        .query<GetTweetQuery>({
            query,
            variables
        })
        .then(json => {
            if (!(json.data && json.data.getTweet)) {
                throw new Error(`Failed to get tweets.`);
            }
            return mapTo(json.data.getTweet);
        });
}
