import * as React from "react";

import { Tweet } from "../../domain/model/Tweet";

import { TweetEntry } from "./TweetEntry";

type Props = {
    readonly tweets: Tweet[];
    readonly hasNextPage: Boolean;
    readonly fetchData: Function;
};

export const TweetList: React.SFC<Props> = props => {
    return (
        <>
            <ul className={'Tweetlist'}>
                {props.tweets.map(tweet => (
                    <TweetEntry key={tweet.id} tweet={tweet} />
                ))}
            </ul>
            <button
                type="button"
                disabled={!props.hasNextPage}
                onClick={() => props.fetchData()}
            >
                more
            </button>
        </>
    );
};
