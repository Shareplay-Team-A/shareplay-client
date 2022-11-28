import $ from 'jquery';
import { getAuth, signOut } from 'firebase/auth';
import { loadPage } from './util';
import shareCodePage from './share-code';
import { firebaseApp } from './firebase-config';
// eslint-disable-next-line import/no-cycle
import signInPage from './sign-in';

/**
 * Example of sending a message to our content script and getting a response.
 * This can be used to get stuff like video title, description, etc.
 */
function sendMessageToContentScript(roomId) {
  // example sending message to content.js
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { greeting: 'hello' }, (response) => {
      console.log(response.farewell);
    });
    chrome.tabs.sendMessage(tabs[0].id, { action: 'connect-to-socket-server', id: roomId }, (response) => {
      console.log(response.result);
    });
  });
}

/**
 * Signs out user
 */
 function handleEnterCodeBtnClick() {
  // To-Do: implement
  const roomId = document.getElementById('enter-code-input').value;
  document.getElementById('enter-code-input').value = '';
  shareCodePage.show(roomId);
  sendMessageToContentScript(roomId);
}

/**
 * Called when create code button is clicked
 */
function handleCreateCodeBtnClick() {
  const roomId = Math.floor(Math.random() * 100000) + 100000;
  shareCodePage.show(roomId);
  sendMessageToContentScript(roomId);
}

/**
 * Signs out User
 */
function handleSignOutBtnClick() {
  // allow user to sign out of firebase auth
  const auth = getAuth(firebaseApp);
  signOut(auth).then(() => {
    console.log('signed out user!');
    signInPage.show();
  }).catch((error) => {
    console.error(error);
  });
}

/**
 * Show the page contents
 */
function show() {
  loadPage('pages/sharing.html', () => {
    console.log('Page loaded');
    // get elements from shareplay page
    const enterCodeBtn = $('#enter-code-btn');
    const createCodeBtn = $('#create-code-btn');
    const signOutBtn = $('#sign-out-btn');
    // have button call functions when clicked
    enterCodeBtn.on('click', handleEnterCodeBtnClick);
    createCodeBtn.on('click', handleCreateCodeBtnClick);
    signOutBtn.on('click', handleSignOutBtnClick);
  });
}

/**
 * Export this page as an object
 */
const sharingPage = {
  show,
};

// eslint-disable-next-line import/prefer-default-export
export default sharingPage;
