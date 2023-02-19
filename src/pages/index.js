import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

export default function Home() {
  const [messages, setMessages] = useState('');
  const [message, setMessage] = useState([]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });
  }, []);

  const sendMessage = (e) => {
    socket.emit('message', message);
    setMessage('');
};

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          <span>{message.user}: </span>
          <span>{message.text}</span>
        </div>
        ))}
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
    </div>
  );
}
