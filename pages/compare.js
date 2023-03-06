import Layout from '../components/Layout'
import { React, useState, useEffect } from 'react';
import { prisma, PrismaClient } from '@prisma/client';
import { Listbox, Combobox, Menu } from '@headlessui/react'
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
    // { pos: 'Select Position',   abbr: "SP" },
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

export async function getServerSideProps(context) {

    const prisma = new PrismaClient()

    const teamsList = await prisma.teams.findMany({
        select: {
            id:true,
            school:true,
        },
    })
    teamsList.sort((a, b) => (a.school > b.school ? 1 : -1));

    return {
        props: { teamsList }
    }
}

export default function Compare( { teamsList } ) {
    
    const [posChosen, setPosChosen] = useState(null)
    const [playerSel1, setPlayerSel1] = useState(null) //player1)
    const [playerSel2, setPlayerSel2] = useState(null) //player2)
    const [teamSel1, setTeamSel1] = useState(null)
    const [teamSel2, setTeamSel2] = useState(null)
    const [playersList1, setPlayersList1] = useState(null)
    const [playersList2, setPlayersList2] = useState(null)

    async function playersAtPosTeam(query) {
        const apiRoute = '/api/playersAtPosTeam?queryPosTeam=' + query;
        let returnData;
        await fetch(apiRoute, {
            method: 'GET',
        }).then((response) => response.json()).then((data) => returnData = data);
        console.log(returnData);
        return returnData;
    }

    async function generatePlayers() {
        const posTeam1 = posChosen.abbr + " " + "57"; // 57 == Florida's team_id
        const posTeam2 = posChosen.abbr + " " + "52"; // 52 == Florida State's team_id
        const playerArray1 = await playersAtPosTeam(posTeam1);
        const playerArray2 = await playersAtPosTeam(posTeam2);

        setPlayersList1(playerArray1);
        setPlayersList2(playerArray2);
        setPlayerSel1(playerArray1[0]);
        setPlayerSel2(playerArray2[0]);
        setTeamSel1(teamsList.find((team) => team.id == playerArray1[0].team_id));
        setTeamSel2(teamsList.find((team) => team.id == playerArray2[0].team_id));
    }

    const handlePosChoice = (e) => {
        const pos = pPositions.find((position) => position.pos == e.target.innerText)
        setPosChosen(pos);
        setPlayerSel1(null);
        setPlayerSel2(null);
        setTeamSel1(null);
        setTeamSel2(null);
        setPlayersList1(null);
        setPlayersList2(null);
    };

    useEffect(() => {
        (async () => {
            if (teamSel1) {

                const posTeam1 = posChosen.abbr + " " + teamSel1.id.toString();
                const playerArray1 = await playersAtPosTeam(posTeam1);
                setPlayersList1(playerArray1);
                setPlayerSel1(playerArray1[0]);
            }
        })();
    }, [teamSel1]);
    const handleTeam1Choice = (team) => {
        setTeamSel1(team);
    };

    useEffect(() => {
        (async () => {
            if (teamSel2) {

                const posTeam2 = posChosen.abbr + " " + teamSel2.id.toString();
                const playerArray2 = await playersAtPosTeam(posTeam2);
                setPlayersList2(playerArray2);
                setPlayerSel2(playerArray2[0]);
            }
        })();
    }, [teamSel2]);
    const handleTeam2Choice = (team) => {
        setTeamSel2(team);
    };

    const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12'];

    let title1Value = "";
    let title2Value = "";
    if (posChosen != null) {
        switch(posChosen.abbr){
            case "RB": 
                title1Value = "Weekly Rushing Yards";
                title2Value = "Weekly Rushing TouchDowns";
                break;
            case "QB":
                title1Value = "Weekly Passing Yards";
                title2Value = "Weekly Passing TouchDowns";
                break;
            case "LB":
                title1Value = "Weekly Solo Tackles";
                title2Value = "Total Tackles";
                break;
            case "DL":
                title1Value = "Weekly Solo Tackles";
                title2Value = "Total Tackles";
                break;
            case "DB":
                title1Value = "Weekly Solo Tackles";
                title2Value = "Total Tackles";
                break;
            case "PK":
                title1Value = "Field Goal Percentage";
                title2Value = "Total Points From Kicks";
                break;
            case "S":
                title1Value = "Weekly Solo Tackles";
                title2Value = "Total Tackles";
                break;
            case "WR":
                title1Value = "Weekly Receiving Yards";
                title2Value = "Weekly Receiving Touchdowns";
                break;
            case "TE":
                title1Value = "Weekly Receiving Yards";
                title2Value = "Weekly Receptions";
                break;
            case "DE":
                title1Value = "Weekly Solo Tackles";
                title2Value = "Weekly Sacks";
                break;
            case "DT":
                title1Value = "Weekly Solo Tackles";
                title2Value = "Total Tackles";
                break;
            case "P":
                title1Value = "Weekly Yards Per Point";
                title2Value = "Weekly Punting Yards";
                break;
            case "CB":
                title1Value = "Weekly Interceptions";
                title2Value = "Weekly Passes Defended";
                break;
        }
    }

    // player1
    let player1PosStat1;
    let player1GraphStat1;
    let player1PosStat2;
    let player1GraphStat2;
    let graphData1;
    if (playerSel1 != null) {
        player1PosStat1 = playerSel1.posStat1[0].replace('[', '').replace(']', '').split(', ');
        player1GraphStat1 = player1PosStat1.map(Number);
        player1PosStat2 = playerSel1.posStat2[0].replace('[', '').replace(']', '').split(', ');
        player1GraphStat2 = player1PosStat2.map(Number);

        graphData1 = {
            labels,
            datasets: [
                {
                    label: playerSel1.firstName + " " + playerSel1.lastName,
                    data: player1GraphStat1,
                    borderColor: 'rgb(121, 121, 121)',
                    backgroundColor: 'rgb(121, 121, 121)',
                },
                {
                    label: playerSel2.firstName + " " + playerSel2.lastName,
                    data: player2GraphStat1,
                    borderColor: 'rgb(255, 255, 255)',
                    backgroundColor: 'rgb(255, 255, 255)',
                },
            ],
        };
    }
    
    // player2
    let player2PosStat1;
    let player2GraphStat1;
    let player2PosStat2;
    let player2GraphStat2;
    let graphData2;
    if (playerSel2 != null) {
        player2PosStat1 = playerSel2.posStat1[0].replace('[', '').replace(']', '').split(', ');
        player2GraphStat1 = player2PosStat1.map(Number);
        player2PosStat2 = playerSel2.posStat2[0].replace('[', '').replace(']', '').split(', ');
        player2GraphStat2 = player2PosStat2.map(Number);

        graphData2 = {
            labels,
            datasets: [
                {
                    label: playerSel1.firstName + " " + playerSel1.lastName,
                    data: player1GraphStat2,
                    borderColor: 'rgb(121, 121, 121)',
                    backgroundColor: 'rgb(121, 121, 121)',
                },
                {
                    label: playerSel2.firstName + " " + playerSel2.lastName,
                    data: player2GraphStat2,
                    borderColor: 'rgb(255, 255, 255)',
                    backgroundColor: 'rgb(255, 255, 255)',
                },
            ],
        };
    }

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
            <div className='flex justify-center'>
                <Menu as='div' className='flex h-10 justify-center text-white text-lg'>
                    <Menu.Button className="flex rounded-lg bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-600">
                        Select Position
                        <ChevronUpDownIcon className="ml-2 h-5 w-5" aria-hidden="true"/>
                    </Menu.Button>
                    
                    <Menu.Items as='ul' className='absolute mt-12 max-h-48 w-60 overflow-y-scroll scrollbar rounded-md bg-gray-700'>
                            {pPositions.map((position) => (
                                <Menu.Item  key={position.pos} value={position}>
                                    <div onClick={handlePosChoice} className='m-1 px-4 py-1 rounded-md ui-active:bg-gray-500 ui-active:cursor-pointer'>{position.pos}</div>
                                </Menu.Item>
                            ))}
                    </Menu.Items>
                </Menu>
            </div>

            
            { posChosen == null ? (
                <div className='flex h-screen justify-center'>
                    <div className='text-4xl mt-4 font-bold text-white'>NO POSITION SELECTED</div>
                    <div className='h-52'></div>
                </div>
                
            ) : (
                <div className='flex flex-col'>
                    <div className='flex self-center text-4xl mt-4 font-bold text-white'>{posChosen.pos}</div>
                    <button onClick={generatePlayers} className="flex justify-center self-center w-40 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white py-2 px-4 mt-4 rounded">
                        Generate players
                    </button>

                    { playersList1 == null || playersList2 == null ? (
                        <div className='h-screen'></div>
                    ) : 
                    (<div>
                        <div className='flex flex-row justify-around py-4'>
                            <div className='flex flex-col justify-center'>
                                
                                <Image className='object-scale-down' alt='player-image' src={playerSel1.imgLinx} height={254} width={350} priority/>
                                <div className='self-center pt-2 text-4xl font-bold text-white'>{playerSel1.firstName} {playerSel1.lastName}</div>
                                <div className='self-center pt-2 text-4xl font-bold text-white'>{teamSel1.school}</div>
                                <div className='flex'>
                                    <Menu as='div' className='flex justify-center pt-4 mr-2 text-white text-lg'>
                                        <Menu.Button className='flex items-center justify-between w-56 px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 active:bg-gray-500'>
                                                <div className='mr-2'>Select first team</div>
                                                <ChevronUpDownIcon className="h-5 w-5 text-white" aria-hidden="true"/>
                                        </Menu.Button>
                                        <Menu.Items as='ul' className='absolute z-40 mt-12 h-48 overflow-y-scroll scrollbar rounded-md bg-gray-700'>
                                            {teamsList.map((team) => (
                                                <Menu.Item as='li' key={team.id} value={team} >
                                                    <div onClick={() => handleTeam1Choice(team)} className='m-1 px-4 py-1 rounded-md ui-active:bg-gray-500 ui-active:cursor-pointer'>{team.school}</div>
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Menu>
                                    <Menu as='div' className='flex justify-center pt-4 text-white text-lg'>
                                        <Menu.Button className='flex items-center justify-between w-56 px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 active:bg-gray-500'>
                                                <div className='mr-2'>Select first player</div>
                                                <ChevronUpDownIcon className="h-5 w-5 text-white" aria-hidden="true"/>
                                        </Menu.Button>
                                        <Menu.Items as='ul' className='absolute z-40 mt-12 h-48 overflow-y-scroll scrollbar rounded-md bg-gray-700'>
                                            {playersList1.map((player) => (
                                                <Menu.Item as='li' key={player.id} value={player} >
                                                    <div onClick={() => setPlayerSel1(player)} className='m-1 px-4 py-1 rounded-md ui-active:bg-gray-500 ui-active:cursor-pointer'>{player.firstName} {player.lastName}</div>
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Menu>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='self-end pb-8 text-5xl font-bold text-white'>VS</div>
                            </div>
                            <div className='flex flex-col'>
                                <Image className='object-scale-down' alt='player-image' src={playerSel2.imgLinx} height={254} width={350} priority/>
                                <div className='self-center pt-2 text-4xl font-bold text-white'>{playerSel2.firstName} {playerSel2.lastName}</div>
                                <div className='self-center pt-2 text-4xl font-bold text-white'>{teamSel2.school}</div>
                                <div className='flex'>
                                    <Menu as='div' className='flex justify-center pt-4 mr-2 text-white text-lg'>
                                        <Menu.Button className='flex items-center justify-between w-56 px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 active:bg-gray-500'>
                                                <div className='mr-2'>Select first team</div>
                                                <ChevronUpDownIcon className="h-5 w-5 text-white" aria-hidden="true"/>
                                        </Menu.Button>
                                        <Menu.Items as='ul' className='absolute z-40 mt-12 h-48 overflow-y-scroll scrollbar rounded-md bg-gray-700'>
                                            {teamsList.map((team) => (
                                                <Menu.Item as='li' key={team.id} value={team} >
                                                    <div onClick={() => handleTeam2Choice(team)} className='m-1 px-4 py-1 rounded-md ui-active:bg-gray-500 ui-active:cursor-pointer'>{team.school}</div>
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Menu>
                                    <Menu as='div' className='flex justify-center pt-4 text-white text-lg'>
                                        <Menu.Button className='flex items-center justify-between w-56 px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 active:bg-gray-500'>
                                                <div className='mr-2'>Select second player</div>
                                                <ChevronUpDownIcon className="h-5 w-5 text-white" aria-hidden="true"/>
                                        </Menu.Button>
                                        <Menu.Items as='ul' className='absolute z-40 mt-12 h-48 overflow-y-scroll scrollbar rounded-md bg-gray-700'>
                                            {playersList2.map((player) => (
                                                <Menu.Item as='li' key={player.id} value={player} >
                                                    <div onClick={() => setPlayerSel2(player)} className='m-1 px-4 py-1 rounded-md ui-active:bg-gray-500 ui-active:cursor-pointer'>{player.firstName} {player.lastName}</div>
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Menu>

                                </div>
                            </div>
                        </div>
                        
                        <div className='flex flex-col mt-4 justify-center'>
                            <div className="flex justify-center">
                                <div className='bg-gray-700 rounded-lg w-3/4 p-2'><Line options={options1} data={graphData1} /></div>
                            </div>

                            <div className="flex justify-center mt-4">
                                <div className='bg-gray-700 rounded-lg w-3/4 p-2'><Line options={options2} data={graphData2} /></div>
                            </div>
                        </div>
                    </div>)
                    }

                </div>
            )}
        </div>
    </Layout>
  )
}
