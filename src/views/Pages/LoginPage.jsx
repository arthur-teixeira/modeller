import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import loginAction from "actions/loginAction";
import loginGoogleAction from "actions/loginGoogleAction"
import loginFacebookAction from "actions/loginFacebookAction"
import PropTypes from "prop-types";

import { Overlap, Header } from '../../components/Login'

class LoginPage extends React.Component {

    render() {
        return (
            <>
                <Overlap />
                <Header />
            </>

        )
    }
}

export default LoginPage