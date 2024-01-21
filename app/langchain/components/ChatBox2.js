'use client'
import { useState } from 'react';


export default function ChatBox({ chatHistory }) {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState(chatHistory);

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleSendClick = () => {
        setHistory([...history, input]);
        setInput('');
    };

    return <>
        <div className='flex flex-col w-4/5 justify-between h-2/5 flex-shrink bg-gray-800 bg-opacity-50 text-white p-6 rounded-lg shadow-lg'>
            <div className='overflow-auto h-64 mb-4'>
                {/* Chat messages will go here */}
                {history.map((message, index) => (
                    <div key={index} className='mb-4'>
                        <p>{message}</p>
                    </div>
                ))}
            </div>
            <div className='flex'>
                <input
                    className='flex-grow mr-2 py-2 bg-black px-4 rounded-lg border-2'
                    placeholder='Type your message here...'
                    value={input}
                    onChange={handleInputChange}
                />
                <button
                    className='py-2 px-4 rounded-lg bg-blue-500 text-white'
                    onClick={handleSendClick}
                >
                    Send
                </button>
            </div>
        </div>
    </>
}