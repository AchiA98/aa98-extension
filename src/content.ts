console.log('AA98 Extension content script loaded');

function initContentScript() {
  console.log('Initializing content script on:', window.location.href);
  
  chrome.runtime.sendMessage({
    type: 'PAGE_LOADED',
    url: window.location.href,
    timestamp: Date.now()
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContentScript);
} else {
  initContentScript();
}

chrome.runtime.onMessage.addListener((message: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) => {
  console.log('Content script received message:', message);
  
  switch (message.type) {
    case 'GET_PAGE_INFO':
      sendResponse({
        title: document.title,
        url: window.location.href,
        timestamp: Date.now()
      });
      break;
    default:
      sendResponse({ error: 'Unknown message type' });
  }
});