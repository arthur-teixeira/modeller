import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Menu from "@material-ui/icons/Menu";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";
import LockOpen from "@material-ui/icons/LockOpen";
import MonetizationOn from "@material-ui/icons/MonetizationOn";

// core components
import Button from "components/CustomButtons/Button";

import authNavbarStyle from "assets/jss/material-dashboard-pro-react/components/authNavbarStyle.jsx";

import loginAction from "actions/loginAction";
import { connect } from "react-redux";
import logo from "logo_02.png";


class AuthNavbar extends React.Component {
    constructor(props) {
        super(props);

        // this.props.loginAction();

        this.state = {
            open: false
        };
    }
    handleDrawerToggle = () => {
        this.setState({ open: !this.state.open });
    };
    // verifies if routeName is the one active (in browser input)
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
    }
    componentDidUpdate(e) {
        if (e.history.location.pathname !== e.location.pathname) {
            this.setState({ open: false });
        }
    }
    render() {
        const { classes, color, brandText } = this.props;
        const appBarClasses = cx({
            [" " + classes[color]]: color
        });
        var list = (
            <List className={classes.list}>
                {/* <ListItem className={classes.listItem}>
          <NavLink to={"/admin/dashboard"} className={classes.navLink}>
            <Dashboard className={classes.listItemIcon} />
            <ListItemText
              primary={"Dashboard"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </NavLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavLink
            to={"/auth/pricing-page"}
            className={cx(classes.navLink, {
              [classes.navLinkActive]: this.activeRoute("/auth/pricing-page")
            })}
          >
            <MonetizationOn className={classes.listItemIcon} />
            <ListItemText
              primary={"Pricing"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </NavLink>
          </ListItem>
        <ListItem className={classes.listItem}>
          <NavLink
            to={"/auth/register-page"}
            className={cx(classes.navLink, {
              [classes.navLinkActive]: this.activeRoute("/auth/register-page")
            })}
          >
            <PersonAdd className={classes.listItemIcon} />
            <ListItemText
              primary={"Register"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </NavLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavLink
            to={"/auth/login-page"}
            className={cx(classes.navLink, {
              [classes.navLinkActive]: this.activeRoute("/auth/login-page")
            })}
          >
            <Fingerprint className={classes.listItemIcon} />
            <ListItemText
              primary={"Login"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </NavLink>
        </ListItem>
       {  <ListItem className={classes.listItem}>
          <NavLink
            to={"/auth/lock-screen-page"}
            className={cx(classes.navLink, {
              [classes.navLinkActive]: this.activeRoute(
                "/auth/lock-screen-page"
              )
            })}
          >
            <LockOpen className={classes.listItemIcon} />
            <ListItemText
              primary={"Lock"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </NavLink>
        </ListItem>}*/}
            </List>
        );
        return (
            <div color="white" style={{ height: "180px" }}>
                <center><img src={logo} width='250px' style={{ marginTop: '50px' }}></img></center>
                {/* <AppBar position="static" className={classes.appBar + appBarClasses} color="white">
                    <Toolbar className={classes.container}>
                    <Hidden smDown>
                        <div className={classes.flex}>
                            <Button href="#" className={classes.title} color="transparent">
                                {/* {brandText} */}
                {/*                </Button>
                        </div>
                    </Hidden>
                    <Hidden mdUp>
                        <div className={classes.flex}>
                            <Button href="#" className={classes.title} color="transparent">
                                Pipepro
                            </Button>
                        </div>
                    </Hidden>
                    <Hidden smDown>{list}</Hidden>
                    <Hidden mdUp>
                        <Button
                            className={classes.sidebarButton}
                            color="transparent"
                            justIcon
                            aria-label="open drawer"
                            onClick={this.handleDrawerToggle}
                        >
                            <Menu />
                        </Button>
                    </Hidden>
                    <Hidden mdUp>
                        <Hidden mdUp>
                            <Drawer
                                variant="temporary"
                                anchor={"right"}
                                open={this.state.open}
                                classes={{
                                    paper: classes.drawerPaper
                                }}
                                onClose={this.handleDrawerToggle}
                                ModalProps={{
                                    keepMounted: true // Better open performance on mobile.
                                }}
                            >
                                {list}

                            </Drawer>
                        </Hidden>
                    </Hidden>
                </Toolbar>

            </AppBar>*/}

            </div>

        );
    }
}

AuthNavbar.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
    brandText: PropTypes.string
};

const mapStateToProps = state => ({
    ...state
});


const mapDispatchToProps = dispatch => ({
    loginAction: (email, password) => dispatch(loginAction(email, password))
});

//export default withStyles(authNavbarStyle)(AuthNavbar);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(authNavbarStyle)(AuthNavbar));