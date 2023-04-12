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
import PlayersDropdown from '../../components/PlayersDropdown';
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

    const playerTeam = await prisma.players.findMany({
        where: {
            team_id: playerData?.team_id,
        },
        select: {
            id:true,
            firstName:true,
            lastName:true,
        }
    })
    playerTeam.sort((a, b) => (a.lastName > b.lastName ? 1 : -1));


    return {
        props: { playerData, teamData, playerTeam }
    }
}

const PlayerDetails = ({ playerData, teamData, playerTeam }) => {
    const [graphNumber, setGraphNumber] = useState(1);
    
    const avgStat1RB = [34.7053,  61.0333,  85.3338, 108.0914, 129.4789, 149.8301, 168.9332, 188.5094, 204.9404, 222.4920, 241.9970, 257.2351, 263.4876];
    const avgStat1QB = [117.4441,208.0319, 288.6090, 371.1781, 443.9813, 512.8617, 569.9973,624.0877, 668.0026, 728.8138, 783.2154, 826.4175, 838.9308];
    const avgStat1LB = [1.6950, 2.8707, 3.8999,  5.0598,  6.2616,  7.3010,  8.2427, 9.1205, 9.9022, 10.8778, 11.8849, 12.6840, 12.5791];
    const avgStat1DL = [0.9332, 1.5544, 2.1447, 2.7207, 3.2381, 3.7258, 4.1488, 4.6098, 5.0749, 5.5472, 6.0369, 6.4034, 6.0112];
    const avgStat1DB = [1.8843, 3.0231, 4.1293,  5.2807,  6.3312,  7.4027,  8.2113, 9.0189, 9.9621, 10.9148, 11.7076, 12.3186, 11.9379];
    const avgStat1PK = [0.4596, 0.5539, 0.5599, 0.5487, 0.5386, 0.5373, 0.5403, 0.5314, 0.5239, 0.5079, 0.4931, 0.4573, 0.4440];
    const avgStat1S  = [1.6964,  2.9742,  4.1349,  5.3194,  6.4861,  7.7321, 8.9345, 10.0892, 11.0297, 12.0972, 12.9325, 13.875, 13.7579];
    const avgStat1WR = [33.1539,  55.6288,  76.4390,  97.6147, 117.0434, 135.7969, 152.6147, 166.6468, 179.5694, 194.9367, 209.8649, 217.3125, 216.1491];
    const avgStat1TE = [18.63529411764706, 29.3976, 39.3152, 48.5600, 56.2000, 65.6235, 73.1270, 80.4047, 87.1788, 92.9811, 95.6823, 99.0729, 93.0870];
    const avgStat1DE = [1.1461, 1.8704, 2.5481, 3.1661, 3.8637, 4.5182, 5.1627, 5.6943, 6.1561, 6.7607, 7.2890, 7.8504, 7.3023];
    const avgStat1DT = [0.8297, 1.4627, 1.8989, 2.4361, 2.9734, 3.5319, 4.0106, 4.4148, 4.8617, 5.3404, 5.7287, 5.8882, 5.7925];
    const avgStat1P  = [41.4815, 41.6078, 40.6085, 40.4072, 39.0407, 38.5631, 37.9901, 37.8401, 37.2750, 36.3888, 34.8802, 34.2157, 31.6664];
    const avgStat1CB = [1.1171, 1.1484, 1.2187, 1.2578, 1.1640, 1.1875, 1.1015, 0.9765, 0.8671, 0.7578, 0.6484, 0.5625, 0.2500];
    const avgStat2RB = [0.3512, 0.6632, 0.8940, 1.0841, 1.2670, 1.4600, 1.6371, 1.7953, 1.9433, 2.0870, 2.2423, 2.3657, 2.4252];
    const avgStat2QB = [0.8856, 1.5611, 2.1888, 2.7925, 3.2898, 3.7420, 4.1436,4.4734, 4.7845, 5.2632, 5.6303, 5.9521, 6];
    const avgStat2LB = [3.2561, 5.6004,  7.6650,  9.9330, 12.2324, 14.1804, 16.0133, 17.7635, 19.3443, 21.2545, 23.2387, 24.7998, 24.6761];
    const avgStat2DL = [2.0759, 3.4425,  4.5975,  5.7936,  6.9178,  8.0082,  8.9568, 9.9075, 10.8788, 11.9209, 13.0154, 13.7751, 12.8644];
    const avgStat2DB = [2.8307, 4.6035,  6.3417,  8.1598,  9.8191, 11.4900, 12.7518, 13.9968, 15.4206, 16.8916, 18.2355, 19.1324, 18.5520];
    const avgStat2PK = [5.9339, 10.6886, 14.6886, 18.6273, 22.1839, 25.8207, 29.0283, 31.7452, 33.9622, 36.1132, 39.1745, 40.3915, 43.3773];
    const avgStat2S  = [2.9563,  5.0952,  7.1150,  9.1805, 11.0972, 13.0753, 15.0793, 16.9821, 18.5198, 20.3194, 21.7380, 23.2361, 23.1130];
    const avgStat2WR = [0.2436, 0.4041, 0.5457, 0.7101, 0.8319, 0.9584, 1.0736, 1.1539, 1.2360, 1.3550, 1.4570, 1.4976, 1.5023];
    const avgStat2TE = [1.7482, 2.7058, 3.5458, 4.3976, 5.1247, 5.9058, 6.5435, 7.1788, 7.7835, 8.2682, 8.5811, 8.7905, 8.2658];
    const avgStat2DE = [0.2142, 0.3704, 0.4983, 0.5930, 0.7259, 0.8438, 0.9651, 1.1079, 1.1976, 1.3289, 1.4152, 1.4916, 1.4102];
    const avgStat2DT = [2.0053,  3.4468,  4.6489,  6.0000,  7.2925,  8.5691,  9.7234, 10.7393, 11.7074, 12.8404, 13.8989, 14.1223, 13.6329];
    const avgStat2P  = [168.4144, 311.7368,  426.5723,  560.6842,  678.9934,  797.1644,  896.0986, 1009.0000, 1102.1447, 1221.6447, 1322.4342, 1418.7894, 1479.3684];
    const avgStat2CB = [0.2968, 0.7656, 1.1406, 1.6015, 1.9843, 2.3281, 2.5546,2.9140, 3.1953, 3.5859, 4.1015, 4.5000, 4.4296];

    const playerPosStat1 = playerData.posStat1[0].replace('[', '').replace(']', '').split(', ');
    const playerGraphStat1 = playerPosStat1?.map(Number);
    const playerPosStat2 = playerData.posStat2[0].replace('[', '').replace(']', '').split(', ');
    const playerGraphStat2 = playerPosStat2.map(Number);

    const playerPosStat1Pred = playerData.regPosStat1 != null ?  playerData.regPosStat1[0].replace('[', '').replace(']', '').split(', ') : null;
    const playerGraphStat1Pred = playerData.regPosStat1 != null ? playerPosStat1Pred.map(Number) : console.log('bad data');
    const playerPosStat2Pred = playerData.regPosStat2 != null ? playerData.regPosStat2[0].replace('[', '').replace(']', '').split(', ') : null;
    const playerGraphStat2Pred = playerData.regPosStat1 != null ? playerPosStat2Pred.map(Number) : console.log('bad data');

    const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12'];

    let label1Value = "";
    let title1Value = "";
    let playerPosStat1Avg;
    let playerPosStat2Avg;

    switch(playerData.position){
        case "RB": 
            label1Value = "Rushing Yards";
            title1Value = playerData.firstName + " " + playerData.lastName + "- Weekly Rushing Yards";
            playerPosStat1Avg = avgStat1RB;
            playerPosStat2Avg = avgStat2RB;
            break;
        case "QB":
            label1Value = "Passing Yards";
            title1Value = playerData.firstName + " " + playerData.lastName + "- Weekly Passing Yards";
            playerPosStat1Avg = avgStat1QB;
            playerPosStat2Avg = avgStat2QB;
            break;
        case "LB":
            label1Value = "Solo Tackles";
            title1Value = playerData.firstName + " " + playerData.lastName + "- Weekly Solo Tackles";
            playerPosStat1Avg = avgStat1LB;
            playerPosStat2Avg = avgStat2LB;
            break;
        case "DL":
            label1Value = "Solo Tackles";
            title1Value = playerData.firstName + " " + playerData.lastName + "- Weekly Solo Tackles";
            playerPosStat1Avg = avgStat1DL;
            playerPosStat2Avg = avgStat2DL;
            break;
        case "DB":
            label1Value = "Solo Tackles";
            title1Value = playerData.firstName + " " + playerData.lastName + "- Weekly Solo Tackles";
            playerPosStat1Avg = avgStat1DB;
            playerPosStat2Avg = avgStat2DB;
            break;
        case "PK":
            label1Value = "Field Goal Percentage";
            title1Value = playerData.firstName + " " + playerData.lastName + "- Field Goal Percentage";
            playerPosStat1Avg = avgStat1PK;
            playerPosStat2Avg = avgStat2PK;
            break;
        case "S":
            label1Value = "Solo Tackles";
            title1Value = playerData.firstName + " " + playerData.lastName + "- Weekly Solo Tackles";
            playerPosStat1Avg = avgStat1S;
            playerPosStat2Avg = avgStat2S;
            break;
        case "WR":
            label1Value = "Receiving Yards";
            title1Value = playerData.firstName + " " + playerData.lastName + "- Weekly Receiving Yards";
            playerPosStat1Avg = avgStat1WR;
            playerPosStat2Avg = avgStat2WR;
            break;
        case "TE":
            label1Value = "Receiving Yards";
            title1Value = playerData.firstName + " " + playerData.lastName + "- Weekly Receiving Yards";
            playerPosStat1Avg = avgStat1TE;
            playerPosStat2Avg = avgStat2TE;
            break;
        case "DE":
            label1Value = "Solo Tackles";
            title1Value = playerData.firstName + " " + playerData.lastName + "- Weekly Solo Tackles";
            playerPosStat1Avg = avgStat1DE;
            playerPosStat2Avg = avgStat2DE;
            break;
        case "DT":
            label1Value = "Solo Tackles";
            title1Value = playerData.firstName + " " + playerData.lastName + "- Weekly Solo Tackles";
            playerPosStat1Avg = avgStat1DT;
            playerPosStat2Avg = avgStat2DT;
            break;
        case "P":
            label1Value = "Yards Per Point";
            title1Value = playerData.firstName + " " + playerData.lastName + "- Weekly Yards Per Point";
            playerPosStat1Avg = avgStat1P;
            playerPosStat2Avg = avgStat2P;
            break;
        case "CB":
            label1Value = "Interceptions";
            title1Value = playerData.firstName + " " + playerData.lastName + "- Weekly Interceptions";
            playerPosStat1Avg = avgStat1CB;
            playerPosStat2Avg = avgStat2CB;
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

    let label1ValueAvg = label1Value + " Average";
    let label2ValueAvg = label2Value + " Average";

    let label1ValuePred = playerData.regPosStat1 != null ? "2023 " + label1Value + " Predicted" : "No Predicted Data";
    let label2ValuePred = playerData.regPosStat1 != null ? "2023 " + label2Value + " Predicted" : "No Predicted Data";

    const playerGraphData1 = {
        labels,
        datasets: [
            {
                label: label1Value,
                data: playerGraphStat1,
                borderColor: teamData.color,
                backgroundColor: teamData.color,
            },
            {
                label: label1ValueAvg,
                data: playerPosStat1Avg,
                borderColor: "#808080",
                backgroundColor: "#808080",
            },
            {
                label: label1ValuePred,
                data: playerGraphStat1Pred,
                borderColor: "green",
                backgroundColor: "green",
            } 
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
            {
                label: label2ValueAvg,
                data: playerPosStat2Avg,
                borderColor: "#808080",
                backgroundColor: "#808080",
            },
            {
                label: label2ValuePred,
                data: playerGraphStat2Pred ?? null,
                borderColor: "green",
                backgroundColor: "green",
            }
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
                    <Image alt='player-image' src={playerData.imgLinx} height={254} width={350} priority/>
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
                            <div className="flex items-end text-black">
                                <PlayersDropdown teamArray={playerTeam} title="Teammates"></PlayersDropdown>
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
                <div className="flex flex-wrap justify-center mb-20">
                    {
                        playerPosStat1.length > 1 &&
                            <div className='mx-96 h-[120] w-3/4 bg-gray-700 px-6 py-2 rounded-lg'>
                                <Line options={options1} data={playerGraphData1} />
                            </div>
                    }
                    {
                        playerPosStat2.length > 1 &&
                            <div className='mt-20 mx-96 h-[120] w-3/4 bg-gray-700 px-6 py-2 rounded-lg'>
                                <Line options={options2} data={playerGraphData2} />
                            </div>
                    }
                </div>
            </div>
        </Layout>
    );
}

export default PlayerDetails;