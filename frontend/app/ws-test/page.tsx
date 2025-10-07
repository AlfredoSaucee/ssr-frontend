"use client";

import { useEffect, useRef, useState } from "react";

export default function WsTest() {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5025");
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("Connected to server");
    };

    ws.onmessage = (e) => {
      setMessages((prev) => [...prev, e.data]);
    };

    ws.onclose = () => {
      console.log("Disconnected from server");
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
      setMessage(""); // töm input efter skickat
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold">WebSocket Test</h1>

      <div className="flex gap-2 my-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Send
        </button>
      </div>

      <ul className="list-disc pl-4">
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
