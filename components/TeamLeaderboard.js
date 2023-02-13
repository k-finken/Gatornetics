import React from 'react';
import Image from 'next/image';

export default function TeamLeaderboard() {

    const data = [
        {
            rank: 1,
            talentScore: 1016.79,
            name: "Alabama",
            image: "https://a.espncdn.com/i/teamlogos/ncaa/500/333.png",
            conference: "SEC"
        },
        {
            rank: 2,
            talentScore: 989.76,
            name: "Georgia",
            image: "https://a.espncdn.com/i/teamlogos/ncaa/500/61.png",
            conference: "SEC"
        },
        {
            rank: 3,
            talentScore: 983.14,
            name: "Ohio State",
            image: "https://a.espncdn.com/i/teamlogos/ncaa/500/194.png",
            conference: "Big Ten"
        }
    ]

    return (
        <div>
            <>            
                <div className="grid grid-cols-5 ml-28 mr-28 rounded-md text-xl mt-10 font-bold text-gray-200">  
                    <h1 className="col-start-2">Rank</h1>                
                    <h1>Team</h1>                
                    <h1>Talent Score</h1>                
                    <h1>Conference</h1>            
                </div>           
                <ul>
                    {data.map((team) => (
                        <div className="grid grid-cols-5 border ml-28 mr-28 rounded-md bg-gray-700 items-center text-lg"> 
                            <div className="justify-self-center"><Image src={team.image} height={40} width={30}></Image></div>             
                            <h2>{team.rank}</h2>                    
                            <h2>{team.name}</h2>                    
                            <h2>{team.talentScore}</h2>                    
                            <h2>{team.conference}</h2>                
                        </div>        
                    ))}
                </ul>
            </>
        </div>
    )
}