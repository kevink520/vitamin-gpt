export default function ThinkingDots() {
  return (
    <div className='flex items-center gap-2 h-6'>
      <span className='w-2 h-2 rounded-full bg-gray-500 animate-bounce' style={{ animationDelay: '0ms' }} />
      <span className='w-2 h-2 rounded-full bg-gray-500 animate-bounce' style={{ animationDelay: '150ms' }} />
      <span className='w-2 h-2 rounded-full bg-gray-500 animate-bounce' style={{ animationDelay: '300ms' }} />
    </div>
  );
}
