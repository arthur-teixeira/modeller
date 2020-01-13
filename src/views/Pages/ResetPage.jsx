import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import resetAction from "actions/resetAction";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import logo from "logo_02.png";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import firebase from "firebaseConfig";
// Sergio

import Input from '@material-ui/core/Input';

const defaultProps = {
    state: "",
    email: "",
    onChange: () => { } // no need
};

const propTypes = {
    state: PropTypes.string,
    onChange: PropTypes.func
};

class ResetPage extends React.Component {

    constructor(props) {
        super(props);

        //this.props.loginAction();

        // this.state = {
        //   value: ""
        // };
        this.state = {
            email: '',
            password: ''
        };

        // we use this to make the card to appear after the page has been rendered
        this.state = {
            cardAnimaton: "cardHidden"
        };

    }
    componentDidMount() {



        // we add a hidden class to the card and after 700 ms we delete it and the transition appears
        this.timeOutFunction = setTimeout(
            function () {
                this.setState({ cardAnimaton: "" });
            }.bind(this),
            700
        );

    }

    componentWillUnmount() {
        clearTimeout(this.timeOutFunction);
        this.timeOutFunction = null;
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("email: " + this.state.email); //shows onChanged value in console
        // console.log("password: " + this.state.password); //shows onChanged value in console

    }


    render() {

        // if (this.props.authState.loggedIn) {
        //return <Redirect to="/admin/dashboard" />;
        //  return <Redirect to="/admin/user-page" />;
        // }

        const {
            classes,
            formControlProps,
            value,
            onChange,
            labelText,
            id,
            labelProps,
            inputRef,
            inputProps
        } = this.props;
        return (
            <div className={classes.container}>

                {/* <div {...formControlProps}>
          {labelText !== undefined ? (
             <div htmlFor={id} {...labelProps}>
              {labelText}
            </div>
          ) : null}
          <Input
            classes={{
              root: labelText !== undefined ? "" : classes.marginTop,
        
            }}
            id={id}
            value={value} ///////// Fixed ////////
            onChange={onChange}
            inputRef={inputRef}
            {...inputProps}
          />
          </div>*/}

                <GridContainer justify="center">
                    <GridItem xs={12} sm={6} md={4}>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <Card login className={classes[this.state.cardAnimaton]}>
                                <CardHeader
                                    className={`${classes.cardHeader} ${classes.textCenter}`}
                                    style={{ backgroundColor: "#365DA8" }}
                                >
                                    {/*<div className={classes.socialLine}>
                    {[
                      "fas fa-user"
                     ].map((prop, key) => {
                      return (
                        <Button
                          color="transparent"
                          justIcon
                          key={key}
                          className={classes.customButtonClass}
                        >
                          <i className={prop} />
                        </Button>
                      );
                    })}
                  </div>*/}
                                    <p style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Reset your Password</p>

                                </CardHeader>
                                <CardBody>

                                    <CustomInput
                                        labelText="Email..."
                                        id="email"
                                        value={this.state.value}
                                        onChange={e => {
                                            this.setState({ email: e.target.value });
                                        }}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Email className={classes.inputAdornmentIcon} />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </CardBody>
                                <CardFooter className={classes.justifyContentCenter}>
                                    <Button type="button" style={{ backgroundColor: '#D45974', flex: 'auto', margin: '10px 40px 10px 40px' }} round onClick={() => {
                                        this.props.resetAction(
                                            this.state.email)
                                    }
                                    } >
                                        Reset
                                    </Button>
                                </CardFooter>
                                <CardFooter className={classes.justifyContentCenter}>
                                    Verify your email after reset
                </CardFooter>
                            </Card>
                        </form>
                    </GridItem>
                </GridContainer>

            </div>
        );
    }
}


ResetPage.propTypes = {
    classes: PropTypes.object.isRequired

};

const mapStateToProps = state => ({
    ...state
});
const mapDispatchToProps = dispatch => ({
    resetAction: (email) => dispatch(resetAction(email))
});


//export default withStyles(loginPageStyle)(LoginPage);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(loginPageStyle)(ResetPage));
