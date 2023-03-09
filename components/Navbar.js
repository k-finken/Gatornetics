import { Fragment, useEffect, useState } from "react";
import Link from 'next/link';
import { prisma, PrismaClient } from '@prisma/client';
import { useRouter } from 'next/router'
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon, UserIcon, UserGroupIcon } from '@heroicons/react/20/solid'
import Image from 'next/image';


const searchOptions = [
    {id : 1, name: "Players", unavailable: false},
    {id : 2, name: "Teams", unavailable: false}
]


export default function NavBar({teams}) {
    const [navbar, setNavbar] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [selectedSearchOption, setSearchOption] = useState(searchOptions[0]);
    const [queryItems, setQueryItems] = useState([]);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        document.body.addEventListener('click', close);
        return () => document.body.removeEventListener('click', close)
    }, [])

    function expand() {
        setExpanded(true);
    }

    function close() {
        setExpanded(false);
    }

    function select(event) {
        event.preventDefault();
        close();
    }


    const router = useRouter()

    const handleSearch = (e) => {
        e.preventDefault();
        expand();
        setSearchInput(e.target.value);
        updateTypeAhead(e.target.value);
    };

    async function updateTypeAhead (query) {

        if(selectedSearchOption.id == 1){
            const searchResultArray = await searchPlayers(query);
            setQueryItems(searchResultArray);
            console.log(queryItems)
        }
        else {
            const searchResultArray = await searchTeams(query);
            setQueryItems(searchResultArray);
            console.log(queryItems)
        }
    }

    async function makeSearch (e) {
        e.preventDefault();
        setSearchInput(e.target.value);
        //if searching for players
        if(selectedSearchOption.id == 1){
            const searchResultArray = await searchPlayers(searchInput);
            setQueryItems(searchResultArray);
        }
        else {
            const searchResultArray = await searchTeams(searchInput);
            setQueryItems(searchResultArray);
        }
    }

    async function searchPlayers(query) {
        const apiRoute = '/api/searchPlayers?queryString=' + query;
        let returnData;
        await fetch(apiRoute, {
            method: 'GET',
        }).then((response) => response.json()).then((data) => returnData = data);
        // console.log(returnData);
        return returnData;
    }

    async function searchTeams(query) {
        const apiRoute = '/api/searchTeams?queryString=' + query;
        let returnData;
        await fetch(apiRoute, {
            method: 'GET',
        }).then((response) => response.json()).then((data) => returnData = data);
        // console.log(returnData);
        return returnData;
    }

    return (
        <nav className="w-full p-2" data-testid="Navbar-1">
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
                        <div onFocus={expand} onClick={select} className="absolute h-auto w-full rounded-md bg-white z-10">
                            {selectedSearchOption.id == 1 && expanded &&
                                queryItems.map((item, index) => (
                                    <Link href={"/players/" + item.id} key={index} className="flex p-4 rounded-lg my-1">
                                        <div className="flex p-3 font-bold hover:bg-gray-400 hover:cursor-pointer hover:scale-[1.02] transition-all">
                                            <div className="ml-8"/>
                                            <Image className="ml-20" quality={100} alt='player image' placeholder={UserIcon} src={item.imgLinx} height={50} width={70} priority/>
                                            <div className="my-auto ml-8">{item.firstName} {item.lastName}</div>
                                        </div>
                                    </Link>
                                ))
                            }
                            {selectedSearchOption.id == 2 && expanded &&
                                queryItems.map((item, index) => (
                                    <Link href={"/teams/" + item.id} key={index} className="p-4 rounded-lg my-1">
                                        <div className="flex p-3 font-bold hover:bg-gray-400 hover:cursor-pointer">
                                            <div className="ml-8"/>
                                            <Image quality={100} alt='team-image' placeholder={UserGroupIcon} src={item.imgLinx} height={50} width={70} priority/> 
                                            <div className="my-auto ml-8">{item.school}</div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                    <Listbox value={selectedSearchOption} onChange={setSearchOption}>
                        <div className="relative">
                        <Listbox.Button className="ml-4 relative w-30 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block truncate">{selectedSearchOption.name}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="ml-4 absolute mt-1 max-h-60 w-30 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {searchOptions.map((option, optionId) => (
                                <Listbox.Option
                                key={optionId}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-gray-200 font-medium' : 'text-gray-900'
                                    }`
                                }
                                value={option}
                                >
                                {({ selected }) => (
                                    <>
                                    <span
                                        className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                        }`}
                                    >
                                        {option.name}
                                    </span>
                                    {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                    ) : null}
                                    </>
                                )}
                                </Listbox.Option>
                            ))}
                            </Listbox.Options>
                        </Transition>
                        </div>
                    </Listbox>
                    {/* <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white rounded-lg border border-white hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="w-5 h-5" fillRule="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <span className="sr-only">Search</span>
                    </button> */}
                </form>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                            }`}
                    >
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <li className="text-white hover:text-gray-500">
                                <Link href="/simulate">Simulate</Link>
                            </li>
                            <li className="text-white hover:text-gray-500">
                                <Link href="/faq">FAQ</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}