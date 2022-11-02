import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <div className='mt-10 w-full flex justify-center items-center'>
        <h1 className="text-3xl font-bold underline">Signup Page</h1> 
      </div>
      <Footer/>
    </>
  )
}