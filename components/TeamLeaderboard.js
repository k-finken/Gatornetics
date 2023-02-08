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
        <div className="grid grid-cols-5 grid-rows-4 justify-items-center bg-slate-600 ml-28 mr-28 divide-x divide-y">
            <div className="col-start-2">
                Rank
            </div>
            <div className="border border-sky-500">
                Team Name
            </div>
            <div className="flex outline-4">
                Talent Score
            </div>
            <div className="">
                Conference
            </div>
            <div className="">
                <Image src={data[0].image} height={30} width={30}></Image>
            </div>
            <div className="">
                {data[0].rank}
            </div>
            <div className="">
                {data[0].name}
            </div>
            <div className="">
                {data[0].talentScore}
            </div>
            <div className="">
                {data[0].conference}
            </div>
            <div className="">
                <Image src={data[1].image} height={30} width={30}></Image>
            </div>
            <div className="">
                {data[1].rank}
            </div>
            <div className="">
                {data[1].name}
            </div>
            <div className="">
                {data[1].talentScore}
            </div>
            <div className=""> 
                {data[1].conference}
            </div>
            <div className="">
                <Image src={data[2].image} height={30} width={30}></Image>
            </div>
            <div className="">
                {data[2].rank}
            </div>
            <div className="">
                {data[2].name}
            </div>
            <div className="">
                {data[2].talentScore}
            </div>
            <div className="">
                {data[2].conference}
            </div>
        </div>
    )
}