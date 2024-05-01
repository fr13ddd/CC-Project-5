let speechRec;
let sentences = [];
let isRecognizing = false; // 用于追踪识别状态的变量

function setup() {
  noCanvas();

  speechRec = new p5.SpeechRec("en-US", gotSpeech);
  speechRec.continuous = true;
  speechRec.interimResults = false;

  let startBtn = document.getElementById("startBtn");
  let stopBtn = document.getElementById("stopBtn");
  let statusText = document.getElementById("status");

  startBtn.addEventListener("click", startRecognition);
  stopBtn.addEventListener("click", stopRecognition);

  function startRecognition() {
    if (!isRecognizing) {
      speechRec.start();
      isRecognizing = true;
      statusText.textContent = "Status: Listening...";
      startBtn.disabled = true;
      stopBtn.disabled = false;
      console.log("Recognition started");
    }
  }

  function stopRecognition() {
    if (isRecognizing) {
      speechRec.stop();
      isRecognizing = false;
      statusText.textContent = "Status: Stopped";
      startBtn.disabled = false;
      stopBtn.disabled = true;
      console.log("Recognition stopped");
    }
  }

  function gotSpeech() {
    if (speechRec.resultValue) {
      let currentText = speechRec.resultString;
      sentences.push(currentText);
      document.getElementById("speechText").textContent =
        sentences.join(". ") + ".";
      statusText.textContent = "Status: Result received";
    }
  }
}
