import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const navbarItems = () => {
  return (
    <div className='flex items-center gap-4 px-4  rounded justify-between w-full'>
        <Image src="/noetly.svg" alt="logo" width={140} height={140} className="fill-white"/>
        <Link href="/dokument">Dokument</Link>
      
    </div>
  )
}

export default navbarItems