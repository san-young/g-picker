chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'openOptionsPage') {
        chrome.runtime.openOptionsPage();
    }
});

chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === 'install') {
        chrome.runtime.openOptionsPage();
    }
});
