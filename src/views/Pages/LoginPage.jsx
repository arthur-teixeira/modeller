import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import loginAction from "actions/loginAction";
import loginGoogleAction from "actions/loginGoogleAction"
import loginFacebookAction from "actions/loginFacebookAction"
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import LockOutlined from "@material-ui/icons/LockOutlined";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import { firebase, googleProvider, facebookProvider, auth } from "firebaseConfig";
import { Link } from 'react-router-dom';


import Input from '@material-ui/core/Input';

const defaultProps = {
    state: "",
    email: "",
    password: "",
    onChange: () => { } // no need
};

const propTypes = {
    state: PropTypes.string,
    onChange: PropTypes.func
};

class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        //this.props.loginAction();

        // this.state = {
        //   value: ""
        // };
        this.state = {
            email: 'inicio',
            password: '',
            erroLogin: 'hidden'
        };

        // we use this to make the card to appear after the page has been rendered
        this.state = {
            cardAnimaton: "cardHidden"
        };

    }


    componentDidMount() {

        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));

        // we add a hidden class to the card and after 700 ms we delete it and the transition appears
        this.timeOutFunction = setTimeout(
            function () {
                this.setState({ cardAnimaton: "" });
            }.bind(this),
            700
        );
        this.setState({ erroLogin: 'hidden' });

    }

    callApi = async () => {
        const response = await fetch('/auth/login-page');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    componentWillUnmount() {
        clearTimeout(this.timeOutFunction);
        this.timeOutFunction = null;
    }

    handleSubmit(event) {
        event.preventDefault();

    }

    render() {
        if (this.props.authState.loggedIn) {
            //return <Redirect to="/admin/dashboard" />;
            return <Redirect to="/admin/listapipepro" />;
        }

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

        const styleErro = { visibility: this.state.erroLogin, fontSize: '10px', fontWeight: 'bold', color: '#D45974', marginBottom: '0px' };
        return (
            <div className={classes.container}>



                <GridContainer justify="center">
                    <GridItem xs={12} sm={6} md={4}>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <Card login className={classes[this.state.cardAnimaton]}>
                                <CardHeader
                                    className={`${classes.cardHeader} ${classes.textCenter}`}
                                    style={{ backgroundColor: "#365DA8" }}
                                >
                                    {/*  <div className={classes.socialLine}>
                    {[
                      "fas fa-user",
                      "fab fa-google",
                      "fab fa-facebook"
                    
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
                                    <p style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Access Your Account</p>

                                </CardHeader>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Button type="button" style={{ backgroundColor: 'white', flex: 'auto', margin: '10px 40px 10px 40px', color: 'gray' }} round onClick={() =>
                                        this.props.loginFacebookAction()
                                    } >
                                        Access with Facebook
                                        </Button>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Button type="button" style={{ backgroundColor: 'white', flex: 'auto', margin: '10px 40px 10px 40px', color: 'gray' }} round onClick={() =>
                                        this.props.loginGoogleAction()
                                    } >
                                        Access with Google
                                        </Button>
                                </div>

                                <div style={{ height: '2px', backgroundColor: 'darkgray', marginTop: '20px' }}></div>

                                <CardBody style={{ paddingTop: '10px', paddingBottom: '0px' }}>
                                    <center><p style={styleErro}>Invalid Email or Password</p></center>
                                    <CustomInput
                                        style={{ marginTop: '10px' }}
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

                                    <CustomInput
                                        labelText="Password..."
                                        id="password"
                                        value={this.state.value}
                                        onChange={e => {
                                            this.setState({ password: e.target.value });
                                        }}

                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "password",
                                            endAdornment: (

                                                <InputAdornment position="end" >
                                                    <LockOutlined className={classes.inputAdornmentIcon} />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </CardBody>
                                <center><Link to='/auth/reset-page' style={{ fontSize: '10px' }}>Forgot your Password?</Link></center>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Button type="button" style={{ backgroundColor: '#D45974', flex: 'auto', margin: '10px 40px 10px 40px' }} round onClick={() => {
                                        this.setState({ erroLogin: 'visible' })
                                        this.props.loginAction(
                                            this.state.email,
                                            this.state.password
                                        )
                                    }
                                    } >
                                        Login
                                    </Button>
                                </div>
                                <center><Link to='/auth/register-page' style={{ fontSize: '10px' }}>Create Account</Link></center>


                            </Card>

                        </form>

                    </GridItem>
                </GridContainer>

            </div>
        );
    }
}


LoginPage.propTypes = {
    classes: PropTypes.object.isRequired

};

const mapStateToProps = state => ({
    ...state
});
const mapDispatchToProps = dispatch => ({
    loginAction: (email, password) => dispatch(loginAction(email, password)),
    loginGoogleAction: () => dispatch(loginGoogleAction()),
    loginFacebookAction: () => dispatch(loginFacebookAction())
});


//export default withStyles(loginPageStyle)(LoginPage);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(loginPageStyle)(LoginPage));
