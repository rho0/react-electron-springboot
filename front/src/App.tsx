// import React from 'react';
// import './App.css';
// import Chat from "./components/Chat";
//
// function App() {
//   return (
//     <div className="App">
//       <Chat />
//     </div>
//   );
// }
//
// export default App;
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const App: React.FC = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        socket.on('message', (message: string) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    const sendMessage = () => {
        if (message) {
            socket.emit('message', message);
            setMessage('');
        }
    };

    return (
        <div>
            <h1>Socket.io Chat</h1>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default App;
