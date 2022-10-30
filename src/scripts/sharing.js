import $ from 'jquery';
import { loadPage } from './util';
import shareCodePage from './share-code';

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
 * Called when enter code button is clicked
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
