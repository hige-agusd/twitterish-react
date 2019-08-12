import test from "ava";

import { mockGraphQLClient } from "./mockGraphQLClient";
import { getTweets } from "./getTweets";

test("Should get tweets.", async t => {
    const variables = {
        tweetsFirst: 10
    };

    const actual = await getTweets(variables, mockGraphQLClient);
    t.true(actual.tweets.length <= variables.tweetsFirst);
    t.true(typeof actual.pageInfo === "object");
});
