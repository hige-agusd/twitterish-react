import test from "ava";

import { mockGraphQLClient } from "./mockGraphQLClient";
import { newTweet } from "./newTweet";

test("Should create tweet.", async t => {
    const tweet = 'test tweet';

    const variables = {
        body: tweet
    };

    const actual = await newTweet(variables, mockGraphQLClient);
    t.true(actual.tweet.body === tweet);
});
