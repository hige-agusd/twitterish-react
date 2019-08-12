import { Url } from "url";

export type User = {
    readonly id: string;
    readonly twitterId: string;
    readonly joinedAt: Date;
    readonly iconUrl: Url;
};
