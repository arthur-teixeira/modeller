import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import passwordAction from "actions/passwordAction";
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
import CardIcon from "components/Card/CardIcon.jsx";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import firebase from "firebaseConfig";
// Sergio
import { Link } from 'react-router-dom';

import Input from '@material-ui/core/Input';

const defaultProps = {
  state: "",
  email: "",
  password: "",
  repassword: "",
  onChange: () => {} // no need
};

const propTypes = {
  state: PropTypes.string,
  onChange: PropTypes.func
};

class UserPassword extends React.Component {

   constructor(props) {
    super(props);
  
    //this.props.loginAction();
    
   // this.state = {
   //   value: ""
   // };
    this.state = {email: '',
    password: '',
    repassword: ''
     };

    // we use this to make the card to appear after the page has been rendered
  this.state = {
     cardAnimaton: "cardHidden"  
  };

  }
  componentDidMount() {
 
    

    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function() {
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
    console.log("password: " + this.state.password); //shows onChanged value in console
    console.log("repassword: " + this.state.repassword); //shows onChanged value in console
   
  }
  

  render() {

 
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
     
        <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={4}>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Card profile>
          <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <i class="fa fa-key" aria-hidden="true"></i>
              </CardIcon>
              <h4 className={classes.cardIconTitle}>
                Security - <small>Change My Password</small>
              </h4>
            </CardHeader>
            <CardBody profile>
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
           <CustomInput
                    labelText="Password"
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
                          <LockOutlined className={classes.inputAdornmentIcon}/>
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Confirm Password"
                    id="repassword"
                    value={this.state.value}
                    onChange={e => {
                    this.setState({ repassword: e.target.value });
                    }}

                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "password",
                      endAdornment: (
                     
                        <InputAdornment position="end" >
                          <LockOutlined className={classes.inputAdornmentIcon}/>
                        </InputAdornment>
                      )
                    }}
                  />

              <Button type="submit" color="rose" round  simple size="lg" block onClick={() =>
                      this.props.passwordAction(
                      this.state.email,
                      this.state.password,
                      this.state.repassword
                      )
                    }>

                Update
              </Button>
            </CardBody>
          </Card>
          </form>
        </GridItem>
        </GridContainer>
        
      </div>
   );
  }
}


UserPassword.propTypes = {
  classes: PropTypes.object.isRequired
  
};

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  passwordAction: (email, password, repassword) => dispatch(passwordAction(email, password, repassword))
});


//export default withStyles(loginPageStyle)(LoginPage);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(loginPageStyle)(UserPassword));
