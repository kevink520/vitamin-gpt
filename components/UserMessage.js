import { AiOutlineUser } from 'react-icons/ai'

export default function UserMessage ({ message }) {
  return (
    <div className='flex flex-col items-end ml-16 mb-3'>
      <div className='px-4 py-3 mb-3 rounded-l-2xl rounded-tr-2xl bg-blue-100 text-gray-900'>
        {message}
      </div>
      <div className='w-10 h-10 flex justify-center items-center rounded-full mb-3 bg-blue-900'>
        <AiOutlineUser size={20} color='#fff' />
      </div>
    </div>
  )
}
