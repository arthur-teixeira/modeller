import {firebase, facebookProvider, auth} from "firebaseConfig";

const loginGoogleAction = () => async dispatch => { 
    auth.signInWithPopup(facebookProvider).then(function(result){
        var token = result.credential.accessToken;
        var user = result.user;
        console.log(result)
        console.log("Sucess Facebook Account Linked")
        dispatch({type: "login", payload: "true"});
    }).catch(function(error){
        alert(error);    
    })
};

export default loginGoogleAction;
