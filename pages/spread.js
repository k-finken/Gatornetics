import React, { useTransition } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { prisma, PrismaClient } from '@prisma/client';

const yearOptions = [
    {name: "2022 season", year: 2022},
    {name: "2021 season", year: 2021},
    {name: "2020 season", year: 2020},
    {name: "2019 season", year: 2019},
    {name: "2018 season", year: 2018}
]

const weekOptions = [
    {name: "Week 1", week: "1"},
    {name: "Week 2", week: "2"},
    {name: "Week 3", week: "3"},
    {name: "Week 4", week: "4"},
    {name: "Week 5", week: "5"},
    {name: "Week 6", week: "6"},
    {name: "Week 7", week: "7"},
    {name: "Week 8", week: "8"},
    {name: "Week 9", week: "9"},
    {name: "Week 10", week: "10"},
    {name: "Week 11", week: "11"},
    {name: "Week 12", week: "12"},
    {name: "Week 13", week: "13"},
    {name: "Week 14", week: "14"},
    {name: "Week 15", week: "15"},
    {name: "Week 16", week: "16"},
]

export async function getStaticProps() {
    const prisma = new PrismaClient()
    const teams = await prisma.teams.findMany({
        orderBy: {
            school: "asc",
        }
    });

    return {
        props : { teams }
    }
}


export default function Signup({teams}) {
    const [selectedSeason, setSelectedSeason] = useState(yearOptions[0]);
    const [selectedWeek, setSelectedWeek] = useState(weekOptions[0]);
    const [selectedHomeTeam, setSelectedHomeTeam] = useState(teams[0]);
    const [selectedAwayTeam, setSelectedAwayTeam] = useState(teams[0]);
    const [response, setResponse] = useState("");

    async function getSimulationData(e) {
        e.preventDefault();
        console.log(selectedHomeTeam.school)
        const fetchUrl = `https://gatornetics.herokuapp.com/getinps/?syear=${selectedSeason.year}&eyear=${(selectedSeason.year + 1)}&week=${selectedWeek.week}&home_team=${selectedHomeTeam.school}&away_team=${selectedAwayTeam.school}&des_year=${selectedSeason.year}&key=28c53a5c-f930-4069-92a9-c1999a17c66b`;
        try {
            const response = await fetch(fetchUrl, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log(result);
            setResponse(result);
            return result;
        } catch (err) {
            console.log(err);
        }
    }
  

    return (
        <Layout>
            <h1 className="text-center text-3xl font-bold text-gray-100">Welcome to Gatornetics</h1>
            <h1 className="text-center text-3xl font-bold text-gray-100">Game Simulation!</h1>
            <div>
                <p className="mt-8 text-center text-gray-100">What season would you like to look at?</p>
                <div className='flex content-center items-center w-full'>
                {/* season selector */}
                <Listbox value={selectedSeason} onChange={setSelectedSeason}>
                    <div className="w-60 mx-auto relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-4 pl-5 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{selectedSeason.name}</span>
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
                        <Listbox.Options className="s-60 z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {yearOptions.map((year, yearidx) => (
                            <Listbox.Option
                            key={yearidx}
                            className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                }`
                            }
                            value={year}
                            >
                            {({ selectedSeason }) => (
                                <>
                                <span
                                    className={`block truncate ${
                                        selectedSeason ? 'font-medium' : 'font-normal'
                                    }`}
                                >
                                    {year.name}
                                </span>
                                {selectedSeason ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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
                </div>
                <p className="mt-8 text-center text-gray-100">What week would you like to look at?</p>
                <div className='flex content-center items-center w-full'>
                {/* week selector */}
                <Listbox value={selectedWeek} onChange={setSelectedWeek}>
                    <div className="w-60 mx-auto relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-4 pl-5 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{selectedWeek.name}</span>
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
                        <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {weekOptions.map((week, index) => (
                            <Listbox.Option
                            key={index}
                            className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                }`
                            }
                            value={week}
                            >
                            {({ selectedWeek }) => (
                                <>
                                <span
                                    className={`block truncate ${
                                        selectedWeek ? 'font-medium' : 'font-normal'
                                    }`}
                                >
                                    {week.name}
                                </span>
                                {selectedWeek ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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
                </div>
                <p className="mt-8 text-center text-gray-100">What team is the home team?</p>
                <div className='flex content-center items-center w-full'>
                {/* home team selector */}
                <Listbox value={selectedHomeTeam} onChange={setSelectedHomeTeam}>
                    <div className="w-80 mx-auto relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-4 pl-5 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{selectedHomeTeam.school}</span>
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
                        <Listbox.Options className="w-80 z-10 absolute mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {teams.map((team, index) => (
                            <Listbox.Option
                            key={index}
                            className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                }`
                            }
                            value={team}
                            >
                            {({ selectedHomeTeam }) => (
                                <>
                                <span
                                    className={`block truncate ${
                                        selectedHomeTeam ? 'font-medium' : 'font-normal'
                                    }`}
                                >
                                    {team.school}
                                </span>
                                {selectedHomeTeam ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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
                </div>
                <p className="mt-8 text-center text-gray-100">What team is the away team?</p>
                <div className='flex content-center items-center w-full'>
                {/*away team selector */}
                <Listbox value={selectedAwayTeam} onChange={setSelectedAwayTeam}>
                    <div className="w-80 mx-auto relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-4 pl-5 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{selectedAwayTeam.school}</span>
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
                        <Listbox.Options className="w-80 z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {teams.map((team, index) => (
                            <Listbox.Option
                            key={index}
                            className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                }`
                            }
                            value={team}
                            >
                            {({ selectedAwayTeam }) => (
                                <>
                                <span
                                    className={`block truncate ${
                                        selectedAwayTeam ? 'font-medium' : 'font-normal'
                                    }`}
                                >
                                    {team.school}
                                </span>
                                {selectedAwayTeam ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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
                </div>
                <div className='flex content-center items-center w-full'>
                    <button className='mt-10 mx-auto h-20 w-40 text-2xl text-black hover:text-white bg-white hover:bg-gray-500 transition-all rounded-3xl' onClick={getSimulationData}>SIMULATE!</button>
                </div>
            </div>
            <div className='text-white flex my-10'>
                <h1 className='mx-auto text-3xl'>RESULTS:</h1>
            </div>
            {response && 
                <div className='flex text-white'>
                    <h1 className='block mx-auto'>Score of the game: {response[4]} vs {response[5]}</h1>
                    <h1 className='block mx-auto'>Actual spread: {response[6]}</h1>
                    <h1 className='block mx-auto'>Our predicted spread: {response[7]}</h1>
                </div>
            }
            {!response && 
                <div className='text-white flex my-2'>
                    <h1 className='mx-auto text-xl'>Press Simulate to Generate Results!</h1>
                </div>
            }
            <div className="h-40"/>
        </Layout>
    )
}