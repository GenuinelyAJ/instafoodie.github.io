// A function to toggle Picture In Picture
function togglePiP() {
  if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
  } else {
    if (document.pictureInPictureEnabled) {
      video.requestPictureInPicture();
    }
  }
}