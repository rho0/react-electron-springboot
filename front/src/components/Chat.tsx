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
        await http.get('/index')
            .then((res) => {
                console.log(res);
            }).catch((err) => {
                console.error(err);
        });
    }

    const handleSendMessage = (message: Message) => {

        setMessages([...messages, message]);
    };

    useEffect(() => {
        axiosTest();
    })


    return (
        <Container>
            <Typography variant="h4" gutterBottom>Chat Room</Typography>
            <List>
                {messages.map((message, index) => (
                    <Message key={index} user={message.user} text={message.text} />
                ))}
            </List>
            <ChatInput onSendMessage={handleSendMessage} />
        </Container>
    );
};

export default Chat;


// import React, { useState, useEffect, useRef } from 'react';
// import { Container, Typography, List } from '@mui/material';
// import ChatInput from './ChatInput';
// import Message from './Message';
//
// interface Message {
//     user: string;
//     text: string;
// }
//
// const Chat: React.FC = () => {
//     const [messages, setMessages] = useState<Message[]>([]);
//     const ws = useRef<WebSocket | null>(null);
//
//     useEffect(() => {
//         ws.current = new WebSocket('ws://localhost:8080');
//
//         ws.current.onmessage = (event) => {
//             const message: Message = JSON.parse(event.data);
//             setMessages(prevMessages => [...prevMessages, message]);
//         };
//
//         return () => {
//             if (ws.current) {
//                 ws.current.close();
//             }
//         };
//     }, []);
//
//     const handleSendMessage = (message: Message) => {
//         if (ws.current && ws.current.readyState === WebSocket.OPEN) {
//             ws.current.send(JSON.stringify(message));
//         }
//     };
//
//     return (
//         <Container>
//             <Typography variant="h4" gutterBottom>Chat Room</Typography>
//             <List>
//                 {messages.map((message, index) => (
//                     <Message key={index} user={message.user} text={message.text} />
//                 ))}
//             </List>
//             <ChatInput onSendMessage={handleSendMessage} />
//         </Container>
//     );
// };
//
// export default Chat;
