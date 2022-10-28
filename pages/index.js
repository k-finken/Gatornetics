import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import HomeHero from '../components/HomeHero'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <HomeHero></HomeHero>
      <Footer></Footer>
    </>
  )
}
