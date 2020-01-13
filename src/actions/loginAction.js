import firebase from "firebaseConfig";



const loginAction = (email, password) => async dispatch => {
  // firebase offers us this function signInWithEmailAndPassword
  // which will automatically create the user for us
  // it only has two arguments, the email and the password

 /* firebase.auth().onAuthStateChanged(function(user) {
  
    if (user) {
   
      console.log(user);
      dispatch({ type: "login", payload: "true" });
     // window.location.replace("/admin/dashboard");
    
    } else
    {
      firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      // then() function is used to know when the async call has ended
      // that way, we can notify our reducers that login was succesful
  
      .then(function(user) {
        // if the login was succesful, then
        // we dispatch to our reducers the fact that
        // login was succesful by sending true
       // localStorage.setItem('firebase_auth', user)
        dispatch({ type: "login", payload: "true" });
       
        
        //firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      })
      // if the login was not succesful we can catch the erros here
  
      .catch(function(error) {
        // if we have any erros, we'll throw an allert with that error
  
        alert(error);
      });

    }
  });
*/
  
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    // then() function is used to know when the async call has ended
    // that way, we can notify our reducers that login was succesful

    .then(function(user) {
      if (!firebase.auth().currentUser.emailVerified){
        firebase.auth().signOut();      
        dispatch({ type: "login", payload: "false" });
 //       window.location.replace("/auth/login-page");

      } else {
      // if the login was succesful, then
      // we dispatch to our reducers the fact that
      // login was succesful by sending true
     // localStorage.setItem('firebase_auth', user)
        dispatch({ type: "login", payload: "true" });
      }
     
      
      //firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    })
    // if the login was not succesful we can catch the erros here

    .catch(function(error) {
      // if we have any erros, we'll throw an allert with that error

      alert(error);
    });
   


    /*
    firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function(user) {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    dispatch({ type: "login", payload: "true" });
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });*/
};





export default loginAction;
