import { React, forwardRef } from 'react';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react'

const MyLink = forwardRef((props, ref) => {
    let { href, children, ...rest } = props
    return (
      <Link href={href}>
        <a ref={ref} {...rest}>
          {children}
        </a>
      </Link>
    )
  })

export default function PlayersDropdown({ teamArray, title }) {

    return (
        
        <Menu as='div' className='flex justify-center text-white text-lg'>
            <Menu.Button className='flex items-center px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 active:bg-gray-500'>
                <div className='mr-2'>{title}</div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </Menu.Button>
            <Menu.Items className='absolute mt-12 h-48 overflow-y-scroll scrollbar rounded-md bg-gray-700'>
                <ul>
                    { teamArray.map((player) => (
                        <Menu.Item as='li'>
                            {({ active }) => (
                                <Link href={'/players/' + player.id.toString()}>
                                    <div className='m-1 px-4 py-1 rounded-md ui-active:bg-gray-500 ui-active:cursor-pointer'>{player.firstName} {player.lastName}</div>
                                </Link>
                            )}
                        </Menu.Item>
                    )) }
                </ul>
            </Menu.Items>
        </Menu>
    )
  }