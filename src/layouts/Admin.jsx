import React from "react";
//Sergio

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
//import authAction from "actions/authAction";
import loginAction from "actions/loginAction";

import cx from "classnames";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";

// creates a beautiful scrollbar
//import PerfectScrollbar from "perfect-scrollbar";
import PerfectScrollbar from 'react-perfect-scrollbar';
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
//import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";

import routes from "routes.js";

import appStyle from "assets/jss/material-dashboard-pro-react/layouts/adminStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/logo-white.svg";

//sergio
import firebase from "firebaseConfig";

var ps;

const defaultProps = {
    state: "",
    onChange: () => { } // no need
};

const propTypes = {
    state: PropTypes.string,
    onChange: PropTypes.func
};

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false,
            miniActive: false,
            image: image,
            color: "blue",
            bgColor: "black",
            hasImage: true,
            fixedClasses: "dropdown"
        };
        this.resizeFunction = this.resizeFunction.bind(this);

    }
    componentDidMount() {


        this.props.loginAction();

        // this.forceUpdate();
        /*
         firebase.auth().onAuthStateChanged(function(user) {
           if (user) {
          
             console.log(user);
         
         //    window.location.replace("/admin/dashboard");
          
         
           } else {
        
             console.log("not loggggiiiinnn");
      
               //Sergio
               window.location.replace("/auth/login-page");
     
           }
         });*/

        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(this.refs.mainPanel, {
                suppressScrollX: true,
                suppressScrollY: false
            });
            document.body.style.overflow = "hidden";
        }
        window.addEventListener("resize", this.resizeFunction);


    }
    componentWillUnmount() {
        if (navigator.platform.indexOf("Win") > -1) {
            //Sergio
            //ps.destroy();
            ps = null;
        }
        window.removeEventListener("resize", this.resizeFunction);
    }
    componentDidUpdate(e) {
        if (e.history.location.pathname !== e.location.pathname) {
            this.refs.mainPanel.scrollTop = 0;
            if (this.state.mobileOpen) {
                this.setState({ mobileOpen: false });
            }
        }
    }
    handleImageClick = image => {
        this.setState({ image: image });
    };
    handleColorClick = color => {
        this.setState({ color: color });
    };
    handleBgColorClick = bgColor => {
        this.setState({ bgColor: bgColor });
    };
    handleFixedClick = () => {
        if (this.state.fixedClasses === "dropdown") {
            this.setState({ fixedClasses: "dropdown show" });
        } else {
            this.setState({ fixedClasses: "dropdown" });
        }
    };
    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });

    };
    getRoute() {
        return this.props.location.pathname !== "/admin/full-screen-maps";
    }
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
    getRoutes = routes => {
        return routes.map((prop, key) => {
            if (prop.collapse) {
                return this.getRoutes(prop.views);
            }
            if (prop.layout === "/admin") {
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
    sidebarMinimize() {
        this.setState({ miniActive: !this.state.miniActive });
    }
    resizeFunction() {
        if (window.innerWidth >= 960) {
            this.setState({ mobileOpen: false });
        }
    }
    render() {

        if (!this.props.authState.loggedIn) {

            return <Redirect to="/auth/login-page" />;

            // return <Redirect to="/admin/dashboard" />;

        }

        const { classes, ...rest } = this.props;
        const mainPanel =
            classes.mainPanel +
            " " +
            cx({
                [classes.mainPanelSidebarMini]: this.state.miniActive,
                [classes.mainPanelWithPerfectScrollbar]:
                    navigator.platform.indexOf("Win") > -1
            });
        return (
            <div className={classes.wrapper}>
                <Sidebar
                    routes={routes}
                    logoText={"Pipepro"}
                    logo={logo}
                    image={this.state.image}
                    handleDrawerToggle={this.handleDrawerToggle}
                    open={this.state.mobileOpen}
                    color={this.state.color}
                    bgColor={this.state.bgColor}
                    miniActive={this.state.miniActive}
                    {...rest}
                />
                <div className={mainPanel} ref="mainPanel">
                    <AdminNavbar
                        sidebarMinimize={this.sidebarMinimize.bind(this)}
                        miniActive={this.state.miniActive}
                        brandText={this.getActiveRoute(routes)}
                        handleDrawerToggle={this.handleDrawerToggle}
                        {...rest}
                    />
                    {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
                    {this.getRoute() ? (
                        <div className={classes.content}>
                            <div className={classes.container}>
                                <Switch>{this.getRoutes(routes)}</Switch>
                            </div>
                        </div>
                    ) : (
                            <div className={classes.map}>
                                <Switch>{this.getRoutes(routes)}</Switch>
                            </div>
                        )}
                    {this.getRoute() ? <Footer fluid /> : null}
                    {/*          <FixedPlugin
            handleImageClick={this.handleImageClick}
            handleColorClick={this.handleColorClick}
            handleBgColorClick={this.handleBgColorClick}
            handleHasImage={this.handleHasImage}
            color={this.state["color"]}
            bgColor={this.state["bgColor"]}
            bgImage={this.state["image"]}
            handleFixedClick={this.handleFixedClick}
            fixedClasses={this.state.fixedClasses}
            sidebarMinimize={this.sidebarMinimize.bind(this)}
            miniActive={this.state.miniActive}
/>*/}
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    ...state
});

//const mapDispatchToProps = dispatch => ({
//  authAction: () => dispatch(authAction())
//});

const mapDispatchToProps = dispatch => ({
    loginAction: (email, password) => dispatch(loginAction(email, password))
});


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(appStyle)(Dashboard));

//export default connect(mapStateToProps, {})(withStyles(appStyle)(Dashboard));
//export default withStyles(appStyle)(Dashboard);
