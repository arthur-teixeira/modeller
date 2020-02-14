import React from "react";
//Sergio
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Footer from "components/Footer/Footer.jsx";

import routes from "routes.js";

import pagesStyle from "assets/jss/material-dashboard-pro-react/layouts/authStyle.jsx";

import register from "assets/img/register.jpeg";
import login from "assets/img/login.jpeg";
import lock from "assets/img/lock.jpeg";
import error from "assets/img/clint-mckoy.jpg";
import pricing from "assets/img/bg-pricing.jpeg";

//sergio
import loginAction from "../actions/loginAction";


class Pages extends React.Component {
    componentDidMount() {
        document.body.style.overflow = "unset";

        this.props.loginAction();

    }
    getRoutes = routes => {
        return routes.map((prop, key) => {
            if (prop.collapse) {
                return this.getRoutes(prop.views);
            }
            if (prop.layout === "/auth") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };
    getBgImage = () => {

        if (window.location.pathname.indexOf("/auth/register-page") !== -1) {
            return register;
        } else if (window.location.pathname.indexOf("/auth/login-page") !== -1) {
            return login;
        } else if (window.location.pathname.indexOf("/auth/pricing-page") !== -1) {
            return pricing;
        } else if (
            window.location.pathname.indexOf("/auth/lock-screen-page") !== -1
        ) {
            return lock;
        } else if (window.location.pathname.indexOf("/auth/error-page") !== -1) {
            return error;
        }

    };
    getActiveRoute = routes => {
        let activeRoute = "Default Brand Text";
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].collapse) {
                let collapseActiveRoute = this.getActiveRoute(routes[i].views);
                if (collapseActiveRoute !== activeRoute) {
                    return collapseActiveRoute;
                }
            } else {
                if (
                    window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
                ) {
                    return routes[i].name;
                }
            }
        }
        return activeRoute;
    };
    render() {
        const { classes, ...rest } = this.props;



        if (this.props.authState.loggedIn) {
            // return <Redirect to="/admin/dashboard" />;
            return <Redirect to="/admin/listapipepro" />;

        }

        //  if (this.props.authState.loggedOut) {
        // return <Redirect to="/auth/login-page" />;
        //  }

        return (
            <div>
                <div className={classes.wrapper} ref="wrapper" style={{ background: "#1E3560" }}>
                    {/* <div
                        className={classes.fullPage}
                    //  style={{ backgroundImage: "url(" + this.getBgImage() + ")" }} 
                    > */}
                    <Switch>{this.getRoutes(routes)}</Switch>
                </div>
                {/* </div> */}
            </div>
        );
    }
}

Pages.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    ...state
});


const mapDispatchToProps = dispatch => ({
    loginAction: (email, password) => dispatch(loginAction(email, password))
});

//export default withStyles(pagesStyle)(Pages);
//export default connect(mapStateToProps, {})(withStyles(pagesStyle)(Pages));
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(pagesStyle)(Pages));
