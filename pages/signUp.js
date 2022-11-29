import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import { initFirebase } from '../firebase/firebaseApp'
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'


export default function Login() {
    const router = useRouter()
    const [passwordState, setPasswordState] = useState("");
    const [usernameState, setUsernameState] = useState("");

    initFirebase();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);

    if (user) {
        router.push("/profile");
    }

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
    }

    return (

        <Layout>
            <div className='mt-10 w-full flex justify-center items-center'>
                <h1 className="text-3xl font-bold text-gray-100">Signup page -- needs email auth added google auth already done</h1> 
            </div>
        </Layout>
    )
}