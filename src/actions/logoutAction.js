import firebase from "firebaseConfig";

//Sergio


const logoutAction = () => async dispatch => {
  // firebase offers us this function signInWithEmailAndPassword
  // which will automatically create the user for us
  // it only has two arguments, the email and the password
  firebase
    .auth()
    .signOut()
    // then() function is used to know when the async call has ended
    // that way, we can notify our reducers that login was succesful

    .then(function() {
      // if the logout was succesful, then
      // we dispatch to our reducers the fact that
      // login was succesful by sending true
     // localStorage.setItem('firebase_auth', user)
     // dispatch({ type: "login", payload: "false" });
    window.location.replace("/auth/login-page");
    })
    // if the logout was not succesful we can catch the erros here

    .catch(function(error) {
      // if we have any erros, we'll throw an allert with that error
      console.log(error);
      alert(error);
   });
 
};

export default logoutAction;

