import $ from 'jquery';
import { loadPage } from './util';

/**
 * Called when back link is clicked
 */
function handleBackLinkClick() {
  // sharingPage.show();
}

/**
 * Show the page contents
 */
function show() {
  loadPage('pages/share-code.html', () => {
    console.log('Page loaded');
    // get elements from share code page
    const backLink = $('#back-link');
    // have button call functions when clicked
    backLink.on('click', handleBackLinkClick);
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
