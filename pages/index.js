import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import HomeHero from '../components/HomeHero'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <HomeHero></HomeHero>
      <div className="h-20"/>
    </Layout>
  )
}
