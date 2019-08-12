import * as React from "react";
import { useState, useEffect } from "react";
import { Link, RouteComponentProps } from 'react-router-dom';

import { Tweet } from "../../domain/model/Tweet";
import { getTweet } from "../../infra/twitter/getTweet";
import { LikeTweet } from "./LikeTweet";

type Props = {
    readonly tweet: Tweet;
};

type pageProps = {
    match: RouteComponentProps;
};

const _1MIN = 1000 * 60;
const _1HOUR = _1MIN * 60;
const _1DAY = _1HOUR * 24;
const _2DAY = _1DAY * 2;
const _1YEAR = _1DAY * 365;

const parseDate = date => {
    date = new Date(2019, 7, 11, 1, 23);
    const age = Date.now() - date.getTime();
    switch (true) {
        case age > _1YEAR: return date.toLocaleString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: '2-digit' });
        case age > _2DAY: return date.toLocaleString(undefined, { month: 'short', day: '2-digit', hour: 'numeric', minute: '2-digit' });
        case age > _1DAY: return `Yesterday ${date.toLocaleString(undefined, { hour: 'numeric', minute: '2-digit' })}`;
        case age > _1HOUR: const hours = (age / _1HOUR).toFixed(0);
            return `${hours} hour${Number(hours) > 1 ? 's' : ''} ago`;
        case age <= _1HOUR: const mins = (age / _1MIN).toFixed(0);
        return `${mins} min${Number(mins) > 1 ? 's' : ''} ago`;
    }
}

export const TweetEntry: React.SFC<Props> = props => {
    return (
        <li className={'TweetEntry'}>
            <div className={'TweetEntry__header'}>
                <div className={'TweetEntry__author'}>{props.tweet.creator.twitterId}</div>
                <div className={'TweetEntry__date'}>{parseDate(props.tweet.tweetedAt)}</div>
            </div>
            <div className={'TweetEntry__body'}>
                <Link to={`/${props.tweet.id}`}>
                        <div className={'TweetEntry__content'}>{props.tweet.body}</div>
                </Link>
            </div>
            <div className={'TweetEntry__footer'}>
                <div><span className={'TweetEntry__rt'}></span> {props.tweet.retweetCount}</div>
                <LikeTweet likeCount={props.tweet.likeCount} tweetId={props.tweet.id} />
            </div>
        </li>
    );
};

export const TweetDetailPage: React.SFC<pageProps> = props => {
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

    const tweetDetail = tweet ? <TweetEntry tweet={tweet} /> : null;

    return (
        <div className='TweetDetailPage'>
            {tweetDetail}
        </div>
    );
};