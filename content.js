let lastPlaybackRate = 1;

function updateAdjustedTime() {
  const videoElement = document.querySelector("video");
  if (videoElement) {
    const speedMultiplier = videoElement.playbackRate;
    
    // Check if playbackRate has changed
    if (speedMultiplier !== lastPlaybackRate) {
      const originalDuration = videoElement.duration;
      const adjustedLength = originalDuration / speedMultiplier;

      // Update the time displayed on the YouTube page
      const originalTimeElement = document.querySelector(".ytp-time-duration");

      if (originalTimeElement) {
        originalTimeElement.textContent = formatTime(adjustedLength);
      }

      lastPlaybackRate = speedMultiplier;
    }
  }
}

function formatTime(seconds) {
    const remainingSeconds = Math.round(seconds%60)
    const minutes = Math.floor(seconds/60)
    const remainingMinutes = Math.round(minutes%60)
    const hours = Math.floor(seconds/3600)
    return `${hours}:${remainingMinutes < 10? '0':''}${remainingMinutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
}

// Listen for changes in the video's playback rate
document.querySelector("video").addEventListener("ratechange", updateAdjustedTime);

// Initial update
updateAdjustedTime();

// Listen for messages from the extension
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getVideoInfo") {
    sendResponse({ adjustedLength: videoElement.duration / videoElement.playbackRate });
  }
});

