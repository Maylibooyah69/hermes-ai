import Link from 'next/link'
import Flow from '../components/BasicFlow.js'


export default function Home() {
    return (

        <main className="flex flex-col items-center justify-between min-h-screen bg-black text-green-400 font-mono">
            <div className='flex justify-end w-full p-4 absolute'>

            </div>
            <div className='flex flex-col items-center'>
                <h1 className="text-9xl text-center">HERMES AI</h1>
                <p className="mb-4">Gift of Language</p>
            </div>

            <div className='flex flex-col text-5xl '>
                <Flow />
            </div>
            <div className="max-w-xl text-center mt-8">
                <p>Planned functionality: react flow visualization , prompt preview and test, text2prompt, https://github.com/langchain-ai/langchain-nextjs-template?tab=readme-ov-file</p>
            </div>
        </main>
    )

}
