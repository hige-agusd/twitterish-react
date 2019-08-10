import * as React from "react";
import { useState, useEffect } from "react";
import { RouteComponentProps } from 'react-router-dom';

import { Tweet } from "../../domain/model/Tweet";
import { getTweet } from "../../infra/twitter/getTweet";
import { LikeTweet } from "./LikeTweet";

type Props = {
    match: RouteComponentProps;
};

export const TweetDetail: React.SFC<Props> = props => {
    const [tweet, setTweet] = useState<Tweet>();

    const fetchData = async () => {
        if (!props.match.params.id) {
            return;
        }
        const variables = {
            id: props.match.params.id
        };

        const getTweetResult = await getTweet(variables);
        setTweet(getTweetResult);
    };

    useEffect(() => {
        fetchData();
        return () => {};
    }, []);

    const tweetDetail = tweet ? (
        <li className={'TweetEntry'}>
            <p>creator id: {tweet.creatorId}</p>
            <p>body: {tweet.body}</p>
            <p>created at: {tweet.tweetedAt.toISOString()}</p>
            <LikeTweet likeCount={tweet.likeCount} tweetId={tweet.id} />
        </li>
    ) : null;

    return (
        <>{tweetDetail}</>
    );
};
