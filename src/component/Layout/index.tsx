import * as React from "react";
import { Header } from '../Header';

type Props = {
};

export const Layout: React.SFC<Props> = props => {
    return (
        <>
            <Header />
            <main className={'Content'}>
                    {props.children}
            </main>
        </>
    );
};
