import { useRouter } from 'next/router';
import { prisma, PrismaClient } from '@prisma/client';
import Layout from '../../components/Layout'

//this function generates all the paths that the dynamic query can take
export async function getStaticPaths() {
    const prisma = new PrismaClient()
    const teams = await prisma.teams.findMany()

    const paths = teams.map((team) => ({
        params: {teamId: team.id.toString()}
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

    return {
        props: { teamData }
    }
}

const TeamDetails = ({ teamData }) => {

    return (
        <Layout>
            <div>
                <div className="flex flex-wrap justify-center mt-5">
                    <img className={"flex h-200 bg-[" + teamData.color + "] mx-20 rounded-lg"} src={teamData.logos.split(',')[0].replace('[','').replaceAll("'", '')} width="350" height="400" />
                    <div className="flex flex-col mx-20 justify-right">
                        <div className="m-auto flex flex-col items-left text-gray-600 text-s">
                            <div className="flex items-end">
                                <h3 className="text-xl">School:</h3>
                                <h3 className="text-2xl ml-14"><b>{teamData.school}</b></h3>
                            </div>
                            <div className="flex items-end">
                                <h3 className="text-xl">Conference: </h3>
                                <h3 className="text-2xl ml-3"><b>{teamData.conference}</b></h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center mt-20">
                    <button className="hover:text-white hover:bg-gray-600 lg:text-2xl bg-gray-300 transition duration-150 ease-in-out focus:outline-white focus:ring-2 focus:ring-offset-2 ring-offset-indigo-700 focus:ring-white rounded border border-white text-black px-4 sm:px-20 py-1 sm:py-3 text-sm">Team Data 1</button>
                    <button className="hover:text-white hover:bg-gray-600 lg:text-2xl bg-gray-300 transition duration-150 ease-in-out focus:outline-white focus:ring-2 focus:ring-offset-2 ring-offset-indigo-700 focus:ring-white rounded border border-white text-black px-4 sm:px-20 py-1 sm:py-3 text-sm ml-6 sm:ml-10">Team Data 2</button>
                </div>
                <div>
                    <h1 className="mt-10 flex justify-center text-3xl font-bold">Charts go here</h1>
                </div>
                <div className="flex m-auto mt-20 w-3/4 rounded h-96 bg-blue-100 " />
            </div>
        </Layout>
    );
}

export default TeamDetails;