import { useRouter } from 'next/router';
import { prisma, PrismaClient } from '@prisma/client';
import Layout from '../../components/Layout'
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Scatter } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
);
import Image from 'next/image';

//this function generates all the paths that the dynamic query can take
export async function getStaticPaths() {
    const prisma = new PrismaClient()
    const teams = await prisma.teams.findMany()

    const paths = teams.map((team) => ({
        params: { teamId: team.id.toString() }
    }))

    return { paths, fallback: false }
}


//this function gathers the data from the player given in the path
export async function getStaticProps(context) {
    const { params } = context;
    const teamId = parseInt(params.teamId);

    const prisma = new PrismaClient()

    const teamData = await prisma.teams.findUnique({
        where: {
            id: teamId,
        }
    })

    const divisionTeamData = await prisma.teams.findMany({
        where: {
            conference: teamData.conference,
            division: teamData.division,
        }
    });

    // const allTeamData = await prisma.teams.findMany();

    return {
        props: { teamData, divisionTeamData}
    }
}

const TeamDetails = ({ teamData, divisionTeamData}) => {

    let teamIndex = 0;
    let Index = 0;
    divisionTeamData.forEach(team => {
            if (team.school == teamData.school) {
                teamIndex = Index;
            }
            Index++;
    });

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Talent Scores By Team',
                color: 'white',
                font: {
                    size: 34,
                    family: "system-ui",
                    weight: "700"
                }
            },
            labels: {
                fontColor: 'white'
            }
        },
        scales: {
            y: {
                ticks: { color: "#D3D3D3", beginAtZero: true }
            },
            x: {
                ticks: { color: 'white', beginAtZero: true }
            }
        }
    };

    const labels = [];
    divisionTeamData.forEach(team => {
        labels.push(team.school);
    });


    const talentScores = [];
    divisionTeamData.forEach(team => {
        talentScores.push(team.talentScore);
    });

    //create background colors
    let bgColors = [];
    for (let i = 0; i < divisionTeamData.length; i++) {
        if (i == teamIndex) {
            bgColors.push(teamData.color);
        }
        else {
            bgColors.push("#D3D3D3");
        }
    }

    const data = {
        labels,
        datasets: [
            {
                label: 'Talent Scores',
                data: talentScores,
                backgroundColor: bgColors,
            },
        ],
    };

    return (
        <Layout>
            <div>
                <div className="flex flex-wrap justify-center mt-5">
                    <Image className={"flex h-200 mx-20 rounded-lg"} src={teamData.imgLinx} width="400" height="400" priority />
                    <div className="flex flex-col mx-20 justify-right">
                        <div className="m-auto flex flex-col items-left text-white text-s">
                            <div className="flex items-end">
                                <h3 className="text-xl">School:</h3>
                                <h3 className="text-2xl ml-14"><b>{teamData.school}</b></h3>
                            </div>
                            <div className="flex items-end">
                                <h3 className="text-xl">Conference: </h3>
                                <h3 className="text-2xl ml-3"><b>{teamData.conference}</b></h3>
                            </div>
                            <div className="flex items-end">
                                <h3 className="text-xl">Record: </h3>
                                <h3 className="text-2xl ml-3"><b>{teamData.wins + '-' + teamData.losses}</b></h3>
                            </div>
                            <div className="flex items-end">
                                <h3 className="text-xl">Expected Wins: </h3>
                                <h3 className="text-2xl ml-3"><b>{teamData.expecWins}</b></h3>
                            </div>
                            <div className="flex items-end">
                                <h3 className="text-xl">Recruiting Rank: </h3>
                                <h3 className="text-2xl ml-3"><b>{teamData.recRank}</b></h3>
                            </div>
                            <div className="flex items-end">
                                <h3 className="text-xl">Overall Offensive Score: </h3>
                                <h3 className="text-2xl ml-3"><b>{teamData.overOff}</b></h3>
                            </div>
                            <div className="flex items-end">
                                <h3 className="text-xl">Overall Defensive Score: </h3>
                                <h3 className="text-2xl ml-3"><b>{teamData.overDeff}</b></h3>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="flex justify-center items-center mt-20">
                    <button className="hover:text-white hover:bg-gray-600 lg:text-2xl bg-gray-300 transition duration-150 ease-in-out focus:outline-white focus:ring-2 focus:ring-offset-2 ring-offset-indigo-700 focus:ring-white rounded border border-white text-black px-4 sm:px-20 py-1 sm:py-3 text-sm">Team Data 1</button>
                    <button className="hover:text-white hover:bg-gray-600 lg:text-2xl bg-gray-300 transition duration-150 ease-in-out focus:outline-white focus:ring-2 focus:ring-offset-2 ring-offset-indigo-700 focus:ring-white rounded border border-white text-black px-4 sm:px-20 py-1 sm:py-3 text-sm ml-6 sm:ml-10">Team Data 2</button>
                </div> */}
                {/* <div>
                    <h1 className="mt-10 flex justify-center text-3xl font-bold">Charts go here</h1>
                </div> */}
                <div className='mx-96'>
                    <Bar options={options} data={data} />
                </div>
            </div>
        </Layout>
    );
}

export default TeamDetails;