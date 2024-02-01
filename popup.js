chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(tabs[0].id, { action: "getVideoInfo" }, function (response) {
    document.getElementById("info").innerText = `Adjusted Length: ${response.adjustedLength} seconds`;
  });
});

