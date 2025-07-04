
window.addEventListener('load', function () {
    const defaultUrlPath = "accounts.google.com/v3/signin/accountchooser";
    const continueUrlPart = "https%3A%2F%2Faccounts.google.com%2Fo%2Fsaml2%2Fcontinue";

    chrome.storage.sync.get(['email', 'targetUrl'], function (result) {
        const targetUrlPart = result.targetUrl || defaultUrlPath;

        if (window.location.href.includes(targetUrlPart) && window.location.href.includes(continueUrlPart)) {
            if (result.email) {
                observeAccountButton(result.email);
            } else {
                chrome.runtime.sendMessage({ action: 'openOptionsPage' });
            }
        }
    });
});

function observeAccountButton(email) {
    const accountButtonSelector = `div[data-email="${email}"]`;

    let accountButton = document.querySelector(accountButtonSelector);
    if (accountButton) {
        accountButton.click();
        return;
    }

    const observer = new MutationObserver(function (mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                let accountButton = document.querySelector(accountButtonSelector);
                if (accountButton) {
                    accountButton.click();
                    return;
                }
            }
        }
    });

    observer.observe(document.body, {
        childList: true, subtree: true
    });
}
