import Link from 'next/link'

export default function Home() {
    return (

        <main className="flex flex-col items-center justify-between min-h-screen bg-black text-green-400 font-mono">
            <div className='flex flex-col items-center'>
                <h1 className="text-9xl text-center">Prompt Master</h1>
            </div>
            <div className='flex flex-col text-5xl '>
                {/* Content here */}
                <Link href='/prompts/string/' className='hover:text-blue-600 transition-all duration-500'>- Diagrammatic Construction</Link>

            </div>
            <div className="max-w-xl text-center mt-8">
                <p>Planned functionality: prompt suggestion, prompt search, download, examples</p>
            </div>

        </main>
    )

}
