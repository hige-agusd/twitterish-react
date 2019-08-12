import { User } from "../../infra/twitter/DefinitionTypes";

export type Tweet = {
    readonly id: string;
    readonly body: string;
    readonly tweetedAt: Date;
    readonly creatorId: string;
    readonly retweetCount: number;
    readonly likeCount: number;
    readonly creator: User;
};
