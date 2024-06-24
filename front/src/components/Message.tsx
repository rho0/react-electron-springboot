import React from 'react';
import { ListItem, ListItemText } from '@mui/material';

interface MessageProps {
    user: string;
    text: string;
}

const Message: React.FC<MessageProps> = ({ user, text }) => {
    return (
        <ListItem>
            <ListItemText primary={user} secondary={text} />
        </ListItem>
    );
};

export default Message;

