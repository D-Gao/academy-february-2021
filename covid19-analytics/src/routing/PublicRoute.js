import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export const PublicRoute = ({
        isUserAuthenticated,
        component: Component,
        ...rest
                }) => ( 
    <Route
        {...rest}
        component={props =>
            isUserAuthenticated ? (
                <Redirect to="/back-office/home" />
            ) : (
                <div>
                    <Component {...props} />
                </div>
            )
        }
    />
    );

const mapStateToProps = state => ({
    isUserAuthenticated: state.authReducer.isUserAuthenticated
  });
  

export default connect(mapStateToProps) (PublicRoute);
