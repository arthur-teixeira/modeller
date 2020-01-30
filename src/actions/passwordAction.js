import firebase from "firebaseConfig";

const passwordAction = (email, password, repassword) => async dispatch => {
  // firebase offers us this function signInWithEmailAndPassword
  // which will automatically create the user for us
  // it only has two arguments, the email and the password
 
 //alert("Email: "+email+"\nSenha1: "+password+"\nSenha2: "+repassword);
  

  var user = firebase.auth().currentUser;
  var vsenha = password;
  var vsenha2 = repassword;
  
  if (vsenha != vsenha2)
	{ 
    alert("SENHAS DIFERENTES!\\nFAVOR DIGITAR SENHAS IGUAIS");
  }
	else
	{
    firebase.auth().user.updatePassword(password).then(function() {
      // Update successful.
	  alert("Email: "+email+"\nSenha1: "+password+"\nSenha2: "+repassword);
    }).catch(function(error) {
      // An error happened.
    });
  }
  
};

export default passwordAction;
