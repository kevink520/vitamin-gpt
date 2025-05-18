import Link from 'next/link'

export default function Footer () {
  return (
    <footer className='flex justify-between items-center mt-8 text-center text-sm text-gray-500'>
      <span>&copy; {new Date().getFullYear()} Vitamin GPT. All rights reserved.</span>
      <Link className='underline' href='/privacy-policy'>Privacy Policy</Link>
    </footer>
  )
}