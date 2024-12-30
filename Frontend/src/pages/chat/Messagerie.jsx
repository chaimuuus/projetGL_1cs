import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { FaCirclePlus } from "react-icons/fa6";
import { BsFillSendFill } from "react-icons/bs";
import { IoImageOutline } from "react-icons/io5";
import { CiCamera, CiVideoOn, CiFileOn } from "react-icons/ci";
import avatar from "../../assets/avatar3.png"

const Messagerie = () => {
    const [showIcons, setShowIcons] = useState(false);
    const location = useLocation();
    const messagesContainerRef = useRef(null);
    const imageInputRef = useRef(null);
    const videoInputRef = useRef(null);
    const fileInputRef = useRef(null);
    const [messages, setMessages] = useState([
        { id: 1, sender: 'user1', text: 'Oui, je comprends. Est-ce que vous pourriez m’envoyer une photo de la fuite pour que je voie la situation ?' },
        { id: 2, sender: 'user2', text: 'Bien sûr, voici une photo' },
        { id: 2, sender: 'user2', image: 'https://via.placeholder.com/150' },
        { id: 3, sender: 'user1', text: 'Merci ! Cela ressemble à un problème avec le joint ou le siphon. Vous savez si la fuite s’est aggravée récemment ?' },
        { id: 4, sender: 'user2', text: 'Oui, c’était juste quelques gouttes hier, mais maintenant, l’eau coule en continu.' },
        { id: 5, sender: 'user1', text: 'D’accord. Je peux venir aujourd’hui pour réparer ça. Vous êtes disponible cet après-midi ?' }
    ]);
    const [inputText, setInputText] = useState('');

    // Scroll to the bottom when messages update
    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // Handle sending text messages
    const handleSendMessage = () => {
        if (inputText.trim()) {
            const newMessage = {
                id: messages.length + 1,
                sender: 'user1', // Replace with dynamic sender if needed
                text: inputText
            };
            setMessages([...messages, newMessage]);
            setInputText('');
        }
    };

    // Handle media/file upload
    const handleFileUpload = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            let newMessage;

            // Handle specific file types
            if (type === 'image') {
                newMessage = {
                    id: messages.length + 1,
                    sender: 'user1',
                    image: fileUrl,
                    fileName: file.name
                };
            } else if (type === 'video') {
                newMessage = {
                    id: messages.length + 1,
                    sender: 'user1',
                    video: fileUrl,
                    fileName: file.name
                };
            } else if (type === 'file') {
                newMessage = {
                    id: messages.length + 1,
                    sender: 'user1',
                    file: fileUrl,
                    fileName: file.name
                };
            }

            setMessages([...messages, newMessage]);
        }
    };

    // Trigger specific file input
    const handleAddMedia = (type) => {
        if (type === 'image') {
            imageInputRef.current.click();
        } else if (type === 'video') {
            videoInputRef.current.click();
        } else if (type === 'file') {
            fileInputRef.current.click();
        }
        setShowIcons(false); // Hide icons after adding media
    };

    return (
        <div className="w-full min-h-screen flex flex-col">
            {/* Fixed Header */}
            <div className="fixed top-0 left-0 right-0 z-50">
                <Header className="w-full h-16 shadow-md" />
            </div>

            <div className="flex flex-1 pt-16">
                {/* Sidebar */}
                <div className="fixed top-16 left-0 h-full z-40 transition-all duration-300 ease-in-out">
                    <Sidebar isExpanded={false} />
                </div>

                {/* Main Content */}
                <div className="flex-1 flex">
                    {/* Contacts */}
                    <div className="w-1 max-h-screen"></div>
                    <div className="ml-20 left-2 fixed top-16 h-full w-52 bg-lightYellow flex flex-col gap-2 py-6">
                        <div className='flex gap-1 hover:bg-[rgba(217,217,217,0.16)] px-5 py-2 items-center'>
                            <img
                                src={avatar}
                                alt="User"
                                className="rounded-full "
                            />
                            <p className='font-bold text-xs text-[rgba(0,0,0,0.56)] cursor-pointer'>Rachid Boukhalfa</p>
                        </div>
                       
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
                                        className={`flex justify-${message.sender === 'user1' ? 'start' : 'end'}`}
                                    >
                                        <div
                                            className={`bg-${message.sender === 'user1' ? 'yellow-200' : 'yellow-100'} p-3 rounded-3xl rounded-tl-none max-w-xs`}
                                        >
                                            {message.text && <p>{message.text}</p>}
                                            {message.image && (
                                                <img
                                                    src={message.image}
                                                    alt="Uploaded"
                                                    className="mt-2 rounded shadow"
                                                />
                                            )}
                                            {message.video && (
                                                <video controls className="mt-2 rounded shadow">
                                                    <source src={message.video} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            )}
                                            {message.file && (
                                                <a
                                                    href={message.file}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-2 text-blue-500 hover:underline"
                                                >
                                                    {message.fileName || 'Download File'}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Input Area */}
                            <div className="flex p-4 bg-lightYellow opacity-85 pr-8">
                                <div className="relative">
                                    <button
                                        onClick={() => setShowIcons(!showIcons)}
                                        className="flex items-center justify-center text-custom_green p-2 rounded-full hover:text-green-600 transition-colors duration-200"
                                    >
                                        <FaCirclePlus className="h-6 w-6" />
                                    </button>
                                    {showIcons && (
                                        <div className="absolute -translate-x-full left-12 bottom-10 flex flex-col gap-5 p-2 rounded-lg">
                                            <button
                                                onClick={() => handleAddMedia('image')}
                                                className="text-custom_green p-2 bg-white rounded-full hover:text-green-600 transition-colors duration-200"
                                            >
                                                <IoImageOutline className="h-6 w-6" />
                                            </button>
                                            <button
                                                onClick={() => handleAddMedia('video')}
                                                className="text-custom_green p-2 bg-white rounded-full hover:text-green-600 transition-colors duration-200"
                                            >
                                                <CiVideoOn className="h-6 w-6" />
                                            </button>
                                            <button
                                                onClick={() => handleAddMedia('file')}
                                                className="text-custom_green p-2 bg-white rounded-full hover:text-green-600 transition-colors duration-200"
                                            >
                                                <CiFileOn className="h-6 w-6" />
                                            </button>
                                        </div>
                                    )}
                                </div>
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

            {/* Hidden File Inputs */}
            <input
                type="file"
                ref={imageInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'image')}
            />
            <input
                type="file"
                ref={videoInputRef}
                style={{ display: 'none' }}
                accept="video/*"
                onChange={(e) => handleFileUpload(e, 'video')}
            />
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={(e) => handleFileUpload(e, 'file')}
            />
        </div>
    );
};

export default Messagerie;
