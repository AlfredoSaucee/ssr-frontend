import Link from 'next/link'
import React from 'react'

const navbarItems = () => {
  return (
    <div className='flex items-center gap-4 px-4 py-2 rounded justify-between w-full'>
        <Link href="/" className='font-bold text-white text-2xl'>SSR-EDITOR</Link>
        <Link href="/dokument">Dokument</Link>
      
    </div>
  )
}

export default navbarItems