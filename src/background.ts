console.log('AA98 Extension background script loaded');

chrome.runtime.onInstalled.addListener((details) => {
  console.log('Extension installed/updated:', details);
  
  chrome.storage.local.set({
    installDate: Date.now(),
    version: chrome.runtime.getManifest().version
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background script received message:', message);
  
  switch (message.type) {
    case 'PAGE_LOADED':
      chrome.storage.local.get(['pageCount'], (result) => {
        const newCount = (result.pageCount || 0) + 1;
        chrome.storage.local.set({ pageCount: newCount });
        console.log('Page loaded count:', newCount);
      });
      sendResponse({ success: true });
      break;
      
    case 'GET_STORAGE_DATA':
      chrome.storage.local.get(null, (data) => {
        sendResponse(data);
      });
      return true;
      
    default:
      sendResponse({ error: 'Unknown message type' });
  }
});

