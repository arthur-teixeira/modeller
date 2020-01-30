import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import userAction from "actions/userAction";
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
import CardIcon from "components/Card/CardIcon.jsx";

import userProfileStyles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.jsx";
import firebase from "firebaseConfig";
// Sergio
import { Link } from 'react-router-dom';

import Input from '@material-ui/core/Input';

const defaultProps = {
  state: "",
  displayName: "",
 
  onChange: () => {} // no need
};

const propTypes = {
  state: PropTypes.string,
  onChange: PropTypes.func
};

class UserProfile extends React.Component {

   constructor(props) {
    super(props);
  
    //this.props.loginAction();
    
   // this.state = {
   //   value: ""
   // };
    this.state = {displayName: ''
    
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
    console.log("displayName: " + this.state.displayName); //shows onChanged value in console
   
   
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
                <i class="fas fa-user" aria-hidden="true"></i>
              </CardIcon>
              <h4 className={classes.cardIconTitle}>
              Meu Perfil - <small>Editar Usuário</small>
              </h4>
            </CardHeader>
            <CardBody profile>
            <CustomInput
                    labelText="Display Name..."
                    id="displayName"
                    value={this.state.value }
                    onChange={e => {
                      this.setState({ displayName: e.target.value });
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                   
                    inputProps={{
                    
                      endAdornment: (
                        <InputAdornment position="end">
                     
                        </InputAdornment>
                      )
                    }}
                  />
           

              <Button type="submit" color="rose" round  simple size="lg" block onClick={() =>
                      this.props.userAction(
                      this.state.displayName
                )
                    }>

                Atualizar
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

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  userAction: (displayName) => dispatch(userAction(displayName))
});

//export default withStyles(userProfileStyles)(UserProfile);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(userProfileStyles)(UserProfile));
