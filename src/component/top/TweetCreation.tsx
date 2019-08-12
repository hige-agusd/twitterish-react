import * as React from "react";
import { useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from 'react-router-dom';

// import { Tweet } from "../../domain/model/Tweet";
import { newTweet } from "../../infra/twitter/newTweet";

type Props = {
    match: RouteComponentProps;
};

export const TweetCreation: React.SFC<Props> = withRouter(({history}) => {
    const [tweet, setTweet] = useState<string>('');
    
    const sendData =  async () => {
        if (!tweet) {
            return;
        }
        const variables = {
            body: tweet
        };

        const getTweetResult = await newTweet(variables);
        console.log(getTweetResult);
        setTweet(getTweetResult.tweet.body);
        history.push('/');
    };

    useEffect(() => {
        // fetchData();
        return () => {};
    }, []);

    return (
        <div className={'TweetCreation'}>
            <textarea className={'TweetCreation__tweet'}
                value={tweet} onChange={(e) => setTweet(e.target.value)} ></textarea>
            <button
                className={'TweetCreation__btn'}
                type="button"
                disabled={!tweet}
                onClick={() => sendData()}
            >
                Send
            </button>
        </div>
    );
});
