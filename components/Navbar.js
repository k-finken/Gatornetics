import { useState } from "react";
import Link from 'next/link';
import { prisma, PrismaClient } from '@prisma/client';
import { useRouter } from 'next/router'

export default function NavBar({teams}) {
    const [navbar, setNavbar] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    const router = useRouter()

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    const makeSearch = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
        router.push("/players/" + searchInput);
    }

    return (
        <nav className="w-full p-2">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <Link href="/">
                            <h2 className="text-2xl h-full font-bold text-white hover:text-gray-500 hover:cursor-pointer">Gatornetics</h2>
                        </Link>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-400 rounded-md outline-none"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        viewBox="0 0 20 20"
                                        fillRule="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fillRule="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <form onSubmit={makeSearch} className="m-auto flex items-center justify-center w-10/12 mt-auto md:w-1/2">
                    <label htmlFor="simple-search" className="sr-only">Search</label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-800 dark:text-gray-800" fillRule="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                        </div>
                        <input onInput={handleSearch} type="text" id="simple-search" className=" bg-white border border-gray-800 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" value={searchInput}/>
                    </div>
                    <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white rounded-lg border border-white hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="w-5 h-5" fillRule="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <span className="sr-only">Search</span>
                    </button>
                </form>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                            }`}
                    >
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <li className="text-white hover:text-gray-500">
                                <Link href="/machine-learning">ML Analysis</Link>
                            </li>
                            <li className="text-white hover:text-gray-500">
                                <Link href="/faq">FAQ</Link>
                            </li>
                            <li className="text-white hover:text-gray-500">
                                <Link href="/signUp">Sign In</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}