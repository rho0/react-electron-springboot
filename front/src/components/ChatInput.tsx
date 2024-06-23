import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';

interface ChatInputProps {
    onSendMessage: (message: { user: string, text: string }) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
    const [text, setText] = useState('');
    const [user, setUser] = useState('');

    const handleSend = () => {
        if (text.trim() && user.trim()) {
            onSendMessage({ user, text });
            setText('');
        }
    };

    return (
        <Container>
            <TextField
                label="User"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Message"
                value={text}
                onChange={(e) => setText(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSend}>
                Send
            </Button>
        </Container>
    );
};

export default ChatInput;
