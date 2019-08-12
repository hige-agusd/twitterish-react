import * as React from "react";

import { Tweet } from "../../domain/model/Tweet";

import { TweetEntry } from "./TweetEntry";

type Props = {
    readonly user: string;
    readonly tweets: Tweet[];
    readonly hasNextPage: Boolean;
    readonly fetchData: Function;
};

export const TweetList: React.SFC<Props> = props => {
    return (
        <>
            <ul className={'Tweetlist'}>
                {props.tweets.map(tweet => (
                    <TweetEntry key={tweet.id} user={props.user} tweet={tweet} />
                ))}
            </ul>
            <button
                className={'Tweetlist__btn'}
                type="button"
                disabled={!props.hasNextPage}
                onClick={() => props.fetchData()}
            >
                more
            </button>
        </>
    );
};
