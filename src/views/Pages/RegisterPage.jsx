import React from "react";
import { connect } from "react-redux";
import registerAction from "actions/registerAction";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";
import Code from "@material-ui/icons/Code";
import Group from "@material-ui/icons/Group";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import LockOutlined from "@material-ui/icons/LockOutlined";
import Check from "@material-ui/icons/Check";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import api from "../../api/axios"

// Sergio
import * as firebase from 'firebase';
import Input from '@material-ui/core/Input';

//Arthur 
import { TopLayer, Overlap, BottomLayer } from '../../components/Register'

const defaultProps = {
  state: "",
  name: "",
  email: "",
  password: "",
  onChange: () => { } // no need
};

const propTypes = {
  state: PropTypes.string,
  onChange: PropTypes.func
};

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: ''
    };

    //this.state = {
    //   checked: []
    // };
    // this.handleToggle = this.handleToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /*handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
 
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
 
    this.setState({
      checked: newChecked
    });
  }*/

  handleSubmit(event) {
    event.preventDefault();
    console.log("name: " + this.state.name); //shows onChanged value in console
    console.log("email: " + this.state.email); //shows onChanged value in console
    console.log("password: " + this.state.password); //shows onChanged value in console

  }

  async register() {
    try {
      if (!this.state.name) {
        alert('Name is required!!!')
        return;
      }
      if (!this.state.email) {
        alert('Email is required!!!')
        return;
      }
      if (!this.state.password) {
        alert('Password is required!!!')
        return;
      }
      let dados_usuario = {
        login: this.state.email,
        nome: this.state.name
      }

      const response = await api.post('/usuario/inserir/', dados_usuario);
      this.props.registerAction(
        this.state.name,
        this.state.email,
        this.state.password
      )
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }
    /*() => {

    }*/
  }

  render() {
    // const { classes } = this.props;
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
      <>
        <TopLayer />
        <Overlap />
        <BottomLayer />
      </>
    )
    // return (
    //     <div className={classes.container}>
    //         {/*<div {...formControlProps}>
    //   {labelText !== undefined ? (
    //      <div htmlFor={id} {...labelProps}>
    //       {labelText}
    //     </div>
    //   ) : null}
    //   <Input
    //     classes={{
    //       root: labelText !== undefined ? "" : classes.marginTop,

    //     }}
    //     id={id}
    //     value={value} ///////// Fixed ////////
    //     onChange={onChange}
    //     inputRef={inputRef}
    //     {...inputProps}
    //   />
    //   </div>*/}
    //         {/* <GridContainer justify="center">
    // <GridItem xs={12} sm={12} md={10}>

    //     <Card className={classes.cardSignup}>
    //       <h2 className={classes.cardTitle}>Register</h2>
    //       <CardBody>
    //         <GridContainer justify="center">


    //         <GridItem xs={12} sm={8} md={5}>
    //           <form className={classes.form}>

    //          <CustomInput
    //            labelText="Name..."
    //            id="name"
    //            value={this.state.value}
    //            onChange={e => {
    //              this.setState({ name: e.target.value });
    //            }}
    //                 formControlProps={{
    //                   fullWidth: true,
    //                   className: classes.customFormControlClasses
    //                 }}
    //                 inputProps={{
    //                   startAdornment: (
    //                     <InputAdornment
    //                       position="start"
    //                       className={classes.inputAdornment}
    //                     >
    //                       <Face className={classes.inputAdornmentIcon} />
    //                     </InputAdornment>
    //                   ),
    //                   placeholder: "Name..."
    //                 }}
    //               />                 

    //               <CustomInput
    //                 labelText="Email..."
    //                 id="email"
    //                 value={this.state.value}
    //                 onChange={e => {
    //                   this.setState({ email: e.target.value });
    //                 }}
    //                formControlProps={{
    //                   fullWidth: true,
    //                   className: classes.customFormControlClasses
    //                 }}
    //                 inputProps={{
    //                   startAdornment: (
    //                     <InputAdornment
    //                       position="start"
    //                       className={classes.inputAdornment}
    //                     >
    //                       <Email className={classes.inputAdornmentIcon} />
    //                     </InputAdornment>
    //                   ),
    //                   placeholder: "Email..."
    //                 }}
    //               />
    //               <CustomInput
    //                 labelText="Password"
    //                 id="password"
    //                 type="password"
    //                 value={this.state.value}
    //                 onChange={e => {
    //                   this.setState({ password: e.target.value });
    //                 }}
    //                 formControlProps={{
    //                   fullWidth: true,
    //                   className: classes.customFormControlClasses
    //                 }}
    //                 inputProps={{
    //                   type: "password",
    //                   startAdornment: (
    //                     <InputAdornment
    //                       position="start"
    //                       className={classes.inputAdornment}
    //                     >
    //                       <LockOutlined className={classes.inputAdornmentIcon}/>
    //                     </InputAdornment>
    //                   ),
    //                   placeholder: "Password..."
    //                 }}

    //               />
    //              <div className={classes.center}>
    //                 <Button round color="primary" type="button"
    //             onClick={() =>
    //               this.props.registerAction(
    //                 this.state.name,
    //                 this.state.email,
    //                 this.state.password
    //               )
    //             } >
    //                   Send
    //                 </Button>
    //                 <h4>Verify your email to email verification</h4>

    //               </div>
    //             </form>
    //           </GridItem>
    //         </GridContainer>
    //       </CardBody>
    //     </Card>
    //   </GridItem>
    // </GridContainer>*/}


    //         <GridContainer justify="center">
    //             <GridItem xs={12} sm={6} md={4}>
    //                 <form onSubmit={this.handleSubmit.bind(this)}>
    //                     <Card login className={classes[this.state.cardAnimaton]}>
    //                         <CardHeader
    //                             className={`${classes.cardHeader} ${classes.textCenter}`}
    //                             style={{ backgroundColor: "#365DA8" }}
    //                         >
    //                             {/*  <div className={classes.socialLine}>
    //             {[
    //               "fas fa-user",
    //               "fab fa-google",
    //               "fab fa-facebook"

    //             ].map((prop, key) => {
    //               return (
    //                 <Button
    //                   color="transparent"
    //                   justIcon
    //                   key={key}
    //                   className={classes.customButtonClass}
    //                 >
    //                   <i className={prop} />
    //                 </Button>
    //               );
    //             })}
    //           </div>*/}
    //                             <p style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Start Right Now</p>

    //                         </CardHeader>

    //                         <CardBody style={{ paddingTop: '10px', paddingBottom: '0px' }}>
    //                             <CustomInput
    //                                 labelText="Name..."
    //                                 id="name"
    //                                 value={this.state.value}
    //                                 onChange={e => {
    //                                     this.setState({ name: e.target.value });
    //                                 }}
    //                                 formControlProps={{
    //                                     fullWidth: true
    //                                 }}
    //                                 inputProps={{
    //                                     endAdornment: (
    //                                         <InputAdornment
    //                                             position="end"
    //                                         >
    //                                             <Face className={classes.inputAdornmentIcon} />
    //                                         </InputAdornment>
    //                                     ),
    //                                 }}
    //                             />
    //                             <CustomInput
    //                                 labelText="Email..."
    //                                 id="email"
    //                                 value={this.state.value}
    //                                 onChange={e => {
    //                                     this.setState({ email: e.target.value });
    //                                 }}
    //                                 formControlProps={{
    //                                     fullWidth: true
    //                                 }}
    //                                 inputProps={{
    //                                     endAdornment: (
    //                                         <InputAdornment position="end">
    //                                             <Email className={classes.inputAdornmentIcon} />
    //                                         </InputAdornment>
    //                                     )
    //                                 }}
    //                             />

    //                             <CustomInput
    //                                 labelText="Password..."
    //                                 id="password"
    //                                 value={this.state.value}
    //                                 onChange={e => {
    //                                     this.setState({ password: e.target.value });
    //                                 }}

    //                                 formControlProps={{
    //                                     fullWidth: true
    //                                 }}
    //                                 inputProps={{
    //                                     type: "password",
    //                                     endAdornment: (

    //                                         <InputAdornment position="end" >
    //                                             <LockOutlined className={classes.inputAdornmentIcon} />
    //                                         </InputAdornment>
    //                                     )
    //                                 }}
    //                             />
    //                         </CardBody>
    //                         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    //                             <Button type="button" style={{ backgroundColor: '#D45974', flex: 'auto', margin: '10px 40px 10px 40px' }} round onClick={() => { this.register() }
    //                             } >
    //                                 Create Account
    //                             </Button>
    //                         </div>


    //                     </Card>

    //                 </form>

    //             </GridItem>
    //         </GridContainer>

    //     </div>
    // );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  registerAction: (name, email, password) =>
    dispatch(registerAction(name, email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(registerPageStyle)(RegisterPage));

//export default withStyles(registerPageStyle)(RegisterPage);
