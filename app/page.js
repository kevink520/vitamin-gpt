'use client'

import { useRef, useEffect, Fragment } from 'react'
import { useChat } from 'ai/react'
import { AiOutlineSend } from 'react-icons/ai'
import ChatbotMessage from '@/components/ChatbotMessage'
import UserMessage from '@/components/UserMessage'
import ReactGA from 'react-ga4'
import Footer from '@/components/Footer'
import { Turnstile } from '@marsidev/react-turnstile'
import ThinkingDots from '@/components/ThinkingDots'

ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID)

export default function Chat () {
  const inputRef = useRef(null)
  const inputContainerRef = useRef(null)
  const {
    messages,
    input,
    isLoading,
    handleInputChange,
    handleSubmit
  } = useChat({
    initialMessages: [
      {
        role: 'assistant',
        content: 'Hello, I am a helpful AI chatbot powered by GLM-5, a state-of-the-art open-weights, general-purpose AI model. I can also search the web. Ask me anything.'// a latest thinking AI model. I can also search the web. Ask me anything.'
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
  }, [messages])

  return (
    <div className='w-full max-w-4xl py-12 mx-auto flex flex-col justify-between gap-8 min-h-screen'>
      <form
        className='w-full flex flex-col justify-between overflow-hidden mx-auto bg-white shadow-lg rounded-lg pt-8 border border-gray-200'
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
                <ChatbotMessage
                  key={i} 
                  message={msg.content} 
                />
              ) : (
                <Fragment key={i}>
                  <UserMessage message={msg.content} />
                  {isLoading && i === messages.length - 1 && <ThinkingDots />}
                </Fragment>
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
          <Turnstile sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} />
        </div>
      </form>
      <Footer />
    </div>
  )
}
