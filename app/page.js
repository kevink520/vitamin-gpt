'use client'

import { useRef, useEffect } from 'react'
import { useChat } from 'ai/react'
import { AiOutlineSend } from 'react-icons/ai'
import ChatbotMessage from '@/components/ChatMessage'
import UserMessage from '@/components/UserMessage'
import ReactGA from 'react-ga4'

ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID)

export default function Chat () {
  const inputRef = useRef(null)
  const inputContainerRef = useRef(null)
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit
  } = useChat({
    initialMessages: [
      {
        role: 'assistant',
        content: 'Hello, I am a helpful AI chatbot powered by a latest thinking model. I can also search the web. Ask me anything.'
      }
    ],
    onFinish: async (msg) => {
      if (msg.content) {
        await fetch('https://vitamin-gpt.vercel.app/api/chat2', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messages: [msg]
          })
        })
      }
    }
  })

  useEffect(() => inputRef.current.focus(), [])

  useEffect(() => {
    inputContainerRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages]);

  return (
    <form
      className='max-w-4xl w-full flex flex-col justify-between overflow-hidden mx-auto bg-white shadow-lg rounded-lg pt-8 border border-gray-200'
      onSubmit={(e, obj = {}, metadata) => {
        e.preventDefault()
        handleSubmit(e, obj, metadata)
        ReactGA.event({
          category: 'Form',
          action: 'submit_chat',
          transport: 'beacon'
        })
      }}
    >
      <div className='wp-aichatbot-messages overflow-auto px-6 pb-2'>
        {/* <ChatbotMessage message='Hello, I am an AI chatbot powered by OpenAI’s GPT-4. Ask me anything.' /> */}
        {messages.map((msg, i) =>
          msg.role === 'assistant'
            ? (
              <ChatbotMessage key={i} message={msg.content} />
              )
            : (
              <UserMessage key={i} message={msg.content} />
              )
        )}
      </div>
      <div ref={inputContainerRef} className='w-full h-full flex justify-between border-t border-gray-200 bg-gray-50'>
        <input
          ref={inputRef}
          type='text'
          className='flex-1 px-4 py-3 bg-transparent outline-none'
          placeholder='Type your message...'
          value={input}
          onChange={handleInputChange}
        />
        <button type='submit' className='w-9 p-2'>
          <AiOutlineSend size={20} color='#1e3a8a' />
        </button>
      </div>
    </form>
  )
}
