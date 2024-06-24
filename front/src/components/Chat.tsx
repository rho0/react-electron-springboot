import React, {useEffect, useState} from 'react';
import { Container, Typography, List } from '@mui/material';
import ChatInput from './ChatInput';
import Message from './Message';
import http from "../utils/axios";

interface Message {
    user: string;
    text: string;
}

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    const axiosTest = async () => {
        await http.get('/test')
            .then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
        });
    }

    const handleSendMessage = (message: Message) => {
        axiosTest();
        setMessages([...messages, message]);
    };


    return (
        <Container>
            <Typography variant="h4" gutterBottom>Chat Room</Typography>
            <List>
                {messages.map((message, index) => (
                    <Message key={index} user={message.user} text={message.text} />
                ))}
            </List>
            {/*<ChatInput onSendMessage={handleSendMessage} />*/}
        </Container>
    );
};

export default Chat;


// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import ChatInput from './ChatInput';
// import ChatMessage from './ChatMessage';
//
// const socket = io('http://localhost:4000');
//
// interface Message {
//     id: string;
//     message: string;
// }
//
// const Chat: React.FC = () => {
//     const [messages, setMessages] = useState<Message[]>([]);
//     const [socketId, setSocketId] = useState<string>('');
//
//     useEffect(() => {
//         socket.on('connect', () => {
//             setSocketId(socket.id);
//         });
//
//         socket.on('message', (data: Message) => {
//             setMessages((prevMessages) => [...prevMessages, data]);
//         });
//
//         return () => {
//             socket.off('connect');
//             socket.off('message');
//         };
//     }, []);
//
//     const sendMessage = (message: string) => {
//         if (message.trim()) {
//             socket.emit('message', message);
//         }
//     };
//
//     return (
//         <div>
//             <h1>Socket.io Chat</h1>
//             <div className="chat-box">
//                 {messages.map((msg, index) => (
//                     <ChatMessage
//                         key={index}
//                         message={msg}
//                         isOwnMessage={msg.id === socketId}
//                     />
//                 ))}
//             </div>
//             <ChatInput onSendMessage={sendMessage} />
//         </div>
//     );
// };
//
// export default Chat;
