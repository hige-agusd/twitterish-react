import * as React from "react";
import { NavLink } from 'react-router-dom';

type Props = {
};

export const Header: React.SFC<Props> = () => {
    return (
        <div className={'Header'} >
            <NavLink activeClassName={'active'} exact to='/'>Home</NavLink>
            <NavLink activeClassName={'active'} to='/compose'>New</NavLink>
        </div>
    );
};
