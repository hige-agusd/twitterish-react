import * as React from "react";
import { useState, useEffect } from "react";
import { RouteComponentProps } from 'react-router-dom';

// import { Tweet } from "../../domain/model/Tweet";
import { newTweet } from "../../infra/twitter/newTweet";

type Props = {
    match: RouteComponentProps;
};

export const TweetCreation: React.SFC<Props> = () => {
    const [tweet, setTweet] = useState<string>('test tweet');
    
    const sendData =  async () => {
        console.log(tweet);
        
        if (!tweet) {
            return;
        }
        const variables = {
            body: tweet
        };

        const getTweetResult = await newTweet(variables);
        setTweet(getTweetResult.data.tweet);
    };

    useEffect(() => {
        // fetchData();
        return () => {};
    }, []);

    return (
        <>
            <textarea value={tweet} onChange={(e) => setTweet(e.target.value)} ></textarea>
            <button
                type="button"
                disabled={!tweet}
                onClick={() => sendData()}
            >
                Send
            </button>

        
        </>
    );
};
