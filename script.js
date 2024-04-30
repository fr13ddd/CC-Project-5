function setup() {
  noCanvas(); // 告诉 p5 不需要画布

  // 初始化语音合成
  const speech = new p5.Speech();
  speech.onEnd = speechEnded;

  // 初始化语音识别
  const speechRec = new p5.SpeechRec("en-US", gotSpeech);
  speechRec.continuous = true; // 设置为连续识别模式
  speechRec.interimResults = false; // 不显示中间结果

  // 开始语音识别
  speechRec.start();

  // 语音识别回调函数
  function gotSpeech() {
    if (speechRec.resultValue) {
      var inputText = speechRec.resultString; // 识别到的文本
      document.getElementById("speechText").textContent = inputText; // 显示到页面上
    }
  }

  // 语音合成结束的回调函数
  function speechEnded() {
    console.log("Speech has ended.");
  }

  // 开始语音合成
  speech.speak("Hello, welcome to our interactive project!");
}

// 更新 HTML 文件以显示识别到的文本
