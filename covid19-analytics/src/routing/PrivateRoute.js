import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
import {startLogout} from "../store/actions/auth";

const PrivateRoute = ({
                          isUserAuthenticated, auth,
                          component: Component,
                          ...rest
                      }) => (
    <Route
        {...rest}
        component={props =>
            isUserAuthenticated && auth ? (
                <Component {...props} />
            ) : (
                <Redirect to="/back-office"/>
            )
        }
    />
);

const mapStateToProps = state => ({
    isUserAuthenticated: state.authReducer.isUserAuthenticated,
    auth: state.authReducer.auth
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
