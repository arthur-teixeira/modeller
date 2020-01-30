import React from "react";
//Sergio
import { connect } from "react-redux";
import logoutAction from "actions/logoutAction";
import {Link} from 'react-router-dom';

import classNames from "classnames";
import PropTypes from "prop-types";
// import { Manager, Target, Popper } from "react-popper";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import Popper from "@material-ui/core/Popper";

// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";

// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import adminNavbarLinksStyle from "assets/jss/material-dashboard-pro-react/components/adminNavbarLinksStyle.jsx";

class HeaderLinks extends React.Component {
  state = {
    open: false
  };
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handlelogout = () => {
    this.props.logoutAction();
  };

  render() {
    const { classes, rtlActive } = this.props;
    const { open } = this.state;
    const searchButton =
      classes.top +
      " " +
      classes.searchButton +
      " " +
      classNames({
        [classes.searchRTL]: rtlActive
      });
    const dropdownItem = classNames(
      classes.dropdownItem,
      classes.primaryHover,
      { [classes.dropdownItemRTL]: rtlActive }
    );
    const wrapper = classNames({
      [classes.wrapperRTL]: rtlActive
    });
    const managerClasses = classNames({
      [classes.managerClasses]: true
    });
    return (
      <div className={wrapper}>
        
        <Button
          color="transparent"
          simple
          aria-label="Dashboard"
          justIcon
          className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
          muiClasses={{
            label: rtlActive ? classes.labelRTL : ""
          }}
        >
       
        </Button>
        <div className={managerClasses}>
          <Popper
            open={open}
            anchorEl={this.anchorEl}
            transition
            disablePortal
            placement="bottom"
            className={classNames({
              [classes.popperClose]: !open,
              [classes.pooperResponsive]: true,
              [classes.pooperNav]: true
            })}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown}>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList role="menu">
                      <MenuItem
                       onClick={this.handleClose}
                        className={dropdownItem}
                        component={Link}
                        to="/admin/user-page"
                      >
                        {rtlActive
                          ? " "
                          : "Profile"}
                      </MenuItem>
                      

                      <MenuItem
                       onClick={this.handleClose}
                        className={dropdownItem}
                        component={Link}
                        to="/admin/user-password"
                      >
                        {rtlActive
                          ? " "
                          : "Change Password"}
                      </MenuItem>

                      <MenuItem
                        onClick={this.handlelogout}
                        
                        className={dropdownItem}
                      >
                        {rtlActive
                          ? " "
                          : "Logout"}
              
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
        <Button
          color="transparent"
          aria-label="Person"
          justIcon

          aria-owns={open ? "menu-list" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
  
          className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
          muiClasses={{
            label: rtlActive ? classes.labelRTL : ""
          }}
          buttonRef={node => {
            this.anchorEl = node;
          }}
         // onClick={() =>
         //   this.props.logoutAction()
          //}
        >
          <Person
            className={
              classes.headerLinksSvg +
              " " +
              (rtlActive
                ? classes.links + " " + classes.linksRTL
                : classes.links)
            }
          />
          <Hidden mdUp implementation="css">
            <span className={classes.linkText}>
              {rtlActive ? "الملف الشخصي" : "Profile"}
            </span>
          </Hidden>
        </Button>
      </div>
    );
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired,
  rtlActive: PropTypes.bool
};

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
 logoutAction: () => dispatch(logoutAction())
});

//export default withStyles(adminNavbarLinksStyle)(HeaderLinks);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminNavbarLinksStyle)(HeaderLinks));