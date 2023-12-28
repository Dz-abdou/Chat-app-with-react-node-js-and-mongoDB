import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { SocketContext } from '../context/SocketContext';
import { RoomContext } from '../context/RoomContext';
import { io } from 'socket.io-client';
import { useAuthContext } from "../hooks/useAuthContext";
import ConnectedUser from "./connectedUser";



// const user = JSON.parse(localStorage.getItem('user'))
// console.log(user);
// var socket = io('http://localhost:8000', {
//     reconnectionDelayMax: 10000,
//     query: { token: user.token }
// });

const ChatPage = () => {

    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [connectedUsers, setConnectedUsers] = useState([]);
    const { user } = useAuthContext();
    const { setRoom } = useContext(RoomContext);
    const socket = useContext(SocketContext);
    const history = useHistory();

    useEffect(() => {
        socket.on("message", msg => {
            const today = new Date();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            setMessageList(messageList => [...messageList, { message: `${msg.user}: ${msg.text} `, time }]);
        });

        socket.on('update-connected-users-list', connectedUsersList => {
            if (connectedUsersList) {
                setConnectedUsers(connectedUsersList);
            }

        });

    }, [socket, user]);

    const sendMessage = () => {
        if (message) {
            socket.emit('sendMessage', { username: user.username, message }, () => {
                console.log(message);
                setMessage('');
            });
        } else {
            alert('Ecrire quelque chose!')
        }
    }


    const quitRoom = () => {
        setRoom('');
        socket.emit('leave-room', { username: user.username });
        history.push('/');
        history.go(0);
    }

    useEffect(() => {


        window.addEventListener('unload', quitRoom);
        return () => {
            window.removeEventListener('unload', quitRoom);
            quitRoom();
        }
    }, []);





    // useEffect(() => {

    //     socket.on('receive_message', (data) => {
    //         addToList(data.message);
    //     });

    // }, [socket])

    // useEffect(() => {
    //     socket.to('new room').emit('login-to-room', data);
    // }, [])

    return (

        <div>
            <div className="chat">
                <div className="button-container">
                    <button className="send-button" onClick={sendMessage}>Envoyer</button>
                </div>
                <div className="message-input-container">
                    <input
                        type="text"
                        name="message"
                        placeholder="Message..."
                        value={message}
                        onChange={(e) => { setMessage(e.target.value); }} />
                </div>
                <ul className="messages-list">
                    {messageList.length > 0 && messageList.map((item) =>
                        <li>
                            <div className="message-container">
                                <p>{item.message}</p>
                                <span className="time-right">{item.time}</span>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
            <label>Utilisateurs connecte</label>
            <ul>
                {connectedUsers.length > 0 && connectedUsers.map((item) =>
                    <li>
                        <p>{item.username}</p>
                    </li>
                )}
            </ul>
        </div>

    );
}

export default ChatPage;