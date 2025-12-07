# 🌟 KindTalk AI — Warm AI Companion for Seniors  
*A lightweight AI chat designed for emotional comfort, warm conversation, and friendly support.*
---

## 🧡 About KindTalk

**KindTalk AI** is a gentle, emotionally intelligent chat companion created specifically for elderly users.  
Its mission is to reduce loneliness, provide warm daily conversations, and help seniors feel understood and supported.

The project is designed with **simplicity, warmth, accessibility, and voice interaction** in mind.
---

## ✨ Features

### 🎤 Voice Input  
Speak instead of typing — especially helpful for seniors with weak eyesight or joint pain.

### 🔊 Voice Output (Text-to-Speech)  
AI responses can be read aloud with one click.

### 🧠 Session Memory  
KindTalk remembers the conversation flow within the current session (name, mood, preferences).

### 🅰️ BIG MODE (Accessibility Mode)  
A single “A+” button enlarges all UI elements for users with low vision.  
This mode is saved automatically.

### 💬 Emotionally Supportive AI  
The system prompt is designed to produce:
- warm  
- soft  
- patient  
- emotionally intelligent  
responses.

### ⚡ Powered by Groq LLaMA 3.1  
Extremely fast and free inference powered by Groq servers.

### 🎨 Clean, friendly UI  
Large buttons, soft colors, and simple layouts intended for elderly users.

### 🧍 About Author Page  
Separate author page included (`about.html`) with project description.
---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|----------|
| **HTML / CSS / JavaScript** | Frontend interface |
| **Node.js + Express** | Backend server |
| **Groq API (LLaMA 3.1)** | AI model powering the chat |
| **SpeechRecognition API** | Voice input |
| **SpeechSynthesis API** | Text-to-speech output |
| **LocalStorage** | Saving settings (e.g., Big Mode) |
---

## 🏗️ Project Structure

root/
│
├── index.html
├── about.html
├── script.js
├── style.css
├── server.js
├── package.json
├── .env
└── README.md

---

## 🚀 How to Run Locally

1. Clone the repository:
```
git clone https://github.com/YOUR_USERNAME/kindtalk-ai
cd kindtalk-ai
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file with:
```
GROQ_API_KEY=your_api_key_here
```

4. Add to `.gitignore`:
```
.env
node_modules/
```

5. Start backend:
```
node server.js
```

6. Open UI:
Open `index.html` in your browser.

## 🙋 About the Author
Hi! My name is Dauren.  
I am passionate about AI, accessibility and building useful tools.

Contact: dauren0824@gmail.com

