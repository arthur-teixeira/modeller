import firebase from "firebaseConfig";



const resetAction = (email) => async dispatch => {
  // firebase offers us this function signInWithEmailAndPassword
  // which will automatically create the user for us
  // it only has two arguments, the email and the password

  var actionCodeSettings = {
    // After password reset, the user will be give the ability to go back
    // to this page.
    url: 'http://localhost:3000/auth/login-page',
    handleCodeInApp: false
  };

  firebase.auth().sendPasswordResetEmail(email, actionCodeSettings)
  .then(function (user) {
  //  dispatch({ type: "login", payload: "true" });
    //alert('Verifique o seu email...')
   window.location.replace("/login-page");
  }).catch(function (e) {
    console.log(e)
  })
};

export default resetAction;
