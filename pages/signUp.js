import React from 'react'
import Navbar from '../components/Navbar'
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <div className='mt-10 w-full flex justify-center items-center'>
        <h1 className="text-3xl font-bold underline">Signup Page</h1> 
      </div>
        <div class="container">
            <label for="uname"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="uname" required></input>

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required></input>

            <button type="submit">Login</button>
        </div>
        <div className="container">
            <li className="text-red-600">
                <Link href="/">Cancel</Link>
            </li>
            <span className="psw">Forgot <a href="#">password?</a></span>
        </div>
    </>
  )
}