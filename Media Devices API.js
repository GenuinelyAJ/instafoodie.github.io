const constraints = { "video": { width: { max: 800 } }, "audio" : true };

var videoStream;
var videoRecord;
var recordedChunks = [];

function toggleRecording() {
  navigator.mediaDevices.getUserMedia(constraints)
      .then(gotMedia)
      .catch(e => { console.error('getUserMedia() failed: ' + e); });
}

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

function getFullscreenElement() {

	return document.fullscreenElement
		|| document.webkitFullscreenElement
		|| document.mozFullscreenElement
		|| document.mozFullscreenElement;
}

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
		console.log("full screen changed!");
});


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