import firebase from "firebaseConfig";

//Sergio


const authAction = () => async dispatch => {
  // firebase offers us this function signInWithEmailAndPassword
  // which will automatically create the user for us
  // it only has two arguments, the email and the password
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
   
      console.log(user);
      dispatch({ type: "lauth", payload: "true" });
     // window.location.replace("/admin/dashboard");
    
    } 
  });
    // if the logout was not succesful we can catch the erros here

   
};



export default authAction;