
'use client'


import Link from 'next/link'
import { ChatOpenAI } from "@langchain/openai";
import ChatBox from './components/ChatBox';
import ChatTabs from './components/ChatTabs';
import { SessionProvider } from 'next-auth/react';


export default function Home() {
    return (
        <main className="flex flex-col items-center justify-between min-h-screen bg-black text-green-400 font-mono">
            <div className='flex flex-col items-center'>
                <h1 className="text-9xl text-center">Langchain Integration</h1>
            </div>

            <div className="flex flex-grow items-center justify-center w-4/5">
                <SessionProvider>
                    {/* <ChatBox chatHistory={['hello']} /> */}
                    <ChatTabs />
                </SessionProvider>
            </div>
            <div className="max-w-xl text-center mt-8">
                <p>Planned functionality:chain visualization; explore alternative text interaction HCI models: different turn taking methods</p>
                <p>issues: scrolling enable when text get too long</p>
            </div>

        </main>
    )

}
