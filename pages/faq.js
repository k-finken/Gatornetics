import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

export default function Faq() {

  const router = useRouter()

  const navPlayer = (e) => {
    e.preventDefault()
    router.push("/players/4429084");
  }

  const navTeam = (e) => {
    e.preventDefault()
    router.push("/teams/57");
  }

  return (
    <Layout>
        <div className='mt-10 w-full flex justify-center items-center'>
            <h1 className="text-3xl font-bold text-gray-100">FAQ Page</h1> 
        </div>
        <div className='mt-10 w-full flex justify-center items-center'>
            <h1 className="text-3xl font-bold text-gray-100">Test Player/Team Pages: </h1> 
        </div>
        <div className="mt-10 w-full flex justify-center items-center gap-5">
            <button onClick={navPlayer} className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-200 border hover:text-gray-700 transition border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Player Test</button>
            <button onClick={navTeam} className="=inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-200 border hover:text-gray-700 transition border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Team Test</button>
        </div>
        <div className="h-96">
        </div>
    </Layout>
  )
}