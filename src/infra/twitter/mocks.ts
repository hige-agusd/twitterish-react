import * as crypto from "../../util/crypto";
import * as numbers from "../../util/numbers";

const users = numbers.range(1, 3).map(i => {
    const id = crypto.encodeBase64(`User:${i}`);
    const twitterId = `Mr.${i}`;
    const joinedAt = new Date(`2019-07-10T12:00:00Z`).toISOString();
    return {
        id,
        twitterId,
        joinedAt
    };
});

const tweets = numbers
    .range(1, 40)
    .map(i => {
        const id = crypto.encodeBase64(`Tweet:${i}`);
        const tweetedAt = new Date().toISOString();
        const userId = (i % users.length) + 1;
        const creatorId = crypto.encodeBase64(`User:${userId}`);
        const retweetCount = numbers.randomNumIn(0, users.length);
        const likeCount = numbers.randomNumIn(0, users.length);
        return {
            id,
            tweetedAt,
            creatorId,
            retweetCount,
            likeCount
        };
    })
    .sort((t1, t2) => {
        const left = new Date(t1.tweetedAt).getTime();
        const right = new Date(t2.tweetedAt).getTime();
        if (left < right) {
            return 1;
        } else if (left > right) {
            return -1;
        }
        return 0;
    });

type DecodedNodeIdPair = {
    readonly name: string;
    readonly id: number;
};

function decodeGlobalId(globalId: string): DecodedNodeIdPair {
    const decoded = crypto.decodeBase64(globalId);
    const [name, id] = decoded.split(":");
    return {
        name,
        id: Number.parseInt(id)
    };
}

const DEFAULT_TWEETS_PAGE_SIZE = 10;

export const mocks = {
    Query: () => ({
        getTweet: (_, vars) => {
            return tweets.find(t => t.id === vars.id);
        },
    }),
    Mutation: () => ({
        tweet: (_, vars) => {
            const body = vars.input.tweet.body || "Empty!";
            const id = crypto.encodeBase64(`Tweet:${tweets.length}`);
            const tweetedAt = new Date().toISOString();
            const creatorId = crypto.encodeBase64(`User:1`);
            const newTweet = {
                id,
                body,
                tweetedAt,
                creatorId,
                retweetCount: 0,
                likeCount: 0
            };
            tweets.push(newTweet);
            return {
                clientMutationId: vars.clientMutationid || null,
                tweet: newTweet
            };
        }
    }),
    TweetConnection: (_, vars) => {
        const isForward = !!vars.after || !vars.before;
        const first = vars.first || DEFAULT_TWEETS_PAGE_SIZE;
        if (first < 0) {
            throw new Error("The arg first is an illegal value.");
        }
        const last = vars.last || DEFAULT_TWEETS_PAGE_SIZE;
        if (last < 0) {
            throw new Error("The arg last is an illegal value.");
        }
        let startIndex = 0;
        let endIndex = DEFAULT_TWEETS_PAGE_SIZE;
        if (isForward) {
            if (vars.after) {
                const { id } = decodeGlobalId(vars.after);
                if (id < 0) {
                    throw new Error("The arg after is an illegal value.");
                }
                startIndex = id;
            }
            endIndex = startIndex + first;
        } else {
            if (vars.before) {
                const { id } = decodeGlobalId(vars.before);
                if (id < 0) {
                    throw new Error("The arg before is an illegal value.");
                }
                endIndex = id;
                startIndex = endIndex - last;
            } else {
                endIndex = tweets.length - 1;
                startIndex = endIndex - last;
            }
        }
        if (startIndex < 0) {
            startIndex = 0;
            endIndex = startIndex + first;
        }
        const edges = tweets.slice(startIndex, endIndex).map((t, i) => {
            const node = {
                ...t,
                creator: users.find(u => u.id === t.creatorId)
            };
            return {
                node,
                cursor: crypto.encodeBase64(`array:${startIndex + i}`)
            };
        });
        const pageInfo = {
            endCursor: crypto.encodeBase64(`array:${endIndex}`),
            hasNextPage: endIndex < tweets.length - 1,
            hasPreviousPage: startIndex > 0,
            startCursor: crypto.encodeBase64(`array:${startIndex}`)
        };
        return {
            edges,
            pageInfo
        };
    },
    User: parent => {
        if (parent && parent.creatorId) {
            return users.find(u => u.id === parent.creatorId);
        }
        return users[0];
    },
    DateTime: () => new Date().toISOString(),
    Url: () => "https://img.icons8.com/color/48/000000/download-2.png"
};
