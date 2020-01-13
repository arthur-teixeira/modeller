import firebase from "firebaseConfig";

const userAction = (displayName) => async dispatch => {
  // firebase offers us this function signInWithEmailAndPassword
  // which will automatically create the user for us
  // it only has two arguments, the email and the password
  

var user = firebase.auth().currentUser;
var name, uid;

if (user != null) {
  name = user.displayName;
  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.

user.updateProfile({
 displayName: displayName
                    
}).then(function() {
alert("displayName: "+displayName);
}).catch(function(error) {
                    // An error happened.
});

 alert("displayName: "+name+"\nuid: "+uid);
  
}

/*
user.updateProfile({
  displayName: displayName
  
}).then(function() {
  alert("displayName: "+displayName);
}).catch(function(error) {
  // An error happened.
});
*/

/*
var name, uid;

if (user != null) {
  name = user.displayName;
  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.

 alert("displayName: "+name+"\nuid: "+uid);
  
}
*/

};





/*
const userAction = (email, password, cpassword) => async dispatch => {
  // firebase offers us this function signInWithEmailAndPassword
  // which will automatically create the user for us
  // it only has two arguments, the email and the password

  var user = firebase.auth().currentUser;
  var vsenha = password;
  var vsenha2 = cpassword;
  
  if (vsenha != vsenha2)
	{ 
    alert("SENHAS DIFERENTES!\\nFAVOR DIGITAR SENHAS IGUAIS");
  }
	else
	{
    firebase.auth().user.updatePassword(password).then(function() {
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    });
  }
};
*/
export default userAction;
