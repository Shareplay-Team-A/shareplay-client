import $ from 'jquery';
import { loadPage } from './util';

/**
 * Called when back link is clicked
 */
function handleLeaveLinkClick() {
  // sharingPage.show();
}

/**
 * Show the page contents
 */
function show(roomId) {
  loadPage('pages/share-code.html', () => {
    console.log('Page loaded');
    const el = document.getElementById('share-code');
    const text = document.createTextNode(roomId);
    el.appendChild(text);
    // get elements from share code page
    const leaveLink = $('#leave-link');
    // have button call functions when clicked
    leaveLink.on('click', handleLeaveLinkClick);
  });
}

/**
 * Export this page as an object
 */
const shareCodePage = {
  show,
};

// eslint-disable-next-line import/prefer-default-export
export default shareCodePage;
