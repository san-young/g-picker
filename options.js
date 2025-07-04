
document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');
    const targetUrlInput = document.getElementById('targetUrl');
    const saveButton = document.getElementById('save');
    const statusDiv = document.getElementById('status');
    const defaultUrl = 'accounts.google.com/v3/signin/accountchooser';

    chrome.storage.sync.get(['email', 'targetUrl'], function (result) {
        if (result.email) {
            emailInput.value = result.email;
        }
        targetUrlInput.value = result.targetUrl || defaultUrl;
    });

    saveButton.addEventListener('click', function () {
        const email = emailInput.value;
        const targetUrl = targetUrlInput.value;

        chrome.storage.sync.set({email: email, targetUrl: targetUrl}, function () {
            statusDiv.textContent = 'Settings saved.';
            setTimeout(() => {
                statusDiv.textContent = '';
            }, 2000);
        });
    });
});
