import { prisma, PrismaClient } from '@prisma/client';
import Layout from '../../components/Layout';
import React, { useState } from 'react';
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

//this function generates all the paths that the dynamic query can take
// export async function getStaticPaths() {
//     const prisma = new PrismaClient()
//     const players = await prisma.players.findMany()

//     const paths = players.map((player) => ({
//         params: { playerId: player.id.toString() }
//     }))

//     return { paths, fallback: false }
// }


//this function gathers the data from the player given in the path
export async function getServerSideProps(context) {
    const { params } = context;
    const playerId = parseInt(params.playerId);

    const prisma = new PrismaClient()

    const playerData = await prisma.players.findFirst({
        where: {
            id: playerId,
        }
    })

    const teamData = await prisma.teams.findFirst({
        where: {
            id: playerData.team_id,
        }
    })

    return {
        props: { playerData, teamData }
    }
}

const PlayerDetails = ({ playerData, teamData }) => {
    const [graphNumber, setGraphNumber] = useState(1);

    const playerPosStat1 = playerData.posStat1[0].replace('[', '').replace(']', '').split(', ');
    const playerGraphStat1 = playerPosStat1.map(Number);
    const playerPosStat2 = playerData.posStat2[0].replace('[', '').replace(']', '').split(', ');
    const playerGraphStat2 = playerPosStat2.map(Number);

    const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12'];

    let label1Value = "";
    let title1Value = "";

    switch(playerData.position){
        case "RB": 
            label1Value = "Rushing Yards";
            title1Value = playerData.firstName + " " + playerData.lastName + "- Weekly Rushing Yards";
            break;
        case "QB":
            label1Value = "Passing Yards";
            title1Value = playerData.firstName + " " + playerData.lastName + "- Weekly Passing Yards";
            break;
        case "LB":
            label1Value = "Solo Tackles";
            title1Value = playerData.firstName + " " + playerData.lastName + "- Weekly Solo Tackles";
            break;
        case "DL":
            label1Value = "Solo Tackles";
            title1Value = playerData.firstName + " " + playerData.lastName + "- Weekly Solo Tackles";
            break;
        case "DB":
            label1Value = "Solo Tackles";
            title1Value = playerData.firstName + " " + playerData.lastName + "- Weekly Solo Tackles";
            break;
        case "PK":
            label1Value = "Field Goal Percentage";
            title1Value = playerData.firstName + " " + playerData.lastName + "- Field Goal Percentage";
            break;
        case "S":
            label1Value = "Solo Tackles";
            title1Value = playerData.firstName + " " + playerData.lastName + "- Weekly Solo Tackles";
            break;
        case "WR":
            label1Value = "Receiving Yards";
            title1Value = playerData.firstName + " " + playerData.lastName + "- Weekly Receiving Yards";
            break;
        case "TE":
            label1Value = "Receiving Yards";
            title1Value = playerData.firstName + " " + playerData.lastName + "- Weekly Receiving Yards";
            break;
        case "DE":
            label1Value = "Solo Tackles";
            title1Value = playerData.firstName + " " + playerData.lastName + "- Weekly Solo Tackles";
            break;
        case "DT":
            label1Value = "Solo Tackles";
            title1Value = playerData.firstName + " " + playerData.lastName + "- Weekly Solo Tackles";
            break;
        case "P":
            label1Value = "Yards Per Point";
            title1Value = playerData.firstName + " " + playerData.lastName + "- Weekly Yards Per Point";
            break;
        case "CB":
            label1Value = "Interceptions";
            title1Value = playerData.firstName + " " + playerData.lastName + "- Weekly Interceptions";
            break;
    }

    let label2Value = "";
    let title2Value = "";

    switch(playerData.position){
        case "RB": 
            label2Value = "Rushing Touchdowns";
            title2Value = playerData.firstName + " " + playerData.lastName + "- Weekly Rushing TouchDowns";
            break;
        case "QB":
            label2Value = "Passing Touchdowns";
            title2Value = playerData.firstName + " " + playerData.lastName + "- Weekly Passing TouchDowns";
            break;
        case "LB":
            label2Value = "Total Tackles";
            title2Value = playerData.firstName + " " + playerData.lastName + "- Total Tackles";
            break;
        case "DL":
            label2Value = "Total Tackles";
            title2Value = playerData.firstName + " " + playerData.lastName + "- Total Tackles";
            break;
        case "DB":
            label2Value = "Total Tackles";
            title2Value = playerData.firstName + " " + playerData.lastName + "- Total Tackles";
            break;
        case "PK":
            label2Value = "Points From Kicks";
            title2Value = playerData.firstName + " " + playerData.lastName + "- Total Points From Kicks";
            break;
        case "S":
            label2Value = "Total Tackles";
            title2Value = playerData.firstName + " " + playerData.lastName + "- Total Tackles";
            break;
        case "WR":
            label2Value = "Receiving Touchdowns";
            title2Value = playerData.firstName + " " + playerData.lastName + "- Weekly Receiving Touchdowns";
            break;
        case "TE":
            label2Value = "Receptions";
            title2Value = playerData.firstName + " " + playerData.lastName + "- Weekly Receptions";
            break;
        case "DE":
            label2Value = "Sacks";
            title2Value = playerData.firstName + " " + playerData.lastName + "- Weekly Sacks";
            break;
        case "DT":
            label2Value = "Total Tackles";
            title2Value = playerData.firstName + " " + playerData.lastName + "- Total Tackles";
            break;
        case "P":
            label2Value = "Punting Yards";
            title2Value = playerData.firstName + " " + playerData.lastName + "- Weekly Punting Yards";
            break;
        case "CB":
            label2Value = "Passes Defended";
            title2Value = playerData.firstName + " " + playerData.lastName + "- Weekly Passes Defended";
            break;
    }

    const playerGraphData1 = {
        labels,
        datasets: [
            {
                label: label1Value,
                data: playerGraphStat1,
                borderColor: teamData.color,
                backgroundColor: teamData.color,
            },
        ],
    };

    const playerGraphData2 = {
        labels,
        datasets: [
            {
                label: label2Value,
                data: playerGraphStat2,
                borderColor: teamData.color,
                backgroundColor: teamData.color,
            },
        ],
    };

    const options1 = {
        responsive: true,
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
            <div>
                <div className="flex flex-wrap justify-center mt-5">
                    <Image src={playerData.imgLinx} height={254} width={350} priority/>
                    <div className="flex flex-col mx-20 justify-right">
                        <div className="mt-16 m-auto flex flex-col items-left text-white text-s">
                            <div className="flex items-end">
                                <h3 className="text-xl">Name:</h3>
                                <h3 className="text-2xl ml-5 sm:ml-10"><b>{playerData.firstName} {playerData.lastName}</b></h3>
                            </div>
                            <div className="flex items-end">
                                <h3 className="text-xl">Height:</h3>
                                <h3 className="text-2xl ml-4 sm:ml-9"><b>{Math.floor(playerData.height / 12)}ft {playerData.height % 12}in</b></h3>
                            </div>
                            <div className="flex items-end">
                                <h3 className="text-xl">Weight:</h3>
                                <h3 className="text-2xl ml-3 sm:ml-8"><b>{playerData.weight} lbs</b></h3>
                            </div>
                            <div className="flex items-end">
                                <h3 className="text-xl">Position:</h3>
                                <h3 className="text-2xl ml-1 sm:ml-6"><b>{playerData.position}</b></h3>
                            </div>
                            <div className="flex items-end">
                                <h3 className="text-xl">Year: </h3>
                                <h3 className="text-2xl ml-9 sm:ml-14"><b>{playerData.year == 1 ? "Freshman" : playerData.year == 2 ? "Sophomore" : playerData.year == 3 ? "Junior" : playerData.year == 4 ? "Senior" : "We can't find this data :("}</b></h3>
                            </div>
                            <div className="flex items-end">
                                <h3 className="text-xl">Team:</h3>
                                <h3 className="text-2xl ml-7 sm:ml-12"><b>{playerData.team}</b></h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center mt-10 sm:mt-15 md:mt-18 lg:mt-20">
                    {/* <button className="hover:text-white hover:bg-gray-600 lg:text-2xl bg-gray-300 transition duration-150 ease-in-out focus:outline-white focus:ring-2 focus:ring-offset-2 ring-offset-indigo-700 focus:ring-white rounded border border-white text-black px-4 sm:px-20 py-1 sm:py-3 text-sm">Passing Yards</button>
                    <button className="hover:text-white hover:bg-gray-600 lg:text-2xl bg-gray-300 transition duration-150 ease-in-out focus:outline-white focus:ring-2 focus:ring-offset-2 ring-offset-indigo-700 focus:ring-white rounded border border-white text-black px-4 sm:px-20 py-1 sm:py-3 text-sm ml-6 sm:ml-10">Rushing Yards</button> */}
                </div>
                <div>
                    <h1 className="mt-10 flex justify-center text-3xl font-bold"></h1>
                </div>
                <div className='mx-96'>
                    <Line options={options1} data={playerGraphData1} />
                </div>
                <div className='mt-20 mx-96'>
                    <Line options={options2} data={playerGraphData2} />
                </div>
            </div>
        </Layout>
    );
}

export default PlayerDetails;