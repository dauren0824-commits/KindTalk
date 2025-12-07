const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const quickButtons = document.querySelectorAll(".quick-btn");
const voiceBtn = document.getElementById("voice-btn");
const bigModeBtn = document.getElementById("big-mode-toggle");

let history = [];

// ----------------------
//  Speech Recognition (с проверкой!)
// ----------------------

let recognition = null;

if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.addEventListener("result", (event) => {
    const text = event.results[0][0].transcript;
    userInput.value = text;
    voiceBtn.classList.remove("active");
    sendMessage(text);
  });

  recognition.addEventListener("end", () => {
    voiceBtn.classList.remove("active");
  });
}

voiceBtn.addEventListener("click", () => {
  if (!recognition) {
    alert("Your browser does not support speech recognition.");
    return;
  }

  voiceBtn.classList.add("active");
  recognition.start();
});

// ----------------------
//  Text-to-Speech (только кнопка 🔊)
// ----------------------

function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  utter.rate = 1.0;
  speechSynthesis.speak(utter);
}

// ----------------------
//  Добавление сообщения
// ----------------------

function addMessage(text, sender) {
  const wrapper = document.createElement("div");
  wrapper.className = `message ${sender}`;

  const bubble = document.createElement("span");
  bubble.textContent = text;
  wrapper.appendChild(bubble);

  if (sender === "bot") {
    const speakBtn = document.createElement("button");
    speakBtn.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="#444">
    <path d="M10 17q-.425 0-.712-.288Q9 16.425 9 16V8q0-.425.288-.712Q9.575 7 10 7t.712.288Q11 7.575 11 8v8q0 .425-.288.712Q10.425 17 10 17Zm4.5-2q-.425 0-.713-.288Q13.5 14.425 13.5 14V10q0-.425.287-.712Q14.075 9 14.5 9t.712.288q.288.287.288.712v4q0 .425-.288.712Q14.925 15 14.5 15Zm-9 0q-.425 0-.712-.288Q4.5 14.425 4.5 14V10q0-.425.288-.712Q5.075 9 5.5 9t.712.288q.288.287.288.712v4q0 .425-.288.712Q5.925 15 5.5 15Zm4.5-6q-.425 0-.712-.288Q9 8.425 9 8t.288-.712Q9.575 7 10 7t.712.288Q11 7.575 11 8t-.288.712Q10.425 9 10 9Z"/>
  </svg>
`;

    speakBtn.className = "speak-btn";
    speakBtn.addEventListener("click", () => speak(text));
    wrapper.appendChild(speakBtn);
  }

  chatBox.appendChild(wrapper);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// ----------------------
//  Backend запрос
// ----------------------

async function askAI(text) {
  const response = await fetch("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text, history })
  });

  const data = await response.json();
  const reply = data.reply;

  history.push({ role: "user", content: text });
  history.push({ role: "assistant", content: reply });

  return reply;
}

// ----------------------
//  Основной цикл отправки
// ----------------------

async function sendMessage(text) {
  addMessage(text, "user");
  userInput.value = "";

  const thinking = document.createElement("div");
  thinking.className = "message bot";
  thinking.innerHTML = "<span>Kind Chat is thinking…</span>";
  chatBox.appendChild(thinking);

  try {
    const reply = await askAI(text);
    thinking.remove();
    addMessage(reply, "bot");
  } catch (err) {
    thinking.remove();
    addMessage("Sorry, I had trouble answering.", "bot");
  }
}

// ----------------------
//  Кнопки
// ----------------------

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = userInput.value.trim();
  if (text) sendMessage(text);
});

document.querySelector(".send-btn").addEventListener("click", () => {
  const text = userInput.value.trim();
  if (text) sendMessage(text);
});

quickButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    sendMessage(btn.dataset.text);
  });
});

// ----------------------
//  BIG MODE
// ----------------------

bigModeBtn.addEventListener("click", () => {
  const isOn = document.body.classList.toggle("big-mode");
  bigModeBtn.classList.toggle("active", isOn);
  localStorage.setItem("bigMode", isOn ? "on" : "off");
});

window.addEventListener("load", () => {
  if (localStorage.getItem("bigMode") === "on") {
    document.body.classList.add("big-mode");
    bigModeBtn.classList.add("active");
  }

  addMessage(
    "Hello, dear friend. I'm Kind Chat, your warm and friendly companion. How are you feeling today?",
    "bot"
  );
});

