import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAeyPK1LOr2219hcbJKPnK1f97ndwTx_QA',
  authDomain: 'shareplay-a.firebaseapp.com',
  projectId: 'shareplay-a',
  storageBucket: 'shareplay-a.appspot.com',
  messagingSenderId: '939014222424',
  appId: '1:939014222424:web:bf839c039ebc5eaa4d502d',
};

// eslint-disable-next-line import/prefer-default-export
export const firebaseApp = initializeApp(firebaseConfig);
