import React from 'react'

import DisplayDocument from '@/components/display-document';

export default async function Dokument({ params }: { params: { id: string } }) {
  const {id} = await params
  // fetch the document by id from backend
  const data = await fetch(`https://bth-backendapi-ezdbd8cvbjfuapb3.northeurope-01.azurewebsites.net/document/${id}`,
    { cache: 'no-store' }
  )
  const post = await data.json()
  

  return (
    <div className='bg-[#eeeeee] h-[calc(100vh-100px)] overflow-auto'>
    <DisplayDocument 
      id={id} 
      title={post.title} 
      content={post.content} 
      
    />
    </div>
  )
}
