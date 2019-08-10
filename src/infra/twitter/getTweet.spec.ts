import test from "ava";

import { mockGraphQLClient } from "./mockGraphQLClient";
import { getTweets } from "./getTweets";
import { getTweet } from "./getTweet";

test("Should get tweet.", async t => {
    const listVariables = {
        tweetsFirst: 10
    };

    const list = await getTweets(listVariables, mockGraphQLClient);


    const variables = {
        id: list.tweets[0].id
    };

    const actual = await getTweet(variables, mockGraphQLClient);
    t.true(actual.hasOwnProperty('body'));
});
