import React from "react";
import {Route, Router, Switch} from "react-router-dom";
import {createBrowserHistory} from "history";
import HomeContainer from "../containers/homepage/HomeContainer";
import NotFoundContainer from "../containers/NotFoundContainer";

export const history = createBrowserHistory();

const AppRouter = () => {

    return (
        <>
            <Router history={history}>
                    <Switch>
                        <Route path="/" exact={true} component={HomeContainer}/>
                        <Route component={NotFoundContainer}/>
                    </Switch>
            </Router>
        </>
    );
};

export default AppRouter;
