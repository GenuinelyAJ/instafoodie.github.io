// A variable that controls if audio will be captured and what resoulution will the video be in
const constraints = { "video": { width: { max: 800 } }, "audio" : true };

// Variables for the streaming, recording and chunks
var videoStream;
var videoRecord;
var recordedChunks = [];

// A function to get the media of the camera
function toggleRecording() {
 	navigator.mediaDevices.getUserMedia(constraints)
		.then(gotMedia)
		.catch(e => { console.error('getUserMedia() failed: ' + e); });
}

// A function to get a video recording of the camara and check if such variables are available
function gotMedia(stream) {
	videoStream = stream;
  	var video = document.querySelector('video');
  	video.srcObject = stream;
  	try {
    	recorder = new MediaRecorder(stream, {mimeType : "video/webm"});
  	} catch (e) {
    console.error('Exception while creating MediaRecorder: ' + e);
    return;
}
  
videoRecord = recorder;
recorder.ondataavailable = 
	(event) => { recordedChunks.push(event.data); };
	recorder.start(100);
}

// A function to download the recording in webm format
function toggleDownload() {
  	videoRecord.stop();
  	videoStream.getTracks().forEach(track => { track.stop(); });

  	var blob = new Blob(recordedChunks, {type: "video/webm"});
  	var url =  URL.createObjectURL(blob);
  	var a = document.createElement("a");
  	document.body.appendChild(a);
  	a.style = "display: none";
  	a.href = url;
  	a.download = 'Food Vlog.webm';
  	a.click();
  	// setTimeout() here is needed for Firefox.
  	setTimeout(function() { URL.revokeObjectURL(url); }, 100); 
}

// A function to get the elements from the API
function getFullscreenElement() {

	return document.fullscreenElement
		|| document.webkitFullscreenElement
		|| document.mozFullscreenElement
		|| document.mozFullscreenElement;
}

// A function to enable the user to toggle fullscreen on the page selected
function toggleFullscreen() {
	if(getFullscreenElement())
		{
			document.exitFullscreen();
		}
		else
		{
			document.getElementById("video").requestFullscreen().catch(console.log);
		}
}

	document.addEventListener("dblclick", () => {
		toggleFullscreen();
	});

	document.addEventListener("fullscreenchange", () => {
		console.log("Full Screen Initiated.");
});
