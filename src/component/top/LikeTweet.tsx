import * as React from "react";

import { likeTweet } from "../../infra/twitter/likeTweet";

type Props = {
    tweetId: string;
    likeCount: number;
};

export const LikeTweet: React.SFC<Props> = props => {
    const like = async (id: string) => {
        const variables = {
            tweetId: id,
            // tweet: tweet
        };
        await likeTweet(variables);
    }
    
    return (
        <div className={'Like'} onClick={() => like(props.tweetId)}>
            <div className={'Like__btn'}>Like</div>
            <div className={'Like__count'}>{props.likeCount}</div>
        </div>
    );
};
