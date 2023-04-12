import Layout from '../components/Layout'
import { React, useState, useEffect } from 'react';
import { prisma, PrismaClient } from '@prisma/client';
import { Combobox, Menu } from '@headlessui/react'
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
import Link from 'next/link';

// import PlayersDropdown from '../components/PlayersDropdown';

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
            conference:true,
            color:true,
            wins:true,
            losses:true,
            expecWins:true,
            recRank:true,
            talentScore:true,
            overOff:true,
            overDeff:true,
            imgLinx:true,
        },
    })
    teamsList.sort((a, b) => (a.school > b.school ? 1 : -1));

    return {
        props: { teamsList }
    }
}

export default function Compare( { teamsList } ) {
    
    const [posChosen, setPosChosen] = useState({ pos: 'Running Back', abbr: "RB" })
    const [playerSel1, setPlayerSel1] = useState(null)
    const [playerSel2, setPlayerSel2] = useState(null)
    const [teamSel1, setTeamSel1] = useState(null)
    const [teamSel2, setTeamSel2] = useState(null)
    const [playersList1, setPlayersList1] = useState(null)
    const [playersList2, setPlayersList2] = useState(null)
    const [teamCompare, setTeamCompare] = useState(0)
    const [playerCompare, setPlayerCompare] = useState(1)

    // Combobox functions
    const [comboInput1, setComboInput1] = useState("");
    const [comboInput2, setComboInput2] = useState("");
    const [queryItems1, setQueryItems1] = useState([]);
    const [queryItems2, setQueryItems2] = useState([]);

    const handleSearch1 = (e) => {
        e.preventDefault();
        setComboInput1(e.target.value);
        updateTypeAhead1(e.target.value);
    }
    const handleSearch2 = (e) => {
        e.preventDefault();
        setComboInput2(e.target.value);
        updateTypeAhead2(e.target.value);
    }

    async function updateTypeAhead1 (query) {
        const searchResultArray = await searchPlayersAtPos(posChosen.abbr + " " + query);
        setQueryItems1(searchResultArray);
    }
    async function updateTypeAhead2 (query) {
        const searchResultArray = await searchPlayersAtPos(posChosen.abbr + " " + query);
        setQueryItems2(searchResultArray);
    }

    async function searchPlayersAtPos(query) {
        const apiRoute = '/api/searchPlayersAtPos?queryString=' + query;
        let returnData;
        await fetch(apiRoute, {
            method: 'GET',
        }).then((response) => response.json()).then((data) => returnData = data);
        return returnData;
    }
    // END of Combobox functions

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
        // SEC teams with good initial stats: 52, 2, 2579, 142, 344, 61, 99, 333, 245
        const posTeam1 = posChosen.abbr + " " + "99"; // LSU
        const posTeam2 = posChosen.abbr + " " + "142"; // 
        const playerArray1 = await playersAtPosTeam(posTeam1);
        const playerArray2 = await playersAtPosTeam(posTeam2);

        setPlayersList1(queryItems1);
        setPlayersList2(queryItems2);
        setPlayerSel1(playerArray1[0]);
        setPlayerSel2(playerArray2[0]);
        setTeamSel1(null);
        setTeamSel2(null);
    }

    const handlePosChoice = (e) => {
        const pos = pPositions.find((position) => position.pos == e.target.innerText)
        setPosChosen(pos);
        setTeamCompare(0);
    };
    // executes when posChosen changes values
    useEffect(() => {
        (async () => {
            generatePlayers();
        })();
    }, [posChosen]);

    const handlePlayerCompare = () => {        
        setPosChosen(posChosen);
        setPlayerCompare(1);
        setTeamCompare(0);
        generatePlayers();
    }

    const handleTeamCompare = () => {
        setTeamSel1(teamsList.find((team) => team.id == 57)); // Florida
        setTeamSel2(teamsList.find((team) => team.id == 61)); // Georgia
        setPlayerCompare(0);
        setTeamCompare(1);
    }

    useEffect(() => {
        // loads the initial players to compare when the page laods
        handlePlayerCompare();
    }, []);

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
    // player2
    let player2PosStat1;
    let player2GraphStat1;
    let player2PosStat2;
    let player2GraphStat2;
    let graphData2;
    if ((playerSel1 != null) && (playerSel2 != null)) {
        // player 1
        player1PosStat1 = playerSel1.posStat1[0].replace('[', '').replace(']', '').split(', ');
        player1GraphStat1 = player1PosStat1.map(Number);
        player1PosStat2 = playerSel1.posStat2[0].replace('[', '').replace(']', '').split(', ');
        player1GraphStat2 = player1PosStat2.map(Number);
        // player 2
        player2PosStat1 = playerSel2.posStat1[0].replace('[', '').replace(']', '').split(', ');
        player2GraphStat1 = player2PosStat1.map(Number);
        player2PosStat2 = playerSel2.posStat2[0].replace('[', '').replace(']', '').split(', ');
        player2GraphStat2 = player2PosStat2.map(Number);

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
                <Menu as='div' className='flex mr-2 mt-2 h-10 justify-center text-white text-lg'>
                    <Menu.Button onClick={() => handlePlayerCompare(1)} className="flex items-center justify-center w-[150px] rounded-lg bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-600">
                        Compare Players
                    </Menu.Button>
                </Menu>

                <Menu as='div' className='flex mt-2 h-10 justify-center text-white text-lg'>
                    <Menu.Button onClick={() => handleTeamCompare(1)} className="flex items-center justify-center w-[150px] rounded-lg bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-600">
                        Compare Teams
                    </Menu.Button>
                </Menu>
            </div>
            
                <div>
                    { playerCompare ? (
                        <div className='flex flex-col'>
                            <div className='flex self-center text-4xl mt-4 font-bold text-white'>{posChosen.pos}</div>
                            <Menu as='div' className='flex mt-2 h-10 justify-center text-white text-lg'>
                                <Menu.Button className="flex w-[150px] rounded-lg bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-600">
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
                            { playersList1 == null || playersList2 == null ? (
                                <div className='h-screen'></div>
                            ) : (
                            <div>
                                <div className='flex flex-row justify-around py-4'>
                                    <div className='flex flex-col justify-center'>
                                        
                                        <Image className='object-scale-down' alt='player-image' src={playerSel1.imgLinx} height={254} width={350} priority/>
                                        <div className='self-center pt-2 text-4xl font-bold text-white'>{playerSel1.firstName} {playerSel1.lastName}</div>
                                        <div className='self-center pt-2 text-4xl font-bold text-white'>{playerSel1.team}</div>
                                        <div className='self-center mt-2'>
                                            <Combobox as='div' className='flex justify-center text-white text-lg'>
                                                <div className='flex focus:outline-none rounded-lg bg-gray-700'>
                                                    <Combobox.Input onInput={handleSearch1} placeholder='Select new player...' className='outline-none ml-2 rounded-lg bg-gray-700' value={comboInput1}/>
                                                    <Combobox.Button className="flex items-center px-4 py-2 rounded-md">
                                                        <div className='min-w-[25px] my-auto mr-5'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                        </svg></div>
                                                    </Combobox.Button>
                                                </div>
                                                <Combobox.Options className='absolute mt-12 max-h-48 overflow-y-scroll scrollbar rounded-md bg-gray-700'>
                                                    {queryItems1.length == 0 ? (
                                                        <div className="m-1 w-64 px-4 py-1 rounded-md">Player not found.</div>
                                                    ) : (
                                                        queryItems1.map((player) => (
                                                            <Combobox.Option as='div' key={player.id} value={player} >
                                                                <div onClick={() => setPlayerSel1(player)} className='m-1 w-64 px-4 py-1 rounded-md ui-active:bg-gray-500 ui-active:cursor-pointer'>{player.firstName} {player.lastName}</div>
                                                            </Combobox.Option>
                                                        ))
                                                    )}
                                                </Combobox.Options>
                                            </Combobox>
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='self-end pb-8 text-5xl font-bold text-white'>VS</div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <Image className='object-scale-down' alt='player-image' src={playerSel2.imgLinx} height={254} width={350} priority/>
                                        <div className='self-center pt-2 text-4xl font-bold text-white'>{playerSel2.firstName} {playerSel2.lastName}</div>
                                        <div className='self-center pt-2 text-4xl font-bold text-white'>{playerSel2.team}</div>
                                        <div className='self-center mt-2'>
                                            <Combobox as='div' className='flex justify-center text-white text-lg'>
                                                <div className='flex focus:outline-none rounded-lg bg-gray-700'>
                                                    <Combobox.Input onInput={handleSearch2} placeholder='Select new player...' className='outline-none ml-2 rounded-lg bg-gray-700' value={comboInput2}/>
                                                    <Combobox.Button className="flex items-center px-4 py-2 rounded-md">
                                                        <div className='min-w-[25px] my-auto mr-5'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                        </svg></div>
                                                    </Combobox.Button>
                                                </div>
                                                <Combobox.Options className='absolute mt-12 max-h-48 overflow-y-scroll scrollbar rounded-md bg-gray-700'>
                                                    {queryItems2.length == 0 ? (
                                                        <div className="m-1 w-64 px-4 py-1 rounded-md">Player not found.</div>
                                                    ) : (
                                                        queryItems2.map((player) => (
                                                            <Combobox.Option as='div' key={player.id} value={player} >
                                                                <div onClick={() => setPlayerSel2(player)} className='m-1 w-64 px-4 py-1 rounded-md ui-active:bg-gray-500 ui-active:cursor-pointer'>{player.firstName} {player.lastName}</div>
                                                            </Combobox.Option>
                                                        ))
                                                    )}
                                                </Combobox.Options>
                                            </Combobox>
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
                            </div>
                            )}

                        </div>
                    ) : (
                        <div className='flex mt-4 justify-around text-white font-light  text-2xl'>
                            <div className='flex flex-col items-center'>
                                <Menu as='div' className='flex h-10 justify-center text-white text-lg'>
                                    <Menu.Button className="flex rounded-lg bg-gray-700 px-4 py-2 text-sm text-white font-normal hover:bg-gray-600">
                                        Select Team 1
                                        <ChevronUpDownIcon className="ml-2 h-5 w-5" aria-hidden="true"/>
                                    </Menu.Button>
                                    
                                    <Menu.Items as='ul' className='absolute z-10 mt-12 max-h-48 w-60 overflow-y-scroll scrollbar rounded-md bg-gray-700'>
                                            {teamsList.map((team) => (
                                                <Menu.Item  key={team.id} value={team}>
                                                    <div onClick={() => setTeamSel1(team)} className='m-1 px-4 py-1 rounded-md ui-active:bg-gray-500 ui-active:cursor-pointer'>{team.school}</div>
                                                </Menu.Item>
                                            ))}
                                    </Menu.Items>
                                </Menu>
                                <Image src={teamSel1.imgLinx} width="200" height="200" priority />
                                <div className='font-bold'>{teamSel1.school}</div>
                                <div>{teamSel1.conference}</div>
                                <div className='font-semibold'>{teamSel1.wins} - {teamSel1.losses}</div>
                                <div>{teamSel1.expecWins}</div>
                                <div className='font-semibold'>{teamSel1.recRank}</div>
                                <div>{teamSel1.overOff}</div>
                                <div className='font-semibold'>{teamSel1.overDeff}</div>

                            </div>
                            <div className='flex flex-col items-center'>
                                <div className='pt-[240px]'></div>
                                <div className='font-bold'>School</div>
                                <div>Conference</div>
                                <div className='font-semibold'>Record</div>
                                <div>Expected Wins</div>
                                <div className='font-semibold'>Recruiting Rank</div>
                                <div>Overall Offensive Score</div>
                                <div className='font-semibold'>Overall Defensive Score</div>
                            </div>
                            <div className='flex flex-col items-center'>
                                <Menu as='div' className='flex h-10 justify-center text-white text-lg'>
                                    <Menu.Button className="flex rounded-lg bg-gray-700 px-4 py-2 text-sm text-white font-normal hover:bg-gray-600">
                                        Select Team 2
                                        <ChevronUpDownIcon className="ml-2 h-5 w-5" aria-hidden="true"/>
                                    </Menu.Button>
                                    
                                    <Menu.Items as='ul' className='absolute z-10 mt-12 max-h-48 w-60 overflow-y-scroll scrollbar rounded-md bg-gray-700'>
                                            {teamsList.map((team) => (
                                                <Menu.Item  key={team.id} value={team}>
                                                    <div onClick={() => setTeamSel2(team)} className='m-1 px-4 py-1 rounded-md ui-active:bg-gray-500 ui-active:cursor-pointer'>{team.school}</div>
                                                </Menu.Item>
                                            ))}
                                    </Menu.Items>
                                </Menu>
                                <Image src={teamSel2.imgLinx} width="200" height="200" priority />
                                <div className='font-bold'>{teamSel2.school}</div>
                                <div>{teamSel2.conference}</div>
                                <div className='font-semibold'>{teamSel2.wins} - {teamSel1.losses}</div>
                                <div>{teamSel2.expecWins}</div>
                                <div className='font-semibold'>{teamSel2.recRank}</div>
                                <div>{teamSel2.overOff}</div>
                                <div className='font-semibold'>{teamSel2.overDeff}</div>
                            </div>
                        </div>
                    )}
                </div>
        </div>
        <div className='h-36'>

        </div>
    </Layout>
  )
}
