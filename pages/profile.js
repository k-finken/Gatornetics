import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Layout from '../components/Layout';
import { initFirebase } from '../firebase/firebaseApp';

export default function Profile() {
    const auth = getAuth();
    const router = useRouter()
    const [user, loading] = useAuthState(auth);

    //if not signed in head to home
    if (!user) {
        router.push("/");
    }

    return (
        <Layout>
            <div className='mt-10 w-full flex justify-center items-center'>
                <h1 className="text-3xl font-bold text-gray-100">Profile page</h1>
            </div>
            <div className='mt-10 w-full flex justify-center items-center'>
                <button onClick={() => auth.signOut()} className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-200 border hover:text-gray-700 transition border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Sign Out</button>
            </div>
            <div className="h-96"></div>
            <div className="h-36"></div>
        </Layout>
    )
}
