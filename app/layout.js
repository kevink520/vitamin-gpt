import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Chatbot',
  description: 'Powered by OpenAI’s GPT-4.'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body className={`min-h-screen px-4 py-12 bg-[#faf7f0] ${inter.className}`}>{children}</body>
    </html>
  )
}
