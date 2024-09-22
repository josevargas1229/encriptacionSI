'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MenuIcon, XIcon } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="/">
        <LockIcon className="h-6 w-6" />
        <span className="ml-2 text-lg font-bold">CifradoEdu</span>
      </Link>
      <nav className={`ml-auto flex gap-4 sm:gap-6 ${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-14 md:top-0 right-0 bg-white md:bg-transparent p-4 md:p-0 shadow md:shadow-none w-full md:w-auto`}>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/" onClick={() => setIsMenuOpen(false)}>
          Inicio
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/about" onClick={() => setIsMenuOpen(false)}>
          Acerca de
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/cifrado" onClick={() => setIsMenuOpen(false)}>
          Cifrado
        </Link>
      </nav>
      <button className="ml-auto md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? (
          <XIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>
    </header>
  )
}

function LockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}