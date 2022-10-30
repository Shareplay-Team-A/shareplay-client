import { loadPage } from './util';

/**
 * Show the page contents
 */
function show() {
  loadPage('pages/share-code.html', () => {
    console.log('Page loaded');
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
