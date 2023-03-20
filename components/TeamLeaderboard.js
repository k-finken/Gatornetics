import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function TeamLeaderboard() {

    const data = [
        {
            id: 333,
            rank: 1,
            talentScore: 1016.79,
            name: "Alabama",
            image: "https://a.espncdn.com/i/teamlogos/ncaa/500/333.png",
            conference: "SEC"
        },
        {
            id: 61,
            rank: 2,
            talentScore: 989.76,
            name: "Georgia",
            image: "https://a.espncdn.com/i/teamlogos/ncaa/500/61.png",
            conference: "SEC"
        },
        {
            id: 194,
            rank: 3,
            talentScore: 983.14,
            name: "Ohio State",
            image: "https://a.espncdn.com/i/teamlogos/ncaa/500/194.png",
            conference: "Big Ten"
        }
    ]

    return (
        <div data-testid="TeamLeaderboard-1">
            <>            
                <div className="grid grid-cols-4 ml-28 mr-28 rounded-md text-3xl mt-10 font-bold text-gray-200 justify-items-center">  
                    <h1>Rank</h1>                
                    <h1>Team</h1>                
                    <h1>Talent Score</h1>                
                    <h1>Conference</h1>            
                </div>           
                <ul>
                    {data.map((team) => (
                        <Link href={'/teams/' + team.id.toString()} key={team.id}>
                        <div className="grid grid-cols-4 border ml-28 mr-28 rounded-md bg-gray-700 items-center text-lg font-medium justify-items-center my-2 h-12 text-gray-200 hover:cursor-pointer hover:text-gray-300 hover:bg-gray-600" data-testid="TeamLeaderboard-row"> 
                            <h2>{team.rank}</h2>
                            <div className="flex justify-self-start ml-20">
                                <Image src={team.image} height={30} width={30}></Image>
                                <h2 className="self-center ml-5">{team.name}</h2>  
                            </div>                                                   
                            <h2>{team.talentScore}</h2>                    
                            <h2>{team.conference}</h2>                
                        </div>    
                        </Link>
                    ))}
                </ul>
            </>
        </div>
    )
}