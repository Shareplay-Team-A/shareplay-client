import $ from 'jquery';
import { loadPage } from './util';
import shareCodePage from './share-code';

/**
 * Example of sending a message to our content script and getting a response.
 * This can be used to get stuff like video title, description, etc.
 */
function sendMessageToContentScript() {
  // example sending message to content.js
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { greeting: 'hello' }, (response) => {
      console.log(response.farewell);
    });
    chrome.tabs.sendMessage(tabs[0].id, { action: 'connect-to-socket-server' }, (response) => {
      console.log(response.result);
    });
  });
}

/**
 * Called when enter code button is clicked
 */
function handleEnterCodeBtnClick() {
  // To-Do: implement
}

/**
 * Called when create code button is clicked
 */
function handleCreateCodeBtnClick() {
  shareCodePage.show();
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
    // have button call functions when clicked
    enterCodeBtn.on('click', handleEnterCodeBtnClick);
    createCodeBtn.on('click', handleCreateCodeBtnClick);
    sendMessageToContentScript();
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
