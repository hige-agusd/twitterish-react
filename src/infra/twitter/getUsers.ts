import { NormalizedCacheObject } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import gql from "graphql-tag";

import { GetUsersQuery } from "./DefinitionTypes";
import { graphQLClient } from "./graphQLClient";
// import { mapConnectionTo } from "./mapping/tweet";
import { GetUsers } from "./graphql/dist/GetUsers";

const query = gql`
    ${GetUsers}
`;

export function getUsers(
    client: ApolloClient<NormalizedCacheObject> = graphQLClient
): Promise<any> {
    return client
        .query<GetUsersQuery>({
            query,
        })
        .then(json => {
            if (!(json.data && json.data.getUsers)) {
                throw new Error(`Failed to get tweets.`);
            }
            return json.data.getUsers;
        });
}
