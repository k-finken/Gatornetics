import Layout from '../components/Layout'
import { React, useState } from 'react';
import { prisma, PrismaClient } from '@prisma/client';
import { Listbox } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Image from 'next/image';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
);

const pPositions = [
    { pos: 'Running Back',      abbr: "RB" },
    { pos: 'Quarterback',       abbr: "QB" },
    { pos: 'Linebacker',        abbr: "LB" },
    { pos: 'Defensive Lineman', abbr: "DL" },
    { pos: 'Defensive Back',    abbr: "DB" },
    { pos: 'Placekicker',       abbr: "PK" },
    { pos: 'Safety',            abbr: "S" },
    { pos: 'Wide Receiver',     abbr: "WR" },
    { pos: 'Tight End',         abbr: "TE" },
    { pos: 'Defensive End',     abbr: "DE" },
    { pos: 'Defensive Tackle',  abbr: "DT" },
    { pos: 'Punter',            abbr: "P" },
    { pos: 'Cornerback',        abbr: "CB" },
  ]

export async function getStaticProps(context) {

    const prisma = new PrismaClient()

    const player1 = await prisma.players.findUnique({
        where: {
          id: 107494, // Trey Sanders
        },
    })

    const player2 = await prisma.players.findUnique({
        where: {
          id: 3149687, // Christopher Brooks
        },
    })

    const playerSel = await prisma.players.findMany({
        where: {
            position: player1.position,
        },
        select: {
            id:true,
            firstName:true,
            lastName:true,
        },
        take:20,
    })

    return {
        props: { player1, player2, playerSel }
    }
}

