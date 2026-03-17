let preview = document.getElementById("preview");
let recording = document.getElementById("recording");
let startButton = document.getElementById("startButton");
let stopButton = document.getElementById("stopButton");
let downloadButton = document.getElementById("downloadButton");
let logElement = document.getElementById("log");

let mediaRecorder;
let recordedChunks = [];
let currentStream;

// Logging
function log(msg) {
  logElement.textContent += msg + "\n";
}

// Start recording
startButton.addEventListener("click", async () => {
  try {
    currentStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    preview.srcObject = currentStream;

    recordedChunks = [];
    mediaRecorder = new MediaRecorder(currentStream);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);

      recording.src = url;
      downloadButton.href = url;
      downloadButton.download = "recorded-video.webm";

      log(`✅ Recording finished (${blob.size} bytes)`);
    };

    mediaRecorder.start();
    log("🎬 Recording started...");

  } catch (err) {
    log("❌ Error: " + err.message);
  }
});

// Stop recording
stopButton.addEventListener("click", () => {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
    log("⏹ Recording stopped");
  }

  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
  }
});
