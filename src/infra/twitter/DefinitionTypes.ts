export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    DateTime: any;
    Url: any;
};

export type CreateRetweetInput = {
    readonly tweet: RetweetCreateInput;
    readonly clientMutationId?: Maybe<Scalars["String"]>;
};

export type CreateRetweetPayload = {
    __typename?: "CreateRetweetPayload";
    readonly clientMutationId?: Maybe<Scalars["String"]>;
    readonly tweet?: Maybe<Retweet>;
};

export type CreateTweetInput = {
    readonly tweet: TweetCreateInput;
    readonly clientMutationId?: Maybe<Scalars["String"]>;
};

export type CreateTweetPayload = {
    __typename?: "CreateTweetPayload";
    readonly clientMutationId?: Maybe<Scalars["String"]>;
    readonly tweet?: Maybe<Tweet>;
};

export type LikeTweet = Node & {
    __typename?: "LikeTweet";
    readonly id: Scalars["ID"];
    readonly userId: Scalars["ID"];
    readonly user: User;
    readonly tweetId: Scalars["ID"];
    readonly tweet: Tweet;
    readonly likedAt: Scalars["DateTime"];
};

export type LikeTweetConnection = {
    __typename?: "LikeTweetConnection";
    readonly edges: ReadonlyArray<Maybe<LikeTweetEdge>>;
    readonly pageInfo: PageInfo;
};

export type LikeTweetEdge = {
    __typename?: "LikeTweetEdge";
    readonly cursor: Scalars["String"];
    readonly node?: Maybe<LikeTweet>;
};

export type LikeTweetInput = {
    readonly tweet: TweetLikeInput;
    readonly clientMutationId?: Maybe<Scalars["String"]>;
};

export type LikeTweetPayload = {
    __typename?: "LikeTweetPayload";
    readonly clientMutationId?: Maybe<Scalars["String"]>;
    readonly like?: Maybe<LikeTweet>;
};

export type Mutation = {
    __typename?: "Mutation";
    readonly tweet?: Maybe<CreateTweetPayload>;
    readonly retweet?: Maybe<CreateRetweetPayload>;
    readonly likeTweet?: Maybe<LikeTweetPayload>;
};

export type MutationTweetArgs = {
    input: CreateTweetInput;
};

export type MutationRetweetArgs = {
    input: CreateRetweetInput;
};

export type MutationLikeTweetArgs = {
    input: LikeTweetInput;
};

export type Node = {
    readonly id: Scalars["ID"];
};

export type PageInfo = {
    __typename?: "PageInfo";
    readonly endCursor?: Maybe<Scalars["String"]>;
    readonly hasNextPage: Scalars["Boolean"];
    readonly hasPreviousPage: Scalars["Boolean"];
    readonly startCursor?: Maybe<Scalars["String"]>;
};

export type Query = {
    __typename?: "Query";
    readonly getTweets?: Maybe<TweetConnection>;
    readonly getTweet?: Maybe<Tweet>;
};

export type QueryGetTweetsArgs = {
    before?: Maybe<Scalars["String"]>;
    after?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
};

export type QueryGetTweetArgs = {
    id: Scalars["ID"];
};

export type Retweet = Node & {
    __typename?: "Retweet";
    readonly id: Scalars["ID"];
    readonly userId: Scalars["ID"];
    readonly user: User;
    readonly tweetId: Scalars["ID"];
    readonly tweet: Tweet;
    readonly retweetedAt: Scalars["DateTime"];
};

export type RetweetConnection = {
    __typename?: "RetweetConnection";
    readonly edges: ReadonlyArray<Maybe<RetweetEdge>>;
    readonly pageInfo: PageInfo;
};

export type RetweetCreateInput = {
    readonly tweetId: Scalars["ID"];
};

export type RetweetEdge = {
    __typename?: "RetweetEdge";
    readonly cursor: Scalars["String"];
    readonly node?: Maybe<Retweet>;
};

export type Tweet = Node & {
    __typename?: "Tweet";
    readonly id: Scalars["ID"];
    readonly body: Scalars["String"];
    readonly tweetedAt: Scalars["DateTime"];
    readonly creatorId: Scalars["ID"];
    readonly creator: User;
    readonly retweetCount: Scalars["Int"];
    readonly retweets?: Maybe<RetweetConnection>;
    readonly likeCount: Scalars["Int"];
    readonly likes?: Maybe<LikeTweetConnection>;
};

export type TweetRetweetsArgs = {
    before?: Maybe<Scalars["String"]>;
    after?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
};

export type TweetLikesArgs = {
    before?: Maybe<Scalars["String"]>;
    after?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
};

