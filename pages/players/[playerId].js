import { prisma, PrismaClient } from '@prisma/client';
import Layout from '../../components/Layout';


//this function generates all the paths that the dynamic query can take
export async function getStaticPaths() {
    const prisma = new PrismaClient()
    const players = await prisma.players.findMany()

    const paths = players.map((player) => ({
        params: {playerId: player.id.toString()}
    }))

    return { paths, fallback: false }
}


//this function gathers the data from the player given in the path
export async function getStaticProps(context) {
    const { params } = context;
    const playerId = parseInt(params.playerId);

    const prisma = new PrismaClient()

    const playerData = await prisma.players.findFirst({
        where: {
            id: playerId,
        }
    })

    return {
        props: { playerData }
    }
}

const PlayerDetails = ({ playerData }) => {
    return (
        <Layout>
            <div>
                <div className="flex justify-center mt-5">
                    <img className="flex h-200 mx-20 bg-gray-400 rounded-lg" src="https://a.espncdn.com/combiner/i?img=/i/headshots/college-football/players/full/4429084.png" width="350" height="400" />
                    <div className="flex flex-col mx-20 justify-right">
                        <div className="m-auto flex flex-col items-left text-gray-600 text-s">
                            <div className="flex items-end">
                                <h3 className="text-xl">Name:</h3>
                                <h3 className="text-2xl ml-6 sm:ml-10"><b>{playerData.firstName} {playerData.lastName}</b></h3>
                            </div>
                            <div className="flex items-end">
                                <h3 className="text-xl">Height:</h3>
                                <h3 className="text-2xl ml-6 sm:ml-9"><b>{Math.floor(playerData.height/12)}ft {playerData.height%12}in</b></h3>
                            </div>
                            <div className="flex items-end">
                                <h3 className="text-xl">Weight:</h3>
                                <h3 className="text-2xl ml-6 sm:ml-8">{playerData.weight}lbs</h3>
                            </div>
                            <div className="flex items-end">
                                <h3 className="text-xl">Position:</h3>
                                <h3 className="text-2xl ml-6 sm:ml-6"><b>{playerData.position}</b></h3>
                            </div>
                            <div className="flex items-end">
                                <h3 className="text-xl">Year: </h3>
                                <h3 className="text-2xl ml-6 sm:ml-14"><b>{playerData.year == 1 ? "Freshman" : playerData.year == 2 ? "Sophomore" : playerData.year == 3 ? "Junior" : playerData.year == 4 ? "Senior" : "We can't find this data :("}</b></h3>
                            </div>
                            <div className="flex items-end">
                                <h3 className="text-xl">Team:</h3>
                                <h3 className="text-2xl ml-6 sm:ml-12"><b>{playerData.team}</b></h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center mt-20">
                    <button className="hover:text-white hover:bg-gray-600 lg:text-2xl bg-gray-300 transition duration-150 ease-in-out focus:outline-white focus:ring-2 focus:ring-offset-2 ring-offset-indigo-700 focus:ring-white rounded border border-white text-black px-4 sm:px-20 py-1 sm:py-3 text-sm">Passing Yards</button>
                    <button className="hover:text-white hover:bg-gray-600 lg:text-2xl bg-gray-300 transition duration-150 ease-in-out focus:outline-white focus:ring-2 focus:ring-offset-2 ring-offset-indigo-700 focus:ring-white rounded border border-white text-black px-4 sm:px-20 py-1 sm:py-3 text-sm ml-6 sm:ml-10">Rushing Yards</button>
                </div>
                <div>
                    <h1 className="mt-10 flex justify-center text-3xl font-bold">Charts go here</h1>
                </div>
                <div className="mt-20 w-full h-96 bg-slate-500 "/>
            </div>
        </Layout>
    );
}

export default PlayerDetails;