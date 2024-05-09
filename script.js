let speechRec;
let sentences = [];
let isRecognizing = false; // 用于追踪识别状态的变量

function setup() {
  noCanvas();

  speechRec = new p5.SpeechRec("en-US", gotSpeech);
  speechRec.continuous = true;
  speechRec.interimResults = false;
  speechRec.onError = handleError; // 错误处理

  let toggleBtn = document.getElementById("startBtn"); // 使用同一个按钮
  let statusText = document.getElementById("status");

  toggleBtn.addEventListener("click", toggleRecognition);

  function toggleRecognition() {
    if (!isRecognizing) {
      try {
        speechRec.start();
        isRecognizing = true;
        statusText.textContent = "Status: Listening...";
        toggleBtn.textContent = "Stop"; // 改变按钮文本为“Stop”
        console.log("Recognition started");
      } catch (error) {
        console.error("Failed to start recognition:", error);
      }
    } else {
      speechRec.stop();
      isRecognizing = false;
      statusText.textContent = "Status: Stopped";
      toggleBtn.textContent = "Start"; // 改变按钮文本为“Start”
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

  function handleError(error) {
    console.error("Speech recognition error:", error);
    statusText.textContent = "Error: " + error.message;
  }
}
