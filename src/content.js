// this is a content script that allows us to modify the page we are on: https://developer.chrome.com/docs/extensions/mv3/content_scripts/

import $ from 'jquery';
import io from 'socket.io-client';
import { API_URL } from './scripts/api';

console.log('content.js injected into webpage');

// dummy example code of seraching for the description HTML element of a YouTube video using JQuery
const descriptionElement = $('.ytd-watch-metadata');
console.log('youtube description element: ', descriptionElement);

const videoElements = $('video');
const videoElement = (videoElements.length > 0) ? videoElements[0] : undefined;
console.log('video element', videoElement);

//videoElement.ontimeupdate = (event) => {
//    console.log("video scrubbed", videoElement.currentTime);
//}

/**
 * Connect to our web socket server to listen for real-time updates and send real-time updates
 */
let socket;
let shouldUpdateOthers = true;

if (videoElement) {
    videoElement.onpause = (event) => {
        console.log("video paused");
        if (socket) {
            socket.emit('video-update', { action: 'pause', time: videoElement.currentTime });
        } else {
            console.log("not conneected to shareplay server");
        }
    };

    videoElement.onplay = (event) => {
        console.log("video played");
        if (socket) {
            socket.emit('video-update', { action: 'play', time: videoElement.currentTime });
        } else {
            console.log("not conneected to shareplay server");
        }
    };

    videoElement.ontimeupdate = (event) => {
        console.log("video scrubbed");
        if (videoElement.paused) {
            if (!shouldUpdateOthers) {
                shouldUpdateOthers = true;
                return;
            }

            if (socket) {
                socket.emit('video-update', { action: 'time-update', time: videoElement.currentTime });
            } else {
                console.log("not conneected to shareplay server");
            }
        }
//        if (videoElement.paused) {
//            if (!shouldUpdateOthers) {
//                shouldUpdateOthers = true;
//                return;
//            }
//
//            if (socket) {
//                socket.emit('video-update', { action: 'time-update', time: videoElement.currentTime });
//            } else {
//                console.log("not conneected to shareplay server");
//            }
//        }
    }
}

function setupSocketListeners() {
    socket.on('connect', () => {
        console.log('connected to socket server');
    });

    socket.on('disconnect', () => {
        socket = undefined;
        console.log('disconnected from socket server');
    });

    socket.on('video-update-client', (data) => {
        console.log('got new video data: ', data);
        if (videoElement) {
            if (data?.action === 'play') {
                videoElement.play();
                videoElement.currentTime = data.time;
            } else if (data?.action === 'pause') {
                videoElement.pause();
                videoElement.currentTime = data.time;
            } else if (data?.action === "time-update") {
                videoElement.currentTime = data.time;
                shouldUpdateOthers = false;
            }
//            if (canUpdate) {
//                if (data?.action === 'play') {
//                    videoElement.play();
//                } else if (data?.action === 'pause') {
//                    videoElement.pause();
//                }
//                videoElement.currentTime = data.time;
//                canUpdate = false;
//            } else {
//                canUpdate = true;
//            }
        }
    });
}

/**
 * Example of a message listener, so popup.js can send messages to us and
 * we can handle it here, then we can send a response back to popup.js with some data
 */
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.command === 'connect-to-socket-server') {
        if (socket) {
            console.log('already connected to socket server');
            sendResponse({ result: 'already connected to socket server' });
        } else {
            socket = io(API_URL, {
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                reconnectionAttempts: 1000,
            });
            setupSocketListeners();
            sendResponse({ result: 'connected to socket server' });
        }
    }
  },
);
