import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

export default function Faq() {

  const router = useRouter()

  return (
    <Layout>
        <div className='mt-10 w-full flex justify-center items-center'>
            <h1 className="text-3xl font-bold text-gray-100">FAQ Page</h1> 
        </div>
        <div className="h-96">
        </div>
    </Layout>
  )
}