import React, { useState, useEffect } from "react";

const intents = {
  hello: [
    "Hi there! 👋",
    "Hello! How are you doing today?",
    "Hey! Ready to explore my projects? 🚀",
  ],
  name: ["My name is DemoBot 🤖", "I’m Cristian’s chatbot assistant 🤝"],
  projects: [
    "I built: Weather App 🌤️, Portfolio Website 💼, and Chatbot 🤖",
    "Check out Cristian’s projects on GitHub: Weather App, Portfolio, Chatbot!",
  ],
  cv: [
    "Cristian Bucur – Front-End Developer skilled in React, JavaScript, and Python 🧑‍💻",
    "You can view Cristian’s CV on GitHub or LinkedIn 📄",
  ],
  jokes: [
    "Why do programmers prefer dark mode? 🌙 Because light attracts bugs 🐛😂",
    "How many programmers does it take to change a lightbulb? None, that’s a hardware problem 💡🤣",
    "Why did the developer go broke? Because he used up all his cache 💸",
    "I would tell you a UDP joke… but you might not get it 📡😂",
    "Why do Java developers wear glasses? Because they don’t see sharp 👓",
  ],
};

function getRandomResponse(responses) {
  return responses[Math.floor(Math.random() * responses.length)];
}

function getBotResponse(message) {
  const msg = message.toLowerCase();

  if (msg.includes("hello") || msg.includes("hi"))
    return getRandomResponse(intents.hello);
  if (msg.includes("name")) return getRandomResponse(intents.name);
  if (msg.includes("project")) return getRandomResponse(intents.projects);
  if (msg.includes("cv") || msg.includes("resume"))
    return getRandomResponse(intents.cv);
  if (msg.includes("joke")) return getRandomResponse(intents.jokes);

  return "I’m not sure about that 🤔, but ask me about my projects, CV, or a joke!";
}

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! I’m Cristian’s chatbot 🤖. Ask me about his projects, CV, or a joke!",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setTyping(true);

    setTimeout(() => {
      const botMessage = { from: "bot", text: getBotResponse(input) };
      setMessages((prev) => [...prev, botMessage]);
      setTyping(false);
    }, 1000);

    setInput("");
  };

  return (
    <div className="chatbot">
      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.from}`}>
            {msg.text}
          </div>
        ))}
        {typing && <div className="message bot typing">Bot is typing...</div>}
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