export default function Compare( { player1, player2, playerSel }) {
    
    const [posSelected, setPosSelected] = useState(pPositions[0])
    const [playerSel1, setPlayerSel1] = useState(player1)
    const [playerSel2, setPlayerSel2] = useState(player2)

    // player1
    const player1PosStat1 = player1.posStat1[0].replace('[', '').replace(']', '').split(', ');
    const player1GraphStat1 = player1PosStat1.map(Number);
    const player1PosStat2 = player1.posStat2[0].replace('[', '').replace(']', '').split(', ');
    const player1GraphStat2 = player1PosStat2.map(Number);
    // player2
    const player2PosStat1 = player2.posStat1[0].replace('[', '').replace(']', '').split(', ');
    const player2GraphStat1 = player2PosStat1.map(Number);
    const player2PosStat2 = player2.posStat2[0].replace('[', '').replace(']', '').split(', ');
    const player2GraphStat2 = player2PosStat2.map(Number);

    const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12'];

    let title1Value = "Weekly Rushing Yards";
    let title2Value = "Weekly Rushing TouchDowns";

    const graphData1 = {
        labels,
        datasets: [
            {
                label: player1.firstName + " " + player1.lastName,
                data: player1GraphStat1,
                borderColor: 'rgb(121, 121, 121)',
                backgroundColor: 'rgb(121, 121, 121)',
            },
            {
                label: player2.firstName + " " + player2.lastName,
                data: player2GraphStat1,
                borderColor: 'rgb(255, 255, 255)',
                backgroundColor: 'rgb(255, 255, 255)',
            },
        ],
    };

    const graphData2 = {
        labels,
        datasets: [
            {
                label: player1.firstName + " " + player1.lastName,
                data: player1GraphStat2,
                borderColor: 'rgb(121, 121, 121)',
                backgroundColor: 'rgb(121, 121, 121)',
            },
            {
                label: player2.firstName + " " + player2.lastName,
                data: player2GraphStat2,
                borderColor: 'rgb(255, 255, 255)',
                backgroundColor: 'rgb(255, 255, 255)',
            },
        ],
    };

    const options1 = {
        responsive: true,
        interaction: {
            mode: "index",
            intersect: false
          },
        scales: {
            y: {
              ticks: { color: "#D3D3D3", beginAtZero: true }
            },
            x: {
              ticks: { color: 'white', beginAtZero: true }
            }
          },
        plugins: {
            title: {
                display: true,
                text: title1Value,
                color: 'white',
                font: {
                    size: 34,
                    family: "system-ui",
                    weight: "700"
                }
            },
        },
    };

    const options2 = {
        responsive: true,
        interaction: {
            mode: "index",
            intersect: false
          },
        scales: {
            y: {
              ticks: { color: "#D3D3D3", beginAtZero: true }
            },
            x: {
              ticks: { color: 'white', beginAtZero: true }
            }
          },
        plugins: {
            title: {
                display: true,
                text: title2Value,
                color: 'white',
                font: {
                    size: 34,
                    family: "system-ui",
                    weight: "700"
                }
            },
        },
    };
    
  return (
    <Layout>
        <div className=''>
            <div className='flex flex-row justify-around py-4'>
                <div className='flex flex-col justify-center'>
                    <Image alt='player-image' src={player1.imgLinx} height={254} width={350} priority/>
                    <div className='self-center pt-2 text-4xl font-bold text-white'>{player1.firstName} {player1.lastName}</div>
                    <Listbox as='div' onChange={setPlayerSel1} className='flex justify-center pt-4 text-white text-lg'>
                        <Listbox.Button className='flex items-center justify-between w-56 px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 active:bg-gray-500'>
                                <div className='mr-2'>{playerSel1.firstName} {playerSel1.lastName}</div>
                                <ChevronUpDownIcon className="h-5 w-5 text-white" aria-hidden="true"/>
                        </Listbox.Button>
                        <Listbox.Options as='ul' className='absolute mt-12 h-48 overflow-y-scroll scrollbar rounded-md bg-gray-700'>
                            {playerSel.map((player) => (
                                <Listbox.Option as='li' key={player.id} value={player} className='m-1 px-4 py-1 rounded-md ui-active:bg-gray-500 ui-active:cursor-pointer'>{player.firstName} {player.lastName}</Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Listbox>
                </div>
                <div className='flex'>
                    <div className='self-end pb-8 text-5xl font-bold text-white'>VS</div>
                </div>
                <div className='flex flex-col'>
                    <Image alt='player-image' src={player2.imgLinx} height={254} width={350} priority/>
                    <div className='self-center pt-2 text-4xl font-bold text-white'>{player2.firstName} {player2.lastName}</div>
                    <Listbox as='div' onChange={setPlayerSel2} className='flex justify-center pt-4 text-white text-lg'>
                        <Listbox.Button className='flex items-center justify-between w-56 px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 active:bg-gray-500'>
                                <div className='mr-2'>{playerSel2.firstName} {playerSel2.lastName}</div>
                                <ChevronUpDownIcon className="h-5 w-5 text-white" aria-hidden="true"/>
                        </Listbox.Button>
                        <Listbox.Options as='ul' className='absolute mt-12 h-48 overflow-y-scroll scrollbar rounded-md bg-gray-700'>
                            {playerSel.map((player) => (
                                <Listbox.Option as='li' key={player.id} value={player} className='m-1 px-4 py-1 rounded-md ui-active:bg-gray-500 ui-active:cursor-pointer'>{player.firstName} {player.lastName}</Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Listbox>
                </div>
            </div>
            
            <div className='flex justify-center'>
                
                <Listbox as='div' onChange={setPosSelected} className='flex justify-center text-white text-lg'>
                    <Listbox.Button className='flex items-center justify-between w-56 px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 active:bg-gray-500'>
                            <div className='mr-2'>{posSelected.pos}</div>
                            <ChevronUpDownIcon className="h-5 w-5 text-white" aria-hidden="true"/>
                    </Listbox.Button>
                    <Listbox.Options as='ul' className='absolute mt-12 h-48 overflow-y-scroll scrollbar rounded-md bg-gray-700'>
                        {pPositions.map((position) => (
                            <Listbox.Option as='li' key={position.pos} value={position} className='m-1 px-4 py-1 rounded-md ui-active:bg-gray-500 ui-active:cursor-pointer'>{position.pos}</Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Listbox>

            </div>

            <div className='flex flex-col mt-4 justify-center'>
                <div className="flex justify-center">
                    <div className='bg-gray-700 rounded-lg w-3/4 p-2'><Line options={options1} data={graphData1} /></div>
                </div>

                <div className="flex justify-center mt-4">
                    <div className='bg-gray-700 rounded-lg w-3/4 p-2'><Line options={options2} data={graphData2} /></div>
                </div>
            </div>
        </div>
    </Layout>
  )
}
