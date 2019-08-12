import { NormalizedCacheObject } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import gql from "graphql-tag";

import { GetUserQuery, GetUserQueryVariables } from "./DefinitionTypes";
import { graphQLClient } from "./graphQLClient";
// import { mapConnectionTo } from "./mapping/tweet";
import { GetUser } from "./graphql/dist/GetUser";

const query = gql`
    ${GetUser}
`;

export function getUser(
    variables: GetUserQueryVariables,
    client: ApolloClient<NormalizedCacheObject> = graphQLClient
): Promise<any> {
    return client
        .query<GetUserQuery>({
            query,
            variables
        })
        .then(json => {
            if (!(json.data && json.data.getUser)) {
                throw new Error(`Failed to get tweets.`);
            }
            console.log(json.data)
            return json.data.getUser;
        });
}
