import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hermes AI',
  description: 'Gift of language for all',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className}>

        {children}

        <div className='absolute bottom-10 left-10 border-2 border-green-400 hover:bg-green-400 hover:text-black text-green-400 font-bold  rounded'>
          <Link href="/" >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-10 w-10">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </Link>
        </div>
      </body>
    </html>
  )
}
