// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import axios from 'axios'; // Import axios for HTTP requests
// import Navigation from '../components/Navigation';
// import '../styles/chat.css';

// const socket = io('http://localhost:4000');  // Adjust for production

// function Chat() {
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);
//     const [username, setUsername] = useState('');
//     const [room, setRoom] = useState('');
//     const [isJoined, setIsJoined] = useState(false);

//     useEffect(() => {
//         socket.on('message', (data) => {
//             console.log('New message received:', data); // Debug received message
//             setMessages((prevMessages) => [...prevMessages, data]);
//         });

//         return () => {
//             socket.off('message');
//         };
//     }, []);

//     const handleJoinRoom = async () => {
//         if (username && room) {
//             socket.emit('joinRoom', { username, room });
//             setIsJoined(true);

//             // Fetch messages of the chatroom after joining
//             try {
//                 const response = await axios.get(`http://localhost:4000/api/messages/${room}`);
//                 console.log('Fetched messages:', response.data); // Debug fetched messages
//                 setMessages(response.data);  // Set the fetched messages
//             } catch (error) {
//                 console.error('Error fetching messages:', error);
//             }
//         }
//     };

//     const sendMessage = () => {
//         if (message && room) {
//             socket.emit('message', { message, room, sender: username }); // Include sender info
//             setMessage('');
//         }
//     };

//     return (
//         <div className='chat-page'>
//             <Navigation />
//             <div className="chat-component">
//                 {!isJoined ? (
//                     <div className="join-room-container">
//                         <input
//                             type="text"
//                             placeholder="Enter your username"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             className="input-field"
//                         />
//                         <input
//                             type="text"
//                             placeholder="Enter room name"
//                             value={room}
//                             onChange={(e) => setRoom(e.target.value)}
//                             className="input-field"
//                         />
//                         <button onClick={handleJoinRoom} className="join-button">Join Room</button>
//                     </div>
//                 ) : (
//                     <div className="chat-room-container">
//                         <div className="messages-container">
//                             {messages.map((msg, index) => {
//                                 console.log('Rendering message:', msg); // Debug rendered message
//                                 return (
//                                     <div
//                                         key={index}
//                                         className={`message ${msg.sender === username ? 'message-right' : 'message-left'}`}
//                                     >
//                                         <strong className="message-sender">{msg.sender}:</strong> 
//                                         <span className="message-text">{msg.text}</span>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                         <div className="message-input-container">
//                             <input
//                                 type="text"
//                                 value={message}
//                                 onChange={(e) => setMessage(e.target.value)}
//                                 className="message-input"
//                                 placeholder="Type a message..."
//                             />
//                             <button onClick={sendMessage} className="send-button">Send</button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Chat;

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios'; // Import axios for HTTP requests
import Navigation from '../components/Navigation';
import '../styles/chat.css';

const socket = io('http://localhost:4000');  // Adjust for production

function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [isJoined, setIsJoined] = useState(false);

    useEffect(() => {
        socket.on('message', (data) => {
            console.log('New message received:', data); // Debug received message
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    const handleJoinRoom = async () => {
        if (username && room) {
            socket.emit('joinRoom', { username, room });
            setIsJoined(true);

            // Fetch messages of the chatroom after joining
            try {
                const response = await axios.get(`http://localhost:4000/api/messages/${room}`);
                console.log('Fetched messages:', response.data); // Debug fetched messages
                setMessages(response.data);  // Set the fetched messages
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        }
    };

    const sendMessage = () => {
        if (message && room) {
            socket.emit('message', { message, room, sender: username }); // Include sender info
            setMessage('');
        }
    };

    return (
        <div className='chat-page'>
            <Navigation />
            <div className="chat-component">
                {!isJoined ? (
                    <div className="join-room-container">
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Enter room name"
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                            className="input-field"
                        />
                        <button onClick={handleJoinRoom} className="join-button">Join Room</button>
                    </div>
                ) : (
                    <div className="chat-room-container">
                        <div className="messages-container">
                            {messages.map((msg, index) => {
                                console.log('Rendering message:', msg); // Debug rendered message
                                return (
                                    <div
                                        key={index}
                                        className={`message ${msg.sender === username ? 'message-right' : 'message-left'}`}
                                    >
                                        <strong className="message-sender">{msg.sender}:</strong> 
                                        <span className="message-text">{msg.text}</span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="message-input-container">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="message-input"
                                placeholder="Type a message..."
                            />
                            <button onClick={sendMessage} className="send-button">Send</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Chat;