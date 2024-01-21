import Link from 'next/link'
import { SignupButton } from './components/Auth.js'

export default function Home() {
  return (

    <main className="flex flex-col items-center justify-between min-h-screen bg-black text-green-400 font-mono">
      <div className='flex justify-end w-full p-4 absolute'>
        <SignupButton />

      </div>
      <div className='flex flex-col items-center'>
        <h1 className="text-9xl text-center">HERMES AI</h1>
        <p className="mb-4">Gift of Language</p>
      </div>

      <div className='flex flex-col text-5xl '>

        <Link href='/langchain' className='hover:text-blue-600 transition-all duration-500'>- langChain integration</Link>
        <Link href='/prompts' className='hover:text-blue-600 transition-all duration-500'>- Prompts</Link>
        <Link href='/autoInfoGraph' className='hover:text-blue-600 transition-all duration-500'>- Automatic infographics </Link>
      </div>
      <div className="max-w-xl text-center mt-8">
        <p>Planned functionality: flow langchain interface, language games, convo sumamrzy and visualization, language games (theory and practice,), living blog with update QA, language training, model catelog</p>
        <p>audio integration: https://huggingface.co/learn/audio-course/chapter0/introduction| https://huggingface.co/docs/transformers/tasks/text-to-speech |https://huggingface.co/tasks/text-to-speech</p>
      </div>
    </main>
  )

}
