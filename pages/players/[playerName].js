import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import React from "react";



const PlayerDetails = () => {
    
    const router = useRouter();
    const {playerName} = router.query;
    let player = "";
    for(let ch in playerName) {
        if (playerName[ch] != '-')
            player += playerName[ch];
        else
            player += ' ';
    }
    player = player.toUpperCase();



    return (
        <>
            <Navbar/>
            <div>
                <div className="flex mt-5">
                    <img className="flex h-200 mx-20 bg-gray-400" src="https://a.espncdn.com/combiner/i?img=/i/headshots/college-football/players/full/4429084.png" width="350" height="400"/>
                    <div className="flex flex-col mx-20 justify-right">
                        <div className="flex flex-col items-left text-gray-600 text-s">
                            <div className="flex items-end">
                                <h3 className="text-xl">Name: </h3>
                                <h3 className="text-2xl ml-6 sm:ml-10"><b>{player}</b></h3>
                            </div>
                            <div className="flex items-end">
                                <h3 className="text-xl">Height: </h3>
                                <h3 className="text-2xl ml-6 sm:ml-9"><b>6'4"</b></h3>
                            </div>
                            <div className="flex items-end">
                                <h3 className="text-xl">Weight:</h3>
                                <h3 className="text-2xl ml-6 sm:ml-8"><b>232 Ibs</b></h3>
                            </div>
                            <div className="flex items-end">
                                <h3 className="text-xl">Position:</h3>
                                <h3 className="text-2xl ml-6 sm:ml-6"><b>QB</b></h3>
                            </div>
                            <div className="flex items-end">
                                <h3 className="text-xl">Year: </h3>
                                <h3 className="text-2xl ml-6 sm:ml-14"><b> Sophomore</b></h3>
                            </div>
                            <div className="flex items-end">
                                <h3 className="text-xl">Team:</h3>
                                <h3 className="text-2xl ml-6 sm:ml-12"><b>Florida Gators</b></h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center mt-20">
                    <button className="hover:text-white hover:bg-gray-600 lg:text-2xl bg-gray-300 transition duration-150 ease-in-out focus:outline-white focus:ring-2 focus:ring-offset-2 ring-offset-indigo-700 focus:ring-white rounded rounded border border-white text-black px-4 sm:px-20 py-1 sm:py-3 text-sm">Passing</button>
                    <button className="hover:text-white hover:bg-gray-600 lg:text-2xl bg-gray-300 transition duration-150 ease-in-out focus:outline-white focus:ring-2 focus:ring-offset-2 ring-offset-indigo-700 focus:ring-white rounded rounded border border-white text-black px-4 sm:px-20 py-1 sm:py-3 text-sm ml-6 sm:ml-10">Rushing</button>
                </div>
                <div>
                    <h1 className="mt-10 flex justify-center text-3xl font-bold">Charts go here</h1>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default PlayerDetails;