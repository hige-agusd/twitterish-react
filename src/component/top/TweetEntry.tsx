import * as React from "react";
import { Link } from 'react-router-dom';

import { Tweet } from "../../domain/model/Tweet";

type Props = {
    readonly tweet: Tweet;
};

export const TweetEntry: React.SFC<Props> = props => {
    return (
        <Link to={`/${props.tweet.id}`}>
        <li className={'TweetEntry'}>
            <p>creator id: {props.tweet.creatorId}</p>
            <p>body: {props.tweet.body}</p>
            <p>created at: {props.tweet.tweetedAt.toISOString()}</p>
        </li>
        </Link>
    );
};
