import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { BsFillSendFill } from "react-icons/bs";
import avatar from "../../assets/avatar3.png";
import axios from 'axios';
import useWebSocket from 'react-use-websocket';
import { getTokenFromCookie, getProfileArtisan } from '../../api/getProfile';

const Messagerie = () => {
    const location = useLocation();
    const messagesContainerRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [chatRooms, setChatRooms] = useState([]);
    const [selectedChatRoomId, setSelectedChatRoomId] = useState(null);
    const [user, setUser] = useState(null);

    // Fetch user profile
    const getUserProfile = async () => {
        try {
            const token = getTokenFromCookie(); // Get the token from cookies
            if (token) {
                const response = await getProfileArtisan({
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.user);
            } else {
                console.error("No token found");
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            throw error;
        }
    };

    useEffect(() => {
        getUserProfile(); // Fetch user profile on component mount
    }, []);

    // Fetch chat rooms based on user role
    useEffect(() => {
        const fetchChatRooms = async () => {
            if (!user) return; // Wait until user data is available

            try {
                let endpoint;
                if (user.role === 'artisan') {
                    endpoint = `https://dzartisan-api.onrender.com/artisans/${user.id}/chat-rooms`;
                } else {
                    endpoint = `https://dzartisan-api.onrender.com/users/${user.id}/chat-rooms`;
                }

                const response = await axios.get(endpoint);
                const chatRooms = response.data;

                // Fetch user/artisan details for each chat room
                const chatRoomsWithDetails = await Promise.all(
                    chatRooms.map(async (chatRoom) => {
                        let userOrArtisan;
                        if (user.role === 'artisan') {
                            // Fetch user details
                            const userResponse = await axios.get(
                                `https://dzartisan-api.onrender.com/users/${chatRoom.user_id}`
                            );
                            userOrArtisan = userResponse.data;
                        } else {
                            // Fetch artisan details
                            const artisanResponse = await axios.get(
                                `https://dzartisan-api.onrender.com/artisans/${chatRoom.artisan_id}`
                            );
                            userOrArtisan = artisanResponse.data;
                        }

                        return {
                            ...chatRoom,
                            userOrArtisan, // Add user/artisan details to the chat room
                        };
                    })
                );

                setChatRooms(chatRoomsWithDetails);
            } catch (error) {
                console.error("Error fetching chat rooms:", error);
            }
        };

        fetchChatRooms();
    }, [user]); // Re-run when user data changes

    // Fetch messages when a chat room is selected
    useEffect(() => {
        if (selectedChatRoomId) {
            const fetchMessages = async () => {
                try {
                    const response = await axios.get(
                        `https://dzartisan-api.onrender.com/chat/messages/${selectedChatRoomId}`
                    );
                    // Sort messages in ascending order by sent_at
                    const sortedMessages = response.data.sort((a, b) => 
                        new Date(a.sent_at) - new Date(b.sent_at)
                    );
                    setMessages(sortedMessages);
                } catch (error) {
                    console.error("Error fetching messages:", error);
                }
            };

            fetchMessages();
        }
    }, [selectedChatRoomId]);

    // WebSocket for real-time messaging
    const { sendMessage, lastMessage } = useWebSocket(
        selectedChatRoomId ? `wss://dzartisan-api.onrender.com/chat/ws/${selectedChatRoomId}` : null,
        {
            onOpen: () => console.log("WebSocket connection established."),
            onClose: () => console.log("WebSocket connection closed."),
            shouldReconnect: () => true,
        }
    );

    // Handle incoming WebSocket messages
    useEffect(() => {
        if (lastMessage) {
            const message = JSON.parse(lastMessage.data);
            // Add the new message to the end of the array
            setMessages((prevMessages) => [...prevMessages, message]);
        }
    }, [lastMessage]);

    // Scroll to the bottom when messages update
    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // Handle sending text messages
    const handleSendMessage = () => {
        if (inputText.trim() && selectedChatRoomId) {
            const messageData = {
                sender_id: user.id,
                message: inputText,
                is_artisan: user.role === 'artisan',
            };

            // Send the message over WebSocket
            sendMessage(JSON.stringify(messageData));

            // Optimistically update the UI (add to the end of the array)
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: Date.now(), // Temporary ID (replace with server-generated ID)
                    sender_id: user.id,
                    message: inputText,
                    is_artisan: user.role === 'artisan',
                    sent_at: new Date().toISOString(),
                },
            ]);

            // Clear the input field
            setInputText('');
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col">
            {/* Fixed Header */}
            <div className="fixed top-0 left-0 right-0 z-50">
                <Header className="w-full h-16 shadow-md" />
            </div>

            <div className="flex flex-1 pt-16">
                {/* Sidebar */}
                <div className="fixed top-0 left-0 h-full z-40 transition-all duration-300 ease-in-out">
                    <Sidebar isExpanded={false} />
                </div>

                {/* Main Content */}
                <div className="flex-1 flex">
                    {/* Contacts */}
                    <div className="w-1 max-h-screen"></div>
                    <div className="ml-20 left-2 fixed top-16 h-full w-52 bg-lightYellow flex flex-col gap-2 py-6">
                        {chatRooms.map((chatRoom) => (
                            <div
                                key={chatRoom.id}
                                className="flex gap-1 hover:bg-[rgba(217,217,217,0.16)] px-5 py-2 items-center cursor-pointer"
                                onClick={() => {
                                    console.log("Selected Chat Room ID:", chatRoom); // Debugging
                                    setSelectedChatRoomId(chatRoom.id);
                                }}
                            >
                                {/* Display profile image */}
                                <img
                                    src={chatRoom.userOrArtisan?.image_file || avatar} // Use avatar as fallback
                                    alt="Profile"
                                    className="rounded-full w-8 h-8 object-cover"
                                />
                                <p className="font-bold text-xs text-[rgba(0,0,0,0.56)]">
                                    {chatRoom.userOrArtisan?.user_name || chatRoom.userOrArtisan?.full_name}
                                </p>
                            </div>
                        ))}
                    </div>
                    {/* Chat Component */}
                    <div className="flex-1 pl-1 ml-72 rounded-lg">
                        <div className="h-full flex flex-col justify-between">
                            {/* Chat Messages */}
                            <div
                                className="space-y-4 pt-8 overflow-y-auto py-3 pl-7 pr-8 flex-grow max-h-[calc(100vh-10rem)]"
                                ref={messagesContainerRef}
                            >
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex justify-${
                                            message.sender_id === user.id ? 'end' : 'start'
                                        }`}
                                    >
                                        <div
                                            className={`p-3 rounded-3xl rounded-tl-none max-w-xs ${
                                                message.sender_id === user.id
                                                    ? 'bg-yellow-200'
                                                    : 'bg-yellow-100'
                                            }`}
                                        >
                                            <p>{message.message}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Input Area */}
                            <div className="flex p-4 bg-lightYellow opacity-85 pr-8">
                                <input
                                    type="text"
                                    placeholder="Commencer à écrire..."
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-3xl shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                                <button
                                    type="button"
                                    onClick={handleSendMessage}
                                    className="fixed right-10 bottom-4 text-custom_green p-2 rounded-full hover:text-green-600 transition-colors duration-200"
                                >
                                    <BsFillSendFill className="h-7 w-7" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messagerie;