export type TweetConnection = {
    __typename?: "TweetConnection";
    readonly edges: ReadonlyArray<Maybe<TweetEdge>>;
    readonly pageInfo: PageInfo;
};

export type TweetCreateInput = {
    readonly body: Scalars["String"];
};

export type TweetEdge = {
    __typename?: "TweetEdge";
    readonly cursor: Scalars["String"];
    readonly node?: Maybe<Tweet>;
};

export type TweetLikeInput = {
    readonly tweetId: Scalars["ID"];
};

export type User = Node & {
    __typename?: "User";
    readonly id: Scalars["ID"];
    readonly twitterId: Scalars["String"];
    readonly joinedAt: Scalars["DateTime"];
    readonly iconUrl: Scalars["Url"];
};
export type LikeTweetFragment = { readonly __typename?: "LikeTweet" } & Pick<
    LikeTweet,
    "id" | "userId" | "tweetId" | "likedAt"
>;

export type LikeTweetConnectionFragment = {
    readonly __typename?: "LikeTweetConnection";
} & {
    readonly edges: ReadonlyArray<
        Maybe<
            { readonly __typename?: "LikeTweetEdge" } & {
                readonly node: Maybe<
                    { readonly __typename?: "LikeTweet" } & LikeTweetFragment
                >;
            }
        >
    >;
    readonly pageInfo: { readonly __typename?: "PageInfo" } & PageInfoFragment;
};

export type PageInfoFragment = { readonly __typename?: "PageInfo" } & Pick<
    PageInfo,
    "endCursor" | "hasNextPage" | "hasPreviousPage" | "startCursor"
>;

export type RetweetFragment = { readonly __typename?: "Retweet" } & Pick<
    Retweet,
    "id" | "userId" | "tweetId" | "retweetedAt"
>;

export type RetweetConnectionFragment = {
    readonly __typename?: "RetweetConnection";
} & {
    readonly edges: ReadonlyArray<
        Maybe<
            { readonly __typename?: "RetweetEdge" } & {
                readonly node: Maybe<
                    { readonly __typename?: "Retweet" } & RetweetFragment
                >;
            }
        >
    >;
    readonly pageInfo: { readonly __typename?: "PageInfo" } & PageInfoFragment;
};

export type TweetFragment = { readonly __typename?: "Tweet" } & Pick<
    Tweet,
    "id" | "body" | "tweetedAt" | "retweetCount" | "likeCount" | "creatorId"
> & { readonly creator: { readonly __typename?: "User" } & UserFragment };

export type TweetConnectionFragment = {
    readonly __typename?: "TweetConnection";
} & {
    readonly edges: ReadonlyArray<
        Maybe<
            { readonly __typename?: "TweetEdge" } & {
                readonly node: Maybe<
                    { readonly __typename?: "Tweet" } & TweetFragment
                >;
            }
        >
    >;
    readonly pageInfo: { readonly __typename?: "PageInfo" } & PageInfoFragment;
};

export type UserFragment = { readonly __typename?: "User" } & Pick<
    User,
    "id" | "twitterId" | "joinedAt" | "iconUrl"
>;

export type GetTweetQueryVariables = {
    id: Scalars["ID"];
    retweetsBefore?: Maybe<Scalars["String"]>;
    retweetsAfter?: Maybe<Scalars["String"]>;
    retweetsFirst?: Maybe<Scalars["Int"]>;
    retweetsLast?: Maybe<Scalars["Int"]>;
    likesBefore?: Maybe<Scalars["String"]>;
    likesAfter?: Maybe<Scalars["String"]>;
    likesFirst?: Maybe<Scalars["Int"]>;
    likesLast?: Maybe<Scalars["Int"]>;
};

export type CreateTweetMutation = {};

export type GetTweetQuery = { readonly __typename?: "Query" } & {
    readonly getTweet: Maybe<
        { readonly __typename?: "Tweet" } & {
            readonly retweets: Maybe<
                {
                    readonly __typename?: "RetweetConnection";
                } & RetweetConnectionFragment
            >;
            readonly likes: Maybe<
                {
                    readonly __typename?: "LikeTweetConnection";
                } & LikeTweetConnectionFragment
            >;
        } & TweetFragment
    >;
};

export type GetTweetsQueryVariables = {
    tweetsBefore?: Maybe<Scalars["String"]>;
    tweetsAfter?: Maybe<Scalars["String"]>;
    tweetsFirst?: Maybe<Scalars["Int"]>;
    tweetsLast?: Maybe<Scalars["Int"]>;
};

export type GetTweetsQuery = { readonly __typename?: "Query" } & {
    readonly getTweets: Maybe<
        { readonly __typename?: "TweetConnection" } & TweetConnectionFragment
    >;
};
