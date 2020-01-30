import {firebase, googleProvider, auth} from "firebaseConfig";

const loginGoogleAction = () => async dispatch => { // const googleProvider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(googleProvider).then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log(result)
        console.log("Sucess Google Account Linked")
        dispatch({type: "login", payload: "true"});
    }).catch(function (error) {
        alert(error);
    })
};

export default loginGoogleAction;
