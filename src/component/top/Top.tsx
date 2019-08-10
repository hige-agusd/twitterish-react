import * as React from "react";
import { useState, useEffect } from "react";
import { Route, Switch } from 'react-router-dom';

import { Tweet } from "../../domain/model/Tweet";

import { getTweets } from "../../infra/twitter/getTweets";
import { PageInfo } from "../../infra/twitter/DefinitionTypes";

import { TweetList } from "./TweetList";
import { TweetDetail } from './TweetDetail';
import { Layout } from '../Layout';
import { TweetCreation } from "./TweetCreation";

export const Top: React.FunctionComponent<{}> = () => {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [pageInfo, setPageInfo] = useState<PageInfo>({
        hasNextPage: true,
        hasPreviousPage: false
    });

    const fetchData = async () => {
        if (!pageInfo.hasNextPage) {
            return;
        }
        const variables = {
            tweetsAfter: pageInfo.endCursor || null,
            tweetsFirst: 10
        };
        const getTweetsResult = await getTweets(variables);
        const nextTweets = tweets.concat(getTweetsResult.tweets);
        setTweets(nextTweets);
        setPageInfo(getTweetsResult.pageInfo);
    };

    useEffect(() => {
        fetchData();
        return () => {};
    }, []);

    return (
        <Layout>
            <Switch>
                <Route path='/' exact render={() => <TweetList tweets={tweets} 
                    fetchData={fetchData} hasNextPage={pageInfo.hasNextPage} />} />
                <Route path="/compose" component={TweetCreation} />
                <Route path="/:id" component={TweetDetail}/>
            </Switch>
        </Layout>
    );
};
