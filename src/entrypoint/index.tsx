import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';

import { Top } from "../component/top/Top";

const container: Element = document.getElementsByClassName("main-content")[0];

const app = (            
    <BrowserRouter>
        <Top />
    </BrowserRouter>
);

(() => {
    ReactDOM.render(app, container);
})();
