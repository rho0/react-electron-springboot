import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react';
import './App.css';
import socketClient from "./utils/socket";

interface Message { name: string, message: string, id: string|undefined }
const App: FC = () => {
    // const [messageList, setMessageList] = useState<Message[]>([]);
    // const [name, setName] = useState('');
    // const [value, setValue] = useState('');
    // const socket = socketClient;
    // const submit = (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     socket.emit('send message', { name: name, message: value });
    // };
    //
    // useEffect(() => {
    //     socket.on('receive message', (message: { name: string, message: string }) => {
    //         setMessageList(messageList => messageList.concat(message));
    //     })
    // }, []);

    const [messageList, setMessageList] = useState<Message[]>([]);
    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const socket = socketClient;

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let addMessageList = [...messageList, { name: name, message: value, id:socket.id }]
        setMessageList(addMessageList);
        socket.emit('send message', { name: name, message: value });
        setValue(''); // 메시지 전송 후 입력 필드 초기화
    };

    useEffect(() => {
        socket.on('receive message', (message: Message) => {
            if (message.id !== socket.id) { // 송신자와 수신자가 동일하지 않으면
                setMessageList(messageList => messageList.concat(message));
            }
        });

        return () => {
            socket.off('receive message'); // 컴포넌트 언마운트 시 이벤트 제거
        };
    }, []);

    return (
        <div className="App">
            <section className="chat-list">
                {messageList.map((item: Message, i: number) =>
                    <div key={i} className="message">
                        <p className="username">{item.name.toUpperCase()}</p>
                        <p className="message-text">{item.message}</p>
                    </div>
                )}
            </section>
            <form className="chat-form"
                  onSubmit={(e: FormEvent<HTMLFormElement>) => submit(e)}>
                <div className="chat-inputs">
                    <input
                        type="text"
                        autoComplete="off"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        value={name}
                        placeholder="유저이름"
                    />
                    <input
                        type="text"
                        autoComplete="off"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                        value={value}
                        placeholder="메세지입력하기"
                    />
                </div>
                <button type="submit">입력하기</button>
            </form>
        </div>
    );
}

export default App;