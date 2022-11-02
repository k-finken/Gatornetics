import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useRouter } from 'next/router'

export default function Faq() {

  const router = useRouter()

  const navPlayer = (e) => {
    e.preventDefault()
    router.push("/players/anthony-richardson");
  }

  const navTeam = (e) => {
    e.preventDefault()
    router.push("/teams/florida-gators");
  }

  return (
    <>
        <Navbar></Navbar>
        <div className='mt-10 w-full flex justify-center items-center'>
            <h1 className="text-3xl font-bold underline">FAQ Page</h1> 
        </div>
        <div className='mt-10 w-full flex justify-center items-center'>
            <h1 className="text-3xl font-bold underline">Test Player/Team Pages: </h1> 
        </div>
        <div className="mt-10 w-full flex justify-center items-center gap-5">
            <button onClick={navPlayer} className="hover:bg-white hover:text-indigo-600 lg:text-xl hover:border-indigo-600 bg-transparent transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-indigo-700 focus:ring-white hover:bg-indigo-700-800 rounded border border-gray-800 text-gray-800 px-4 sm:px-8 py-1 sm:py-3 text-sm">Player Test</button>
            <button onClick={navTeam} className="hover:bg-white hover:text-indigo-600 lg:text-xl hover:border-indigo-600 bg-transparent transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-indigo-700 focus:ring-white hover:bg-indigo-700-800 rounded border border-gray-800 text-gray-800 px-4 sm:px-8 py-1 sm:py-3 text-sm">Team Test</button>
        </div>
        <Footer/>
    </>
  )
}