import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000",
  {
    transports: ["websocket"], // Prefer WebSocket
  }
); // Ensure this matches backend port

const Categories = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server with ID:", socket.id);
    });

    socket.on("receiveMsg", (newMessage) => {
      console.log("Message received:", newMessage); 
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
    });

    // return () => {
    //   // socket.off("receiveMsg");
    //   socket.off("connect");
    //   socket.off("disconnect");
    //   socket.off("connect_error");
    // };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMsg", message); // to server
      console.log("Message sent:", message); // Debug
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Comments</h1>
      {
        messages.map((e)=>{
          return <div>
            {e}
          </div>
        })
      }
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Submit</button>
    </div>
  );
};

export default Categories;
