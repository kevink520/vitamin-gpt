import ReactMarkdown from 'react-markdown'
import { RiRobot3Line } from 'react-icons/ri'

export default function ChatbotMessage ({ message }) {
  return (
    <div className='mr-16 mb-6'>
      <div className='w-10 h-10 flex justify-center items-center rounded-full overflow-hidden mb-3 bg-[#74AA9C]'>
        <RiRobot3Line size={20} color='#fff' />
      </div>
      <div className='px-4 py-3 mb-3 rounded-r-2xl rounded-bl-2xl bg-gray-100 text-gray-900'>
        <ReactMarkdown>{message}</ReactMarkdown>
      </div>
    </div>
  )
}
