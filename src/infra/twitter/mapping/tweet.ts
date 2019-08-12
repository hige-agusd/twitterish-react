import { Tweet } from "../../../domain/model/Tweet";

import {
    TweetFragment,
    TweetConnectionFragment,
    PageInfo
} from "../DefinitionTypes";

type TweetsWithPageInfo = {
    readonly tweets: Tweet[];
    readonly pageInfo: PageInfo;
};

export function mapConnectionTo(
    tweetConnection: TweetConnectionFragment
): TweetsWithPageInfo {
    if (!tweetConnection.edges) {
        throw new Error(`Illegal state of tweet connection edges.`);
    }
    const tweets = tweetConnection.edges.map(edge => {
        if (!edge || !edge.node) {
            throw new Error(`Illegal state of tweet node.`);
        }
        return mapTo(edge.node);
    });
    return {
        tweets,
        pageInfo: tweetConnection.pageInfo
    };
}

export function mapTo(tweet: TweetFragment): Tweet {
    const { id, body, tweetedAt, creatorId, retweetCount, likeCount, creator } = tweet;
    return {
        id,
        body,
        tweetedAt: new Date(tweetedAt),
        creatorId,
        creator,
        retweetCount,
        likeCount
    };
}
