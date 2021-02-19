import React from "react";
import {Route, Router, Switch} from "react-router-dom";
import {createBrowserHistory} from "history";
import HomeContainer from "../containers/homepage/HomeContainer";
import DashboardContainer from "../containers/Dashboard/DashboardContainer";
import BackOfficeContainer from "../containers/backoffice/BackOfficeContainer";
import NotFoundContainer from "../containers/NotFoundContainer";
import MenuBarComponent from "../components/MenuBarComponent/MenuBarComponent";
import BackdropComponent from "../components/BackdropComponent/BackdropComponent";
import {useSelector} from "react-redux";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import BackOfficeHomeContainer from "../containers/backoffice/BackOfficeHomeContainer";


export const history = createBrowserHistory();

const AppRouter = () => {
    const loadingCounter = useSelector(store => store.loadingReducer.counter);

    return (
        <>
            {
                loadingCounter > 0 &&
                <BackdropComponent/>
            }
            <div className="container-fluid">
                <MenuBarComponent/>
            </div>

            <Router history={history}>
                <div className="container">
                    <Switch>
                        <Route path="/" exact={true} component={HomeContainer}/>
                        <Route
                            path="/dashboard"
                            exact={true}
                            component={DashboardContainer}
                        />
                        <PublicRoute
                            path="/back-office"
                            exact={true}
                            component={BackOfficeContainer}
                        />
                        <PrivateRoute
                            path="/back-office/home"
                            exact={true}
                            component={BackOfficeHomeContainer}
                        />
                        <PublicRoute component={NotFoundContainer}/>
                    </Switch>
                </div>
            </Router>
        </>
    );
};

export default AppRouter;
