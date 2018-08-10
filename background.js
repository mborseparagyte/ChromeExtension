siteURL = "";
accessKey = "";
chrome.runtime.onMessage.addListener(function(request) {
  if (request.greeting == "setSiteURL") {
    siteURL = request.siteURL;
    accessKey = request.accessKey;
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.greeting == "requestForURL") {
    //alert(siteURL);
    sendResponse({ replyURL: siteURL, accessKey: accessKey });
  }
});

chrome.contextMenus.create({
  title: "Change URL",
  contexts: ["browser_action"],
  onclick: function() {
    chrome.tabs.create(
      {
        url: chrome.extension.getURL("popup.html"),
        active: false
      },
      function(tab) {
        // After the tab has been created, open a window to inject the tab
        chrome.windows.create({
          tabId: tab.id,
          type: "popup",
          height: 200,
          width: 360,
          focused: true
        });
      }
    );
  }
});
