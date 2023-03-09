import { React, useState } from 'react';
import Link from 'next/link';
import { Menu, Combobox } from '@headlessui/react'

export default function PlayersDropdown({ teamArray, title }) {
    const [inputPlayer, setInputPlayer] = useState("")
    const [query, setQuery] = useState('')

    const filteredPlayers = 
        query == '' ? teamArray : teamArray.filter((player) => {
            return (player.firstName.toLowerCase() + " " + player.lastName.toLowerCase()).includes(query.toLowerCase())
        })

    const handleChange = (e) => {
        setInputPlayer(e.target.value);
        setQuery(e.target.value);
    };
    const resetInputField = () => {
        setInputPlayer('');
        setQuery('');
    };

    return (
        <Combobox as='div' className='flex justify-center text-white text-lg' data-testid="PlayersDropdown-1">
            <div className='flex focus:outline-none rounded-lg bg-gray-700'>
                <Combobox.Input placeholder={title} className='outline-none ml-2 rounded-lg bg-gray-700' onFocus={resetInputField} onChange={handleChange} />
                <Combobox.Button className="flex items-center px-4 py-2 rounded-md">
                    <div className='min-w-[25px] my-auto mr-5'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg></div>
                </Combobox.Button>
            </div>
            <Combobox.Options className='absolute mt-12 max-h-48 overflow-y-scroll scrollbar rounded-md bg-gray-700'>
                {filteredPlayers.length == 0 && query !== '' ? (
                    <div className="m-1 w-64 px-4 py-1 rounded-md">Player not found.</div>
                ) : (
                    filteredPlayers.map((player) => (
                    <Combobox.Option key={player.id} value={player}>
                        <Link href={'/players/' + player.id.toString()}>
                            <div className='m-1 w-64 px-4 py-1 rounded-md ui-active:bg-gray-500 ui-active:cursor-pointer'>{player.firstName} {player.lastName}</div>
                        </Link>
                    </Combobox.Option>
                )))}
            </Combobox.Options>
        </Combobox>
    )
  }