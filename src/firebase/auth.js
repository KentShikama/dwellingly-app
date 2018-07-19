import firebase from 'firebase';

const provider = new firebase.auth.GoogleAuthProvider();

// Sign Up a user with email address and password
export function doCreateUserWithEmailAndPassword(email, password) {
  console.log('creating user:', email, password);
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(
      console.log('user created'),
    )
    .catch((error) => {
      // Handle Errors here.
      console.log(error);
    });
}

// Sign In user with email address and password
export function doSignInWithEmailAndPassword(email, password) {
  console.log('signing in with', email, password);
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error) => {
      // Handle Errors here.
      console.log(error.code, error.message);
    });
}

// Sign in user with Google OAuth
export function doSignInWithGoogle() {
  firebase.auth().signInWithPopup(provider).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const token = result.credential.accessToken;
    // The signed-in user info.
    const { user } = result.user;
    // ...
    console.log(user, token);
  }).catch((error) => {
    // Handle Errors here.
    const { errorCode } = error.code;
    const { errorMessage } = error.message;
    // The email of the user's account used.
    const { email } = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const { credential } = error.credential;
    console.log(errorCode, errorMessage, email, credential);
    // ...
  });
}

// Get user profile info
export function getUserProfile() {
  const { currentUser } = firebase.auth().currentUser;
  let name;
  let email;
  let photoUrl;
  let emailVerified;
  let uid;

  if (currentUser !== null) {
    ({ name } = currentUser.displayName);
    ({ email } = currentUser.email);
    ({ photoUrl } = currentUser.photoURL);
    ({ emailVerified } = currentUser.emailVerified);
    ({ uid } = currentUser.uid);
    console.log(name, email, photoUrl, uid, emailVerified);

    currentUser.providerData.forEach((profile) => {
      console.log('Sign-in provider: ', profile.providerId);
      console.log('  Provider-specific UID: ', profile.uid);
      console.log('  Name: ', profile.displayName);
      console.log('  Email: ', profile.email);
      console.log('  Photo URL: ', profile.photoURL);
    });
  }
}


// Sign out
export function doSignOut() {
  firebase.auth().signOut()
    .then(console.log('loggedout'));
}

// Password Reset
export function doPasswordReset(email) {
  firebase.auth().sendPasswordResetEmail(email);
}

// Password Change
export function doPasswordUpdate(password) {
  firebase.auth().currentUser.updatePassword(password);
}
