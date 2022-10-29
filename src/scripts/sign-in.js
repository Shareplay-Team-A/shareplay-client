import $ from 'jquery';
import {
  createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword,
} from 'firebase/auth';
import { firebaseApp } from './firebase-config';
import { loadPage } from './util';
// eslint-disable-next-line import/no-cycle
import sharingPage from './sharing';

/**
 * Called when sign-in button is clicked
 */
function handleSignInBtnClick() {
  // get firebase auth
  const auth = getAuth(firebaseApp);
  // get elements from the sign-in page
  const emailInput = $('#email');
  const passwordInput = $('#password');

  signInWithEmailAndPassword(auth, emailInput?.val(), passwordInput?.val())
    .then((userCredential) => {
      const { user } = userCredential;
      console.log('signed in: ', user);
      sharingPage.show();
    })
    .catch((error) => {
      console.error(error);
      // eslint-disable-next-line no-alert
      alert('Error Signing In!');
    });
}

/**
 * Called when sign-up button is clicked
 */
function handleSignUpBtnClick() {
  // get firebase auth
  const auth = getAuth(firebaseApp);
  // get elements from the sign-in page
  const emailInput = $('#email');
  const passwordInput = $('#password');

  createUserWithEmailAndPassword(auth, emailInput?.val(), passwordInput?.val())
    .then((userCredential) => {
      const { user } = userCredential;
      console.log('created user: ', user);
      // TODO: send user to db for tracking and sending requests
      sharingPage.show();
    })
    .catch((error) => {
      console.error(error);
      // eslint-disable-next-line no-alert
      alert('Error Creating User!');
    });
}

function handleAuthChange() {
  // when the user is logged in, go to the sharing page automatically
  const auth = getAuth(firebaseApp);
  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if (user) {
      sharingPage.show();
    }
  });
}

/**
 * Called when continue as guest button is clicked
 */
function handleContinueAsGuestBtnClick() {
  sharingPage.show();
}

/**
 * Show the page contents and assign event listeners to buttons on the page
 */
function show() {
  loadPage('pages/sign-in.html', () => {
    handleAuthChange();
    // get elements from the sign-in page
    const signInBtn = $('#sign-in-btn');
    const signUpBtn = $('#sign-up-btn');
    const continueAsGuestBtn = $('#continue-as-guest-btn');
    // have buttons call functions when clicked
    signInBtn.on('click', handleSignInBtnClick);
    signUpBtn.on('click', handleSignUpBtnClick);
    continueAsGuestBtn.on('click', handleContinueAsGuestBtnClick);
  });
}

/**
 * Export this page as an object
 */
const signInPage = {
  show,
};

// eslint-disable-next-line import/prefer-default-export
export default signInPage;
