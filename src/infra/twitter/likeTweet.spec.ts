import test from "ava";

import { mockGraphQLClient } from "./mockGraphQLClient";
import { getTweets } from "./getTweets";
import { likeTweet } from "./likeTweet";

test("Should like tweet.", async t => {
    const listVariables = {
        tweetsFirst: 10
    };

    const list = await getTweets(listVariables, mockGraphQLClient);


    const variables = {
        tweetId: list.tweets[0].id
    };

    const actual = await likeTweet(variables, mockGraphQLClient);
    t.true(actual.likeTweet.__typename === 'LikeTweetPayload');
});
