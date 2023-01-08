// A function to toggle Picture In Picture
function togglePiP() {
  if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
// If PiP is enabled, the video will be placed in PiP
  } else {
    if (document.pictureInPictureEnabled) {
      video.requestPictureInPicture();
    }
  }
}